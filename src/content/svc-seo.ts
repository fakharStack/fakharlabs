export const html = `
<!-- TopNavBar -->

<!-- Mobile Nav (Simplified for Service Page context) -->

<main class="flex-grow pt-[120px] md:pt-[180px]">
<!-- Hero Section -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
<div class="lg:col-span-7 z-10">
<div class="inline-block px-3 py-1 bg-primary/10 text-primary font-label-caps text-label-caps rounded-full mb-6">SEO &amp; Performance</div>
<h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-6">
                        Better Performance.<br/>Better Experience.
                    </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
                        We engineer websites that load instantly and rank higher. Through technical precision and modern architecture, we turn speed into a competitive advantage.
                    </p>
<button class="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-body-md text-body-md font-medium hover:shadow-[0_0_30px_rgba(99,14,212,0.5)] transition-all hover:-translate-y-1 flex items-center gap-2">
                        Optimize My Website <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div class="lg:col-span-5 relative h-[400px] md:h-[600px] glass-panel rounded-[2rem] overflow-hidden flex items-center justify-center">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
<!-- Abstract visualization of metrics -->
<div class="relative z-10 w-full p-8 flex flex-col gap-6">
<div class="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-sm border border-white/50 transform -rotate-2 hover:rotate-0 transition-transform">
<div class="text-sm text-on-surface-variant mb-2">LCP (Largest Contentful Paint)</div>
<div class="text-3xl font-bold text-primary">0.8s</div>
<div class="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden"><div class="h-full bg-green-500 w-[95%]"></div></div>
</div>
<div class="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-sm border border-white/50 transform translate-x-4 rotate-1 hover:rotate-0 transition-transform">
<div class="text-sm text-on-surface-variant mb-2">Technical SEO Score</div>
<div class="text-3xl font-bold text-secondary">99/100</div>
</div>
</div>
</div>
</div>
</section>
<!-- Services Breakdown Bento Grid -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
<h2 class="font-headline-lg text-headline-lg text-on-background mb-12 text-center">The Architecture of Speed</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
<!-- Card 1 -->
<div class="glass-panel rounded-3xl p-8 flex flex-col justify-between md:col-span-2 relative overflow-hidden group">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/10 transition-colors"></div>
<div>
<span class="material-symbols-outlined text-4xl text-primary mb-4 block">speed</span>
<h3 class="font-headline-md text-headline-md text-on-background mb-3">Page Speed Optimization</h3>
<p class="font-body-md text-body-md text-on-surface-variant max-w-md">Every millisecond counts. We optimize assets, implement modern image formats, and refine server response times to ensure instant interactivity.</p>
</div>
</div>
<!-- Card 2 -->
<div class="glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
<div>
<span class="material-symbols-outlined text-4xl text-secondary mb-4 block">code</span>
<h3 class="font-headline-md text-headline-md text-on-background mb-3 text-2xl">Technical SEO</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Clean semantic HTML, structured data, and crawl budget optimization to make search engines love your site.</p>
</div>
</div>
<!-- Card 3 -->
<div class="glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
<div>
<span class="material-symbols-outlined text-4xl text-primary mb-4 block">smartphone</span>
<h3 class="font-headline-md text-headline-md text-on-background mb-3 text-2xl">Mobile First</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Flawless execution across devices. We prioritize mobile rendering paths and responsive architectures.</p>
</div>
</div>
<!-- Card 4 Image placeholder -->
<div class="glass-panel rounded-3xl md:col-span-2 overflow-hidden relative p-0 group">
<div class="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700" data-alt="A sleek, futuristic dashboard interface glowing in high-key white and vibrant purple tones, showing upward trending performance graphs and precise typography. The aesthetic is clean, technological, and premium." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIUVAEdIFhDVYxP11PjsTmDE1GGsjET8JWOll9_6JTFd79xy4wO43R4rJDCg87HAaZf3YAN73oKQsPCnbgffyMIz1B77wq0HLCkBFTORaDagzuUShHnAkdWaEwt9AfwW8wF-TtjBAMe08WB_ww4G8__TNKRtYu7uWAw4-YE-nEEqSZImAttKobJVTj14zXRspzSNuFG_b9S4Yj2FhWiOPetjMcA-4nUaDGCxZ8wMwVhDTfGQ2czyLn')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
<div class="absolute bottom-8 left-8 right-8">
<h3 class="font-headline-md text-headline-md text-white mb-2">Measurable Results</h3>
<p class="font-body-md text-body-md text-white/80">Data-driven decisions leading to tangible growth in organic visibility.</p>
</div>
</div>
</div>
</section>
<!-- FAQ Section -->
<section class="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
<h2 class="font-headline-lg text-headline-lg text-on-background mb-12 text-center">Frequently Asked Questions</h2>
<div class="space-y-4">
<!-- FAQ Item 1 -->
<div class="glass-panel rounded-2xl p-6 cursor-pointer" onclick="this.classList.toggle('bg-white/90'); this.querySelector('.faq-content').classList.toggle('hidden'); this.querySelector('.icon').textContent = this.querySelector('.icon').textContent === 'add' ? 'remove' : 'add';">
<div class="flex justify-between items-center">
<h4 class="font-body-lg text-body-lg font-medium text-on-background">How long does optimization take?</h4>
<span class="material-symbols-outlined text-primary icon">add</span>
</div>
<div class="faq-content hidden mt-4 font-body-md text-body-md text-on-surface-variant">
                        Typically, a comprehensive audit and implementation takes 2-4 weeks, depending on the complexity of your current architecture.
                    </div>
</div>
<!-- FAQ Item 2 -->
<div class="glass-panel rounded-2xl p-6 cursor-pointer" onclick="this.classList.toggle('bg-white/90'); this.querySelector('.faq-content').classList.toggle('hidden'); this.querySelector('.icon').textContent = this.querySelector('.icon').textContent === 'add' ? 'remove' : 'add';">
<div class="flex justify-between items-center">
<h4 class="font-body-lg text-body-lg font-medium text-on-background">Will design be sacrificed for speed?</h4>
<span class="material-symbols-outlined text-primary icon">add</span>
</div>
<div class="faq-content hidden mt-4 font-body-md text-body-md text-on-surface-variant">
                        Never. We believe in technological elegance. We use modern techniques like lazy loading, selective hydration, and optimized assets to ensure high-end visuals load instantly.
                    </div>
</div>
</div>
</section>
</main>
<!-- Footer -->
`;
