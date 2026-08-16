export const html = `
<!-- TopNavBar (Nav suppressed due to transactional nature, but TopAppBar kept for brand anchor) -->

<!-- Main Content Canvas -->
<main class="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-section-gap">
<div class="glass-panel w-full max-w-2xl rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
<!-- Decorative Ambient Glow -->
<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none -mt-20"></div>
<div class="relative z-10 flex flex-col items-center">
<!-- Success Animation -->
<div class="mb-10">
<div class="circle-loader load-complete" id="success-loader">
<div class="checkmark draw" id="success-check" style="display: block;"></div>
</div>
</div>
<h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-6">Thanks for Reaching Out.</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto mb-12">
                    We've received your project inquiry. We'll review the details and get back to you soon.
                </p>
<div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
<a class="btn-primary w-full sm:w-auto px-8 py-4 rounded-full text-white font-label-caps text-label-caps uppercase tracking-wider flex items-center justify-center gap-2" href="/">
                        Back to Home
                        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
<a class="btn-secondary w-full sm:w-auto px-8 py-4 rounded-full text-primary font-label-caps text-label-caps uppercase tracking-wider flex items-center justify-center gap-2" href="/work">
                        Explore Our Work
                        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</main>
<!-- Footer -->
`;
