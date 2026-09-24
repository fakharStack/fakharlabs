export type Testimonial = {
    id: string;
    name: string;
    role: string;
    company: string;
    location: string;
    projectType: string;
    initials: string;
    rating: number;
    highlight: string;
    quote: string;
    accentColor: string; // Tailored subtle accent for monogram
  };
  
  export const testimonialsRow1: Testimonial[] = [
    {
      id: "tariq-dental",
      name: "Dr. Tariq Mahmood",
      role: "Clinical Director & Principal Dentist",
      company: "Dental Parlor",
      location: "Lahore, PK",
      projectType: "Clinic Website & Booking",
      initials: "TM",
      rating: 5,
      highlight: "40% more WhatsApp patient inquiries",
      quote:
        "Most agency sites we looked at were packed with stock photos and slow animations. Fakhar Labs built a calm, patient-first site that people genuinely trust. Over 40% of our new patient consultations now come directly through the mobile WhatsApp integration they set up.",
      accentColor: "from-teal-500/20 to-emerald-500/20 text-teal-700 border-teal-200/50",
    },
    {
      id: "hamza-fitness",
      name: "Hamza Malik",
      role: "Founder & Managing Director",
      company: "Fitness Arena Gym",
      location: "Islamabad, PK",
      projectType: "Gym Website & Tiers",
      initials: "HM",
      rating: 5,
      highlight: "Sub-second mobile page loads",
      quote:
        "We needed a website with serious visual energy to showcase our equipment, coaches, and training zones without lagging on smartphones. Fakhar Labs delivered exactly that. Members frequently tell us how easy it was to compare tiers and join.",
      accentColor: "from-purple-500/20 to-indigo-500/20 text-purple-700 border-purple-200/50",
    },
    {
      id: "saad-caseconvertor",
      name: "Saad Rafique",
      role: "Indie Creator & Software Engineer",
      company: "CaseConvertor & Tiny Tool Kit",
      location: "Remote",
      projectType: "High-Speed Web Utility",
      initials: "SR",
      rating: 5,
      highlight: "Zero client-side latency",
      quote:
        "Finding a frontend engineer who writes clean, type-safe React code without dumping 20 bloated libraries is rare. The client-side utility was delivered with clean architecture, zero latency, and comprehensive handover documentation.",
      accentColor: "from-amber-500/20 to-orange-500/20 text-amber-700 border-amber-200/50",
    },
    {
      id: "ayesha-kidscare",
      name: "Ayesha Siddiqui",
      role: "Clinic Administrator",
      company: "Kids Care Clinic",
      location: "Rawalpindi, PK",
      projectType: "Pediatric Practice Site",
      initials: "AS",
      rating: 5,
      highlight: "Drastically cut repetitive inquiries",
      quote:
        "Parents visiting our website are often stressed and need fast answers on doctor schedules and emergency walk-ins. Fakhar Labs designed the site with tremendous clarity — clean phone tap-to-call buttons and an empathetic, reassuring visual aesthetic.",
      accentColor: "from-rose-500/20 to-pink-500/20 text-rose-700 border-rose-200/50",
    },
    {
      id: "zainab-artisan",
      name: "Zainab Tariq",
      role: "Creative Director",
      company: "Artisan Interiors Studio",
      location: "Lahore, PK",
      projectType: "Design Studio & Catalog",
      initials: "ZT",
      rating: 5,
      highlight: "60% reduction in mobile bounce rate",
      quote:
        "Our old WordPress site was painfully slow and broke every time a plugin updated. Fakhar Labs replaced it with a modern custom React build. Our bounce rate dropped instantly, our portfolio images load crisply, and clients constantly compliment the sleek feel.",
      accentColor: "from-amber-600/20 to-yellow-500/20 text-amber-800 border-amber-200/50",
    },
  ];
  
  export const testimonialsRow2: Testimonial[] = [
    {
      id: "amna-physician",
      name: "Dr. Amna Qureshi",
      role: "Consultant Physician",
      company: "Dr. Amna Consultations",
      location: "Karachi, PK",
      projectType: "Professional Medical Portal",
      initials: "AQ",
      rating: 5,
      highlight: "Streamlined consultation bookings",
      quote:
        "As an independent consultant, my website is the primary credential patients check before booking. Fakhar Labs organized my clinic hours, background, and specializations cleanly. The typography is elegant and the mobile booking pathway works without friction.",
      accentColor: "from-emerald-500/20 to-teal-500/20 text-emerald-700 border-emerald-200/50",
    },
    {
      id: "bilal-ironman",
      name: "Bilal Khan",
      role: "Co-owner & Head Coach",
      company: "Iron Man Gym",
      location: "Lahore, PK",
      projectType: "Brand Site & Lead Generation",
      initials: "BK",
      rating: 5,
      highlight: "Clear fixed-quote, zero hidden fees",
      quote:
        "What stood out most was the straightforward communication. No vague hourly billing, no hostage code, no endless back-and-forth. They gave us a fixed timeline, stuck to it, and handed over the full code repository in our GitHub account on launch day.",
      accentColor: "from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-200/50",
    },
    {
      id: "farhan-shiftcanvas",
      name: "Farhan Ahmed",
      role: "Product Lead",
      company: "Shift Canvas",
      location: "Lahore, PK",
      projectType: "Interactive Web Application",
      initials: "FA",
      rating: 5,
      highlight: "Fluid micro-interactions & 60fps UI",
      quote:
        "The UI polish and responsiveness on complex interactions exceeded expectations. It felt like working with a seasoned in-house engineer rather than an external agency. They took ownership of the UI details that matter.",
      accentColor: "from-indigo-500/20 to-violet-500/20 text-indigo-700 border-indigo-200/50",
    },
    {
      id: "rehan-fitness",
      name: "Dr. Rehan Saeed",
      role: "Sports Rehabilitation Specialist",
      company: "Doctor Fitness",
      location: "Islamabad, PK",
      projectType: "Coaching & Health Platform",
      initials: "RS",
      rating: 5,
      highlight: "Doubled client inquiry conversion",
      quote:
        "Combining medical rehabilitation with fitness training is tricky to articulate. Fakhar Labs crafted a layout that clarifies my credentials while keeping the call to action front-and-center. The site is blazing fast and has noticeably boosted our inbound consults.",
      accentColor: "from-violet-500/20 to-fuchsia-500/20 text-violet-700 border-violet-200/50",
    },
    {
      id: "omer-logistics",
      name: "Omer Farooq",
      role: "Operations Director",
      company: "Apex Supply Solutions",
      location: "Karachi, PK",
      projectType: "Corporate Platform & Inquiries",
      initials: "OF",
      rating: 5,
      highlight: "Seamless GitHub repository handover",
      quote:
        "From kickoff to launch, the workflow was structured and completely transparent. The site performs flawlessly under high traffic, and knowing we own every line of code without ongoing software lock-in gives our management complete peace of mind.",
      accentColor: "from-slate-500/20 to-zinc-500/20 text-slate-700 border-slate-200/50",
    },
  ];
  