import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WhatsAppLinkButton } from "@/components/site/WhatsAppButton";
import {
  CURRENCIES,
  currencyMeta,
  isCurrencyCode,
  isServiceId,
  paymentSteps,
  pricingFaqs,
  resolvePrice,
  services,
  type CurrencyCode,
  type Plan,
  type PlanId,
  type Service,
  type ServiceId,
} from "@/data/pricing";

export const Route = createFileRoute("/pricing")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { service: ServiceId; currency: CurrencyCode } => ({
    service: isServiceId(search["service"]) ? search["service"] : "development",
    currency: isCurrencyCode(search["currency"]) ? search["currency"] : "PKR",
  }),
  head: () => ({
    meta: [
      { title: "Pricing — Fakhar Labs" },
      {
        name: "description",
        content:
          "Starting prices for website development, redesigns, landing pages, web apps, SEO and maintenance — in PKR, USD or GBP, with a clear 25% advance payment model.",
      },
      { property: "og:title", content: "Pricing — Fakhar Labs" },
      {
        property: "og:description",
        content:
          "Transparent starting prices in PKR, USD or GBP, plan comparison, payment model and maintenance options.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { service, currency } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const active = services.find((s) => s.id === service) ?? services[0]!;

  const select = (next: Partial<{ service: ServiceId; currency: CurrencyCode }>) =>
    navigate({
      search: (prev) => ({ ...prev, ...next }),
      replace: true,
      resetScroll: false,
    });

  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <Hero currency={currency} onCurrency={(c) => select({ currency: c })} />
        <ServiceSelector active={active} onSelect={(id) => select({ service: id })} />
        <PlanCards service={active} currency={currency} />
        <Comparison service={active} currency={currency} />
        <PaymentModel />
        <PolicyStrip />
        <Maintenance />
        <Faqs />
        <FinalCta service={active} currency={currency} />
      </main>
    </SiteLayout>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero({
  currency,
  onCurrency,
}: {
  currency: CurrencyCode;
  onCurrency: (c: CurrencyCode) => void;
}) {
  const [suggestion, setSuggestion] = useState<CurrencyCode | null>(null);

  useEffect(() => {
    // Optional, non-restrictive regional hint. PKR always stays the default and
    // the visitor can pick any currency manually.
    if (currency !== "PKR") return;
    let zone = "";
    try {
      zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    } catch {
      zone = "";
    }
    if (!zone || zone === "Asia/Karachi") {
      setSuggestion(null);
      return;
    }
    setSuggestion(zone.startsWith("Europe/London") ? "GBP" : "USD");
  }, [currency]);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-6 pt-28 sm:px-8 md:pt-36">
      <Reveal>
        <p className="font-label-caps text-label-caps uppercase text-primary">Pricing</p>
        <h1 className="mt-3 max-w-3xl font-headline-lg text-3xl leading-tight text-on-background sm:text-4xl md:text-5xl">
          Honest starting prices, quoted properly before we begin.
        </h1>
        <p className="mt-5 max-w-2xl font-body-md text-base text-on-surface-variant sm:text-lg">
          Every figure below is a <strong className="text-on-background">starting point</strong>, not
          a fixed quote — final pricing depends on scope. Pick a service, choose your currency, and
          you'll see exactly what each plan includes.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="flex flex-wrap gap-2">
            {[
              { icon: "payments", text: "25% advance to start" },
              { icon: "verified", text: "7-day satisfaction window" },
              { icon: "shield_person", text: "2 months free maintenance" },
            ].map((chip) => (
              <span
                key={chip.text}
                className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 font-body-md text-xs text-on-surface-variant sm:text-sm"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-base text-primary">
                  {chip.icon}
                </span>
                {chip.text}
              </span>
            ))}
          </div>
          <CurrencySelector currency={currency} onCurrency={onCurrency} />
        </div>
      </Reveal>

      {suggestion && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
          <span aria-hidden="true" className="material-symbols-outlined text-base text-primary">
            public
          </span>
          <p className="min-w-0 font-body-md text-sm text-on-surface-variant">
            Showing local pricing. Working with us from outside Pakistan?
          </p>
          <button
            type="button"
            onClick={() => onCurrency(suggestion)}
            className="min-h-11 rounded-full px-3 font-body-md text-sm font-bold text-primary underline-offset-4 hover:underline"
          >
            View international pricing ({suggestion})
          </button>
          <button
            type="button"
            onClick={() => setSuggestion(null)}
            aria-label="Dismiss pricing suggestion"
            className="ml-auto grid h-11 w-11 place-items-center rounded-full text-on-surface-variant hover:text-primary"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-lg">
              close
            </span>
          </button>
        </div>
      )}
    </section>
  );
}

function CurrencySelector({
  currency,
  onCurrency,
}: {
  currency: CurrencyCode;
  onCurrency: (c: CurrencyCode) => void;
}) {
  const meta = currencyMeta[currency];
  return (
    <div className="min-w-0 md:text-right">
      <div
        role="radiogroup"
        aria-label="Select pricing currency"
        className="segmented w-full max-w-xs md:w-auto"
      >
        {CURRENCIES.map((code) => {
          const isActive = code === currency;
          return (
            <button
              key={code}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onCurrency(code)}
              className={`min-h-11 flex-1 rounded-full px-4 font-body-md text-sm font-semibold transition-all duration-300 md:flex-none ${
                isActive
                  ? "bg-primary text-on-primary shadow-[0_8px_20px_-8px_rgba(99,14,212,0.6)]"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {code}
            </button>
          );
        })}
      </div>
      <p className="mt-2 font-body-md text-xs text-on-surface-variant sm:text-sm">
        <span className="font-bold text-primary">{meta.market}</span> — {meta.note}
      </p>
    </div>
  );
}

/* -------------------------------------------------------- service selector */

function ServiceSelector({
  active,
  onSelect,
}: {
  active: Service;
  onSelect: (id: ServiceId) => void;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = services.findIndex((s) => s.id === active.id);
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % services.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      nextIndex = (index - 1 + services.length) % services.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = services.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const next = services[nextIndex]!;
    onSelect(next.id);
    refs.current[next.id]?.focus();
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-4 pt-6 sm:px-8">
      <div
        role="tablist"
        aria-label="Choose a service"
        onKeyDown={onKeyDown}
        className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {services.map((s) => {
          const isActive = s.id === active.id;
          return (
            <button
              key={s.id}
              ref={(el) => {
                refs.current[s.id] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${s.id}`}
              aria-selected={isActive}
              aria-controls="pricing-plans"
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(s.id)}
              className={`snap-start inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-3 font-body-md text-sm font-medium transition-all duration-300 sm:px-5 sm:text-base ${
                isActive
                  ? "btn-primary scale-[1.02] shadow-[0_10px_30px_-10px_rgba(99,14,212,0.5)]"
                  : "glass-panel text-on-surface-variant hover:-translate-y-0.5 hover:text-primary"
              }`}
            >
              <span aria-hidden="true" className="material-symbols-outlined text-base">
                {s.icon}
              </span>
              <span className="whitespace-nowrap">{s.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- plan cards */

function PlanCards({ service, currency }: { service: Service; currency: CurrencyCode }) {
  return (
    <section
      id="pricing-plans"
      role="tabpanel"
      aria-labelledby={`tab-${service.id}`}
      className="mx-auto w-full max-w-6xl px-5 pb-8 pt-6 sm:px-8"
    >
      <div key={service.id} className="price-swap">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <h2 className="font-headline-md text-xl text-on-background sm:text-2xl">
              {service.headline}
            </h2>
            <p className="mt-2 font-body-md text-sm text-on-surface-variant sm:text-base">
              {service.intro}
            </p>
          </div>
          <p className="font-label-caps text-label-caps uppercase text-on-surface-variant">
            {currencyMeta[currency].market}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {service.plans.map((plan, i) => (
            <PlanCard
              key={`${service.id}-${plan.id}`}
              plan={plan}
              serviceId={service.id}
              currency={currency}
              index={i}
            />
          ))}
        </div>

        <p className="mt-6 font-body-md text-xs text-on-surface-variant sm:text-sm">
          All prices are starting points and exclude third-party costs such as domain, hosting,
          premium fonts or paid integrations. Final pricing is confirmed in writing after we agree
          the scope.
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  serviceId,
  currency,
  index,
}: {
  plan: Plan;
  serviceId: ServiceId;
  currency: CurrencyCode;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `${serviceId}-${plan.id}-details`;
  const price = useMemo(() => resolvePrice(plan, currency), [plan, currency]);
  const featured = plan.id === "professional";
  const isBusiness = plan.id === "business";

  return (
    <article
      className="page-enter h-full min-w-0"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`glass-card relative flex h-full flex-col rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 sm:p-8 ${
          featured
            ? "plan-card-featured lg:-mt-4 lg:pb-10"
            : isBusiness
              ? "ring-1 ring-primary/25"
              : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {featured && (
            <span className="font-label-caps text-label-caps rounded-full bg-primary px-3 py-1.5 uppercase text-on-primary">
              Recommended
            </span>
          )}
          {isBusiness && (
            <span className="font-label-caps text-label-caps rounded-full border border-primary/30 px-3 py-1.5 uppercase text-primary">
              Most complete
            </span>
          )}
          {price.discountPercent !== null && (
            <span className="font-label-caps text-label-caps rounded-full bg-secondary-container px-3 py-1.5 uppercase text-on-secondary-container">
              Launch offer — {price.discountPercent}% off
            </span>
          )}
        </div>

        <h3 className="mt-5 font-headline-md text-xl font-bold text-on-background sm:text-2xl">
          {plan.name}
        </h3>
        <p className="font-body-md text-xs uppercase tracking-widest text-primary">{plan.tagline}</p>
        <p className="mt-3 font-body-md text-sm text-on-surface-variant">{plan.blurb}</p>

        <div key={`${currency}-${plan.id}`} className="price-swap mt-6">
          {price.kind === "quoted" ? (
            <>
              <p className="font-headline-md text-xl font-extrabold text-primary sm:text-2xl">
                Quoted on requirements
              </p>
              <p className="mt-1 font-body-md text-sm text-on-surface-variant">
                Monthly maintenance fee — quoted based on requirements
              </p>
            </>
          ) : price.kind === "free" ? (
            <>
              <p className="font-headline-md text-xl font-extrabold text-primary sm:text-2xl">
                No recurring fee
              </p>
              <p className="mt-1 font-body-md text-sm text-on-surface-variant">
                You manage hosting and updates
              </p>
            </>
          ) : (
            <>
              <p className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                Starts from
              </p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {price.original && (
                  <span className="font-body-md text-base text-on-surface-variant line-through">
                    {price.original}
                  </span>
                )}
                <span className="font-display-xl-mobile text-2xl font-extrabold text-primary sm:text-3xl">
                  {price.final}
                </span>
                <span className="font-body-md text-sm text-on-surface-variant">
                  {price.cadenceLabel}
                </span>
              </div>
            </>
          )}
          <p className="mt-2 inline-flex items-center gap-2 font-body-md text-xs text-on-surface-variant">
            <span aria-hidden="true" className="material-symbols-outlined text-sm text-primary">
              schedule
            </span>
            {plan.timeline}
          </p>
        </div>

        <ul className="mt-6 grow space-y-3 border-t border-outline-variant/50 pt-6">
          {plan.highlights.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary"
              >
                check_circle
              </span>
              <span className="min-w-0 font-body-md text-sm text-on-surface-variant">{f}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="mt-6 inline-flex min-h-11 items-center justify-between gap-2 rounded-xl px-1 text-left font-body-md text-sm font-semibold text-primary"
        >
          {open ? "Hide details" : "Who this is for"}
          <span
            aria-hidden="true"
            className={`material-symbols-outlined text-base transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            expand_more
          </span>
        </button>
        <div id={panelId} className={`faq-panel ${open ? "faq-panel-open" : ""}`}>
          <div className="min-h-0 overflow-hidden">
            <p className="pb-2 font-body-md text-sm text-on-surface-variant">{plan.bestFor}</p>
          </div>
        </div>

        <Link
          to="/contact"
          search={{ service: serviceId, plan: plan.id as PlanId, currency }}
          className={`mt-6 min-h-12 w-full ${
            featured ? "btn-primary" : "btn-secondary text-on-surface"
          } !py-3 font-body-md font-medium`}
        >
          Get started
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------ comparison */

function Comparison({ service, currency }: { service: Service; currency: CurrencyCode }) {
  const planNames = service.plans;

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      <SectionHeading
        eyebrow="Compare"
        title={`What's included — ${service.label}`}
        intro="The same features, side by side, so you can see exactly where each plan stops."
      />

      {/* Desktop / tablet matrix */}
      <Reveal className="hidden overflow-hidden rounded-3xl glass-card md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Feature comparison for {service.label} plans, {currencyMeta[currency].market}
          </caption>
          <thead>
            <tr className="border-b border-outline-variant/60">
              <th scope="col" className="px-6 py-5 font-label-caps text-label-caps uppercase text-on-surface-variant">
                Feature
              </th>
              {planNames.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={`px-6 py-5 font-headline-md text-base ${
                    p.id === "professional" ? "text-primary" : "text-on-background"
                  }`}
                >
                  {p.name}
                  {p.id === "professional" && (
                    <span className="ml-2 font-label-caps text-label-caps uppercase text-primary">
                      · Recommended
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {service.comparison.map((row) => (
              <tr key={row.feature} className="border-b border-outline-variant/40 last:border-0">
                <th scope="row" className="px-6 py-4 font-body-md text-sm font-medium text-on-background">
                  {row.feature}
                </th>
                {planNames.map((p) => (
                  <td key={p.id} className="px-6 py-4 font-body-md text-sm text-on-surface-variant">
                    <Cell value={row.values[p.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* Mobile: expandable per-plan lists */}
      <div className="space-y-4 md:hidden">
        {planNames.map((p) => (
          <MobileComparison key={p.id} service={service} planId={p.id} planName={p.name} />
        ))}
      </div>
    </section>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <span className="inline-flex items-center gap-2 text-primary">
        <span aria-hidden="true" className="material-symbols-outlined text-base">
          check_circle
        </span>
        <span className="sr-only">Included</span>
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center gap-2 text-on-surface-variant/60">
        <span aria-hidden="true" className="material-symbols-outlined text-base">
          remove
        </span>
        <span className="sr-only">Not included</span>
      </span>
    );
  return <span>{value}</span>;
}

function MobileComparison({
  service,
  planId,
  planName,
}: {
  service: Service;
  planId: PlanId;
  planName: string;
}) {
  const [open, setOpen] = useState(planId === "professional");
  const uid = useId();
  const panelId = `${uid}-${planId}`;

  return (
    <div className="overflow-hidden rounded-2xl glass-card">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="min-w-0">
          <span className="font-headline-md text-base font-bold text-on-background">{planName}</span>
          {planId === "professional" && (
            <span className="ml-2 font-label-caps text-label-caps uppercase text-primary">
              Recommended
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className={`material-symbols-outlined shrink-0 text-primary transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>
      <div id={panelId} className={`faq-panel ${open ? "faq-panel-open" : ""}`}>
        <div className="min-h-0 overflow-hidden">
          <ul className="space-y-3 px-5 pb-5">
            {service.comparison.map((row) => (
              <li
                key={row.feature}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-outline-variant/40 pb-3 last:border-0"
              >
                <span className="min-w-0 font-body-md text-sm text-on-background">
                  {row.feature}
                </span>
                <span className="text-right font-body-md text-sm text-on-surface-variant">
                  <Cell value={row.values[planId]} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- payment model */

function PaymentModel() {
  return (
    <section className="w-full bg-surface-container-low/60 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Payment model"
          title="25% to start. The rest only once the work is done."
          intro="No hourly surprises, and no paying in full before you have seen the finished project."
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paymentSteps.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 60} className="min-w-0">
              <div className="glass-card flex h-full flex-col rounded-2xl p-6">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <span aria-hidden="true" className="material-symbols-outlined text-xl">
                      {step.icon}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                      Step {step.step}
                    </span>
                    <span className="block truncate font-headline-md text-base font-bold text-on-background">
                      {step.title}
                    </span>
                  </span>
                </div>
                <p className="mt-4 font-body-md text-sm text-on-surface-variant">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- policy strip */

function PolicyStrip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <div className="glass-card h-full rounded-3xl p-7 sm:p-9">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <span aria-hidden="true" className="material-symbols-outlined text-2xl">
                verified
              </span>
            </span>
            <h2 className="mt-5 font-headline-md text-xl text-on-background sm:text-2xl">
              7-day satisfaction window
            </h2>
            <p className="mt-4 font-body-md text-sm text-on-surface-variant sm:text-base">
              If the completed project does not reasonably meet the previously agreed project scope
              and requirements, you may request a 50% refund within 7 days of project completion.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "The window applies to the agreed scope and requirements — it is not an unconditional change-of-mind refund.",
                "Requests are assessed against the written scope agreed before work began.",
                "New requirements added after sign-off are treated as additional scope, not a shortfall.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary"
                  >
                    check_small
                  </span>
                  <span className="min-w-0 font-body-md text-sm text-on-surface-variant">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80} className="min-w-0">
          <div className="glass-card h-full rounded-3xl p-7 sm:p-9">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <span aria-hidden="true" className="material-symbols-outlined text-2xl">
                gavel
              </span>
            </span>
            <h2 className="mt-5 font-headline-md text-xl text-on-background sm:text-2xl">
              Project cancellation
            </h2>
            <p className="mt-4 font-body-md text-sm text-on-surface-variant sm:text-base">
              If you decide to terminate the project after work has started, a total amount
              equivalent to 50% of the agreed project price is payable as the project cancellation
              settlement.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "Amounts already paid — including the 25% advance — count toward that settlement.",
                "Work completed up to the cancellation date is handed over to you.",
                "Cancelling before work starts means only the advance is affected, in line with the agreement.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary"
                  >
                    check_small
                  </span>
                  <span className="min-w-0 font-body-md text-sm text-on-surface-variant">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-body-md text-xs text-on-surface-variant">
              Full terms are set out in your project agreement and our{" "}
              <Link to="/terms" className="font-bold text-primary hover:text-secondary">
                terms of service
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- maintenance */

const maintenanceOptions = [
  {
    id: "self",
    title: "Self managed",
    subtitle: "No recurring fee",
    icon: "person",
    body: "You keep full control after handover and look after the site in-house.",
    points: [
      "You manage hosting",
      "You manage deployment",
      "You manage website maintenance",
      "You manage future updates",
      "No Fakhar Labs recurring maintenance fee",
    ],
  },
  {
    id: "managed",
    title: "Fakhar Labs managed",
    subtitle: "First 2 months free",
    icon: "shield_person",
    body: "We handle deployment and keep an eye on the site so you don't have to.",
    points: [
      "Deployment and release handling",
      "Monitoring where applicable",
      "Backend / service monitoring",
      "Minor fixes and technical maintenance",
      "Small website updates where included",
      "Deployment support when you need it",
    ],
  },
];

function Maintenance() {
  return (
    <section className="w-full bg-surface-container-low/60 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="After launch"
          title="Two ways to run your site once it's live"
          intro="Maintenance is a choice, not a lock-in. Both options start from the same handover."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {maintenanceOptions.map((option, i) => (
            <Reveal key={option.id} delay={i * 80} className="min-w-0">
              <div
                className={`glass-card flex h-full flex-col rounded-3xl p-7 sm:p-9 ${
                  option.id === "managed" ? "ring-1 ring-primary/30" : ""
                }`}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <span aria-hidden="true" className="material-symbols-outlined text-2xl">
                      {option.icon}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <h3 className="truncate font-headline-md text-lg font-bold text-on-background sm:text-xl">
                      {option.title}
                    </h3>
                    <span className="font-label-caps text-label-caps uppercase text-primary">
                      {option.subtitle}
                    </span>
                  </span>
                </div>
                <p className="mt-5 font-body-md text-sm text-on-surface-variant sm:text-base">
                  {option.body}
                </p>
                <ul className="mt-5 grow space-y-3 border-t border-outline-variant/50 pt-5">
                  {option.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary"
                      >
                        check_circle
                      </span>
                      <span className="min-w-0 font-body-md text-sm text-on-surface-variant">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                {option.id === "managed" && (
                  <p className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 font-body-md text-sm text-on-surface-variant">
                    After the first 2 months, a recurring monthly maintenance fee applies —{" "}
                    <strong className="text-on-background">
                      quoted based on requirements
                    </strong>
                    . Major new features, redesigns and substantial changes are separate projects.
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ faqs */

function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 md:py-20">
      <SectionHeading
        eyebrow="Questions"
        title="Pricing, hosting and the small print"
        intro="Including the one everybody asks about serverless costs."
        align="center"
      />
      <div className="divide-y divide-outline-variant/50 overflow-hidden rounded-2xl glass-card">
        {pricingFaqs.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${uid}-faq-${i}`;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-5 text-left font-headline-md text-base font-bold text-on-background transition-colors hover:text-primary sm:px-7 sm:text-lg"
                >
                  <span className="min-w-0">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`material-symbols-outlined shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
              </h3>
              <div id={panelId} className={`faq-panel ${isOpen ? "faq-panel-open" : ""}`}>
                <div className="min-h-0 overflow-hidden">
                  <p className="px-5 pb-6 font-body-md text-sm text-on-surface-variant sm:px-7 sm:text-base">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- final cta */

function FinalCta({ service, currency }: { service: Service; currency: CurrencyCode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
      <Reveal>
        <div className="glass-card rounded-3xl p-8 text-center sm:p-12">
          <h2 className="font-headline-lg text-2xl text-on-background sm:text-3xl">
            Tell us the scope — we'll send a proper quote.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body-md text-base text-on-surface-variant">
            Share what you need and we'll confirm pricing in writing, in your currency, before any
            work begins.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              search={{ service: service.id, currency }}
              className="btn-primary min-h-12 w-full !py-3.5 sm:w-auto"
            >
              Start a project
              <span aria-hidden="true" className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
            <WhatsAppLinkButton
              message={`Hi Fakhar Labs — I'd like a quote for ${service.label} (${currency}).`}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
