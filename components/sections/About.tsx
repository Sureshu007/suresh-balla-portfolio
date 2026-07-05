import profileData from '@/data/portfolio.json';
import { CheckCircle2, Layers3, ShieldCheck, UsersRound } from 'lucide-react';
import { SectionWrapper } from './SectionWrapper';

interface AboutProps {
  config: {
    title: string;
  };
}

export function About({ config }: AboutProps) {
  const { profile, about } = profileData;
  const principles = [
    {
      title: 'Product-minded engineering',
      description: 'I connect technical decisions to user experience, business flow, and delivery speed.',
      icon: Layers3,
    },
    {
      title: 'Reliable systems',
      description: 'I build with maintainability, data integrity, access control, and performance in view.',
      icon: ShieldCheck,
    },
    {
      title: 'Team-scale execution',
      description: 'I have worked across product, design, and engineering teams to ship complex workflows.',
      icon: UsersRound,
    },
  ];

  return (
    <SectionWrapper id="about" className="border-y border-border/70 bg-card/45">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="section-eyebrow mb-4">
            {config.title}
          </div>
          <h2 className="text-balance font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            Building practical software with polished user experience.
          </h2>
          
          <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
            <p>
              I am a <span className="font-semibold text-foreground">{profile.role}</span> based in {profile.location},
              focused on building scalable web applications, admin platforms, payment workflows,
              and interfaces that make complex operations feel manageable.
            </p>
            <p>
              Over the past 2+ years, I have shipped systems used across global teams, including
              configurable registration flows, localization tooling, reusable payment modules, and
              high-traffic product experiences.
            </p>
            <p>
              My best work sits where clear product thinking meets strong implementation:
              clean architecture, dependable data flow, accessible UI, and careful collaboration.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="premium-card rounded-lg p-6 md:p-8">
            <p className="section-eyebrow">How I work</p>
            <div className="mt-6 space-y-6">
              {principles.map(({ title, description, icon: Icon }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 border-t border-border pt-6 sm:grid-cols-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="pr-4">
                  <div className="text-2xl font-extrabold tabular-nums text-foreground">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-md bg-muted/75 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-6 text-muted-foreground">
                Current focus: scalable Next.js applications, Supabase-backed products,
                reusable UI systems, and payment-enabled customer journeys.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
