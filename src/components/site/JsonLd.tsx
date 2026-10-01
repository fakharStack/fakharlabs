/**
 * Reusable JSON-LD structured data component.
 * Renders a <script type="application/ld+json"> tag with the provided schema.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization + WebSite schema for the homepage.
 * Includes sameAs links, contactPoint, and SearchAction.
 *
 * TODO: Replace placeholder values with real information from the owner:
 * - [TODO_FOUNDER_NAME]: Real founder name
 * - [TODO_PHONE]: Real phone/WhatsApp number
 * - [TODO_ADDRESS]: Real business address
 * - Social media URLs
 */
export function OrganizationSchema() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://fakharlabs.online/#organization",
      name: "Fakhar Labs",
      url: "https://fakharlabs.online",
      logo: {
        "@type": "ImageObject",
        url: "https://fakharlabs.online/logo.png",
        width: 512,
        height: 512,
      },
      description:
        "Fakhar Labs is a web development studio that builds fast, modern, SEO-friendly websites for clinics, gyms, schools, and small businesses. We work with React, Next.js, and Tailwind CSS, and deliver full-stack features such as online appointment booking, WhatsApp booking, admin dashboards, and payment gateways. Every project is built mobile-first, tested for speed, and launched with on-page SEO already in place.",
      email: "fakharlabs@gmail.com",
      foundingDate: "2024",
      areaServed: [
        { "@type": "Country", name: "Pakistan" },
        { "@type": "State", name: "Punjab" },
        { "@type": "City", name: "Lahore" },
        { "@type": "City", name: "Gujranwala" },
        { "@type": "City", name: "Narowal" },
        { "@type": "City", name: "Islamabad" },
        { "@type": "City", name: "Faisalabad" },
        { "@type": "City", name: "Karachi" },
        { "@type": "City", name: "Sialkot" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "fakharlabs@gmail.com",
        contactType: "customer service",
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://fakharlabs.online/#website",
      name: "Fakhar Labs",
      url: "https://fakharlabs.online",
      publisher: { "@id": "https://fakharlabs.online/#organization" },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://fakharlabs.online/#business",
      name: "Fakhar Labs",
      url: "https://fakharlabs.online",
      image: "https://fakharlabs.online/logo.png",
      email: "fakharlabs@gmail.com",
      priceRange: "PKR 6,999 - PKR 200,000+",
      areaServed: [
        { "@type": "Country", name: "Pakistan" },
      ],
      serviceType: [
        "Website Development",
        "Website Design",
        "Website Redesign",
        "Landing Page Design",
        "Website Maintenance",
        "Custom Web Applications",
      ],
      parentOrganization: { "@id": "https://fakharlabs.online/#organization" },
    },
  ];

  return <JsonLd data={data} />;
}

/**
 * BreadcrumbList schema for inner pages.
 */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

/**
 * FAQPage schema — only use when FAQ is visibly displayed on the page.
 */
export function FaqSchema({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return <JsonLd data={data} />;
}

/**
 * Service schema for individual service pages.
 */
export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": "https://fakharlabs.online/#organization" },
    areaServed: { "@type": "Country", name: "Pakistan" },
  };

  return <JsonLd data={data} />;
}

/**
 * CreativeWork schema for portfolio projects.
 */
export function ProjectSchema({
  name,
  description,
  url,
  image,
  technologies,
}: {
  name: string;
  description: string;
  url?: string;
  image: string;
  technologies: string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    ...(url ? { url } : {}),
    image,
    creator: { "@id": "https://fakharlabs.online/#organization" },
    about: technologies.map((tech) => ({ "@type": "Thing", name: tech })),
  };

  return <JsonLd data={data} />;
}
