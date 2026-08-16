import dentalImg from "@/assets/case-dental.jpg";
import roastersImg from "@/assets/case-roasters.jpg";
import diningImg from "@/assets/case-dining.jpg";
import legalImg from "@/assets/case-legal.jpg";

/**
 * Portfolio + case study content.
 * Imagery is design mockup work produced by the studio, not client screenshots,
 * and outcomes are described as delivered scope rather than invented metrics.
 */
export type Project = {
  slug: string;
  name: string;
  industry: string;
  type: string;
  image: string;
  short: string;
  stack: string[];
  overview: string;
  challenge: string;
  approach: string;
  design: string;
  development: string;
  features: string[];
  responsive: string;
  performance: string;
  outcome: string[];
  caseStudyTo?: "/work/dental-clinic";
};

export const projects: Project[] = [
  {
    slug: "smile-studio-dental",
    name: "Smile Studio Dental",
    industry: "Healthcare",
    type: "Booking website",
    image: dentalImg,
    short:
      "A calm, trust-first clinic website where booking an appointment is never more than one tap away.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Serverless forms"],
    overview:
      "A multi-treatment dental practice needed a website that reassured nervous patients and made appointment requests effortless on a phone.",
    challenge:
      "The previous site buried treatment information under stock imagery, and the booking action disappeared as soon as a visitor scrolled.",
    approach:
      "We restructured the content around patient questions — what the treatment is, what it costs, what happens on the day — and made booking a persistent action on every screen.",
    design:
      "A soft clinical palette, generous whitespace and photography-led treatment cards. Type sizes were raised for comfortable reading on small screens.",
    development:
      "Component-driven build with accessible form controls, server-validated submissions and per-treatment pages generated from a single content source.",
    features: [
      "Persistent book-appointment action",
      "Treatment pages with plain-language explanations",
      "Accessible enquiry form with inline validation",
      "Team and clinic introduction sections",
      "FAQ addressing nervous-patient concerns",
    ],
    responsive:
      "Designed from 320px upward with thumb-reachable controls, stacked treatment cards and no horizontal scrolling at any breakpoint.",
    performance:
      "Lazy-loaded imagery with explicit dimensions, async decoding and restrained motion keep first paint fast on mobile networks.",
    outcome: [
      "Delivered a responsive booking-focused clinic website",
      "Streamlined enquiry experience with validation and confirmation states",
      "Reusable treatment page template the clinic can extend",
    ],
    caseStudyTo: "/work/dental-clinic",
  },
  {
    slug: "artisan-roasters",
    name: "Artisan Roasters",
    industry: "Retail / Food & Drink",
    type: "Brand and commerce site",
    image: roastersImg,
    short:
      "Brand-led storytelling paired with a lean subscription flow for a specialty coffee roastery.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Headless commerce"],
    overview:
      "A local roastery wanted its online presence to carry the same character as its shop, without turning into a heavy, generic storefront.",
    challenge:
      "Origin stories, roast profiles and subscription options all competed for the same space, leaving visitors unsure where to start.",
    approach:
      "We separated browsing from buying: an editorial layer for the story and roasts, and a short, decisive path for subscribing.",
    design:
      "Warm editorial typography, full-bleed product photography and a restrained palette that lets bag artwork carry the colour.",
    development:
      "Static-first pages with progressive enhancement for cart and subscription steps, and a content model the team updates themselves.",
    features: [
      "Roast catalogue with tasting notes",
      "Three-step subscription selector",
      "Origin and process storytelling sections",
      "Stockist and opening-hours block",
      "Newsletter capture without pop-ups",
    ],
    responsive:
      "Product grids collapse to single-column carousels on small screens with swipe support and preserved aspect ratios.",
    performance:
      "Image-heavy pages use responsive sources, lazy loading and deferred non-critical scripts.",
    outcome: [
      "Delivered a brand-led site with a shortened subscription path",
      "Self-serve content model for roasts and stockists",
      "Consistent design system shared across marketing and shop pages",
    ],
  },
  {
    slug: "lumina-dining",
    name: "Lumina Dining",
    industry: "Hospitality",
    type: "Reservations website",
    image: diningImg,
    short:
      "An editorial menu experience with instant reservations and seasonal content the team edits in-house.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Reservations API"],
    overview:
      "A restaurant group needed a site that sold the room and the menu, then handed guests straight to a reservation.",
    challenge:
      "Menus changed seasonally but lived in PDFs, which were unreadable on phones and invisible to search engines.",
    approach:
      "Menus became structured content — readable, searchable and updatable — with reservation entry points placed at each decision moment.",
    design:
      "Dark-on-light editorial layout, large food photography and a typographic menu treatment that reads like print.",
    development:
      "Structured menu data rendered to accessible markup with schema.org output, plus an embedded reservation flow with graceful fallbacks.",
    features: [
      "Structured, seasonal menu pages",
      "Reservation entry on every section",
      "Private dining and events enquiry",
      "Gallery with lazy-loaded imagery",
      "Location, hours and access details",
    ],
    responsive:
      "Menu sections reflow to single column with sticky category navigation and comfortable line lengths on mobile.",
    performance:
      "Replacing PDF menus with HTML removed large downloads and made every dish indexable.",
    outcome: [
      "Delivered an editorial reservations website with structured menus",
      "Removed PDF dependency for seasonal updates",
      "Search-visible menu content with schema markup",
    ],
  },
  {
    slug: "apex-legal-group",
    name: "Apex Legal Group",
    industry: "Professional Services",
    type: "Lead generation website",
    image: legalImg,
    short:
      "A credibility-first practice site with clear service architecture and enquiry forms that qualify before the first call.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Secure form handling"],
    overview:
      "A legal practice needed to present multiple specialisms clearly and reduce time lost to enquiries outside their remit.",
    challenge:
      "A single generic contact form produced enquiries the team could not act on, and practice areas were hidden three clicks deep.",
    approach:
      "Each practice area received its own page and its own qualifying enquiry path, so context arrives with the enquiry.",
    design:
      "Restrained, confident typography, structured partner profiles and evidence-led layout rather than stock imagery.",
    development:
      "Per-area routing, validated multi-field enquiry forms and privacy-conscious submission handling.",
    features: [
      "Practice area pages with scope and process",
      "Qualifying enquiry forms per area",
      "Partner and team profiles",
      "Plain-language guidance sections",
      "Accessible document and policy pages",
    ],
    responsive:
      "Dense professional content is chunked into collapsible sections on mobile without hiding anything from search engines.",
    performance:
      "Text-first pages, system-friendly fonts and minimal JavaScript keep the site quick on office networks and phones alike.",
    outcome: [
      "Delivered a structured practice website with per-area enquiry routing",
      "Qualifying questions captured before the first conversation",
      "Template the firm can reuse for new practice areas",
    ],
  },
];
