import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ExpandableGrid, type ExpandableCard } from "@/components/site/ExpandableGrid";
import { whyChooseUs } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Fakhar Labs — How We Design and Build Websites" },
      {
        name: "description",
        content:
          "Who we are, what we believe and how we work: a small web studio building custom, fast, accessible websites you fully own.",
      },
      { property: "og:title", content: "About — Fakhar Labs" },
      {
        property: "og:description",
        content: "A small web studio building custom, fast, accessible websites you fully own.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const beliefs: ExpandableCard[] = whyChooseUs.map((i) => ({ ...i, pointsLabel: "In practice" }));

const howWeWork = [
  {
    title: "Small team, direct contact",
    body: "You talk to the people doing the work. No account layer relaying decisions, no brief lost in translation.",
    icon: "groups",
  },
  {
    title: "Scope written down",
    body: "Pages, features and responsibilities are agreed before we start, so the quote holds and nobody is guessing in week five.",
    icon: "checklist",
  },
  {
    title: "Show work early",
    body: "You see real pages in a browser rather than static images, so feedback happens against how it will actually behave.",
    icon: "visibility",
  },
  {
    title: "Honest recommendations",
    body: "If a smaller piece of work solves your problem, we will say so — including when the answer is not a rebuild.",
    icon: "balance",
  },
];

const craft = [
  { label: "React + TypeScript", detail: "Type-safe components that stay maintainable as the site grows." },
  { label: "Tailwind design system", detail: "Tokens for colour, type and spacing keep every page consistent." },
  { label: "Serverless deployment", detail: "Fast global delivery without servers for you to patch." },
  { label: "Accessibility by default", detail: "Semantic markup, keyboard paths and reduced-motion support." },
  { label: "Performance budget", detail: "Lazy images, explicit dimensions and restrained animation." },
  { label: "Documented handover", detail: "Repository, environment notes and a walkthrough at the end." },
];

function Page() {
  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <section className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-28 sm:px-8 md:pt-36">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <Reveal>
            <p className="font-label-caps text-label-caps uppercase text-primary">About us</p>
            <h1 className="mt-3 max-w-3xl font-display-xl-mobile text-3xl leading-tight text-on-background sm:text-4xl md:text-5xl">
              A studio that treats your website as infrastructure, not decoration.
            </h1>
            <p className="mt-5 max-w-2xl font-body-md text-base text-on-surface-variant sm:text-lg">
              Fakhar Labs designs and builds websites for businesses that need theirs to earn its
              place — clear to read, quick to load, easy to extend and fully owned by you.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="glass-card h-full rounded-3xl p-7 sm:p-10">
                <h2 className="font-headline-md text-xl font-bold text-on-background sm:text-2xl">
                  Who we are
                </h2>
                <div className="mt-4 space-y-4 font-body-md text-sm text-on-surface-variant sm:text-base">
                  <p>
                    We are a small web studio made up of designers and engineers who work on the same
                    projects, at the same time. That overlap is deliberate: design decisions that cannot
                    be built well, and builds that ignore the design intent, are the two most common ways
                    a website goes wrong.
                  </p>
                  <p>
                    We work with owner-led businesses and small teams — clinics, restaurants, practices,
                    retailers and founders — where the website has a specific job to do and a real budget
                    behind it.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="glass-card h-full rounded-3xl p-7 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-on-primary">
                  <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                </span>
                <h2 className="mt-5 font-headline-md text-xl font-bold text-on-background">Our approach</h2>
                <p className="mt-3 font-body-md text-sm text-on-surface-variant">
                  Start from the visitor's question, not the homepage layout. Design the answer, build it
                  so it loads fast on a phone, then remove anything that did not help.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-outline-variant/30 bg-surface-container-low/60 py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="What we believe"
              title="Six principles that shape every build."
              intro="Expand a card to see how each one shows up in the work."
            />
            <ExpandableGrid items={beliefs} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <SectionHeading eyebrow="How we work" title="Predictable, in plain language." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {howWeWork.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="glass-card flex h-full gap-4 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <span className="material-symbols-outlined shrink-0 text-2xl text-primary">{w.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-headline-md text-base font-bold text-on-background sm:text-lg">
                      {w.title}
                    </h3>
                    <p className="mt-2 font-body-md text-sm text-on-surface-variant">{w.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y border-outline-variant/30 bg-surface-container-low/60 py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHeading eyebrow="Technology & craft" title="The stack behind the work." />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {craft.map((c, i) => (
                <Reveal key={c.label} delay={i * 50}>
                  <div className="glass-card h-full rounded-2xl p-6">
                    <h3 className="font-headline-md text-base font-bold text-on-background">{c.label}</h3>
                    <p className="mt-2 font-body-md text-sm text-on-surface-variant">{c.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <Reveal>
            <div className="glass-card rounded-3xl p-7 sm:p-10">
              <h2 className="font-headline-md text-xl font-bold text-on-background sm:text-2xl">
                Client ownership
              </h2>
              <p className="mt-4 max-w-3xl font-body-md text-sm text-on-surface-variant sm:text-base">
                When a project ends you receive the repository, the accounts and the documentation. Hosting,
                domain and database sit in your name from day one. If you ever want to move to another
                developer, nothing needs to be recovered or rebuilt — you already hold everything.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Source code handover", "Accounts in your name", "Written documentation"].map((x) => (
                  <li key={x} className="flex items-start gap-2 font-body-md text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">
                      check_circle
                    </span>
                    <span className="min-w-0">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <Reveal>
            <div className="glass-panel rounded-3xl px-6 py-12 text-center sm:px-12">
              <h2 className="font-headline-lg text-2xl text-on-background sm:text-3xl">
                Let's talk about your project.
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
