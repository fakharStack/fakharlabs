/**
 * Lightweight, client-only currency preference.
 *
 * The pricing page keeps currency in the URL so links stay shareable; this hook
 * remembers the last choice so a visitor who lands on Contact from the navbar
 * still sees the currency they were browsing. No backend, no cookies.
 */
import { useEffect, useState } from "react";
import { isCurrencyCode, type CurrencyCode } from "@/data/pricing";

const STORAGE_KEY = "fakharlabs.currency";

export function readStoredCurrency(): CurrencyCode | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isCurrencyCode(value) ? value : null;
  } catch {
    return null;
  }
}

export function storeCurrency(currency: CurrencyCode): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    /* private mode / storage disabled — preference simply isn't persisted */
  }
}

/** Resolves after hydration to avoid SSR/client markup mismatches. */
export function useStoredCurrency(): CurrencyCode | null {
  const [stored, setStored] = useState<CurrencyCode | null>(null);
  useEffect(() => {
    setStored(readStoredCurrency());
  }, []);
  return stored;
}
