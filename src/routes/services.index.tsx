import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ExpandableGrid, type ExpandableCard } from "@/components/site/ExpandableGrid";
import { services, processSteps } from "@/data/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Website Development, Redesign, SEO | Fakhar Labs" },
      {
        name: "description",
        content:
          "Website development, redesign, landing pages, SEO, maintenance and custom web solutions — what's included, who each service suits and how we deliver it.",
      },
      { property: "og:title", content: "Services — Fakhar Labs" },
      {
        property: "og:description",
        content: "Six focused web services with clear scope, fit and process.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const included: Record<string, string[]> = {
  development: [
    "Discovery workshop and requirements",
    "Custom design for every key template",
    "Front-end build in React and TypeScript",
    "Content population and proofing",
    "Analytics, forms and integrations",
    "Deployment, handover and documentation",
  ],
  redesign: [
    "Audit of current site, content and search footprint",
    "New information architecture and sitemap",
    "Fresh visual system applied across templates",
    "Content migration with redirect mapping",
    "Mobile-first rebuild",
    "Launch with rollback plan",
  ],
  landing: [
    "Offer, audience and message definition",
    "Single-goal page design",
    "Lightweight, fast build",
    "Form wiring and thank-you experience",
    "Event and conversion tracking",
    "Sections structured for future testing",
  ],
  seo: [
    "Technical crawl and issue list",
    "Core Web Vitals remediation",
    "Metadata, headings and semantic markup",
    "Structured data implementation",
    "Internal linking and content structure",
    "Search Console and reporting setup",
  ],
  maintenance: [
    "Scheduled dependency and security updates",
    "Uptime and error monitoring",
    "Monthly content and page edits",
    "Backups with tested restore",
    "Performance review each month",
    "Priority support window",
  ],
  custom: [
    "Solution discovery and data modelling",
    "Authentication and role design",
    "Application build with type-safe data access",
    "Third-party API integration",
    "Admin tooling and dashboards",
    "Documentation and team walkthrough",
  ],
};

const serviceCards: ExpandableCard[] = services.map((s) => ({
  id: s.slug,
  title: s.name,
  icon: s.icon,
  intro: s.intro,
  points: s.capabilities,
  bestFor: s.bestFor,
  ctaLabel: "Explore service",
  ctaTo: s.to,
}));

const stepCards: ExpandableCard[] = processSteps.map((s, i) => ({
  ...s,
  index: String(i + 1).padStart(2, "0"),
  pointsLabel: "In this step",
}));

function Page() {
  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <section className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-28 sm:px-8 md:pt-36">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <Reveal>
            <p className="font-label-caps text-label-caps uppercase text-primary">Services</p>
            <h1 className="mt-3 max-w-3xl font-display-xl-mobile text-3xl leading-tight text-on-background sm:text-4xl md:text-5xl">
              Websites built with intent — designed, engineered and looked after.
            </h1>
            <p className="mt-5 max-w-2xl font-body-md text-base text-on-surface-variant sm:text-lg">
              Every service below has defined scope, a clear fit and a documented process. Pick the one
              that matches where you are, or talk to us and we'll tell you honestly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary min-h-12 !px-7 !py-3.5">
                Get Started
              </Link>
              <Link
                to="/pricing"
                search={{ service: "development", currency: "PKR" }}
                className="btn-secondary min-h-12 !px-7 !py-3.5 font-medium"
              >
                See pricing
              </Link>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
          <SectionHeading
            eyebrow="Overview"
            title="Six services, one delivery standard."
            intro="Expand a card for capabilities and fit."
          />
          <ExpandableGrid items={serviceCards} />
        </section>

        <section className="border-t border-outline-variant/30 bg-surface-container-low/60 py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHeading eyebrow="In detail" title="What each engagement includes." />
            <div className="flex flex-col gap-6">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={i * 60} as="article">
                  <div className="glass-card rounded-3xl p-6 sm:p-9">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                      <div className="min-w-0">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-on-primary">
                          <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                        </span>
                        <h2 className="mt-5 font-headline-md text-xl font-bold text-on-background sm:text-2xl">
                          {s.name}
                        </h2>
                        <p className="mt-3 font-body-md text-sm text-on-surface-variant sm:text-base">
                          {s.intro}
                        </p>
                        <p className="mt-5 rounded-xl bg-primary-fixed/40 px-4 py-3 font-body-md text-sm text-on-surface-variant">
                          <span className="font-bold text-on-background">Who it's for: </span>
                          {s.bestFor}
                        </p>
                        <Link
                          to={s.to as never}
                          className="mt-6 inline-flex min-h-11 items-center gap-2 font-body-md text-sm font-bold text-primary hover:text-secondary"
                        >
                          Explore {s.name}
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                      </div>
                      <div className="min-w-0 border-t border-outline-variant/50 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                        <p className="font-label-caps text-label-caps uppercase text-primary">
                          What's included
                        </p>
                        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {(included[s.slug] ?? s.capabilities).map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 font-body-md text-sm text-on-surface-variant"
                            >
                              <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">
                                check_circle
                              </span>
                              <span className="min-w-0">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="font-label-caps text-label-caps mt-6 uppercase text-primary">
                          Key capabilities
                        </p>
                        <p className="mt-3 font-body-md text-sm text-on-surface-variant">
                          {s.capabilities.join(" · ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <SectionHeading
            eyebrow="How we deliver"
            title="The same process behind every service."
            intro="Expand a step to see what happens and what we need from you."
          />
          <ExpandableGrid items={stepCards} />
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <Reveal>
            <div className="glass-panel rounded-3xl px-6 py-12 text-center sm:px-12">
              <h2 className="font-headline-lg text-2xl text-on-background sm:text-3xl">
                Not sure which service you need?
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-body-md text-sm text-on-surface-variant sm:text-base">
                Describe the problem and we'll recommend the smallest piece of work that solves it.
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
