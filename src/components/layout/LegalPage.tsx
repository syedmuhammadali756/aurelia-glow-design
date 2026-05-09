import { PageHeader } from "./PageHeader";

export function LegalPage({
  eyebrow,
  title,
  subtitle,
  sections,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <section className="container-luxe py-12 md:py-20">
        <div className="max-w-2xl mx-auto space-y-12">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="display-serif text-2xl md:text-3xl text-espresso">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
                {s.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
