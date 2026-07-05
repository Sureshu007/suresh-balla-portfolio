import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import portfolioData from '@/data/portfolio.json';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

type SectionConfig = {
  title: string;
  subtitle?: string;
  tagline?: string;
};

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ config: SectionConfig }>> = {
  hero: Hero,
  about: About,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  testimonials: Testimonials,
  contact: Contact,
};

export default function HomeContent() {
  const { profile } = portfolioData;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />

      <div className="flex flex-col gap-0">
        {portfolioData.sections.map((section) => {
          const Component = SECTION_COMPONENTS[section.type];
          if (!Component) return null;

          return (
            <Component key={section.id} config={section.config} />
          );
        })}
      </div>

      <footer className="border-t border-border/70 bg-card/45 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-foreground">&copy; {new Date().getFullYear()} {profile.name}</p>
            <p className="mt-1">{profile.location} - {profile.availability}</p>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition hover:text-primary">
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-primary">
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-primary">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-primary">
              <Twitter className="h-4 w-4" />
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
