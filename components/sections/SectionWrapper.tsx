import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "w-full px-4 py-24 sm:px-6 md:py-28 lg:px-8 relative overflow-hidden scroll-mt-24",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl z-10 relative">{children}</div>
    </section>
  );
}
