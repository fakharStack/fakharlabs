import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SmartImage } from "@/components/site/SmartImage";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — Web Design & Development Portfolio | Fakhar Labs" },
      {
        name: "description",
        content:
          "Selected Fakhar Labs projects across healthcare, hospitality, retail and professional services — with scope, technology and design direction for each build.",
      },
      { property: "og:title", content: "Our Work — Fakhar Labs" },
      {
        property: "og:description",
        content: "Selected projects with scope, technology and design direction.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const categories = ["All", "Web Application", "Healthcare", "Health & Fitness"] as const;

function Page() {
  const [category, setCategory] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(null);

  const visible = projects.filter((p) => category === "All" || p.industry === category);

  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <section className="relative mx-auto w-full max-w-6xl px-5 pb-8 pt-28 sm:px-8 md:pt-36">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <Reveal>
            <p className="font-label-caps text-label-caps uppercase text-primary">Work</p>
            <h1 className="mt-3 max-w-3xl font-display-xl-mobile text-3xl leading-tight text-on-background sm:text-4xl md:text-5xl">
              Projects designed to do a specific job.
            </h1>
            <p className="mt-5 max-w-2xl font-body-md text-base text-on-surface-variant sm:text-lg">
              Each project below shows the brief, the build and what was delivered. Imagery is studio
              design work created to present the direction — not client screenshots.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-6 sm:px-8">
          <div
            role="tablist"
            aria-label="Filter projects by industry"
            className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                type="button"
                onClick={() => setCategory(c)}
                className={`min-h-11 shrink-0 snap-start whitespace-nowrap rounded-full px-5 py-2.5 font-body-md text-sm transition-all duration-300 ${
                  category === c
                    ? "bg-gradient-to-r from-primary to-secondary text-on-primary shadow-[0_10px_30px_-12px_rgba(99,14,212,0.6)]"
                    : "glass-panel text-on-surface-variant hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visible.map((p, i) => {
              const isOpen = open === p.slug;
              const panelId = `work-${p.slug}`;
              return (
                <Reveal
                  key={p.slug}
                  delay={i * 70}
                  as="article"
                  className={isOpen ? "md:col-span-2" : ""}
                >
                  <div className="project-card-container group h-full">
                    <div
                      className={`glass-card expand-card relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-outline-variant/40 shadow-sm transition-all duration-500 ease-out hover:border-primary/30 hover:shadow-xl ${
                        isOpen ? "expand-card-open ring-1 ring-primary/20" : ""
                      } ${open && !isOpen ? "expand-card-dim" : ""}`}
                    >
                      <div className="project-image-wrapper relative">
                        <SmartImage
                          src={p.image}
                          alt={`${p.name} — ${p.type} design mockup`}
                          width={1280}
                          height={960}
                          wrapperClassName={`w-full transition-all duration-500 ${isOpen ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                      </div>
                      
                      <div className="flex grow flex-col p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-label-caps text-label-caps rounded-full bg-primary/10 px-3 py-1.5 uppercase tracking-wider text-primary">
                            {p.industry}
                          </span>
                          <span className="font-label-caps text-label-caps rounded-full border border-outline-variant/50 bg-surface/50 px-3 py-1.5 uppercase tracking-wider text-on-surface-variant">
                            {p.type}
                          </span>
                        </div>
                        <h2 className="mt-5 font-headline-md text-xl font-bold text-on-background sm:text-2xl group-hover:text-primary transition-colors duration-300">
                          {p.name}
                        </h2>
                        <p className="mt-3 min-h-[48px] font-body-md text-sm leading-relaxed text-on-surface-variant sm:text-base">
                          {p.short}
                        </p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {p.stack.map((t) => (
                            <li
                              key={t}
                              className="rounded-md bg-surface-variant/40 px-3 py-1.5 font-body-md text-xs font-medium text-on-surface-variant ring-1 ring-inset ring-outline-variant/20"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>

                        <div className={`expand-panel ${isOpen ? "expand-panel-open" : ""}`}>
                          <div className="min-h-0 overflow-hidden">
                            <div className="expand-panel-inner mt-8 grid gap-8 rounded-2xl bg-surface-container-low/50 p-6 ring-1 ring-outline-variant/30 md:grid-cols-2 lg:p-8">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-primary text-xl">info</span>
                                  <p className="font-label-caps text-label-caps uppercase tracking-widest text-primary">
                                    Project overview
                                  </p>
                                </div>
                                <p className="mt-4 font-body-md text-sm leading-relaxed text-on-surface-variant">
                                  {p.overview}
                                </p>
                                
                                {p.approach && (
                                  <>
                                    <div className="flex items-center gap-2 mt-8">
                                      <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
                                      <p className="font-label-caps text-label-caps uppercase tracking-widest text-primary">
                                        Our approach
                                      </p>
                                    </div>
                                    <p className="mt-4 font-body-md text-sm leading-relaxed text-on-surface-variant">
                                      {p.approach}
                                    </p>
                                  </>
                                )}
                              </div>
                              <div className="min-w-0 border-t border-outline-variant/30 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                                <div className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                  <p className="font-label-caps text-label-caps uppercase tracking-widest text-primary">
                                    Key features
                                  </p>
                                </div>
                                <ul className="mt-5 space-y-3">
                                  {p.features.map((f) => (
                                    <li
                                      key={f}
                                      className="flex items-start gap-3 font-body-md text-sm text-on-surface-variant"
                                    >
                                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-[14px]">
                                          check
                                        </span>
                                      </span>
                                      <span className="min-w-0 pt-0.5 leading-relaxed">{f}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-outline-variant/30 pt-6">
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => setOpen(isOpen ? null : p.slug)}
                            className="btn-secondary !px-5 !py-2.5 text-sm font-medium hover:!bg-primary/5 hover:!border-primary/40 hover:!text-primary transition-all"
                          >
                            {isOpen ? "Hide details" : "Detailed overview"}
                            <span
                              aria-hidden="true"
                              className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            >
                              expand_more
                            </span>
                          </button>
                          {p.caseStudyTo && (
                            <Link
                              to="/case-studies"
                              hash={p.slug}
                              className="inline-flex min-h-10 items-center gap-2 font-body-md text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
                            >
                              View case study
                              <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                          )}
                          {p.url && (
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-10 items-center gap-2 font-body-md text-sm font-bold text-primary transition-colors hover:text-secondary ml-auto"
                            >
                              Visit Live Project
                              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">open_in_new</span>
                            </a>
                          )}
                        </div>
                        <div id={panelId} className="sr-only" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <Reveal>
            <div className="glass-panel rounded-3xl px-6 py-12 text-center sm:px-12">
              <h2 className="font-headline-lg text-2xl text-on-background sm:text-3xl">
                Your project could be next.
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-body-md text-sm text-on-surface-variant sm:text-base">
                Tell us what you need and we'll come back with scope, timeline and a fixed price.
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
