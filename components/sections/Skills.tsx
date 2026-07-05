import { SectionWrapper } from './SectionWrapper';
import portfolioData from '@/data/portfolio.json';
import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  Cpu,
  Sparkles,
  ShieldCheck, 
  Wrench,
  Zap,
  UsersRound
} from 'lucide-react';
import type { ReactNode } from 'react';

interface SkillsProps {
  config: {
    title: string;
  };
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  "Frontend": <Globe className="w-5 h-5" />,
  "Backend": <Database className="w-5 h-5" />,
  "Languages": <Code2 className="w-5 h-5" />,
  "Payment Integrations": <Zap className="w-5 h-5" />,
  "Gen AI": <Sparkles className="w-5 h-5" />,
  "Tools": <Wrench className="w-5 h-5" />,
  "Auth": <ShieldCheck className="w-5 h-5" />,
  "Cloud": <Layers className="w-5 h-5" />,
  "Soft Skills": <UsersRound className="w-5 h-5" />
};

export function Skills({ config }: SkillsProps) {
  return (
    <SectionWrapper id="skills">
      <div className="mb-14 max-w-3xl">
        <div className="section-eyebrow mb-4">
          What I use
        </div>
        <h2 className="text-balance font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
          {config.title}
        </h2>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          A focused stack for shipping polished interfaces, resilient APIs, authenticated
          products, payment flows, and operational platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {portfolioData.skills.map((category) => (
          <div
            key={category.category}
            className="group premium-card flex h-full flex-col rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                {CATEGORY_ICONS[category.category] || <Cpu className="w-5 h-5" />}
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {category.category}
              </h3>
            </div>

            <div className="mt-auto flex flex-wrap gap-2">
              {category.items.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="rounded-md border border-border bg-muted/60 px-3 py-1.5 text-sm font-medium text-muted-foreground transition group-hover:border-primary/25 group-hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
