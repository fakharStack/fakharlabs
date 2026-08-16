import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Web Design Projects in Detail | Fakhar Labs" },
      {
        name: "description",
        content:
          "Full case studies from Fakhar Labs: the brief, challenge, design direction, development detail and delivered outcome for each project.",
      },
      { property: "og:title", content: "Case Studies — Fakhar Labs" },
      {
        property: "og:description",
        content: "The brief, the build and what was delivered on each project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="font-label-caps text-label-caps uppercase text-primary">{label}</p>
      <div className="mt-2.5 font-body-md text-sm text-on-surface-variant sm:text-base">{children}</div>
    </div>
  );
}

function Page() {
  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <section className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-28 sm:px-8 md:pt-36">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <Reveal>
            <p className="font-label-caps text-label-caps uppercase text-primary">Case studies</p>
            <h1 className="mt-3 max-w-3xl font-display-xl-mobile text-3xl leading-tight text-on-background sm:text-4xl md:text-5xl">
              The thinking behind the websites we ship.
            </h1>
            <p className="mt-5 max-w-2xl font-body-md text-base text-on-surface-variant sm:text-lg">
              Each study covers the brief, the challenge, the design direction, the build and what was
              delivered. Where client performance data is not available to publish, we describe outcomes
              as scope delivered rather than quoting numbers.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
          <Reveal>
            <nav aria-label="Jump to case study" className="flex flex-wrap gap-2">
              {projects.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className="glass-panel inline-flex min-h-11 items-center rounded-full px-4 py-2 font-body-md text-sm text-on-surface-variant transition-colors hover:text-primary"
                >
                  {p.name}
                </a>
              ))}
            </nav>
          </Reveal>
        </section>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-20 sm:px-8">
          {projects.map((p, i) => (
            <Reveal key={p.slug} as="article" delay={i * 40}>
              <div id={p.slug} className="glass-card overflow-hidden rounded-3xl scroll-mt-32">
                <SmartImage
                  src={p.image}
                  alt={`${p.name} — ${p.type} design mockup created by Fakhar Labs`}
                  width={1280}
                  height={960}
                  eager={i === 0}
                  wrapperClassName="aspect-[16/9] w-full"
                />
                <div className="p-6 sm:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-label-caps text-label-caps rounded-full bg-primary-fixed/60 px-3 py-1 uppercase text-primary">
                      {p.industry}
                    </span>
                    <span className="font-label-caps text-label-caps rounded-full border border-outline-variant/60 px-3 py-1 uppercase text-on-surface-variant">
                      {p.type}
                    </span>
                  </div>
                  <h2 className="mt-4 font-headline-lg text-2xl font-bold text-on-background sm:text-3xl">
                    {p.name}
                  </h2>
                  <p className="mt-3 max-w-3xl font-body-md text-base text-on-surface-variant sm:text-lg">
                    {p.short}
                  </p>

                  <div className="mt-8 grid gap-7 border-t border-outline-variant/50 pt-8 md:grid-cols-2">
                    <Block label="Project overview">{p.overview}</Block>
                    <Block label="The challenge">{p.challenge}</Block>
                    <Block label="Our approach">{p.approach}</Block>
                    <Block label="Design direction">{p.design}</Block>
                    <Block label="Development">{p.development}</Block>
                    <Block label="Responsive experience">{p.responsive}</Block>
                    <Block label="Performance & technical focus">{p.performance}</Block>
                    <Block label="Key features">
                      <ul className="space-y-2">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">
                              check_circle
                            </span>
                            <span className="min-w-0">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </Block>
                  </div>

                  <div className="mt-8 grid gap-7 border-t border-outline-variant/50 pt-8 md:grid-cols-2">
                    <Block label="Outcome & deliverables">
                      <ul className="space-y-2">
                        {p.outcome.map((o) => (
                          <li key={o} className="flex items-start gap-2">
                            <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">
                              task_alt
                            </span>
                            <span className="min-w-0">{o}</span>
                          </li>
                        ))}
                      </ul>
                    </Block>
                    <Block label="Technology stack">
                      <ul className="flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <li
                            key={t}
                            className="rounded-md bg-surface-container px-2.5 py-1 font-body-md text-xs text-on-surface-variant"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </Block>
                  </div>

                  {p.caseStudyTo && (
                    <Link
                      to={p.caseStudyTo}
                      className="mt-8 inline-flex min-h-11 items-center gap-2 font-body-md text-sm font-bold text-primary transition-colors hover:text-secondary sm:text-base"
                    >
                      Read the extended case study
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-28 sm:px-8">
          <Reveal>
            <div className="glass-panel rounded-3xl px-6 py-12 text-center sm:px-12">
              <h2 className="font-headline-lg text-2xl text-on-background sm:text-3xl">
                Want a project like these?
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-body-md text-sm text-on-surface-variant sm:text-base">
                Tell us about your business and we'll come back with a clear plan, timeline and price.
              </p>
              <Link to="/contact" className="btn-primary mt-8 min-h-12 !px-8 !py-3.5">
                Get Started
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </SiteLayout>
  );
}
