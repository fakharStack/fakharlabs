import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BentoBuild, type BentoItem } from "@/components/site/BentoBuild";
import { ServiceList } from "@/components/site/ServiceList";
import { EditorialRows } from "@/components/site/EditorialRows";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { SmartImage } from "@/components/site/SmartImage";
import { Faq } from "@/components/site/Faq";
import { services, whatWeBuild, whyChooseUs, processSteps } from "@/data/site";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fakhar Labs — Websites That Grow Businesses" },
      {
        name: "description",
        content:
          "Fakhar Labs designs and builds custom, fast, mobile-first websites for businesses — development, redesign, landing pages, SEO and maintenance.",
      },
      { property: "og:title", content: "Fakhar Labs — Websites That Grow Businesses" },
      {
        property: "og:description",
        content: "Custom websites designed and built around your business, audience and goals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

/** Bento weights: the flagship build gets the hero tile, the rest vary. */
const bentoSizes: BentoItem["size"][] = ["lg", "md", "sm", "sm", "md", "wide"];
const buildTiles: BentoItem[] = whatWeBuild.map((item, i) => ({
  ...item,
  size: bentoSizes[i] ?? "md",
}));

const maintenance = [
  {
    icon: "shield_lock",
    title: "Kept secure",
    body: "Dependency updates, SSL, backups and uptime monitoring so nothing quietly breaks.",
  },
  {
    icon: "speed",
    title: "Kept fast",
    body: "Core Web Vitals watched after launch, with image and script budgets held in place.",
  },
  {
    icon: "edit_note",
    title: "Kept current",
    body: "Content edits, new sections and small features handled inside a monthly window.",
  },
];

const pricingPreview = [
  { name: "Starter", price: "PKR 530,000", blurb: "Up to 5 custom pages, launch ready." },
  { name: "Business", price: "PKR 1,250,000", blurb: "Up to 12 pages, CMS and integrations.", popular: true },
  { name: "Premium", price: "PKR 2,500,000+", blurb: "Custom platforms, portals and app logic." },
];

const industries = [
  { label: "Healthcare & Clinics", icon: "medical_services" },
  { label: "Hospitality", icon: "restaurant" },
  { label: "Professional Services", icon: "gavel" },
  { label: "Retail & E-commerce", icon: "shopping_bag" },
  { label: "Trades & Home Services", icon: "handyman" },
  { label: "Startups & Founders", icon: "rocket_launch" },
];

function Page() {
  const featured = projects.slice(0, 3);

  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        {/* HERO */}
        <section className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-40">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <p className="font-label-caps text-label-caps uppercase text-primary">
                Digital experiences • built to grow
              </p>
              <h1 className="mt-4 font-display-xl-mobile text-4xl leading-[1.1] tracking-tight text-on-background sm:text-5xl lg:text-6xl">
                We build websites that{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  grow
                </span>{" "}
                businesses.
              </h1>
              <p className="mt-6 max-w-xl font-body-md text-base text-on-surface-variant sm:text-lg">
                Custom, mobile-first websites designed around your audience and engineered for speed,
                clarity and conversion — then handed over in full to you.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary min-h-12 !px-7 !py-3.5">
                  Get Started
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link to="/work" className="btn-secondary min-h-12 !px-7 !py-3.5 font-medium">
                  View our work
                </Link>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-outline-variant/50 pt-6">
                {[
                  { k: "Mobile first", v: "320px up" },
                  { k: "Built with", v: "React + TS" },
                  { k: "Code", v: "You own it" },
                ].map((s) => (
                  <div key={s.k} className="min-w-0">
                    <dt className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                      {s.k}
                    </dt>
                    <dd className="mt-1 truncate font-headline-md text-sm font-bold text-on-background sm:text-base">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={100}>
              <div className="glass-card overflow-hidden rounded-3xl">
                <div className="flex items-center gap-2 border-b border-white/40 bg-white/50 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-error/40" />
                  <span className="h-3 w-3 rounded-full bg-primary/40" />
                  <span className="h-3 w-3 rounded-full bg-secondary/40" />
                </div>
                <SmartImage
                  src={projects[0]!.image}
                  alt="Design mockup of a responsive clinic website built by Fakhar Labs"
                  width={1280}
                  height={960}
                  eager
                  wrapperClassName="aspect-[4/3] w-full"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHAT WE BUILD */}
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <SectionHeading
            eyebrow="What we build"
            title="Different goals need different websites."
            intro="Select a tile to see what each type of build includes and who it suits."
          />
          <BentoBuild items={buildTiles} />
        </section>

        {/* SERVICES */}
        <section className="border-y border-outline-variant/30 bg-surface-container-low/60 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Services"
              title="Everything needed to design, build and keep a website working."
              intro="Six focused services. Choose one to see its capabilities, fit and next steps."
            />
            <ServiceList services={services} />
            <Reveal className="mt-10">
              <Link
                to="/services"
                className="inline-flex min-h-11 items-center gap-2 font-body-md font-bold text-primary hover:text-secondary"
              >
                See all services in detail
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <SectionHeading
            eyebrow="Why choose us"
            title="Decisions we make on every project — and why they matter to you."
          />
          <EditorialRows items={whyChooseUs} />
        </section>

        {/* FEATURED WORK */}
        <section className="border-y border-outline-variant/30 bg-surface-container-low/60 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Featured work"
              title="Recent projects, and the thinking behind them."
              intro="Presentation mockups created by the studio to show design direction and structure."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featured.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80} as="article">
                  <div className="project-card-container group h-full">
                    <div className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
                      <div className="project-image-wrapper">
                        <SmartImage
                          src={p.image}
                          alt={`${p.name} website design mockup`}
                          width={1280}
                          height={960}
                          wrapperClassName="aspect-[4/3] w-full"
                        />
                      </div>
                      <div className="flex grow flex-col p-6">
                        <span className="font-label-caps text-label-caps w-max rounded-full bg-primary-fixed/60 px-3 py-1 uppercase text-primary">
                          {p.industry}
                        </span>
                        <h3 className="mt-4 font-headline-md text-lg font-bold text-on-background">
                          {p.name}
                        </h3>
                        <p className="mt-2 grow font-body-md text-sm text-on-surface-variant">{p.short}</p>
                        <Link
                          to="/case-studies"
                          hash={p.slug}
                          className="mt-5 inline-flex min-h-11 items-center gap-2 font-body-md text-sm font-bold text-primary hover:text-secondary"
                        >
                          View case study
                          <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                            arrow_forward
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <SectionHeading
            eyebrow="Process"
            title="Seven steps, no surprises."
            intro="A linear path from first conversation to post-launch support."
          />
          <ProcessTimeline steps={processSteps} />
        </section>

        {/* PRICING PREVIEW */}
        <section className="border-y border-outline-variant/30 bg-surface-container-low/60 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Pricing"
              title="Transparent starting points."
              intro="Website development pricing shown below. Every service has its own tiers on the pricing page."
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {pricingPreview.map((p, i) => (
                <Reveal key={p.name} delay={i * 80}>
                  <div
                    className={`glass-card h-full rounded-2xl p-7 ${p.popular ? "ring-2 ring-primary/60" : ""}`}
                  >
                    {p.popular && (
                      <span className="font-label-caps text-label-caps mb-3 inline-block rounded-full bg-primary px-3 py-1 uppercase text-on-primary">
                        Most popular
                      </span>
                    )}
                    <h3 className="font-headline-md text-lg font-bold text-on-background">{p.name}</h3>
                    <p className="font-label-caps text-label-caps mt-4 uppercase text-on-surface-variant">
                      Starts from
                    </p>
                    <p className="mt-1 font-headline-lg text-2xl font-extrabold text-primary">{p.price}</p>
                    <p className="mt-3 font-body-md text-sm text-on-surface-variant">{p.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <Link to="/pricing" search={{ service: "development", currency: "PKR" }} className="btn-primary min-h-12 !px-7 !py-3.5">
                Compare all pricing
              </Link>
            </Reveal>
          </div>
        </section>

        {/* WHO WE WORK WITH */}
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <SectionHeading
            eyebrow="Who we work with"
            title="Small teams who need their website to do real work."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.label} delay={i * 60}>
                <div className="glass-card flex h-full items-center gap-3 rounded-2xl px-5 py-5 transition-transform duration-300 hover:-translate-y-1">
                  <span className="material-symbols-outlined shrink-0 text-2xl text-primary">
                    {ind.icon}
                  </span>
                  <span className="min-w-0 font-body-md text-sm font-medium text-on-background sm:text-base">
                    {ind.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <p className="max-w-2xl font-body-md text-sm text-on-surface-variant">
              We publish delivered scope rather than borrowed statistics: no invented testimonials,
              no unverifiable percentages. What you see on this site is what we actually build.
            </p>
          </Reveal>
        </section>

        {/* MAINTENANCE */}
        <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 md:pb-24">
          <Reveal>
            <div className="glass-panel grid grid-cols-1 gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-12">
              <div className="min-w-0">
                <p className="font-label-caps text-label-caps uppercase text-primary">After launch</p>
                <h2 className="mt-3 font-headline-lg text-2xl leading-tight text-on-background sm:text-3xl">
                  A website is a product, not a delivery.
                </h2>
                <p className="mt-4 font-body-md text-sm text-on-surface-variant sm:text-base">
                  Optional monthly care keeps the site secure, fast and current — cancel any time, and the
                  code stays yours either way.
                </p>
                <Link
                  to="/pricing"
                  search={{ service: "maintenance", currency: "PKR" }}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 font-body-md font-bold text-primary hover:text-secondary"
                >
                  See maintenance plans
                  <span aria-hidden="true" className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <ul className="grid min-w-0 gap-4 sm:grid-cols-3">
                {maintenance.map((m) => (
                  <li
                    key={m.title}
                    className="min-w-0 rounded-2xl bg-white/60 p-5 ring-1 ring-outline-variant/40"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-fixed/60 text-primary">
                      <span aria-hidden="true" className="material-symbols-outlined text-xl">
                        {m.icon}
                      </span>
                    </span>
                    <h3 className="mt-4 font-headline-md text-base font-bold text-on-background">
                      {m.title}
                    </h3>
                    <p className="mt-2 font-body-md text-sm text-on-surface-variant">{m.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-outline-variant/30 bg-surface-container-low/60 py-16 md:py-24">
          <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
            <SectionHeading eyebrow="FAQ" title="Questions we get asked before every project." align="center" />
            <Faq />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="glass-panel rounded-3xl px-6 py-14 text-center sm:px-12">
              <h2 className="font-headline-lg text-2xl text-on-background sm:text-3xl md:text-4xl">
                Ready to start your website?
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body-md text-sm text-on-surface-variant sm:text-base">
                Tell us about your business and we'll come back with a clear plan, timeline and fixed price.
              </p>
              <Link to="/contact" className="btn-primary mt-8 min-h-12 !px-8 !py-3.5">
                Get Started
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </SiteLayout>
  );
}
