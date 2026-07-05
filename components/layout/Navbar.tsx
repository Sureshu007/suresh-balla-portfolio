'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/store';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import portfolioData from '@/data/portfolio.json';

const sectionLabels: Record<string, string> = {
  hero: 'Home',
  about: 'About',
  skills: 'Expertise',
  experience: 'Experience',
  projects: 'Work',
  contact: 'Contact',
};

const links = portfolioData.sections.map((section) => ({
  id: section.id,
  label: sectionLabels[section.id] || section.config.title || section.type,
}));

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { activeSection, setActiveSection, setIsScrollingTo } = useUIStore();

  // Close the mobile menu once the viewport reaches the desktop breakpoint,
  // otherwise the overlay hides (md:hidden) while the scroll lock stays on.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handleChange = () => {
      if (mq.matches) setIsOpen(false);
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (useUIStore.getState().isScrollingTo) return;

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  // Lock body scroll, close on Escape, and trap focus while the mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const getFocusable = () => {
      const inMenu = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      // Include the header toggle (the X) so keyboard users can reach the close control.
      return menuButtonRef.current ? [...inMenu, menuButtonRef.current] : inMenu;
    };

    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsScrollingTo(true);
      setActiveSection(id);
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setIsOpen(false);
      setTimeout(() => setIsScrollingTo(false), 1000);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="mx-auto w-full max-w-[calc(72rem+2rem)] px-4 sm:max-w-[calc(72rem+3rem)] sm:px-6 lg:max-w-[calc(72rem+4rem)] lg:px-8">
          <nav className={cn(
            "flex items-center justify-between border px-4 py-3 transition-all duration-300 md:px-5",
            scrolled
              ? "bg-card/85 backdrop-blur-xl border-border/80 shadow-sm"
              : "bg-card/70 backdrop-blur-md border-border/60"
          )}>
            <a
              href="#hero"
              className="flex items-center gap-3 text-left"
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
              aria-label="Go to top"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background shadow-sm">
                SB  
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-extrabold text-foreground">Suresh Balla</span>
                <span className="block text-xs font-medium text-muted-foreground">Full Stack Developer</span>
              </span>
            </a>

            <div className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  className={cn(
                    "relative py-2 text-sm font-semibold transition-colors duration-200",
                    activeSection === link.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-0.5 origin-left bg-primary transition-transform duration-300",
                      activeSection === link.id ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
                <a href="/Resume.pdf" download>
                  Resume <Download className="h-4 w-4" />
                </a>
              </Button>
              <Button
                ref={menuButtonRef}
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-0 z-40 bg-background/95 px-6 pt-28 backdrop-blur-xl",
          isOpen ? "block md:hidden" : "hidden"
        )}
      >
        <div className="mx-auto flex max-w-sm flex-col gap-2">
          {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className={cn(
                  "border-b border-border/70 py-4 text-left text-2xl font-bold transition-colors",
                  activeSection === link.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
            <Button className="mt-6" asChild>
              <a href="/Resume.pdf" download>
                Download Resume <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
      </div>
    </>
  );
}
