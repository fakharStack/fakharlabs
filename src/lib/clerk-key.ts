/**
 * Validates whether a Clerk publishable key is well-formed and non-placeholder.
 * Clerk keys format: pk_test_<base64>$ or pk_live_<base64>$
 */
export function isValidClerkPublishableKey(key: string | undefined | null): boolean {
    if (!key || typeof key !== "string") return false;
    const trimmed = key.trim();
    if (
      trimmed.length < 20 ||
      trimmed.includes("xxxx") ||
      trimmed.includes("placeholder") ||
      trimmed.includes("YOUR_") ||
      trimmed === "pk_test_" ||
      trimmed === "pk_live_"
    ) {
      return false;
    }
    if (!/^(pk_test_|pk_live_)[a-zA-Z0-9+/_=-]+(\$)?$/.test(trimmed)) {
      return false;
    }
    try {
      let raw = trimmed.replace(/^(pk_test_|pk_live_)/, "");
      if (raw.endsWith("$")) {
        raw = raw.slice(0, -1);
      }
      const standardB64 = raw.replace(/-/g, "+").replace(/_/g, "/");
      const padded = standardB64.padEnd(
        standardB64.length + ((4 - (standardB64.length % 4)) % 4),
        "=",
      );
      const decoded =
        typeof atob === "function"
          ? atob(padded)
          : typeof Buffer !== "undefined"
            ? Buffer.from(padded, "base64").toString("utf-8")
            : "";
      return decoded.length > 0 && decoded.includes(".");
    } catch {
      return false;
    }
  }
  
  export const isClerkConfigured = Boolean(
    typeof import.meta !== "undefined" &&
    isValidClerkPublishableKey(import.meta.env?.["VITE_CLERK_PUBLISHABLE_KEY"]),
  );
  