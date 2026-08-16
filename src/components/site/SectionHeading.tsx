import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <Reveal className={`mb-10 max-w-3xl md:mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="font-label-caps text-label-caps uppercase text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-headline-lg text-2xl leading-tight text-on-background sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 font-body-md text-base text-on-surface-variant sm:text-lg">{intro}</p>
      )}
      {children}
    </Reveal>
  );
}
