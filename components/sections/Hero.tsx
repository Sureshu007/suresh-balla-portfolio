import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio.json';
import { ArrowRight, Download } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  config: {
    title: string;
    subtitle?: string;
    tagline?: string;
    intro?: string;
  };
}

export function Hero({ config }: HeroProps) {
  const { about, profile } = portfolioData;

  return (
    <section id="hero" className="relative flex min-h-[100svh] w-full scroll-mt-24 items-center overflow-hidden px-4 pb-10 pt-24 sm:px-6 md:pb-12 md:pt-28 lg:px-8 lg:pb-10 lg:pt-28">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="section-eyebrow">{profile.name}</p>
            <h1 className="max-w-3xl text-balance font-sans text-4xl font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:text-6xl xl:text-7xl">
              {config.tagline}
            </h1>
            {config.intro && (
              <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                {config.intro}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#contact">
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href="/Resume.pdf" download>
                Download Resume <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 border-y border-border py-5 sm:max-w-xl">
            {about.stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold tabular-nums text-foreground md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:mr-0">
          <div className="premium-card relative aspect-[4/5] max-h-[calc(100svh-220px)] overflow-hidden rounded-lg p-2">
            <div className="relative h-full overflow-hidden rounded-md bg-muted">
              <Image
                src="/Suresh.jpeg"
                alt={`${config.title}, ${config.subtitle}`}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 420px, calc(100vw - 64px)"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-lg border border-border bg-card/95 p-3 shadow-xl backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Current focus</p>
            <p className="mt-1.5 text-base font-bold text-foreground">
              {profile.currentFocus}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
