import caseConvertorImg from "@/assets/case-convertor.png";
import dentalParlorImg from "@/assets/dental-parlor.png";
import fitnessArenaImg from "@/assets/fitness-arena-gym.png";
import ironmanGymImg from "@/assets/ironman-gym.png";
import doctorFitnessImg from "@/assets/doctor-fitness.png";
import drAmnaImg from "@/assets/dr-amna.png";
import kidsCareImg from "@/assets/kidscareclinic.png";
import tinyToolKitImg from "@/assets/tiny-tool-kit.png";
import shiftCanvasImg from "@/assets/shift-canvas.png";

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
  /** Optional. Set to "under-construction" to show a warning badge/banner in the UI. */
  status?: "live" | "under-construction";
  /** Optional. Text shown next to the status badge (e.g. the under-construction warning). */
  statusNote?: string;
};

export const projects: Project[] = [
  {
    slug: "kidscareclinic",
    name: "Kids Care Clinic",
    industry: "Healthcare",
    type: "Clinic Platform",
    image: kidsCareImg,
    short:
      "A full-featured pediatric clinic platform with online booking, video consultations, payments and an admin dashboard.",
    stack: ["React", "Tailwind CSS"],
    overview:
      "Built for Dr. Usman Younas, a pediatric specialist in Narowal, this is a complete clinic platform rather than a brochure site. Parents can learn about consultations, vaccination, newborn care and growth monitoring, then book, pay for and even attend appointments online, while the clinic manages everything from a secure admin dashboard.",
    development:
      "A multi-page application with an authentication system, an admin dashboard with full CRUD operations, online appointment booking and status search, a payment gateway and video consultation, all backed by 15+ carefully designed pages.",
    features: [
      "Online appointment booking",
      "Appointment status search: check a booking online at any time",
      "Video consultation for remote visits",
      "Payment gateway for online payments",
      "Authentication system with secure sign-in",
      "Admin dashboard with full CRUD operations",
      "15+ well-designed pages",
      "Service pages: consultations, vaccination, newborn care, growth monitoring",
      "Child-friendly visual design with easy navigation for parents",
      "Contact and location details",
    ],
    responsive: "Fully responsive so parents can book and manage appointments from a phone.",
    url: "https://kidscareclinic-chi.vercel.app",
  },
  {
    slug: "ironman-gym",
    name: "Iron Man Gym",
    industry: "Health & Fitness",
    type: "Gym Website",
    image: ironmanGymImg,
    short:
      "A striking fitness website for a Narowal gym and CrossFit studio, with one-click WhatsApp booking.",
    stack: ["React", "Tailwind CSS"],
    overview:
      "The digital front door for Iron Man Gym & CrossFit Studio, near Liberty Market Roundabout in Narowal. It presents strength training, CrossFit, functional conditioning and dedicated coaching, and turns interest into action with a one-click WhatsApp booking flow.",
    development:
      "Static pages for fast loading, with booking handled by a direct WhatsApp link so there is no server or form to maintain.",
    features: [
      "One-click booking via WhatsApp",
      "Program descriptions: strength, CrossFit and functional conditioning",
      "Dynamic hero sections",
      "Clear membership paths",
      "Local SEO for Narowal searches",
      "Static pages for fast loading",
      "Responsive layout",
    ],
    url: "https://ironman-gym-tau.vercel.app",
  },
  {
    slug: "fitness-arena-gym",
    name: "Fitness Arena Gym",
    industry: "Health & Fitness",
    type: "Gym Website",
    image: fitnessArenaImg,
    short:
      "A high-energy website for a premium G-6 Islamabad gym, with one-click WhatsApp membership inquiries.",
    stack: ["React", "Tailwind CSS"],
    overview:
      "A bold, visual-heavy website for Fitness Arena Gym in Aabpara, G-6 Islamabad, a gym rated 4.9★ on Google. It showcases the facility and lets visitors reach the team for membership in one tap through WhatsApp.",
    development:
      "Static pages with a direct WhatsApp booking link, keeping the site fast and free of backend upkeep.",
    features: [
      "One-click booking and membership inquiry via WhatsApp",
      "Facility showcases",
      "Membership tier breakdowns",
      "Trainer profiles",
      "High-impact imagery",
      "Local SEO for G-6 and Islamabad searches",
      "Static pages for fast loading",
    ],
    url: "https://fitness-arena-gym-alpha.vercel.app",
  },
  {
    slug: "doctor-fitness",
    name: "Doctor Fitness",
    industry: "Health & Fitness",
    type: "Gym Website",
    image: doctorFitnessImg,
    short:
      "A modern gym website for Doctor Fitness Club in Narowal, with one-click WhatsApp booking.",
    stack: ["React", "Tailwind CSS"],
    overview:
      "A next-generation website for Doctor Fitness Club in Narowal, presenting strength and conditioning programs, certified personal coaching, elite equipment and member transformations, with a one-click WhatsApp route to book.",
    development:
      "Static pages with a direct WhatsApp booking link, so visitors reach the team instantly without a form or backend.",
    features: [
      "One-click booking via WhatsApp",
      "Strength and conditioning programs",
      "Certified personal coaching",
      "Equipment and facility highlights",
      "Member transformation showcase",
      "Clean, modern aesthetic",
      "Static pages for fast loading",
    ],
    url: "https://doctor-fitness.vercel.app",
  },
  {
    slug: "dr-amna",
    name: "Dr. Amna",
    industry: "Healthcare",
    type: "Clinic Website",
    image: drAmnaImg,
    short: "A calm, professional website for a physiotherapy clinic in Narowal (under construction).",
    stack: ["React", "Tailwind CSS"],
    status: "under-construction",
    statusNote:
      "This website is currently under construction. Some content and pages may change or be incomplete.",
    overview:
      "A trust-building website for Dr. Amna Physiotherapy Clinic, covering pain relief, injury and sports rehabilitation, stroke and post-surgical recovery, posture and balance, manual therapy and exercise therapy, with a direct line for patient inquiries.",
    development:
      "Static pages with an elegant, evidence-based tone. The site is still being built and refined.",
    features: [
      "Physiotherapy service listings",
      "Detailed professional background",
      "Patient resources",
      "Accessible contact information",
      "Elegant, calming design",
      "Static pages for fast loading",
    ],
    url: "https://dr-amna.vercel.app",
  },
  {
    slug: "tiny-tool-kit",
    name: "Tiny Tool Kit",
    industry: "Web Application",
    type: "Utility",
    image: tinyToolKitImg,
    short:
      "A library of 20+ free everyday web tools in one fast app: no signup, no clutter.",
    stack: ["React", "Tailwind CSS"],
    overview:
      "A centralized hub of 20+ small, useful web tools covering all kinds of everyday tasks, so people do not have to hunt across multiple sites. Every tool runs instantly in the browser with nothing to sign up for.",
    development:
      "Each tool runs client-side, so results are instant and nothing needs to be sent to a server.",
    features: [
      "20+ integrated tools of every kind",
      "Includes WhatsApp click-to-chat link generator and message formatter",
      "Instant client-side execution",
      "No signup, free to use",
      "Unified interface across all tools",
      "Responsive design",
    ],
    url: "https://tiny-tool-kit.vercel.app",
  },
  {
    slug: "case-convertor",
    name: "The Case Converter",
    industry: "Web Application",
    type: "Utility",
    image: caseConvertorImg,
    short:
      "A free online tool that converts text into up to 10 case formats instantly.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    overview:
      "A free, fast text utility for writers and developers. Paste text once and convert it to uppercase, lowercase, Title Case, sentence case, camelCase, PascalCase, snake_case and more, with up to 10 formats available for free.",
    development:
      "Conversion runs entirely in the browser, so results appear in real time with no server round trips.",
    features: [
      "Up to 10 case formats, free",
      "Uppercase, lowercase, Title Case, sentence case",
      "camelCase, PascalCase and snake_case for developers",
      "Real-time case conversion",
      "One-click copy, download and share",
      "Character and word count tracking",
      "Responsive clean interface",
    ],
    url: "https://thecaseconverter.online",
  },
  {
    slug: "dental-parlor",
    name: "Dental Parlor",
    industry: "Healthcare",
    type: "Clinic Website",
    image: dentalParlorImg,
    short:
      "A modern, patient-focused website for a G-13 Islamabad dental and implant clinic.",
    stack: ["React", "Tailwind CSS"],
    overview:
      "A clean digital presence for Dental Parlor and Implant Clinic in G-13/3, Islamabad, a clinic rated 4.9★ with 600+ Google reviews. The site reassures patients, explains dental, cosmetic, implant and orthodontic services, and lets them start an appointment inquiry straight from WhatsApp.",
    development:
      "Static pages with a direct WhatsApp appointment link and local SEO for Islamabad dental searches.",
    features: [
      "Direct WhatsApp appointment inquiry",
      "Service overview: dental, cosmetic, implants, orthodontics",
      "Patient testimonials",
      "Clear call-to-actions",
      "Local SEO for G-13 and Islamabad",
      "Mobile-first responsive design",
    ],
    url: "https://dental-parlor.vercel.app",
  },
  {
    slug: "shift-canvas",
    name: "Shift Canvas",
    industry: "Web Application",
    type: "Utility",
    image: shiftCanvasImg,
    short:
      "A private, offline-capable background remover that runs entirely in your browser or on your phone.",
    stack: ["React", "Tailwind CSS"],
    overview:
      "A background remover that works with no server at all. Images are processed on the user's own device, so photos are never uploaded, and it keeps working offline. Everything runs on mobile as well as desktop, and the result downloads as a transparent PNG.",
    development:
      "Fully client-side processing with no server side and no uploads, which makes it fast, private and usable without an internet connection.",
    features: [
      "Remove image backgrounds in seconds",
      "Works offline, no internet needed after loading",
      "No server side: everything runs in the browser",
      "Privacy-focused: images never leave the device",
      "Full functionality on mobile devices",
      "Download transparent PNG",
      "Free, no signup",
    ],
    url: "https://shift-canvas.vercel.app",
  },
];
