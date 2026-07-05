import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

function getTransporter(user: string, pass: string) {
  const cleanUser = user.trim();
  const cleanPass = pass.replace(/\s/g, '');

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user: cleanUser, pass: cleanPass },
  });
}

function getEmailErrorMessage(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'EAUTH'
  ) {
    return 'Gmail login failed. Create a new App Password in Google Account settings and update .env.local, then restart the dev server.';
  }

  return 'Failed to send email';
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
// NOTE: This is an in-memory limiter. On serverless platforms (e.g. Vercel)
// each instance keeps its own Map and cold starts reset it, so it only
// throttles bursts hitting the same warm instance. For durable, cross-instance
// rate limiting, back this with a shared store such as Vercel KV / Upstash Redis.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const contactSchema = z.object({
  name: z.string().trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be 100 characters or fewer'),
  email: z.string().trim()
    .email('Invalid email address')
    .max(254, 'Email must be 254 characters or fewer'),
  subject: z.string().trim()
    .min(5, 'Subject must be at least 5 characters')
    .max(150, 'Subject must be 150 characters or fewer')
    .refine((value) => !/[\r\n]/.test(value), 'Subject must be a single line'),
  message: z.string().trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be 5000 characters or fewer'),
  company: z.string().trim().max(200).optional().default(''),
});

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(identifier: string) {
  const now = Date.now();

  if (rateLimitStore.size > 500) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
}

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(getClientIp(request));
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter.toString(),
          },
        }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const data = contactSchema.parse(body);

    if (data.company) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_APP_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error('Contact form email configuration is missing.');
      return NextResponse.json(
        { success: false, error: 'Contact form is not configured' },
        { status: 500 }
      );
    }

    const transporter = getTransporter(emailUser, emailPassword);
    await transporter.verify();

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeSubject = escapeHtml(data.subject);
    const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />');
    const text = [
      'New Contact Form Submission',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      '',
      data.message,
    ].join('\n');

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      replyTo: data.email,
      subject: `From Portfolio Page: ${data.subject}`,
      text,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: getEmailErrorMessage(error) },
      { status: 500 }
    );
  }
}
