export const html = `
<!-- Custom Cursor -->

<!-- TopNavBar -->

<!-- Main Canvas -->
<main class="flex-grow pt-[160px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
<!-- Hero Section (Left Column) -->
<div class="lg:col-span-5 flex flex-col justify-center mb-16 lg:mb-0">
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-6 block">LET'S WORK TOGETHER</span>
<h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-8">
                    Have a Project in Mind?
                </h1>
<p class="font-body-lg text-body-lg text-tertiary-container mb-12 max-w-md">
                    We partner with visionary brands to create digital experiences that command attention. Share your objectives with us.
                </p>
<!-- Contact Info Glass Card -->
<div class="glass-panel rounded-xl p-8 ambient-shadow-lg max-w-md cursor-hover-target">
<div class="space-y-6">
<div>
<h3 class="font-body-md text-body-md text-outline mb-1">Direct Inquiries</h3>
                      <a class="font-headline-md text-headline-md text-on-background hover:text-primary transition-colors" href="mailto:fakharlabs@gmail.com">fakharlabs@gmail.com</a>
</div>
<div>
<h3 class="font-body-md text-body-md text-outline mb-1">Response Time</h3>
<p class="font-body-md text-body-md text-on-background font-medium">Within 24 business hours</p>
</div>
<div class="pt-6 border-t border-surface-variant flex gap-6">
<a aria-label="Instagram" class="text-tertiary-container hover:text-primary transition-colors cursor-hover-target" href="#">Instagram</a>
<a aria-label="LinkedIn" class="text-tertiary-container hover:text-primary transition-colors cursor-hover-target" href="#">LinkedIn</a>
<a aria-label="Twitter" class="text-tertiary-container hover:text-primary transition-colors cursor-hover-target" href="#">Twitter</a>
</div>
</div>
</div>
</div>
<!-- Contact Form (Right Column) -->
<div class="lg:col-span-7 lg:pl-12">
<div class="glass-panel rounded-xl p-8 md:p-12 ambient-shadow-lg">
<form action="/thank-you" class="space-y-10" method="GET">
<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
<!-- Name -->
<div class="relative group">
<label class="font-body-md text-body-md text-tertiary-container block mb-2 transition-colors group-focus-within:text-primary" for="name">Name</label>
<input aria-required="true" class="glass-input w-full pb-3 text-on-background font-body-lg" id="name" name="name" placeholder="Jane Doe" required="" type="text"/>
</div>
<!-- Business Name -->
<div class="relative group">
<label class="font-body-md text-body-md text-tertiary-container block mb-2 transition-colors group-focus-within:text-primary" for="business">Business Name</label>
<input class="glass-input w-full pb-3 text-on-background font-body-lg" id="business" name="business" placeholder="Company Inc." type="text"/>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
<!-- Email -->
<div class="relative group">
<label class="font-body-md text-body-md text-tertiary-container block mb-2 transition-colors group-focus-within:text-primary" for="email">Email Address</label>
<input aria-required="true" class="glass-input w-full pb-3 text-on-background font-body-lg" id="email" name="email" placeholder="jane@example.com" required="" type="email"/>
</div>
<!-- Phone -->
<div class="relative group">
<label class="font-body-md text-body-md text-tertiary-container block mb-2 transition-colors group-focus-within:text-primary" for="phone">Phone (Optional)</label>
<input class="glass-input w-full pb-3 text-on-background font-body-lg" id="phone" name="phone" placeholder="+1 (555) 000-0000" type="tel"/>
</div>
</div>
<!-- Needs -->
<div class="relative group">
<fieldset>
<legend class="font-body-md text-body-md text-tertiary-container block mb-4 transition-colors group-focus-within:text-primary">What are you looking for?</legend>
<div class="flex flex-wrap gap-3">
<label class="cursor-pointer">
<input class="peer sr-only" name="needs" type="checkbox" value="branding"/>
<span class="inline-block px-5 py-2 rounded-full border border-outline-variant text-tertiary-container font-body-md peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container transition-all cursor-hover-target">Branding</span>
</label>
<label class="cursor-pointer">
<input class="peer sr-only" name="needs" type="checkbox" value="web_design"/>
<span class="inline-block px-5 py-2 rounded-full border border-outline-variant text-tertiary-container font-body-md peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container transition-all cursor-hover-target">Web Design</span>
</label>
<label class="cursor-pointer">
<input class="peer sr-only" name="needs" type="checkbox" value="development"/>
<span class="inline-block px-5 py-2 rounded-full border border-outline-variant text-tertiary-container font-body-md peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container transition-all cursor-hover-target">Development</span>
</label>
<label class="cursor-pointer">
<input class="peer sr-only" name="needs" type="checkbox" value="strategy"/>
<span class="inline-block px-5 py-2 rounded-full border border-outline-variant text-tertiary-container font-body-md peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container transition-all cursor-hover-target">Strategy</span>
</label>
</div>
</fieldset>
</div>
<!-- Budget -->
<div class="relative group">
<label class="font-body-md text-body-md text-tertiary-container block mb-4 transition-colors group-focus-within:text-primary" for="budget">Estimated Budget</label>
<select class="glass-input w-full pb-3 text-on-background font-body-lg bg-transparent cursor-pointer cursor-hover-target" id="budget" name="budget">
<option disabled="" selected="" value="">Select a range</option>
<option value="10k-25k">$10k - $25k</option>
<option value="25k-50k">$25k - $50k</option>
<option value="50k-100k">$50k - $100k</option>
<option value="100k+">$100k+</option>
</select>
</div>
<!-- Message -->
<div class="relative group">
<label class="font-body-md text-body-md text-tertiary-container block mb-2 transition-colors group-focus-within:text-primary" for="message">Project Details</label>
<textarea aria-required="true" class="glass-input w-full pb-3 text-on-background font-body-lg resize-none" id="message" name="message" placeholder="Tell us about your goals, timeline, and any specific challenges..." required="" rows="4"></textarea>
</div>
<div class="pt-6">
<button class="btn-primary w-full md:w-auto px-10 py-4 rounded-full font-headline-md text-body-lg flex items-center justify-center gap-3 cursor-hover-target group" type="submit">
                                Send Project Inquiry
                                <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform" style="font-variation-settings: 'FILL' 0;">arrow_forward</span>
</button>
</div>
</form>
</div>
</div>
</div>
</main>
<!-- Footer -->

<!-- Custom Cursor Logic -->
`;
