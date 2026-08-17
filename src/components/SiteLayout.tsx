import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { WhatsAppIconButton } from "./site/WhatsAppButton";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/pricing", label: "Pricing" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const serviceLinks = [
  { to: "/services/web-design", label: "Website Design", icon: "brush" },
  { to: "/services/web-development", label: "Web Development", icon: "code" },
  { to: "/services/landing-pages", label: "Landing Pages", icon: "rocket_launch" },
  { to: "/services/website-redesign", label: "Website Redesign", icon: "autorenew" },
  { to: "/services/seo-performance", label: "SEO & Performance", icon: "trending_up" },
] as const;

function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={`fixed top-0 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-container-max -translate-x-1/2 rounded-2xl glass-panel glass-nav transition-all duration-300 sm:w-[calc(100%-3rem)] md:w-[92%] md:rounded-full ${
        scrolled ? "mt-2 shadow-[0_10px_40px_-12px_rgba(99,14,212,0.25)] md:mt-3" : "mt-3 soft-shadow md:mt-6"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8 lg:py-3">
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2 font-headline-md text-lg font-extrabold tracking-tighter text-on-background transition-all hover:scale-[1.02] active:scale-95 sm:text-xl xl:text-2xl"
        >
          <img
            src="/logo.png"
            alt="Fakhar Labs"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-contain"
            decoding="async"
          />
          <span className="whitespace-nowrap">Fakhar Labs</span>
        </Link>
        <div className="hidden items-center gap-3 font-body-md text-[13.5px] font-medium tracking-tight lg:flex lg:gap-4 xl:gap-7 xl:text-[15px]">
          {navLinks.map((l) =>
            l.to === "/services" ? (
              <div key={l.to} className="group relative">
                <Link
                  to={l.to}
                  className="flex items-center gap-1 text-on-surface-variant transition-colors duration-300 hover:text-primary"
                  activeProps={{ className: "text-primary font-bold" }}
                >
                  {l.label}
                  <span className="material-symbols-outlined text-base transition-transform group-hover:rotate-180">
                    expand_more
                  </span>
                </Link>
                <div className="pointer-events-none absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="rounded-2xl glass-panel soft-shadow p-2">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-on-surface-variant transition-colors hover:bg-surface-variant/60 hover:text-primary"
                      >
                        <span className="material-symbols-outlined text-primary text-xl">{s.icon}</span>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="text-on-surface-variant transition-colors duration-300 hover:text-primary"
                activeProps={{ className: "text-primary font-bold" }}
              >
                {l.label}
              </Link>
            ),
          )}
        </div>
        {/* Wrapper owns the responsive visibility: .btn-primary declares
            display:inline-flex in styles.css, which would otherwise win over
            Tailwind's `hidden` and leak the CTA onto small screens. */}
        <span className="hidden shrink-0 lg:block">
          <Link
            to="/contact"
            className="btn-primary whitespace-nowrap !px-5 !py-2 text-sm xl:!px-6 xl:text-base"
          >
            Get Started
          </Link>
        </span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-on-background transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
        >
          <span className="material-symbols-outlined text-3xl">{open ? "close" : "menu"}</span>
        </button>
      </div>
      {open && (
        <div
          id="mobile-nav"
          className="mobile-nav-panel max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain border-t border-outline-variant/30 px-5 py-5 font-body-md text-body-md lg:hidden"
        >
        <div className="flex min-w-0 flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-2 py-3 text-on-surface-variant transition-colors hover:bg-primary/5 hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="my-2 flex flex-col border-l border-outline-variant/40 pl-3">
            {serviceLinks.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-2 rounded-lg px-2 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-primary/5 hover:text-primary"
              >
                <span aria-hidden="true" className="material-symbols-outlined shrink-0 text-lg text-primary">
                  {s.icon}
                </span>
                <span className="min-w-0 truncate">{s.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary min-h-12 grow !py-3"
            >
              Get Started
            </Link>
            <WhatsAppIconButton message="Hi Fakhar Labs — I'd like to discuss a project." />
          </div>
        </div>
        </div>
      )}
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#111827] pt-16 pb-6 md:pt-20">
      <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-3">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.01]"
            >
              <img
                src="/logo.png"
                alt="Fakhar Labs"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-full object-contain"
                decoding="async"
              />

              <span className="font-headline-md text-xl font-extrabold tracking-tight text-white">
                Fakhar Labs
              </span>
            </Link>

            <p className="mt-4 max-w-sm font-body-md text-sm leading-relaxed text-slate-300">
              Fakhar Labs builds high-quality websites, web applications and
              AI-powered digital products for businesses — engineered for
              speed, clarity and growth.
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-2 md:col-start-4">
            <h3 className="mb-5 font-label-caps text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Services
            </h3>

            <nav className="flex flex-col gap-3.5" aria-label="Footer services">
              {serviceLinks.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="w-fit font-body-md text-sm text-slate-300 transition-colors duration-200 hover:text-primary-fixed"
                >
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="mb-5 font-label-caps text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Resources
            </h3>

            <nav className="flex flex-col gap-3.5" aria-label="Footer resources">
              <Link
                to="/work"
                className="w-fit font-body-md text-sm text-slate-300 transition-colors duration-200 hover:text-primary-fixed"
              >
                Work
              </Link>
              <Link
                to="/process"
                className="w-fit font-body-md text-sm text-slate-300 transition-colors duration-200 hover:text-primary-fixed"
              >
                Process
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="mb-5 font-label-caps text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Company
            </h3>

            <nav className="flex flex-col gap-3.5" aria-label="Footer company">
              <Link
                to="/about"
                className="w-fit font-body-md text-sm text-slate-300 transition-colors duration-200 hover:text-primary-fixed"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="w-fit font-body-md text-sm text-slate-300 transition-colors duration-200 hover:text-primary-fixed"
              >
                Contact
              </Link>

              <Link
                to="/privacy"
                className="w-fit font-body-md text-sm text-slate-300 transition-colors duration-200 hover:text-primary-fixed"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="w-fit font-body-md text-sm text-slate-300 transition-colors duration-200 hover:text-primary-fixed"
              >
                Terms
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="mb-5 font-label-caps text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Contact
            </h3>

            <p className="max-w-xs font-body-md text-sm leading-relaxed text-slate-300">
              Tell us what you're building — we'll reply within one business
              day.
            </p>

            <a
              href="mailto:fakharlabs@gmail.com"
              className="mt-4 inline-flex items-center gap-2 font-body-md text-sm text-slate-300 transition-colors duration-200 hover:text-primary-fixed"
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[18px]"
              >
                mail
              </span>
              fakharlabs@gmail.com
            </a>

            <Link
              to="/contact"
              className="group mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 font-body-md text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
            >
              Get Started

              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1"
              >
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-5 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="font-body-md text-xs text-slate-400">
            © {new Date().getFullYear()} Fakhar Labs. All rights reserved.
          </p>

          <p className="font-body-md text-xs text-slate-500">
            Designed &amp; built in-house.
          </p>
        </div>
      </div>
    </footer>
  );
}


export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F3FF] text-on-background">
      <TopNav />
      {children}
      <SiteFooter />
    </div>
  );
}

/** Renders a converted design screen and wires up its scroll-reveal animations. */
export function ScreenContent({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Image hygiene: real alt text, lazy loading below the fold, async decode.
    root.querySelectorAll<HTMLImageElement>("img").forEach((img, index) => {
      const described = img.getAttribute("data-alt");
      if (!img.getAttribute("alt") && described) img.setAttribute("alt", described.slice(0, 160));
      if (!img.getAttribute("alt")) img.setAttribute("alt", "");
      img.decoding = "async";
      if (index > 0) img.loading = "lazy";
    });

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = Array.from(root.querySelectorAll<HTMLElement>(".scroll-reveal"));
    // Arm the hidden state only after JS is confirmed running (see styles.css).
    els.forEach((el) => el.classList.add("reveal-armed"));
    if (reduceMotion) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="page-enter flex w-full max-w-full flex-grow flex-col overflow-x-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
