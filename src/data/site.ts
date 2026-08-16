/**
 * Single source of truth for public-website content.
 * Copy here is presentation content written for Fakhar Labs — it deliberately
 * avoids invented client metrics, testimonials or awards.
 */

export type ServiceItem = {
  slug: string;
  name: string;
  icon: string;
  intro: string;
  capabilities: string[];
  bestFor: string;
  to: string;
};

export const services: ServiceItem[] = [
  {
    slug: "development",
    name: "Website Development",
    icon: "code_blocks",
    intro: "Custom websites built around your business, audience and goals.",
    capabilities: [
      "Custom UI/UX design",
      "Responsive front-end development",
      "SEO-ready page structure",
      "Performance optimisation",
      "Forms, booking and integrations",
      "Deployment and handover",
    ],
    bestFor: "Businesses that have outgrown a template and need a site built around how they actually sell.",
    to: "/services/web-development",
  },
  {
    slug: "redesign",
    name: "Website Redesign",
    icon: "autorenew",
    intro: "Rebuild an ageing site into something fast, clear and current.",
    capabilities: [
      "UX and content audit",
      "Information architecture rework",
      "Visual identity refresh",
      "Mobile-first rebuild",
      "URL and SEO preservation",
      "Staged migration and launch",
    ],
    bestFor: "Sites that still work but look dated, load slowly or confuse visitors on mobile.",
    to: "/services/website-redesign",
  },
  {
    slug: "landing",
    name: "Landing Pages",
    icon: "rocket_launch",
    intro: "Focused single-purpose pages built to convert one specific audience.",
    capabilities: [
      "Offer and message framing",
      "Conversion-led layout",
      "Fast, lightweight build",
      "Form and CRM wiring",
      "Analytics and event tracking",
      "A/B ready structure",
    ],
    bestFor: "Campaigns, launches and paid traffic where every visit has a cost.",
    to: "/services/landing-pages",
  },
  {
    slug: "seo",
    name: "SEO",
    icon: "trending_up",
    intro: "Technical and on-page foundations so the right people can find you.",
    capabilities: [
      "Technical SEO audit",
      "Core Web Vitals work",
      "Semantic markup and metadata",
      "Structured data (JSON-LD)",
      "Content structure and internal links",
      "Search Console setup",
    ],
    bestFor: "Businesses relying on organic discovery rather than paid ads alone.",
    to: "/services/seo-performance",
  },
  {
    slug: "maintenance",
    name: "Website Maintenance",
    icon: "shield_person",
    intro: "Ongoing care so your site stays fast, secure and current after launch.",
    capabilities: [
      "Dependency and security updates",
      "Uptime and error monitoring",
      "Content and page updates",
      "Backups and rollback plan",
      "Monthly performance review",
      "Priority support window",
    ],
    bestFor: "Teams without an in-house developer who still want the site looked after.",
    to: "/contact",
  },
  {
    slug: "custom",
    name: "Custom Web Solutions",
    icon: "workspaces",
    intro: "Bespoke tools, portals and integrations when off-the-shelf will not do.",
    capabilities: [
      "Client portals and dashboards",
      "Authentication and roles",
      "Database design",
      "Third-party API integration",
      "Automated workflows",
      "Admin tooling",
    ],
    bestFor: "Businesses whose process is the product and needs software shaped around it.",
    to: "/contact",
  },
];

export type ExpandItem = {
  id: string;
  title: string;
  icon: string;
  intro: string;
  points: string[];
  footnote?: string;
};

export const whyChooseUs: ExpandItem[] = [
  {
    id: "custom",
    title: "Custom, Not Generic",
    icon: "draw",
    intro:
      "Your website is designed around your business instead of forcing your brand into a pre-built template.",
    points: [
      "Layouts follow your sales conversation, not a theme demo",
      "Copy structure written for your audience",
      "No unused page builder bloat shipped to visitors",
    ],
  },
  {
    id: "mobile",
    title: "Mobile First",
    icon: "smartphone",
    intro: "Most visitors arrive on a phone, so the phone layout is designed first — not squeezed in later.",
    points: [
      "Designed from 320px upward",
      "Thumb-reachable actions and 44px targets",
      "No horizontal scrolling or clipped text",
    ],
  },
  {
    id: "performance",
    title: "Performance Focused",
    icon: "speed",
    intro: "Speed is part of the design brief. Slow pages lose people before your message lands.",
    points: [
      "Lazy loading and async image decoding",
      "Explicit dimensions to prevent layout shift",
      "GPU-friendly, restrained animation",
    ],
  },
  {
    id: "seo",
    title: "SEO Ready",
    icon: "search",
    intro: "Search visibility is built into the markup rather than bolted on after launch.",
    points: [
      "Semantic headings and landmarks",
      "Per-page titles, descriptions and social cards",
      "Structured data where it applies",
    ],
  },
  {
    id: "tech",
    title: "Modern Technology",
    icon: "bolt",
    intro: "We build on a current, well-supported stack so your site is maintainable years from now.",
    points: [
      "React and TypeScript front-end",
      "Serverless deployment",
      "Type-safe data access",
    ],
  },
  {
    id: "ownership",
    title: "Flexible Ownership",
    icon: "key",
    intro: "You own the code, the content and the accounts. Nothing is locked behind our door.",
    points: [
      "Full source handover",
      "Your hosting, domain and database accounts",
      "Documentation so another developer can continue",
    ],
  },
];

export const whatWeBuild: ExpandItem[] = [
  {
    id: "business",
    title: "Business Websites",
    icon: "domain",
    intro: "A clear, credible home for your company that explains what you do and why it matters.",
    points: ["Company and team pages", "Service architecture", "Enquiry routing", "Content ready to grow"],
  },
  {
    id: "service",
    title: "Service Websites",
    icon: "handyman",
    intro: "Multi-service sites where each offering gets the space to sell itself properly.",
    points: ["Dedicated service pages", "Pricing presentation", "Coverage and areas served", "Cross-links to related work"],
  },
  {
    id: "landing",
    title: "Landing Pages",
    icon: "rocket_launch",
    intro: "One page, one audience, one action — stripped of anything that distracts from it.",
    points: ["Single conversion goal", "Fast first paint", "Tracking wired in", "Iteration-friendly sections"],
  },
  {
    id: "booking",
    title: "Booking Websites",
    icon: "event_available",
    intro: "Sites where the appointment is the product, so booking is never more than a tap away.",
    points: ["Persistent booking action", "Calendar or form based flows", "Confirmation experience", "Mobile-first steps"],
  },
  {
    id: "leadgen",
    title: "Lead Generation Websites",
    icon: "campaign",
    intro: "Structured to qualify enquiries before they reach your inbox.",
    points: ["Progressive forms", "Qualifying questions", "Spam-resistant submission", "Lead capture into your admin"],
  },
  {
    id: "apps",
    title: "Custom Web Applications",
    icon: "dashboard_customize",
    intro: "When the website needs to do real work — accounts, data, dashboards and workflows.",
    points: ["Authentication and roles", "Database-backed records", "Admin dashboards", "Third-party integrations"],
  },
];

export const processSteps: ExpandItem[] = [
  {
    id: "discover",
    title: "Discover",
    icon: "explore",
    intro:
      "We learn about your business, audience, goals and requirements before writing a single line of code.",
    points: ["Business goals", "Target audience", "Competitor review", "Project requirements"],
  },
  {
    id: "plan",
    title: "Plan",
    icon: "map",
    intro: "We agree the shape of the project — pages, priorities, timeline and what success looks like.",
    points: ["Sitemap and page list", "Content responsibilities", "Milestones and timeline", "Scope written down"],
  },
  {
    id: "design",
    title: "Design",
    icon: "brush",
    intro: "Interfaces are designed mobile-first, in your brand, with real content rather than filler.",
    points: ["Design direction", "Key page layouts", "Component system", "Review and refinement"],
  },
  {
    id: "develop",
    title: "Develop",
    icon: "code",
    intro: "Design becomes a fast, accessible, type-safe build you can extend later.",
    points: ["Component build", "Responsive implementation", "Forms and integrations", "Content population"],
  },
  {
    id: "test",
    title: "Test",
    icon: "fact_check",
    intro: "Every page is checked across breakpoints, browsers and assistive technology before launch.",
    points: ["Breakpoint audit 320–1440px", "Keyboard and screen-reader pass", "Performance checks", "Form and error handling"],
  },
  {
    id: "launch",
    title: "Launch",
    icon: "rocket",
    intro: "Deployment, domains, analytics and search tooling handled — with a rollback plan in place.",
    points: ["Production deploy", "DNS and SSL", "Analytics and Search Console", "Handover walkthrough"],
  },
  {
    id: "support",
    title: "Support",
    icon: "support_agent",
    intro: "After launch we stay available for updates, improvements and the things you spot in week two.",
    points: ["Update window", "Monitoring", "Content changes", "Ongoing improvements"],
  },
];

export const faqs = [
  {
    q: "How long does a website take?",
    a: "Most business websites take six to twelve weeks from kickoff to launch. Landing pages are usually two to three weeks. The biggest variable is how quickly content and feedback come back.",
  },
  {
    q: "Do I own the website when it's finished?",
    a: "Yes. You own the source code, the content and every account involved — hosting, domain and database. We hand over documentation so any developer can continue the work.",
  },
  {
    q: "What do you need from me to start?",
    a: "A conversation about your business and goals, any brand assets you already have, and a nominated person for approvals. We help shape the content if you do not have it written yet.",
  },
  {
    q: "How much does a project cost?",
    a: "Pricing starts from the figures on our pricing page and is confirmed after we understand the scope. You get a fixed quote before any work begins — no hourly surprises.",
  },
  {
    q: "Can you work with my existing website?",
    a: "Often, yes. A redesign can preserve your URLs, content and search history while replacing the design and front-end. We audit first and tell you honestly if a rebuild is the better value.",
  },
  {
    q: "What happens after launch?",
    a: "We include a support window with every project, and offer ongoing maintenance for updates, monitoring and content changes if you would rather not manage it in-house.",
  },
];
