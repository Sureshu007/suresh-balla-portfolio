import { SectionWrapper } from './SectionWrapper';
import portfolioData from '@/data/portfolio.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, LayoutPanelTop } from 'lucide-react';
import Image from 'next/image';

interface ProjectsProps {
  config: {
    title: string;
  };
}

export function Projects({ config }: ProjectsProps) {
  return (
    <SectionWrapper id="projects">
      <div className="section-eyebrow mb-4 flex items-center gap-2">
        <LayoutPanelTop className="h-4 w-4" />
        Selected Work
      </div>
      <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="text-balance font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
          {config.title}
        </h2>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          Product builds that combine polished interfaces, data-heavy workflows, authentication,
          payments, and real operational use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {portfolioData.projects.map((project) => (
          <article
            key={project.id} 
            className="group"
          >
            <Card className="premium-card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl font-bold text-muted-foreground">
                    Project 0{project.id}
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {project.type ?? 'Product build'}
                </p>
                <CardTitle className="text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex flex-grow flex-col">
                <p className="mb-6 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <Badge key={i} variant="secondary" className="rounded-md border border-border bg-muted/70 text-muted-foreground hover:bg-muted">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-7 flex gap-3 border-t border-border pt-5">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary"
                    >
                      Live <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
                    >
                      Code <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
