import portfolioData from '@/data/portfolio.json';
import { MessageSquareQuote } from 'lucide-react';
import Image from 'next/image';
import { SectionWrapper } from './SectionWrapper';

interface TestimonialsProps {
  config: {
    title: string;
    subtitle?: string;
  };
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function TestimonialCard({
  quote,
  name,
  role,
  company,
  image,
  marquee = false,
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  marquee?: boolean;
}) {
  return (
    <article
      className={
        marquee
          ? 'flex w-[min(88vw,26rem)] shrink-0 flex-col self-stretch rounded-lg border border-border/70 bg-card p-6 sm:w-[30rem] sm:p-7 md:w-[34rem]'
          : 'premium-card flex h-full flex-col rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8'
      }
    >
      <MessageSquareQuote className="mb-4 h-5 w-5 text-primary/80" aria-hidden />
      <blockquote className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-7">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="mt-auto border-t border-border pt-5">
        <div className="flex items-center gap-4">
          {image ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
              <Image
                src={image}
                alt={name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">
              {getInitials(name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-base font-bold text-foreground">{name}</p>
            <p className="mt-1 text-sm font-semibold text-primary">{role}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{company}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function TestimonialsMarquee({ items }: { items: typeof portfolioData.testimonials }) {
  const loopItems = [...items, ...items];

  return (
    <div className="testimonials-marquee relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden py-2">
      <div className="testimonials-track flex w-max items-stretch gap-6 px-6 sm:gap-8 sm:px-8">
        {loopItems.map((item, index) => (
          <TestimonialCard key={`${item.id}-${index}`} {...item} marquee />
        ))}
      </div>
    </div>
  );
}

export function Testimonials({ config }: TestimonialsProps) {
  const items = portfolioData.testimonials ?? [];

  return (
    <SectionWrapper id="testimonials" className="border-t border-border/70 bg-card/45">
      <div className="section-eyebrow mb-4 flex items-center gap-2">
        <MessageSquareQuote className="h-4 w-4" />
        Recommendations
      </div>

      <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="text-balance font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
          {config.title}
        </h2>
        {config.subtitle ? (
          <p className="max-w-xl text-base leading-7 text-muted-foreground">{config.subtitle}</p>
        ) : (
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Feedback from managers and teammates I have worked with across product delivery and engineering.
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          Add testimonials in <code className="text-foreground">data/portfolio.json</code>.
        </p>
      ) : items.length === 1 ? (
        <div className="mx-auto flex max-w-3xl justify-center">
          <TestimonialCard {...items[0]} />
        </div>
      ) : (
        <TestimonialsMarquee items={items} />
      )}
    </SectionWrapper>
  );
}
