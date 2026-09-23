import placeholderImg from "@/assets/project-placeholder.png";

/**
 * Portfolio + case study content.
 * All project content is centralized here.
 */
export type Project = {
  slug: string;
  name: string;
  industry: string;
  type: string;
  image: string;
  short: string;
  stack: string[];
  overview?: string;
  challenge?: string;
  approach?: string;
  design?: string;
  development?: string;
  features: string[];
  responsive?: string;
  performance?: string;
  outcome?: string[];
  caseStudyTo?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "case-convertor",
    name: "CaseConvertor",
    industry: "Web Application",
    type: "Utility",
    image: placeholderImg,
    short: "A fast, client-side utility for instantly converting text between various casings.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    overview: "A lightweight developer and writer utility designed to format text instantly without server roundtrips.",
    features: [
      "Real-time case conversion",
      "One-click copy to clipboard",
      "Character and word count tracking",
      "Responsive clean interface"
    ],
    url: "https://caseconvertor-wine.vercel.app"
  },
  {
    slug: "dental-parlor",
    name: "Dental Parlor",
    industry: "Healthcare",
    type: "Clinic Website",
    image: placeholderImg,
    short: "A modern, patient-focused clinic website built to build trust and streamline appointments.",
    stack: ["React", "Tailwind CSS"],
    overview: "A clean digital presence for a dental clinic, prioritizing patient reassurance and easy access to service information.",
    features: [
      "Service overview sections",
      "Patient testimonials",
      "Clear call-to-actions",
      "Mobile-first responsive design"
    ],
    url: "https://dental-parlor.vercel.app"
  },
  {
    slug: "fitness-arena-gym",
    name: "Fitness Arena Gym",
    industry: "Health & Fitness",
    type: "Gym Website",
    image: placeholderImg,
    short: "A high-energy promotional site for a fitness center to showcase facilities and attract members.",
    stack: ["React", "Tailwind CSS"],
    overview: "A bold, visual-heavy website designed to capture the energy of the gym and guide visitors toward membership.",
    features: [
      "Facility showcases",
      "Membership tier breakdowns",
      "Trainer profiles",
      "High-impact imagery"
    ],
    url: "https://fitness-arena-gym-alpha.vercel.app"
  },
  {
    slug: "ironman-gym",
    name: "Iron Man Gym",
    industry: "Health & Fitness",
    type: "Gym Website",
    image: placeholderImg,
    short: "A striking fitness platform highlighting training programs and motivating prospective members.",
    stack: ["React", "Tailwind CSS"],
    overview: "Designed to convey strength and motivation, this site serves as the digital front door for a local gym.",
    features: [
      "Program descriptions",
      "Dynamic hero sections",
      "Clear membership paths",
      "Responsive layout"
    ],
    url: "https://ironman-gym-tau.vercel.app"
  },
  {
    slug: "doctor-fitness",
    name: "Doctor Fitness",
    industry: "Healthcare",
    type: "Professional Portfolio",
    image: placeholderImg,
    short: "A personal brand website bridging medical expertise and fitness coaching.",
    stack: ["React", "Tailwind CSS"],
    overview: "A platform establishing authority for a professional who combines healthcare knowledge with fitness training.",
    features: [
      "Service offerings",
      "Professional biography",
      "Consultation booking pathways",
      "Clean aesthetic"
    ],
    url: "https://doctor-fitness.vercel.app"
  },
  {
    slug: "dr-amna",
    name: "Dr. Amna",
    industry: "Healthcare",
    type: "Professional Portfolio",
    image: placeholderImg,
    short: "A professional portfolio and consultation site for a medical practitioner.",
    stack: ["React", "Tailwind CSS"],
    overview: "A trust-building personal website detailing medical expertise, services, and providing a direct line for patient inquiries.",
    features: [
      "Detailed professional background",
      "Service listings",
      "Patient resources",
      "Accessible contact information"
    ],
    url: "https://dr-amna.vercel.app"
  },
  {
    slug: "kidscareclinic",
    name: "Kids Care Clinic",
    industry: "Healthcare",
    type: "Clinic Website",
    image: placeholderImg,
    short: "A welcoming and informative digital practice for pediatric care.",
    stack: ["React", "Tailwind CSS"],
    overview: "Designed to reassure parents, this site provides clear information about pediatric services, clinic hours, and care philosophies.",
    features: [
      "Child-friendly visual design",
      "Service breakdowns",
      "Easy navigation for parents",
      "Contact and location details"
    ],
    url: "https://kidscareclinic-chi.vercel.app"
  },
  {
    slug: "tiny-tool-kit",
    name: "Tiny Tool Kit",
    industry: "Web Application",
    type: "Utility",
    image: placeholderImg,
    short: "A collection of everyday digital tools bundled into a single, fast application.",
    stack: ["React", "Tailwind CSS"],
    overview: "A centralized hub for small, useful web utilities designed for speed and ease of use without navigating multiple sites.",
    features: [
      "Multiple integrated mini-tools",
      "Instant client-side execution",
      "Unified interface",
      "Responsive design"
    ],
    url: "https://tiny-tool-kit.vercel.app"
  },
  {
    slug: "shift-canvas",
    name: "Shift Canvas",
    industry: "Web Application",
    type: "Utility",
    image: placeholderImg,
    short: "A digital canvas interface for creative or organizational workflows.",
    stack: ["React", "Tailwind CSS"],
    overview: "An interactive web application providing users with a flexible space to organize ideas or manage visual tasks.",
    features: [
      "Interactive workspace",
      "Intuitive UI controls",
      "Responsive layout",
      "Fluid user experience"
    ],
    url: "https://shift-canvas.vercel.app"
  }
];
