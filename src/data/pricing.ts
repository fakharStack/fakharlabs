/**
 * Pricing datasets.
 *
 * Important: PKR and international pricing are SEPARATE market tiers — the
 * currency selector switches datasets, it never converts with an FX rate.
 * All figures are documented starting points ("starts from"), not fixed quotes.
 */

export const CURRENCIES = ["PKR", "USD", "GBP"] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

export const currencyMeta: Record<
  CurrencyCode,
  { code: CurrencyCode; label: string; symbol: string; market: string; note: string }
> = {
  PKR: {
    code: "PKR",
    label: "PKR",
    symbol: "PKR",
    market: "Local pricing",
    note: "Starting points for clients based in Pakistan.",
  },
  USD: {
    code: "USD",
    label: "USD",
    symbol: "$",
    market: "International pricing",
    note: "Starting points for US, Canada, Australia, New Zealand and other international clients.",
  },
  GBP: {
    code: "GBP",
    label: "GBP",
    symbol: "£",
    market: "International pricing",
    note: "Starting points for UK and Europe-based clients.",
  },
};

export const SERVICE_IDS = [
  "development",
  "redesign",
  "landing",
  "webapp",
  "seo",
  "maintenance",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const PLAN_IDS = ["basic", "professional", "business"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export const LAUNCH_DISCOUNT = 0.15;
/** Basic never carries the launch offer. */
export const DISCOUNTED_PLANS: PlanId[] = ["professional", "business"];

export type Price = Record<CurrencyCode, number | null>;

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  blurb: string;
  price: Price;
  cadence: "project" | "month";
  timeline: string;
  highlights: string[];
  bestFor: string;
};

export type Service = {
  id: ServiceId;
  label: string;
  shortLabel: string;
  icon: string;
  headline: string;
  intro: string;
  plans: Plan[];
  /** Feature matrix values keyed by plan. */
  comparison: { feature: string; values: Record<PlanId, string | boolean> }[];
};

const quoted: Price = { PKR: null, USD: null, GBP: null };

export const services: Service[] = [
  {
    id: "development",
    label: "Website Development",
    shortLabel: "Development",
    icon: "code_blocks",
    headline: "Custom websites engineered around how your business actually sells.",
    intro:
      "Designed and built from scratch — no page-builder bloat, no template you have to fight.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        tagline: "Get online properly",
        blurb: "A clean, fast presence for a new or small business.",
        price: { PKR: 30000, USD: 400, GBP: 320 },
        cadence: "project",
        timeline: "2–3 weeks",
        highlights: [
          "Up to 4 pages",
          "Mobile-first responsive build",
          "Contact form into your inbox",
          "SEO foundations & metadata",
          "Deployment support",
        ],
        bestFor: "First real website for a small business or solo practice.",
      },
      {
        id: "professional",
        name: "Professional",
        tagline: "Most chosen",
        blurb: "A complete business website with content structure built to grow.",
        price: { PKR: 45000, USD: 600, GBP: 480 },
        cadence: "project",
        timeline: "3–5 weeks",
        highlights: [
          "Up to 8 pages",
          "Custom UI/UX design pass",
          "Service / landing page architecture",
          "Performance optimisation",
          "Analytics setup",
          "2 revision rounds",
        ],
        bestFor: "Businesses that need the website to bring in enquiries, not just exist.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Complete solution",
        blurb: "A larger site with content management, integrations and deeper support.",
        price: { PKR: 75000, USD: 1000, GBP: 800 },
        cadence: "project",
        timeline: "5–8 weeks",
        highlights: [
          "Up to 15 pages / templates",
          "Content management for your team",
          "Blog or resources section",
          "Integrations (CRM, booking, email)",
          "Advanced SEO structure & schema",
          "3 revision rounds",
        ],
        bestFor: "Established companies with multiple services, locations or content needs.",
      },
    ],
    comparison: [
      { feature: "Responsive design", values: { basic: true, professional: true, business: true } },
      { feature: "Pages included", values: { basic: "Up to 4", professional: "Up to 8", business: "Up to 15" } },
      { feature: "Custom UI/UX design", values: { basic: "Template-led", professional: true, business: true } },
      { feature: "SEO foundations", values: { basic: true, professional: true, business: "Advanced + schema" } },
      { feature: "Contact forms", values: { basic: "1 form", professional: "Multiple forms", business: "Multi-step forms" } },
      { feature: "Integrations", values: { basic: false, professional: "Basic", business: "CRM / booking / email" } },
      { feature: "CMS / content editing", values: { basic: false, professional: false, business: true } },
      { feature: "Performance optimisation", values: { basic: "Baseline", professional: true, business: true } },
      { feature: "Deployment support", values: { basic: true, professional: true, business: true } },
      { feature: "Revision rounds", values: { basic: "1", professional: "2", business: "3" } },
      { feature: "Maintenance option", values: { basic: true, professional: "2 months free", business: "2 months free" } },
    ],
  },
  {
    id: "redesign",
    label: "Website Redesign",
    shortLabel: "Redesign",
    icon: "autorenew",
    headline: "Modernise what you already have — without losing the traffic you earned.",
    intro: "We audit first, then rebuild the experience with your URLs and search history intact.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        tagline: "Visual refresh",
        blurb: "New look on your existing structure.",
        price: { PKR: 25000, USD: 350, GBP: 280 },
        cadence: "project",
        timeline: "2–3 weeks",
        highlights: [
          "Up to 4 pages restyled",
          "Mobile-first responsive pass",
          "Speed clean-up",
          "Existing content reused",
          "Deployment support",
        ],
        bestFor: "Sites that work but look dated.",
      },
      {
        id: "professional",
        name: "Professional",
        tagline: "Most chosen",
        blurb: "Rebuild the structure and the design together.",
        price: { PKR: 40000, USD: 550, GBP: 440 },
        cadence: "project",
        timeline: "3–5 weeks",
        highlights: [
          "UX audit & new site structure",
          "Up to 8 pages redesigned",
          "Content migration",
          "SEO-safe redirect mapping",
          "Performance optimisation",
          "2 revision rounds",
        ],
        bestFor: "Sites losing enquiries to a confusing layout.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Complete rebuild",
        blurb: "A full platform and content transformation.",
        price: { PKR: 65000, USD: 900, GBP: 720 },
        cadence: "project",
        timeline: "5–8 weeks",
        highlights: [
          "Up to 15 pages / templates",
          "Content management for your team",
          "Messaging & content restructure",
          "Integrations rebuilt",
          "Technical SEO recovery plan",
          "3 revision rounds",
        ],
        bestFor: "Larger sites where the whole experience needs rethinking.",
      },
    ],
    comparison: [
      { feature: "Responsive design", values: { basic: true, professional: true, business: true } },
      { feature: "Pages included", values: { basic: "Up to 4", professional: "Up to 8", business: "Up to 15" } },
      { feature: "UX audit", values: { basic: false, professional: true, business: true } },
      { feature: "Custom UI/UX design", values: { basic: "Restyle", professional: true, business: true } },
      { feature: "Content migration", values: { basic: "Reused as-is", professional: true, business: true } },
      { feature: "SEO-safe redirects", values: { basic: false, professional: true, business: true } },
      { feature: "CMS / content editing", values: { basic: false, professional: false, business: true } },
      { feature: "Performance optimisation", values: { basic: "Baseline", professional: true, business: true } },
      { feature: "Deployment support", values: { basic: true, professional: true, business: true } },
      { feature: "Revision rounds", values: { basic: "1", professional: "2", business: "3" } },
    ],
  },
  {
    id: "landing",
    label: "Landing Page",
    shortLabel: "Landing page",
    icon: "rocket_launch",
    headline: "One page, one audience, one clear action.",
    intro: "Built light and fast for campaigns where every visit has a cost.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        tagline: "Single page",
        blurb: "A focused page live in days.",
        price: { PKR: 15000, USD: 150, GBP: 120 },
        cadence: "project",
        timeline: "3–7 days",
        highlights: [
          "Single custom page",
          "Lead form + thank-you state",
          "Mobile-optimised layout",
          "SEO metadata & social card",
          "1 revision round",
        ],
        bestFor: "A quick, credible page for one offer.",
      },
      {
        id: "professional",
        name: "Professional",
        tagline: "Most chosen",
        blurb: "Designed and instrumented to convert.",
        price: { PKR: 25000, USD: 250, GBP: 200 },
        cadence: "project",
        timeline: "1–2 weeks",
        highlights: [
          "Conversion-led layout & copy polish",
          "Custom sections and imagery",
          "Analytics & event tracking",
          "Email / CRM form wiring",
          "Speed optimisation",
          "2 revision rounds",
        ],
        bestFor: "Paid traffic and launch campaigns.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Campaign set",
        blurb: "A small funnel instead of a single page.",
        price: { PKR: 40000, USD: 400, GBP: 320 },
        cadence: "project",
        timeline: "2–3 weeks",
        highlights: [
          "Up to 3 campaign pages",
          "Multi-step or qualifying forms",
          "Variant-ready structure for testing",
          "Integrations & automation hookup",
          "Post-launch tracking review",
          "3 revision rounds",
        ],
        bestFor: "Multi-offer campaigns and lead qualification.",
      },
    ],
    comparison: [
      { feature: "Responsive design", values: { basic: true, professional: true, business: true } },
      { feature: "Pages included", values: { basic: "1", professional: "1 + thank-you", business: "Up to 3" } },
      { feature: "Custom UI/UX design", values: { basic: "Guided layout", professional: true, business: true } },
      { feature: "SEO foundations", values: { basic: true, professional: true, business: true } },
      { feature: "Contact forms", values: { basic: "Simple form", professional: "Tracked form", business: "Multi-step form" } },
      { feature: "Analytics & tracking", values: { basic: false, professional: true, business: true } },
      { feature: "Integrations", values: { basic: false, professional: "Email / CRM", business: "Automation flows" } },
      { feature: "Performance optimisation", values: { basic: "Baseline", professional: true, business: true } },
      { feature: "Revision rounds", values: { basic: "1", professional: "2", business: "3" } },
    ],
  },
  {
    id: "webapp",
    label: "Web Application",
    shortLabel: "Web app",
    icon: "dashboard_customize",
    headline: "When the website has to do real work — accounts, data and dashboards.",
    intro:
      "Scope varies a lot here, so treat these as entry points and expect a tailored quote.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        tagline: "Focused tool",
        blurb: "One core workflow, built properly.",
        price: { PKR: 75000, USD: 800, GBP: 650 },
        cadence: "project",
        timeline: "3–5 weeks",
        highlights: [
          "Single core workflow",
          "Authentication & user accounts",
          "Database-backed records",
          "Responsive app UI",
          "Deployment support",
        ],
        bestFor: "Replacing a spreadsheet or manual process.",
      },
      {
        id: "professional",
        name: "Professional",
        tagline: "Most chosen",
        blurb: "A multi-role application with an admin side.",
        price: { PKR: 120000, USD: 1300, GBP: 1050 },
        cadence: "project",
        timeline: "5–9 weeks",
        highlights: [
          "Multiple workflows",
          "Roles & permissions",
          "Admin dashboard & reporting",
          "Third-party API integrations",
          "File uploads / storage",
          "2 revision rounds",
        ],
        bestFor: "Client portals, booking systems, internal tools.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Complete platform",
        blurb: "A larger platform with automation and deeper support.",
        price: { PKR: 200000, USD: 2000, GBP: 1600 },
        cadence: "project",
        timeline: "8–14 weeks",
        highlights: [
          "Complex, multi-module product",
          "Automated workflows & notifications",
          "Payments or billing integration",
          "Performance & security review",
          "Documentation & team handover",
          "3 revision rounds",
        ],
        bestFor: "Businesses where the software is the product.",
      },
    ],
    comparison: [
      { feature: "Responsive design", values: { basic: true, professional: true, business: true } },
      { feature: "Custom UI/UX design", values: { basic: true, professional: true, business: true } },
      { feature: "Authentication & accounts", values: { basic: true, professional: "Roles & permissions", business: "Advanced access control" } },
      { feature: "Database design", values: { basic: "Single domain", professional: "Multi-entity", business: "Multi-module" } },
      { feature: "Admin dashboard", values: { basic: false, professional: true, business: true } },
      { feature: "Integrations", values: { basic: false, professional: "APIs", business: "APIs + automation" } },
      { feature: "Performance optimisation", values: { basic: "Baseline", professional: true, business: "Reviewed & tuned" } },
      { feature: "Deployment support", values: { basic: true, professional: true, business: true } },
      { feature: "Documentation & handover", values: { basic: "Basic", professional: true, business: "Full" } },
      { feature: "Revision rounds", values: { basic: "1", professional: "2", business: "3" } },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    shortLabel: "SEO",
    icon: "trending_up",
    headline: "Technical and on-page foundations so the right people can find you.",
    intro: "Monthly work, reported honestly — no guaranteed-rankings promises.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        tagline: "Foundations",
        blurb: "Fix the technical basics and get found locally.",
        price: { PKR: 15000, USD: 250, GBP: 200 },
        cadence: "month",
        timeline: "Monthly",
        highlights: [
          "Technical SEO fixes",
          "Keyword & competitor research",
          "On-page optimisation (up to 8 pages)",
          "Google Business Profile setup",
          "Monthly report",
        ],
        bestFor: "Local businesses starting from zero.",
      },
      {
        id: "professional",
        name: "Professional",
        tagline: "Most chosen",
        blurb: "Ongoing content and on-page growth work.",
        price: { PKR: 30000, USD: 450, GBP: 360 },
        cadence: "month",
        timeline: "Monthly",
        highlights: [
          "Everything in Basic",
          "2 optimised articles per month",
          "Internal linking strategy",
          "Structured data (JSON-LD)",
          "Conversion tracking",
          "Monthly strategy call",
        ],
        bestFor: "Businesses competing on search in their city or niche.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Competitive markets",
        blurb: "Higher output for larger sites and tougher keywords.",
        price: { PKR: 50000, USD: 750, GBP: 600 },
        cadence: "month",
        timeline: "Monthly",
        highlights: [
          "Everything in Professional",
          "4+ content pieces per month",
          "Multi-location or multi-service SEO",
          "Crawl & indexation analysis",
          "Landing pages for search intent",
          "Bi-weekly reporting",
        ],
        bestFor: "Larger sites and competitive keyword sets.",
      },
    ],
    comparison: [
      { feature: "Technical SEO fixes", values: { basic: true, professional: true, business: true } },
      { feature: "Pages optimised", values: { basic: "Up to 8", professional: "Up to 20", business: "Site-wide" } },
      { feature: "Keyword research", values: { basic: true, professional: true, business: "Expanded clusters" } },
      { feature: "Content per month", values: { basic: false, professional: "2 articles", business: "4+ pieces" } },
      { feature: "Structured data", values: { basic: false, professional: true, business: true } },
      { feature: "Conversion tracking", values: { basic: false, professional: true, business: true } },
      { feature: "Performance optimisation", values: { basic: "Core Web Vitals check", professional: true, business: true } },
      { feature: "Reporting", values: { basic: "Monthly", professional: "Monthly + call", business: "Bi-weekly" } },
    ],
  },
  {
    id: "maintenance",
    label: "Website Maintenance",
    shortLabel: "Maintenance",
    icon: "shield_person",
    headline: "Keep the site healthy after launch — or manage it yourself.",
    intro:
      "Maintenance is optional. When we manage deployment, the first 2 months are free; after that a monthly fee is quoted based on what your site needs.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        tagline: "Self managed",
        blurb: "You keep hosting, deployment and updates in-house.",
        price: { PKR: 0, USD: 0, GBP: 0 },
        cadence: "month",
        timeline: "No recurring fee",
        highlights: [
          "No recurring fee to Fakhar Labs",
          "Full source code handover",
          "Deployment walkthrough at launch",
          "You own hosting, domain and database accounts",
          "Paid support available on request",
        ],
        bestFor: "Teams with a developer who can look after the site.",
      },
      {
        id: "professional",
        name: "Professional",
        tagline: "Fakhar Labs managed",
        blurb: "We handle deployment, monitoring and small fixes.",
        price: quoted,
        cadence: "month",
        timeline: "First 2 months free",
        highlights: [
          "First 2 months free",
          "Deployment & release handling",
          "Uptime and error monitoring where applicable",
          "Minor fixes and small content updates",
          "Dependency & security updates",
          "Monthly fee quoted after month 2",
        ],
        bestFor: "Businesses without an in-house developer.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Managed + priority",
        blurb: "Closer care for busier, revenue-critical sites.",
        price: quoted,
        cadence: "month",
        timeline: "First 2 months free",
        highlights: [
          "Everything in Fakhar Labs managed",
          "Backend / service monitoring",
          "Priority response window",
          "Included monthly update allowance",
          "Quarterly performance review",
          "Monthly fee quoted after month 2",
        ],
        bestFor: "Sites where downtime costs you enquiries.",
      },
    ],
    comparison: [
      { feature: "Recurring fee", values: { basic: "None", professional: "Quoted after 2 free months", business: "Quoted after 2 free months" } },
      { feature: "Deployment handled by us", values: { basic: false, professional: true, business: true } },
      { feature: "Uptime monitoring", values: { basic: false, professional: true, business: true } },
      { feature: "Backend / service monitoring", values: { basic: false, professional: "Where applicable", business: true } },
      { feature: "Minor fixes", values: { basic: false, professional: true, business: true } },
      { feature: "Small content updates", values: { basic: false, professional: "Included allowance", business: "Larger allowance" } },
      { feature: "Security & dependency updates", values: { basic: false, professional: true, business: true } },
      { feature: "Priority response", values: { basic: false, professional: false, business: true } },
      { feature: "New features / redesigns", values: { basic: "Separate project", professional: "Separate project", business: "Separate project" } },
    ],
  },
];

export function isServiceId(value: unknown): value is ServiceId {
  return typeof value === "string" && (SERVICE_IDS as readonly string[]).includes(value);
}

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === "string" && (CURRENCIES as readonly string[]).includes(value);
}

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && (PLAN_IDS as readonly string[]).includes(value);
}

/** Formats an amount in the selected market currency. */
export function formatPrice(amount: number, currency: CurrencyCode): string {
  const meta = currencyMeta[currency];
  const rounded = Math.round(amount);
  const grouped = rounded.toLocaleString("en-US");
  return currency === "PKR" ? `${meta.symbol} ${grouped}` : `${meta.symbol}${grouped}`;
}

export type ResolvedPrice = {
  kind: "quoted" | "free" | "amount";
  original: string | null;
  final: string | null;
  discountPercent: number | null;
  cadenceLabel: string;
};

/** Resolves a plan's price for a currency, applying the launch offer where it applies. */
export function resolvePrice(plan: Plan, currency: CurrencyCode): ResolvedPrice {
  const cadenceLabel = plan.cadence === "month" ? "per month" : "one-off project";
  const amount = plan.price[currency];

  if (amount === null) {
    return { kind: "quoted", original: null, final: null, discountPercent: null, cadenceLabel };
  }
  if (amount === 0) {
    return { kind: "free", original: null, final: null, discountPercent: null, cadenceLabel };
  }

  const discounted = DISCOUNTED_PLANS.includes(plan.id);
  if (!discounted) {
    return {
      kind: "amount",
      original: null,
      final: formatPrice(amount, currency),
      discountPercent: null,
      cadenceLabel,
    };
  }

  const final = amount * (1 - LAUNCH_DISCOUNT);
  return {
    kind: "amount",
    original: formatPrice(amount, currency),
    final: formatPrice(final, currency),
    discountPercent: Math.round(LAUNCH_DISCOUNT * 100),
    cadenceLabel,
  };
}

export const paymentSteps = [
  {
    step: "01",
    title: "25% advance",
    body: "A 25% advance of the agreed project price is required before work begins. It confirms the scope and reserves your slot in our schedule.",
    icon: "payments",
  },
  {
    step: "02",
    title: "Design & development",
    body: "We design and build against the written scope, sharing progress as sections become reviewable.",
    icon: "design_services",
  },
  {
    step: "03",
    title: "Review & revisions",
    body: "You review the work and we apply the revision rounds included in your plan.",
    icon: "rate_review",
  },
  {
    step: "04",
    title: "Completion",
    body: "The project is completed against the agreed scope and prepared for launch.",
    icon: "task_alt",
  },
  {
    step: "05",
    title: "Remaining payment",
    body: "The remaining 75% becomes payable once the project is complete — after you have reviewed the finished work.",
    icon: "receipt_long",
  },
  {
    step: "06",
    title: "Deployment & launch",
    body: "We deploy, connect your domain, hand over accounts and walk you through everything.",
    icon: "rocket_launch",
  },
];

export const pricingFaqs = [
  {
    q: "Are my websites serverless?",
    a: "Where it makes sense, yes. We use modern serverless architecture, so there is usually no traditional always-running server to rent and manage. That keeps things simpler and cheaper to run — but serverless does not mean everything is permanently free. Running costs can still include your domain, hosting or platform usage, database usage, API usage, storage, high traffic volumes and any third-party services you choose. We tell you which of these apply before launch.",
  },
  {
    q: "Why is the price shown as “starts from”?",
    a: "Because the final figure depends on scope — number of pages, design complexity, integrations and content. The starting price is a genuine entry point for that plan. After a short conversation you get a written quote before any work begins.",
  },
  {
    q: "Why do local and international prices differ?",
    a: "They are separate pricing tiers rather than a currency conversion. International projects typically involve different budgets, market expectations and support arrangements, so they are quoted on their own tier. You can switch tiers with the currency selector at any time.",
  },
  {
    q: "What does the 25% advance cover?",
    a: "It confirms the scope and reserves the project slot. The remaining 75% is only payable once the project is complete and you have reviewed the finished work — you never pay the full amount before seeing anything.",
  },
  {
    q: "What if I need to cancel the project?",
    a: "If you decide to terminate the project after work has started, a total amount equivalent to 50% of the agreed project price is payable as the project cancellation settlement. Anything you have already paid counts toward that amount.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. You own the source code, the content and every account involved — hosting, domain and database. We hand over documentation so any developer can continue the work.",
  },
  {
    q: "Do you charge for hosting?",
    a: "No. Hosting and platform accounts stay in your name and you pay those providers directly, so there is no markup from us. If you choose Fakhar Labs-managed maintenance, that is a separate monthly fee quoted based on requirements.",
  },
];
