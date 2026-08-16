/**
 * WhatsApp click-to-chat entry point.
 *
 * The number is never rendered as visible text — only an icon (plus an
 * accessible label). Styling stays inside the purple/white design language
 * rather than the default bright-green WhatsApp treatment.
 */

const WHATSAPP_NUMBER = "923187607924";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.13.82.84-3.05-.19-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24Zm-2.5 4.1c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.43 0 1.43 1.05 2.81 1.19 3 .14.2 2.02 3.23 4.95 4.4 2.44.96 2.93.77 3.46.72.53-.05 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.14-.19.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.3-.02-.46.13-.6.13-.14.34-.36.51-.55.17-.2.22-.34.34-.53.11-.2.05-.37-.03-.51-.07-.15-.66-1.6-.9-2.18-.19-.46-.39-.47-.56-.47h-.4Z" />
    </svg>
  );
}

/** Icon-only WhatsApp action with a ≥44px target and an accessible label. */
export function WhatsAppIconButton({
  message,
  tone = "light",
  label = "Chat with us on WhatsApp",
  className = "",
}: {
  message?: string;
  tone?: "light" | "dark";
  label?: string;
  className?: string;
}) {
  const toneClass =
    tone === "dark"
      ? "border-white/15 text-surface-variant/80 hover:border-primary-fixed/60 hover:text-primary-fixed"
      : "glass-panel border-primary/20 text-on-surface-variant hover:text-primary hover:-translate-y-0.5";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`group grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-300 ${toneClass} ${className}`}
    >
      <WhatsAppGlyph className="h-5 w-5" />
    </a>
  );
}

/** Wider WhatsApp action for the contact page — still no number in the text. */
export function WhatsAppLinkButton({
  message,
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className={`glass-panel inline-flex min-h-11 items-center gap-3 rounded-full border border-primary/20 px-5 py-2.5 font-body-md text-sm font-medium text-on-surface-variant transition-all duration-300 hover:-translate-y-0.5 hover:text-primary ${className}`}
    >
      <WhatsAppGlyph className="h-5 w-5 shrink-0" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
