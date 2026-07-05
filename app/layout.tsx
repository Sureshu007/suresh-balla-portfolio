import type { Metadata, Viewport } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';
import portfolioData from '@/data/portfolio.json';
import './globals.css';

const { profile } = portfolioData;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  url: 'https://ajay.darisi.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location,
  },
  sameAs: [
    profile.socials.github,
    profile.socials.linkedin,
    profile.socials.twitter,
  ],
};

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f4f0' },
    { media: '(prefers-color-scheme: dark)', color: '#131924' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ajay.darisi.in'),
  title: 'Suresh Balla - Software Engineer',
  description: 'Professional portfolio of Suresh Balla, a software engineer building scalable web platforms, admin systems, and payment-enabled products.',
  openGraph: {
    title: 'Suresh Balla - Software Engineer',
    description: 'Software engineer building scalable web platforms, admin systems, and payment-enabled products.',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suresh Balla - Software Engineer',
    description: 'Software engineer building scalable web platforms, admin systems, and payment-enabled products.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon-64.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
