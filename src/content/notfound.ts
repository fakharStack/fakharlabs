export const html = `
<!-- Abstract Background Elements -->
<div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-fixed-dim/30 blur-[120px] pointer-events-none z-0"></div>
<div class="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary-fixed/40 blur-[150px] pointer-events-none z-0"></div>
<!-- Navigation Suppressed based on strict rules: Error 404 is not a top-level destination -> Hide Shell -->
<!-- Main Content -->
<main class="flex-grow flex items-center justify-center relative z-10 px-margin-mobile md:px-margin-desktop py-section-gap">
<div class="w-full max-w-container-max mx-auto flex flex-col lg:flex-row items-center gap-gutter lg:gap-[80px]">
<!-- Text Content -->
<div class="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 opacity-80">Error 404</span>
<h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-6 max-w-[600px]">
                    Looks Like You Took a <span class="gradient-text">Wrong Turn.</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-[480px]">
                    The page you're looking for doesn't exist or may have moved. Let's get you back on track to explore our digital craft.
                </p>
<div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
<!-- Primary CTA -->
<a class="group relative px-8 py-4 rounded-full overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-body-md text-body-md font-medium shadow-[0_10px_30px_rgba(99,14,212,0.2)] hover:shadow-[0_15px_40px_rgba(99,14,212,0.4)] transition-all duration-300 w-full sm:w-auto hover:-translate-y-1" href="/">
<span>Back to Home</span>
<span class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform duration-300" style="font-variation-settings: 'FILL' 0;">arrow_forward</span>
</a>
<!-- Secondary CTA -->
<a class="group px-8 py-4 rounded-full flex items-center justify-center gap-2 text-primary font-body-md text-body-md font-medium border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto glass-panel" href="/work">
<span>View Our Work</span>
<span class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform duration-300" style="font-variation-settings: 'FILL' 0;">arrow_forward</span>
</a>
</div>
</div>
<!-- Visual Element -->
<div class="w-full lg:w-1/2 mt-12 lg:mt-0 relative">
<div class="aspect-square w-full max-w-[600px] mx-auto relative group perspective-1000">
<!-- Glass Card -->
<div class="absolute inset-4 glass-panel rounded-[40px] ambient-shadow flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out group-hover:rotate-y-12 group-hover:rotate-x-12 z-10">
<div class="relative w-full h-full flex flex-col items-center justify-center text-primary/10">
<span class="font-display-xl text-[160px] md:text-[240px] leading-none font-extrabold tracking-tighter mix-blend-overlay">404</span>
</div>
</div>
<!-- Decorative Floating Elements -->
<div class="absolute top-[20%] left-[-5%] w-24 h-24 glass-panel rounded-full ambient-shadow animate-[bounce_6s_infinite_ease-in-out] z-20 flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-3xl">public_off</span>
</div>
<div class="absolute bottom-[15%] right-[-5%] w-16 h-16 glass-panel rounded-full ambient-shadow animate-[bounce_8s_infinite_ease-in-out_reverse] z-20"></div>
</div>
</div>
</div>
</main>
<!-- Footer Suppressed based on rules: Linear/Transactional/Error intent -->
`;
