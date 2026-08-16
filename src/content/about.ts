export const html = `
<div class="blob-cursor hidden md:block" id="customCursor"></div>
<!-- TopNavBar -->

<!-- Main Content Canvas -->
<main class="pt-[160px] pb-section-gap">
<!-- Hero Section -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap relative">
<div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-fixed-dim/40 via-background to-background opacity-70"></div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-[512px]">
<div class="md:col-span-8 space-y-6">
<span class="font-label-caps text-label-caps text-primary uppercase tracking-widest block">ABOUT US</span>
<h1 class="font-display-xl-mobile text-display-xl-mobile md:font-display-xl md:text-display-xl text-on-background">
                        We Build Digital <br class="hidden md:block"/>
<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Experiences With Purpose.</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl pt-4">
                        Fakhar Labs is a hybrid digital agency combining strategic rigor with ethereal design execution. We craft interfaces that function flawlessly while elevating the brand narrative through quiet, sophisticated minimalism.
                    </p>
</div>
</div>
</section>
<!-- Our Story & Philosophy (Bento Grid Style) -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Our Story (Large Card) -->
<div class="md:col-span-8 glass-panel rounded-xl p-8 md:p-12 relative overflow-hidden group">
<div class="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed rounded-full blur-[80px] opacity-50 transition-opacity group-hover:opacity-80"></div>
<div class="relative z-10 space-y-6">
<h2 class="font-headline-md text-headline-md text-on-background">Our Story</h2>
<div class="space-y-4 font-body-md text-body-md text-on-surface-variant max-w-2xl">
<p>Founded on the principle that technology should feel invisible, Fakhar Labs began as an experiment in digital minimalism. We recognized that in an increasingly noisy digital landscape, clarity is the ultimate luxury.</p>
<p>We strip away the extraneous to reveal the essential core of your brand, building interfaces that feel like natural extensions of human intent rather than complex machines to be operated.</p>
</div>
</div>
</div>
<!-- Philosophy (Small Vertical Card) -->
<div class="md:col-span-4 glass-panel rounded-xl p-8 flex flex-col justify-between">
<div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-background mb-4">Philosophy</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
                            "Technological Elegance." We believe in creating spaces, not just pages. Every pixel must serve a purpose, balancing high-performance precision with a luxury editorial feel.
                        </p>
</div>
</div>
</div>
</section>
<!-- Visual Break / Abstract Interface Preview -->
<section class="w-full h-[614px] mb-section-gap relative overflow-hidden">
<div class="absolute inset-0 bg-surface-container-high"></div>
<div class="absolute inset-0 bg-[url('placeholder')] bg-cover bg-center mix-blend-overlay opacity-30" data-alt="A highly abstract, macro-level photograph of frosted glass layers intersecting with sleek, modern UI wireframes. The composition is bathed in a bright, ethereal light with soft purple and pristine white tones. The mood is highly technological yet serene and luxurious, showcasing depth of field and soft ambient glows."></div>
<!-- Abstract Floating Elements simulating UI -->
<div class="absolute top-1/4 left-1/4 w-64 h-32 glass-panel rounded-lg shadow-xl transform -rotate-6 hidden md:block"></div>
<div class="absolute bottom-1/4 right-1/4 w-48 h-48 glass-panel rounded-full shadow-xl transform rotate-12 hidden md:block backdrop-blur-[10px]"></div>
</section>
<!-- Values Section -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
<div class="mb-16">
<span class="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-4">WHAT WE BELIEVE</span>
<h2 class="font-headline-lg text-headline-lg text-on-background">Core Values</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-12 border-t border-outline-variant/30 pt-12">
<!-- Value 01 -->
<div class="flex gap-6 interactive-element group">
<div class="font-label-caps text-label-caps text-outline-variant pt-2">01</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-background mb-2 group-hover:text-primary transition-colors">Quality</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Uncompromising craftsmanship in every layer of the stack. We treat code and design with equal reverence.</p>
</div>
</div>
<!-- Value 02 -->
<div class="flex gap-6 interactive-element group">
<div class="font-label-caps text-label-caps text-outline-variant pt-2">02</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-background mb-2 group-hover:text-primary transition-colors">Simplicity</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Distilling complexity into intuitive experiences. If it requires explanation, it requires refinement.</p>
</div>
</div>
<!-- Value 03 -->
<div class="flex gap-6 interactive-element group">
<div class="font-label-caps text-label-caps text-outline-variant pt-2">03</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-background mb-2 group-hover:text-primary transition-colors">Performance</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Speed is a feature. We engineer for responsiveness to ensure the narrative is never interrupted by friction.</p>
</div>
</div>
<!-- Value 04 -->
<div class="flex gap-6 interactive-element group">
<div class="font-label-caps text-label-caps text-outline-variant pt-2">04</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-background mb-2 group-hover:text-primary transition-colors">Growth</h3>
<p class="font-body-md text-body-md text-on-surface-variant">We build systems, not just pages—designing extensible architectures that scale elegantly alongside your business.</p>
</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
`;
