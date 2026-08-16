export const html = `
<!-- TopNavBar (Shared Component) -->

<!-- Main Content Canvas -->
<main class="pt-[140px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<!-- Hero Section -->
<section class="mb-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-[614px]">
<div class="md:col-span-6 space-y-8 z-10">
<div class="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed/50 text-primary font-label-caps text-label-caps backdrop-blur-sm border border-primary/10">
                    Service Focus
                </div>
<h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background">
                    Landing Pages Built to Convert.
                </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                    We engineer high-performance landing pages that blend stunning visual design with cognitive psychology to turn casual visitors into committed customers.
                </p>
<a class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-body-md text-body-md font-medium hover:shadow-[0_0_30px_rgba(99,14,212,0.4)] transition-all duration-300 hover:-translate-y-1" href="#cta">
                    Build My Landing Page
                    <span class="material-symbols-outlined ml-2">arrow_forward</span>
</a>
</div>
<div class="md:col-span-6 relative">
<div class="absolute inset-0 bg-primary/5 blur-[100px] rounded-full"></div>
<div class="glass-panel diffuse-shadow rounded-[32px] overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out p-2">
<img class="w-full h-auto rounded-[24px] object-cover" data-alt="A high-fidelity mockup of a sleek, modern landing page displayed on a floating digital device. The UI is minimalist, using a white and soft purple color palette consistent with the 'Ethereal Agency' aesthetic. The design features a bold headline, clear calls to action, and subtle glassmorphism effects in the UI elements. Lighting is bright and studio-quality, emphasizing the premium nature of the digital product." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9WNXMRaBsD5vwZlDJQsaQ1sZQ0nJzkZf2wgp3aSchI5XRHdJDAEfMDOsX5n5vdzbEBDbwikm9VUwLg3XYqpfCIc2ptxIaAnWJB4JogiHO-8z7gxu14v2sjfw10nIMtDUiqpLY6rjCQqz2Y4YL2OevKidompPgkPwILjhVxiZEK7fHVU5M0ChddB2pdzetjluJMUxTWp27gxILGGSatcIUn5z_izWnurVxNFTe4pVkuCaahFYHH1NH"/>
</div>
</div>
</section>
<!-- Methodology Section (Bento Grid) -->
<section class="mb-section-gap">
<div class="text-center mb-16">
<h2 class="font-headline-lg text-headline-lg mb-4 text-on-background">The Conversion Architecture</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Our proven framework for crafting pages that drive action.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-6">
<!-- Card 1 -->
<div class="md:col-span-7 glass-panel diffuse-shadow rounded-[24px] p-8 md:p-12 relative overflow-hidden group">
<div class="absolute top-0 right-0 p-8 text-primary/20 group-hover:text-primary transition-colors duration-500">
<span class="material-symbols-outlined text-6xl">chat_bubble</span>
</div>
<h3 class="font-headline-md text-headline-md mb-4 mt-8 relative z-10 text-on-background">Clear Messaging</h3>
<p class="font-body-md text-body-md text-on-surface-variant max-w-md relative z-10">We distill complex value propositions into compelling, scannable copy that speaks directly to your user's pain points and desires.</p>
</div>
<!-- Card 2 -->
<div class="md:col-span-5 glass-panel diffuse-shadow rounded-[24px] p-8 md:p-12 relative overflow-hidden group bg-gradient-to-br from-white/70 to-primary-fixed/30">
<div class="absolute top-0 right-0 p-8 text-primary/20 group-hover:text-primary transition-colors duration-500">
<span class="material-symbols-outlined text-6xl">layers</span>
</div>
<h3 class="font-headline-md text-headline-md mb-4 mt-8 relative z-10 text-on-background">Visual Hierarchy</h3>
<p class="font-body-md text-body-md text-on-surface-variant relative z-10">Strategic use of negative space, typography, and color guides the user's eye naturally toward the primary conversion goal.</p>
</div>
<!-- Card 3 -->
<div class="md:col-span-12 glass-panel diffuse-shadow rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
<div class="max-w-xl">
<h3 class="font-headline-md text-headline-md mb-4 text-on-background">CTA Optimization</h3>
<p class="font-body-md text-body-md text-on-surface-variant">We design interactive, high-contrast calls to action placed at pivotal moments in the narrative arc to maximize click-through rates.</p>
</div>
<div class="w-full md:w-auto">
<div class="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-body-lg text-body-lg font-bold shadow-[0_0_30px_rgba(99,14,212,0.3)] animate-pulse">
                            Get Started Now
                        </div>
</div>
</div>
</div>
</section>
<!-- Interactive FAQ Section -->
<section class="mb-section-gap max-w-4xl mx-auto">
<div class="text-center mb-16">
<h2 class="font-headline-lg text-headline-lg mb-4 text-on-background">Common Questions</h2>
</div>
<div class="space-y-4">
<!-- FAQ Item 1 -->
<details class="glass-panel diffuse-shadow rounded-2xl group [&amp;_summary::-webkit-details-marker]:hidden">
<summary class="flex items-center justify-between p-6 cursor-pointer font-body-lg text-body-lg font-medium text-on-background">
                        How long does it take to build a custom landing page?
                        <span class="material-symbols-outlined transition-transform duration-300 group-open:-rotate-180 text-primary">expand_more</span>
</summary>
<div class="px-6 pb-6 pt-2 font-body-md text-body-md text-on-surface-variant border-t border-surface-variant/50">
                        Typically, our process takes 2-3 weeks from initial strategy to final deployment, ensuring rigorous testing and quality assurance.
                    </div>
</details>
<!-- FAQ Item 2 -->
<details class="glass-panel diffuse-shadow rounded-2xl group [&amp;_summary::-webkit-details-marker]:hidden">
<summary class="flex items-center justify-between p-6 cursor-pointer font-body-lg text-body-lg font-medium text-on-background">
                        Do you handle the copywriting?
                        <span class="material-symbols-outlined transition-transform duration-300 group-open:-rotate-180 text-primary">expand_more</span>
</summary>
<div class="px-6 pb-6 pt-2 font-body-md text-body-md text-on-surface-variant border-t border-surface-variant/50">
                        Yes, our team includes conversion copywriters who work closely with designers to ensure messaging and visuals are perfectly aligned.
                    </div>
</details>
<!-- FAQ Item 3 -->
<details class="glass-panel diffuse-shadow rounded-2xl group [&amp;_summary::-webkit-details-marker]:hidden">
<summary class="flex items-center justify-between p-6 cursor-pointer font-body-lg text-body-lg font-medium text-on-background">
                        Will it integrate with our CRM?
                        <span class="material-symbols-outlined transition-transform duration-300 group-open:-rotate-180 text-primary">expand_more</span>
</summary>
<div class="px-6 pb-6 pt-2 font-body-md text-body-md text-on-surface-variant border-t border-surface-variant/50">
                        Absolutely. We ensure seamless integration with major marketing stacks (HubSpot, Salesforce, Marketo, etc.) for robust lead tracking.
                    </div>
</details>
</div>
</section>
<!-- Final CTA Section -->
<section class="relative overflow-hidden rounded-[40px] glass-panel diffuse-shadow p-12 md:p-24 text-center" id="cta">
<div class="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 to-surface-bright/50 z-0"></div>
<div class="relative z-10 max-w-2xl mx-auto space-y-8">
<h2 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background">Ready to scale your conversions?</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">Let's craft a landing page that transforms your traffic into tangible growth.</p>
<a class="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-body-lg text-body-lg font-bold hover:shadow-[0_0_40px_rgba(99,14,212,0.5)] transition-all duration-300 hover:scale-105" href="#">
                    Build My Landing Page
                    <span class="material-symbols-outlined ml-2">arrow_forward</span>
</a>
</div>
</section>
</main>
<!-- Footer (Shared Component) -->
`;
