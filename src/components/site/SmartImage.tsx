import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  wrapperClassName?: string;
  eager?: boolean;
};

/**
 * Image with a shimmer placeholder that holds the aspect ratio (no layout shift),
 * a soft fade-in on load, and a friendly fallback if the asset fails.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  className = "",
  wrapperClassName = "",
  eager = false,
}: Props) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {state === "loading" && <div aria-hidden="true" className="skeleton absolute inset-0" />}
      {state === "error" ? (
        <div className="absolute inset-0 grid place-items-center bg-surface-container px-4 text-center">
          <p className="font-body-md text-sm text-on-surface-variant">
            <span className="material-symbols-outlined mb-1 block text-2xl text-primary">image_not_supported</span>
            Image unavailable
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            state === "ready" ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}
    </div>
  );
}
