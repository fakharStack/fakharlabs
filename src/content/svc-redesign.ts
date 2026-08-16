export const html = `
<!-- TopNavBar -->

<main class="pt-32 pb-section-gap">
<!-- Hero Section -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-[716px] flex flex-col justify-center relative">
<div class="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary-fixed/30 rounded-full blur-[120px] -z-10"></div>
<div class="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-secondary-fixed/20 rounded-full blur-[100px] -z-10"></div>
<div class="max-w-4xl">
<span class="inline-block px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps mb-8 tracking-widest uppercase border border-primary/10">Service Detail</span>
<h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-8 leading-tight">
                    Your Business Has Evolved. <br/>
<span class="text-gradient">Your Website Should Too.</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
                    We dismantle outdated digital experiences and reconstruct them into high-performing, immersive brand environments that command attention and drive conversion.
                </p>
<div class="flex flex-wrap gap-4">
<a class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-body-md font-medium hover:shadow-[0_0_30px_rgba(99,14,212,0.4)] transition-all hover:scale-[1.02] active:scale-95" href="#cta">
                        Redesign My Website <span class="material-symbols-outlined ml-2 text-[20px]" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
</section>
<!-- Before/After Concept Section (Bento Grid) -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Old Experience -->
<div class="md:col-span-5 glass-panel rounded-[2rem] p-8 diffused-shadow flex flex-col h-full">
<div class="flex items-center justify-between mb-8">
<h3 class="font-headline-md text-headline-md text-on-background">The Old Way</h3>
<span class="material-symbols-outlined text-outline" data-icon="history">history</span>
</div>
<ul class="space-y-6 mb-8 font-body-md text-body-md text-on-surface-variant flex-grow">
<li class="flex items-start gap-4">
<span class="material-symbols-outlined text-error mt-1" data-icon="close">close</span>
<span>Cluttered interfaces that confuse rather than guide.</span>
</li>
<li class="flex items-start gap-4">
<span class="material-symbols-outlined text-error mt-1" data-icon="close">close</span>
<span>Sluggish load times resulting in high bounce rates.</span>
</li>
<li class="flex items-start gap-4">
<span class="material-symbols-outlined text-error mt-1" data-icon="close">close</span>
<span>Generic templates indistinguishable from competitors.</span>
</li>
</ul>
<div class="w-full h-48 rounded-xl overflow-hidden grayscale opacity-50 border border-outline-variant relative">
<img class="w-full h-full object-cover" data-alt="A blurry, outdated website interface shown on an old computer monitor. The design is cluttered with too much text, small unreadable fonts, and an unappealing color palette of drab greys and muddy blues. The overall mood is frustrating and archaic, highlighting poor user experience design in a stark, realistic setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTz8SGjqB1xQ51JJI7AyEtqbCgEdwRkA0b8Jot9vwWpzMb_G8AJjLpc8NAOp1iQcsdhb5Ax4fbCfjTOw5LJUY0mIGKy-MG6aYnnSA1KZ3N2rYrYVzDDQ_MyuC4H6fNt3itTZvtczGrdyKNmlzbycLKf8VqRgURopI3uczhdVM7tXlMSFAxfarL64AXNRps22LP4xHEQhHfbVzTqbnxc-aYDpn0zZEH8BZkN8LN-buMkeCsSF98PndG"/>
</div>
</div>
<!-- Transition Arrow (Desktop Only) -->
<div class="hidden md:flex md:col-span-2 items-center justify-center">
<div class="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-primary z-10 relative">
<span class="material-symbols-outlined text-[32px]" data-icon="arrow_forward">arrow_forward</span>
</div>
</div>
<!-- New Experience -->
<div class="md:col-span-5 glass-panel rounded-[2rem] p-8 diffused-shadow flex flex-col h-full relative overflow-hidden">
<div class="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
<div class="flex items-center justify-between mb-8 relative z-10">
<h3 class="font-headline-md text-headline-md text-primary">The Ethereal Standard</h3>
<span class="material-symbols-outlined text-primary" data-icon="auto_awesome">auto_awesome</span>
</div>
<ul class="space-y-6 mb-8 font-body-md text-body-md text-on-surface-variant flex-grow relative z-10">
<li class="flex items-start gap-4">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span>Intentional architecture that drives user action smoothly.</span>
</li>
<li class="flex items-start gap-4">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span>Lightning-fast performance optimized for modern web standards.</span>
</li>
<li class="flex items-start gap-4">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span>Bespoke visual identity expressing technological elegance.</span>
</li>
</ul>
<div class="w-full h-48 rounded-xl overflow-hidden border border-primary/20 shadow-[0_10px_30px_rgba(99,14,212,0.15)] relative z-10">
<img class="w-full h-full object-cover" data-alt="A pristine, modern website interface displayed on a sleek, bezel-less monitor. The design features a light-mode aesthetic with ethereal glassmorphism elements, soft purple accents, and minimalist typography. The layout is spacious and editorial, exuding technological elegance and high-end digital craftsmanship in a bright, sophisticated studio environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAskjVRuBkVwgFppEcxDsIOPyJHjXn53AU25EGjJoDPmra0vmiky-kp0SrfTz9f3WfdGbuSIfDcKuckBjP_5qvTAnFTaxU130Xz44v2CECY5DyLkG_XU-1fxUtG1BBYR99yJDHUFdju8E0st-rQEHcNDuU6nMOpDf-y_mArOOvKmmP9GB_bCuGlAFFytdswnyoOriR1vEIzoAPLEmJ3rs3-lS0979kZzFKe27qXsO-fds_5sjZN_-Vs"/>
</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
`;
