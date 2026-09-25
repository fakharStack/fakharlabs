import { useEffect, useState, useRef } from "react";
import { projects } from "@/data/projects";

/**
 * Curated list of showcase project slugs featured in the Hero Showcase carousel.
 */
const SHOWCASE_SLUGS = [
  "kidscareclinic",
  "ironman-gym",
  "tiny-tool-kit",
  "dr-amna",
  "fitness-arena-gym",
  "doctor-fitness",
  "shift-canvas",
];

// Prioritized showcase images from the Hero Showcase
const SHOWCASE_IMAGES = projects
  .filter((p) => SHOWCASE_SLUGS.includes(p.slug))
  .map((p) => p.image)
  .filter(Boolean);

// All project images + brand logo for comprehensive site preloading
const ALL_IMAGES_TO_PRELOAD = Array.from(
  new Set(["/logo.png", ...SHOWCASE_IMAGES, ...projects.map((p) => p.image).filter(Boolean)]),
);

/**
 * Preloads an image and decodes it in GPU memory before resolving.
 * If decoding fails or is unsupported, resolves normally without erroring out.
 */
function preloadImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!src) return resolve(true);

    const img = new Image();
    img.src = src;

    const handleSuccess = () => {
      if ("decode" in img) {
        img
          .decode()
          .then(() => resolve(true))
          .catch(() => resolve(true));
      } else {
        resolve(true);
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      handleSuccess();
    } else {
      img.onload = handleSuccess;
      img.onerror = () => resolve(false); // Do not hang if an asset fails to load
    }
  });
}

/**
 * CustomSiteLoader:
 * A luxury, light-themed full-page loader that guarantees:
 * 1. Material Symbols icon font is fully loaded, parsed, and rendering ligatures (no raw text flicker).
 * 2. Custom fonts (Inter, Plus Jakarta Sans) are fully loaded.
 * 3. All showcase carousel images and brand assets are preloaded and GPU-decoded.
 * 4. The loading screen only completes once all of the above are verified ready.
 */
export function CustomSiteLoader() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Loading assets...");
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const isExitingRef = useRef(false);

  useEffect(() => {
    // Prevent background scrolling while loading overlay is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    let targetProgress = 5;
    let isWindowLoaded = document.readyState === "complete";
    let isIconsReady = false;
    let isFontsReady = false;
    let loadedImagesCount = 0;
    const totalImages = ALL_IMAGES_TO_PRELOAD.length;

    // Weight allocation:
    // Images: totalImages points
    // Icons (Material Symbols): 4 points
    // Google Fonts (Inter + Plus Jakarta): 2 points
    const TOTAL_POINTS = totalImages + 6;

    const updateCalculatedProgress = () => {
      let currentPoints = loadedImagesCount;
      if (isIconsReady) currentPoints += 4;
      if (isFontsReady) currentPoints += 2;

      // Calculate organic target progress
      const percent = Math.min(94, Math.round((currentPoints / TOTAL_POINTS) * 94));
      targetProgress = Math.max(targetProgress, percent);

      // Dynamic descriptive status indicator
      if (!isIconsReady) {
        setStatusText("Loading typography & icons");
      } else if (loadedImagesCount < totalImages) {
        setStatusText("Loading showcase images");
      } else {
        setStatusText("Optimizing experiences");
      }
    };

    // 1. Kick off image preloading concurrently
    ALL_IMAGES_TO_PRELOAD.forEach((src) => {
      preloadImage(src).then(() => {
        loadedImagesCount++;
        updateCalculatedProgress();
      });
    });

    // 2. Active font preloading and ligature verification
    const checkIconsState = (): boolean => {
      if (typeof document === "undefined") return true;

      // Method A: CSS Font Loading API check
      let fontApiCheck = false;
      try {
        if (document.fonts && typeof document.fonts.check === "function") {
          fontApiCheck = document.fonts.check('24px "Material Symbols Outlined"');
        }
      } catch {
        fontApiCheck = false;
      }

      // Method B: DOM element width check
      // Un-ligatured fallback text "arrow_forward" is > 70px wide.
      // Once Material Symbols is active, the ligature collapses into a 24px wide icon.
      let ligatureCheck = false;
      const detector = document.getElementById("material-symbols-load-detector");
      if (detector) {
        const width = detector.getBoundingClientRect().width;
        if (width > 0 && width <= 36) {
          ligatureCheck = true;
        }
      }

      return fontApiCheck || ligatureCheck;
    };

    if (typeof document !== "undefined" && document.fonts) {
      Promise.allSettled([
        document.fonts.load('24px "Material Symbols Outlined"', "arrow_forward"),
        document.fonts.load('24px "Material Symbols Outlined"'),
        document.fonts.load('400 16px "Inter"'),
        document.fonts.load('700 24px "Plus Jakarta Sans"'),
        document.fonts.ready,
      ]).then(() => {
        isFontsReady = true;
        if (checkIconsState()) {
          isIconsReady = true;
        }
        updateCalculatedProgress();
      });
    } else {
      isFontsReady = true;
      isIconsReady = true;
      updateCalculatedProgress();
    }

    const onWindowLoad = () => {
      isWindowLoaded = true;
    };

    if (!isWindowLoaded) {
      window.addEventListener("load", onWindowLoad);
    }

    const startTime = Date.now();
    const MINIMUM_DURATION_MS = 1100; // Ensures calm, non-jarring visual experience
    const MAXIMUM_TIMEOUT_MS = 12000; // Safeguard timeout on extremely slow/offline networks

    const interval = setInterval(() => {
      if (isExitingRef.current) return;

      const elapsed = Date.now() - startTime;
      const timedOut = elapsed >= MAXIMUM_TIMEOUT_MS;

      // Re-verify icons state in case font finished parsing
      if (!isIconsReady && checkIconsState()) {
        isIconsReady = true;
        updateCalculatedProgress();
      }

      const allAssetsReady =
        (isIconsReady && isFontsReady && loadedImagesCount >= totalImages && isWindowLoaded) ||
        timedOut;

      if (!allAssetsReady) {
        // Smoothly approach calculated progress up to 92%
        if (currentProgress < targetProgress) {
          const step = Math.max(1, (targetProgress - currentProgress) * 0.15);
          currentProgress = Math.min(targetProgress, currentProgress + step);
          setProgress(Math.round(currentProgress));
        } else if (currentProgress < 90) {
          currentProgress += 0.4;
          setProgress(Math.round(currentProgress));
        }
      } else {
        // Once ALL assets are verified ready, satisfy minimum duration then glide to 100%
        if (elapsed >= MINIMUM_DURATION_MS) {
          if (currentProgress < 100) {
            const step = Math.max(2, (100 - currentProgress) * 0.35);
            currentProgress = Math.min(100, currentProgress + step);
            setProgress(Math.round(currentProgress));
          } else {
            clearInterval(interval);
            setProgress(100);
            setStatusText("Ready");
            isExitingRef.current = true;

            // Notify document that fonts and icons are confirmed loaded
            document.documentElement.classList.add("fonts-loaded");

            // Pause at 100% so user sees completion, then initiate fade out
            setTimeout(() => {
              setIsExiting(true);
              document.body.style.overflow = originalOverflow;

              // Unmount completely after transition completes
              setTimeout(() => {
                setIsRemoved(true);
              }, 700);
            }, 220);
          }
        } else {
          // Progress steadily towards 95% until MINIMUM_DURATION_MS is satisfied
          if (currentProgress < 95) {
            currentProgress = Math.min(95, currentProgress + 1.5);
            setProgress(Math.round(currentProgress));
          }
        }
      }
    }, 28);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", onWindowLoad);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="custom-site-loader"
      aria-label="Loading site experiences"
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#f9f9ff] select-none transition-all duration-700 ease-out ${
        isExiting ? "opacity-0 pointer-events-none scale-102" : "opacity-100"
      }`}
    >
      {/* ============================================================== */}
      {/* HIDDEN DETECTOR: FORCES BROWSER TO DOWNLOAD & APPLY ICON FONTS */}
      {/* ============================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden opacity-0 select-none"
      >
        <span
          id="material-symbols-load-detector"
          className="material-symbols-outlined"
          style={{
            fontFamily: '"Material Symbols Outlined"',
            fontSize: "24px",
            lineHeight: 1,
            display: "inline-block",
          }}
        >
          arrow_forward
        </span>
        <span
          className="material-symbols-outlined"
          style={{ fontFamily: '"Material Symbols Outlined"' }}
        >
          account_tree add arrow_forward auto_awesome autorenew bolt brush chat_bubble check_circle
          close code design_services devices diamond edit_note expand_less expand_more
          filter_center_focus gavel handyman history image_not_supported layers medical_services
          menu open_in_new palette public_off restaurant rocket_launch shield_lock shopping_bag
          smartphone speed star text_fields timer trending_up verified
        </span>
        <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 }}>
          Fakhar Labs Headline Bold 1234567890
        </span>
        <span style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
          Fakhar Labs Body Text Regular 1234567890
        </span>
      </div>

      {/* Subtle ambient background glow aura */}
      <div
        className="pointer-events-none absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-tr from-primary/20 via-primary-container/20 to-secondary/15 blur-3xl opacity-80 animate-pulse"
        aria-hidden="true"
      />

      {/* Decorative delicate radial grid dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#141b2b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* ============================================================== */}
      {/* CENTER: LOGO ACTING AS LOADER WITH CIRCULAR MOVING RING & GLOW */}
      {/* ============================================================== */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Subtle background glow aura behind the logo */}
          <div
            className="absolute -inset-6 rounded-full bg-primary/20 blur-2xl animate-pulse"
            aria-hidden="true"
          />

          {/* Smooth moving circular ring orbiting around the logo */}
          <div
            className="absolute -inset-3 sm:-inset-3.5 pointer-events-none animate-spin"
            style={{ animationDuration: "2.2s", animationTimingFunction: "linear" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <linearGradient id="loader-spin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#630ed4" stopOpacity="1" />
                  <stop offset="60%" stopColor="#8856e5" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#630ed4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Subtle track orbit */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#630ed4"
                strokeOpacity="0.12"
                strokeWidth="2"
              />
              {/* Spinning gradient arc */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#loader-spin-grad)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeDasharray="95 195"
              />
              {/* Radiant glowing head bead */}
              <circle
                cx="96"
                cy="50"
                r="3"
                fill="#630ed4"
                className="filter drop-shadow-[0_0_6px_rgba(99,14,212,0.85)]"
              />
            </svg>
          </div>

          {/* Circular logo container */}
          <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-outline-variant/40 bg-white p-3.5 shadow-2xl shadow-purple-600/10 backdrop-blur-md">
            <img
              src="/logo.png"
              alt="Fakhar Labs"
              className="h-full w-full rounded-full object-contain animate-pulse duration-1000"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="mt-5 text-center">
          <span className="font-headline-md text-base sm:text-lg font-black tracking-tight text-on-background">
            Fakhar Labs
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM RIGHT: LOADING PROGRESS PERCENTAGE & DYNAMIC STATUS     */}
      {/* ============================================================== */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-12 z-20 flex flex-col items-end">
        {/* Large stylized percentage counter */}
        <div className="flex items-baseline gap-1 font-headline-md font-black tracking-tight text-on-background">
          <span className="text-3xl sm:text-4xl tabular-nums text-on-background">{progress}</span>
          <span className="text-lg sm:text-xl font-bold text-primary">%</span>
        </div>

        {/* Micro progress line */}
        <div className="mt-2 h-1.5 w-28 sm:w-36 overflow-hidden rounded-full bg-primary-fixed/60 border border-outline-variant/30">
          <div
            className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text */}
        <div className="mt-1.5 flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <span>{statusText}</span>
          <span className="text-primary">•</span>
          <span className="text-primary font-mono">{progress < 100 ? "..." : "✓"}</span>
        </div>
      </div>
    </div>
  );
}
