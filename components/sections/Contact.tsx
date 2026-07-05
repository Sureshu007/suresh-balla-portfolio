'use client';

import { SectionWrapper } from './SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import profileData from '@/data/portfolio.json';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const contactFormSchema = z.object({
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
  company: z.string().trim().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactProps {
  config: {
    title: string;
  };
}

export function Contact({ config }: ContactProps) {
  const { profile } = profileData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Message sent successfully!', {
          description: "I'll get back to you soon.",
        });
        reset();
      } else {
        toast.error('Failed to send message', {
          description: result.error ?? 'Please try again later.',
        });
      }
    } catch {
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
      });
    }
  };

  return (
    <SectionWrapper id="contact" className="border-t border-border/70 pb-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <div className="section-eyebrow mb-4">
            Contact
          </div>
          <h2 className="text-balance font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {config.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Have a product, platform, or workflow that needs thoughtful engineering?
            Send a note and I will respond with next steps.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <a href={`mailto:${profile.email}`} className="font-semibold text-foreground transition-colors hover:text-primary">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <a href={`tel:${profile.phone}`} className="font-semibold text-foreground transition-colors hover:text-primary">
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-semibold text-foreground">
                  {profile.location}
                </p>
              </div>
            </div>
          </div>

        </div>

        <Card className="premium-card p-6 md:p-8">
          <form className="relative space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                tabIndex={-1}
                autoComplete="off"
                {...register('company')}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-semibold text-foreground">Name</label>
                <Input
                  id="contact-name"
                  {...register('name')}
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="border-border bg-background/70 focus-visible:ring-ring/20"
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-semibold text-foreground">Email</label>
                <Input
                  id="contact-email"
                  {...register('email')}
                  placeholder="john@example.com"
                  type="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className="border-border bg-background/70 focus-visible:ring-ring/20"
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-subject" className="text-sm font-semibold text-foreground">Subject</label>
              <Input
                id="contact-subject"
                {...register('subject')}
                placeholder="Project Inquiry"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className="border-border bg-background/70 focus-visible:ring-ring/20"
              />
              {errors.subject && (
                <p id="contact-subject-error" role="alert" className="text-xs text-destructive">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-semibold text-foreground">Message</label>
              <Textarea
                id="contact-message"
                {...register('message')}
                placeholder="Tell me about your project..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className="min-h-[160px] resize-none border-border bg-background/70 focus-visible:ring-ring/20"
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="text-xs text-destructive">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full"
            >
              {isSubmitting ? (
                <>Sending... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
              ) : (
                <>Send Message <Send className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </SectionWrapper>
  );
}
