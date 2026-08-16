export const html = `
<!-- TopNavBar -->

<main class="flex-grow">
<!-- HERO SECTION -->
<section class="relative min-h-screen pt-40 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex items-center">
<div class="absolute inset-0 hero-glow -z-10"></div>
<!-- Grid pattern overlay -->
<div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwgMTQsIDIxMiwgMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50 -z-10"></div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full">
<!-- Left: Content -->
<div class="md:col-span-6 flex flex-col justify-center scroll-reveal">
<span class="font-label-caps text-label-caps text-primary tracking-widest mb-6">DIGITAL EXPERIENCES • BUILT TO GROW</span>
<h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-6">
                    WE BUILD WEBSITES THAT <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">GROW</span> BUSINESSES
                </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
                    We craft high-performance digital experiences that act as a quiet, sophisticated frame for your brand, engineered for a luxury editorial feel.
                </p>
<div class="flex flex-wrap gap-4">
<a class="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-medium hover:shadow-[0_0_30px_rgba(99,14,212,0.5)] transition-all duration-300 hover:scale-[1.02]" href="/contact">Start a Project</a>
<a class="glass-panel text-on-background px-8 py-4 rounded-full font-medium hover:bg-surface-variant transition-all duration-300" href="/work">View Our Work</a>
</div>
</div>
<!-- Right: Visual -->
<div class="md:col-span-6 relative mt-16 md:mt-0 scroll-reveal">
<div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden glass-panel shadow-diffuse group">
<!-- Browser Chrome -->
<div class="h-10 bg-white/50 border-b border-white/20 flex items-center px-4 gap-2">
<div class="w-3 h-3 rounded-full bg-error/50"></div>
<div class="w-3 h-3 rounded-full bg-primary/40"></div>
<div class="w-3 h-3 rounded-full bg-secondary/40"></div>
</div>
<!-- Mockup Image -->
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A clean, minimalist luxury e-commerce website mockup displayed within a highly realistic browser window. The mockup shows a sophisticated product page for a high-end technological device, featuring ample white space, elegant typography, and a subtle purple accent color. The lighting is soft and studio-quality, emphasizing a premium 'Technological Elegance' aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk88lMQFRrm4i_irWz2TuUPRwzvYJpzn7fJt_IEzvlJnOR_o6SQl9e71V8XsASRvFhq8tgz2hsg23ns91qhxOiR6T29HDGf3qPy-TLaV7sRs7R1fG1HuZaRqwPRhgsJUjiR5uJHq9WeIEFPLqnHCNeB_k5uIz_AbSXGYzlSRR4oUEQHAhYz_Dpcmf6Rr9f1sclgifbxwuMxA7Zme3kwI9IkJba-HTi1IxKiOAPmZSMBGGVgqjcUNQg"/>
</div>
<!-- Floating Cards -->
<div class="absolute -right-8 top-12 glass-panel px-6 py-4 rounded-xl shadow-diffuse animate-float flex items-center gap-3">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">speed</span>
<div>
<div class="font-bold text-on-background">98 Performance</div>
<div class="text-xs text-on-surface-variant">Lighthouse Score</div>
</div>
</div>
<div class="absolute -left-12 bottom-20 glass-panel px-6 py-4 rounded-xl shadow-diffuse animate-float-delayed flex items-center gap-3">
<span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">smartphone</span>
<div>
<div class="font-bold text-on-background">Mobile First</div>
<div class="text-xs text-on-surface-variant">Fully Responsive</div>
</div>
</div>
</div>
</div>
</section>
<!-- TRUST STRIP -->
<section class="border-y border-outline-variant/20 py-8 bg-surface-container-low overflow-hidden">
<div class="flex whitespace-nowrap animate-[scroll_30s_linear_infinite] gap-16 font-label-caps text-label-caps text-on-surface-variant/60 tracking-[0.2em]">
<span>MODERN DESIGN</span>
<span>•</span>
<span>MOBILE FIRST</span>
<span>•</span>
<span>FAST PERFORMANCE</span>
<span>•</span>
<span>SEO READY</span>
<span>•</span>
<span>CONVERSION FOCUSED</span>
<span>•</span>
<span>MODERN DESIGN</span>
<span>•</span>
<span>MOBILE FIRST</span>
</div>
</section>
<!-- SERVICES OVERVIEW -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 scroll-reveal">
<div>
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">What We Do</span>
<h2 class="font-headline-lg text-headline-lg md:text-display-md text-on-background max-w-2xl">Digital Solutions Built Around Your Business.</h2>
</div>
<a class="inline-flex items-center gap-2 font-body-md text-body-md font-bold text-primary hover:text-secondary transition-colors" href="/services">All Services <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<a class="glass-panel rounded-3xl p-8 soft-shadow group transition-all duration-300 hover:-translate-y-1 scroll-reveal" href="/services/web-design">
<span class="material-symbols-outlined text-primary text-4xl mb-6 block">brush</span>
<h3 class="font-headline-md text-headline-md text-on-background mb-3">Website Design</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">Visually stunning, user-centric interfaces that communicate your brand's unique value.</p>
<span class="inline-flex items-center gap-2 text-primary font-medium">Explore <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span></span>
</a>
<a class="glass-panel rounded-3xl p-8 soft-shadow group transition-all duration-300 hover:-translate-y-1 scroll-reveal" href="/services/web-development">
<span class="material-symbols-outlined text-primary text-4xl mb-6 block">code</span>
<h3 class="font-headline-md text-headline-md text-on-background mb-3">Web Development</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">Robust, scalable and lightning-fast builds on modern stacks, engineered to last.</p>
<span class="inline-flex items-center gap-2 text-primary font-medium">Explore <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span></span>
</a>
<a class="glass-panel rounded-3xl p-8 soft-shadow group transition-all duration-300 hover:-translate-y-1 scroll-reveal" href="/services/landing-pages">
<span class="material-symbols-outlined text-primary text-4xl mb-6 block">rocket_launch</span>
<h3 class="font-headline-md text-headline-md text-on-background mb-3">Landing Pages</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">Focused, conversion-driven pages built to turn campaign traffic into customers.</p>
<span class="inline-flex items-center gap-2 text-primary font-medium">Explore <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span></span>
</a>
<a class="glass-panel rounded-3xl p-8 soft-shadow group transition-all duration-300 hover:-translate-y-1 scroll-reveal" href="/services/website-redesign">
<span class="material-symbols-outlined text-primary text-4xl mb-6 block">autorenew</span>
<h3 class="font-headline-md text-headline-md text-on-background mb-3">Website Redesign</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">Your business has evolved. We bring your website back in step with it.</p>
<span class="inline-flex items-center gap-2 text-primary font-medium">Explore <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span></span>
</a>
<a class="glass-panel rounded-3xl p-8 soft-shadow group transition-all duration-300 hover:-translate-y-1 scroll-reveal" href="/services/seo-performance">
<span class="material-symbols-outlined text-primary text-4xl mb-6 block">trending_up</span>
<h3 class="font-headline-md text-headline-md text-on-background mb-3">SEO &amp; Performance</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">Better performance, better experience, better rankings — measured, not guessed.</p>
<span class="inline-flex items-center gap-2 text-primary font-medium">Explore <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span></span>
</a>
<a class="rounded-3xl p-8 soft-shadow group transition-all duration-300 hover:-translate-y-1 scroll-reveal bg-gradient-to-br from-primary to-secondary text-white" href="/contact">
<span class="material-symbols-outlined text-4xl mb-6 block">chat_bubble</span>
<h3 class="font-headline-md text-headline-md mb-3">Something else?</h3>
<p class="font-body-md text-body-md opacity-90 mb-6">Tell us what you're building. We'll tell you honestly if we're the right studio.</p>
<span class="inline-flex items-center gap-2 font-medium">Start a conversation <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span></span>
</a>
</div>
</section>
<!-- SELECTED WORK -->
<section class="bg-surface-container-low border-y border-outline-variant/20 py-section-gap">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 scroll-reveal">
<div>
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Selected Work</span>
<h2 class="font-headline-lg text-headline-lg md:text-display-md text-on-background max-w-2xl">Websites That Speak for Themselves.</h2>
</div>
<a class="inline-flex items-center gap-2 font-body-md text-body-md font-bold text-primary hover:text-secondary transition-colors" href="/work">View all work <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<article class="md:col-span-7 group scroll-reveal">
<a class="block glass-panel rounded-3xl overflow-hidden soft-shadow" href="/work/dental-clinic">
<div class="h-[280px] md:h-[420px] overflow-hidden">
<img alt="Smile Studio dental clinic website redesign" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gNP_KE_MCFHAoXnsZqIrDNuDa554C9Lx0abZox5zLRE_ubJO7HEPKZWdS3MoKWpMf895Yb1cktoRiWknQHXiqd05piLkHoaAeALSmdi5Sc2gF8mDn0ShzcPhmzN32OMwkpD1-d6bLaTnrkGoF60vMRSY7YRIUNp9ZkJATsQqAbgbp_DrBF3S10ktzenioqSOf39Ix7ApCTbfabYDVCQfRa43Un_0OTO3JkbPmh4hDRZuGiHDJd9Z"/>
</div>
<div class="p-8">
<span class="font-label-caps text-label-caps text-primary bg-primary-fixed-dim/30 px-3 py-1 rounded-full">Healthcare</span>
<h3 class="font-headline-lg text-headline-md md:text-headline-lg text-on-background mt-5 mb-3">Smile Studio Redesign</h3>
<p class="font-body-md text-body-md text-on-surface-variant">A complete digital overhaul for a premium dental practice, focused on patient acquisition and seamless online booking.</p>
</div>
</a>
</article>
<article class="md:col-span-5 group scroll-reveal">
<a class="block glass-panel rounded-3xl overflow-hidden soft-shadow h-full" href="/work">
<div class="h-[280px] md:h-[420px] overflow-hidden">
<img alt="Artisan Roasters local business website" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9dAMd_wNYWXP-RVXnn4lZMXixJI9qzs3K4iTC-eGdScx9TPY0z-hFMHylxaisyBuAX0Alv_UFIT7wVW_PVVx1cDtOTOD20W2uIJoBcO95rMhDyXWwqdLRMV-ad-qY-2huKah9Oh1P1NSiyvZFTVU5WBOfjQfD6CLlgEJWBqhSm3x8uuZ4RzpYGfw1-xnTexeQWlZWwB6CTmyE2pCIwsvmwOCHLUYwGJqtdOmkM5L9hF-oVj5ZW0a9"/>
</div>
<div class="p-8">
<span class="font-label-caps text-label-caps text-primary bg-primary-fixed-dim/30 px-3 py-1 rounded-full">Local Business</span>
<h3 class="font-headline-lg text-headline-md md:text-headline-lg text-on-background mt-5 mb-3">Artisan Roasters</h3>
<p class="font-body-md text-body-md text-on-surface-variant">A warm, editorial storefront for a boutique coffee roaster, built for online orders.</p>
</div>
</a>
</article>
</div>
</div>
</section>
<!-- PROCESS -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
<div class="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">The Methodology</span>
<h2 class="font-headline-lg text-headline-lg md:text-display-md text-on-background mb-6">From First Idea to Final Launch.</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">A six-step framework bridging strategic intent with flawless execution.</p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><div class="font-display-xl text-[56px] leading-none font-bold text-primary/15 mb-4">01</div><h3 class="font-headline-md text-headline-md text-on-background mb-2">Discovery</h3><p class="font-body-md text-body-md text-on-surface-variant">We learn your business, your customers and what success actually looks like.</p></div>
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><div class="font-display-xl text-[56px] leading-none font-bold text-primary/15 mb-4">02</div><h3 class="font-headline-md text-headline-md text-on-background mb-2">Strategy</h3><p class="font-body-md text-body-md text-on-surface-variant">Structure, messaging and journeys mapped before a single pixel is drawn.</p></div>
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><div class="font-display-xl text-[56px] leading-none font-bold text-primary/15 mb-4">03</div><h3 class="font-headline-md text-headline-md text-on-background mb-2">Design</h3><p class="font-body-md text-body-md text-on-surface-variant">A distinctive visual system, prototyped and refined with you in the room.</p></div>
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><div class="font-display-xl text-[56px] leading-none font-bold text-primary/15 mb-4">04</div><h3 class="font-headline-md text-headline-md text-on-background mb-2">Build</h3><p class="font-body-md text-body-md text-on-surface-variant">Clean, accessible, fast front-end engineering on a modern stack.</p></div>
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><div class="font-display-xl text-[56px] leading-none font-bold text-primary/15 mb-4">05</div><h3 class="font-headline-md text-headline-md text-on-background mb-2">Launch</h3><p class="font-body-md text-body-md text-on-surface-variant">QA, performance budgets and SEO checks before we hand over the keys.</p></div>
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><div class="font-display-xl text-[56px] leading-none font-bold text-primary/15 mb-4">06</div><h3 class="font-headline-md text-headline-md text-on-background mb-2">Grow</h3><p class="font-body-md text-body-md text-on-surface-variant">Ongoing iteration driven by real analytics, not opinions.</p></div>
</div>
<div class="text-center mt-12 scroll-reveal">
<a class="glass-panel text-on-background px-8 py-4 rounded-full font-medium hover:bg-surface-variant transition-all duration-300 inline-flex items-center gap-2" href="/process">See the full process <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
</section>
<!-- BELIEFS / ABOUT -->
<section class="bg-surface-container-low border-y border-outline-variant/20 py-section-gap">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
<div class="md:col-span-5 scroll-reveal">
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">What We Believe</span>
<h2 class="font-headline-lg text-headline-lg md:text-display-md text-on-background mb-6">Experiences With Purpose.</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-8">We're a small studio that treats code and design with equal reverence — building digital products that stay elegant as they scale.</p>
<a class="inline-flex items-center gap-2 font-body-md text-body-md font-bold text-primary hover:text-secondary transition-colors" href="/about">More about us <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
<div class="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><span class="material-symbols-outlined text-primary text-3xl mb-4 block">diamond</span><h3 class="font-headline-md text-headline-md text-on-background mb-2">Craft</h3><p class="font-body-md text-body-md text-on-surface-variant">Uncompromising craftsmanship in every layer of the stack.</p></div>
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><span class="material-symbols-outlined text-primary text-3xl mb-4 block">filter_center_focus</span><h3 class="font-headline-md text-headline-md text-on-background mb-2">Clarity</h3><p class="font-body-md text-body-md text-on-surface-variant">If it requires explanation, it requires refinement.</p></div>
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><span class="material-symbols-outlined text-primary text-3xl mb-4 block">bolt</span><h3 class="font-headline-md text-headline-md text-on-background mb-2">Speed</h3><p class="font-body-md text-body-md text-on-surface-variant">Speed is a feature. Friction should never interrupt the narrative.</p></div>
<div class="glass-panel rounded-3xl p-8 soft-shadow scroll-reveal"><span class="material-symbols-outlined text-primary text-3xl mb-4 block">layers</span><h3 class="font-headline-md text-headline-md text-on-background mb-2">Scale</h3><p class="font-body-md text-body-md text-on-surface-variant">We build systems, not pages — architectures that grow with you.</p></div>
</div>
</div>
</section>
<!-- STATS -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
<div class="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center scroll-reveal">
<div><div class="font-display-xl text-[48px] md:text-[64px] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">98</div><p class="font-body-md text-body-md text-on-surface-variant mt-3">Avg. Lighthouse score</p></div>
<div><div class="font-display-xl text-[48px] md:text-[64px] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">40+</div><p class="font-body-md text-body-md text-on-surface-variant mt-3">Projects delivered</p></div>
<div><div class="font-display-xl text-[48px] md:text-[64px] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">6</div><p class="font-body-md text-body-md text-on-surface-variant mt-3">Week average launch</p></div>
<div><div class="font-display-xl text-[48px] md:text-[64px] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">100%</div><p class="font-body-md text-body-md text-on-surface-variant mt-3">Client retention</p></div>
</div>
</section>
<!-- CTA -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
<div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-8 py-16 md:px-16 md:py-24 text-center soft-shadow scroll-reveal">
<h2 class="font-headline-lg text-headline-lg md:text-display-md text-white mb-6">Ready to transform your digital presence?</h2>
<p class="font-body-lg text-body-lg text-white/85 max-w-2xl mx-auto mb-10">Tell us about your project. We'll come back with a clear plan, a timeline and an honest answer.</p>
<a class="bg-white text-primary px-8 py-4 rounded-full font-medium inline-flex items-center gap-2 hover:scale-[1.02] transition-transform" href="/contact">Start a Project <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
</section>
</main>

<!-- Footer -->

<style>
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
    </style>
<!-- Script for Scroll Reveal -->
`;
