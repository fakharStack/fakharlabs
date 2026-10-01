import { createFileRoute, Link } from "@tanstack/react-router";
import { useId, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { processSteps } from "@/data/site";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — From Discovery to Launch | Fakhar Labs" },
      {
        name: "description",
        content:
          "Seven clear steps: discover, plan, design, develop, test, launch and support — what happens at each stage of an Fakhar Labs project.",
      },
      { property: "og:title", content: "Our Process — Fakhar Labs" },
      {
        property: "og:description",
        content: "Discover, plan, design, develop, test, launch, support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState<string | null>(processSteps[0]!.id);
  const uid = useId();

  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <section className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-28 sm:px-8 md:pt-36">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <Reveal>
            <p className="font-label-caps text-label-caps uppercase text-primary">Process</p>
            <h1 className="mt-3 max-w-3xl font-display-xl-mobile text-3xl leading-tight text-on-background sm:text-4xl md:text-5xl">
              From first conversation to a site you can run yourself.
            </h1>
            <p className="mt-5 max-w-2xl font-body-md text-base text-on-surface-variant sm:text-lg">
              A predictable sequence with defined inputs, outputs and approval points. Select a step to
              see exactly what happens.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
          <ol className="relative flex flex-col gap-4">
            {processSteps.map((step, i) => {
              const isOpen = open === step.id;
              const panelId = `${uid}-${step.id}`;
              return (
                <Reveal key={step.id} delay={i * 50} as="li">
                  <div
                    className={`glass-card expand-card rounded-2xl p-5 sm:p-7 ${
                      isOpen ? "expand-card-open" : ""
                    } ${open && !isOpen ? "expand-card-dim" : ""}`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : step.id)}
                      className="flex w-full items-start gap-4 text-left"
                    >
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-headline-md text-sm font-black transition-colors ${
                          isOpen
                            ? "bg-gradient-to-br from-primary to-secondary text-on-primary"
                            : "bg-primary-fixed/60 text-primary"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-headline-md text-lg font-bold text-on-background">
                          {step.title}
                        </span>
                        <span className="mt-1.5 block font-body-md text-sm text-on-surface-variant sm:text-base">
                          {step.intro}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`material-symbols-outlined mt-1 shrink-0 text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    <div id={panelId} className={`expand-panel ${isOpen ? "expand-panel-open" : ""}`}>
                      <div className="min-h-0 overflow-hidden">
                        <div className="expand-panel-inner mt-5 border-t border-outline-variant/50 pt-5">
                          <p className="font-label-caps text-label-caps uppercase text-primary">
                            In this step
                          </p>
                          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                            {step.points.map((p) => (
                              <li
                                key={p}
                                className="flex items-start gap-2 font-body-md text-sm text-on-surface-variant"
                              >
                                <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">
                                  check_circle
                                </span>
                                <span className="min-w-0">{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <SectionHeading eyebrow="Timelines" title="What to expect, realistically." align="center" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { k: "Landing page", v: "2–3 weeks", d: "One page, one goal, tracking wired in." },
              { k: "Business website", v: "6–12 weeks", d: "Multi-page build with content and integrations." },
              { k: "Custom solution", v: "From 12 weeks", d: "Accounts, data and admin tooling." },
            ].map((t, i) => (
              <Reveal key={t.k} delay={i * 70}>
                <div className="glass-card h-full rounded-2xl p-7 text-center">
                  <p className="font-label-caps text-label-caps uppercase text-on-surface-variant">{t.k}</p>
                  <p className="mt-3 font-headline-lg text-2xl font-extrabold text-primary">{t.v}</p>
                  <p className="mt-3 font-body-md text-sm text-on-surface-variant">{t.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <div className="glass-panel rounded-3xl px-6 py-12 text-center sm:px-12">
              <h2 className="font-headline-lg text-2xl text-on-background sm:text-3xl">
                Start with a conversation.
              </h2>
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
