import { SectionWrapper } from './SectionWrapper';
import portfolioData from '@/data/portfolio.json';
import { BriefcaseBusiness, CheckCircle2, MapPin } from 'lucide-react';

interface ExperienceProps {
  config: {
    title: string;
  };
}

export function Experience({ config }: ExperienceProps) {
  return (
    <SectionWrapper id="experience" className="border-y border-border/70 bg-card/45">
      <div className="section-eyebrow mb-4 flex items-center gap-2">
        <BriefcaseBusiness className="h-4 w-4" />
        Career
      </div>
      <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="text-balance font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
          {config.title}
        </h2>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          Experience shipping global web systems, internal platforms, and reusable product modules.
        </p>
      </div>

      <div className="relative ml-3 space-y-8 border-l border-border pl-7 md:ml-6 md:pl-10">
        {portfolioData.experience.map((job, idx) => (
          <article
            key={job.id}
            className="relative"
          >
            <span className="absolute -left-[35px] top-7 h-3 w-3 rounded-full border-2 border-background bg-primary md:-left-[47px]" />

            <div className="premium-card rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <p className="text-sm font-semibold text-primary">{job.company}</p>
                  <h3 className="mt-2 text-2xl font-bold text-foreground">{job.role}</h3>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span>{job.period}</span>
                    <span className="hidden text-muted-foreground/40 sm:inline">/</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <span className="w-fit rounded-md border border-border bg-muted/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Role {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="mt-6 text-base leading-7 text-muted-foreground">
                {job.description}
              </p>

              <ul className="mt-7 grid gap-3">
                {job.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground md:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
