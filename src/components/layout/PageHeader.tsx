export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-surface-warm/60 border-b border-border">
      <div className="container-luxe py-16 md:py-24 text-center">
        {eyebrow && (
          <div className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-4">
            {eyebrow}
          </div>
        )}
        <h1 className="display-serif text-4xl md:text-6xl text-espresso leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
