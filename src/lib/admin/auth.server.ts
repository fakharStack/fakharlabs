import { createClerkClient } from "@clerk/backend";
import { getRequest } from "@tanstack/react-start/server";

function parseList(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Verifies the request carries a valid Clerk session AND that the signed-in
 * identity is an authorised admin. Authorisation sources, in order:
 *  1. ADMIN_CLERK_USER_IDS  (comma separated Clerk user ids)  — server-only env
 *  2. ADMIN_EMAILS          (comma separated email addresses) — server-only env
 *  3. public.user_roles     (row with role = 'admin' for the Clerk user id)
 * If none matches, access is denied. Never trust the client for this.
 */
export async function requireAdmin() {
  const request = getRequest();
  if (!request) {
    throw new Error("Unauthorized: no request available");
  }

  const secretKey = process.env["CLERK_SECRET_KEY"];
  if (!secretKey) {
    throw new Error("Missing CLERK_SECRET_KEY environment variable");
  }

  // `authenticateRequest` needs the publishable key too (it derives the
  // instance/frontend API and runs the handshake with it).
  const publishableKey =
    process.env["CLERK_PUBLISHABLE_KEY"] ?? process.env["VITE_CLERK_PUBLISHABLE_KEY"];
  if (!publishableKey) {
    throw new Error("Missing CLERK_PUBLISHABLE_KEY (or VITE_CLERK_PUBLISHABLE_KEY) environment variable");
  }

  const clerkClient = createClerkClient({ secretKey, publishableKey });
  // Clerk only needs the URL + headers (cookies / Authorization). Pass a
  // body-less copy: on POST server functions the original request body has
  // already been consumed, and cloning it throws.
  const requestState = await clerkClient.authenticateRequest(
    new Request(request.url, { method: "GET", headers: request.headers }),
  );

  if (!requestState.isSignedIn) {
    throw new Error("Unauthorized");
  }

  const auth = requestState.toAuth();
  if (!auth.userId) {
    throw new Error("Unauthorized: no user ID");
  }

  const allowedIds = parseList(process.env["ADMIN_CLERK_USER_IDS"]);
  if (allowedIds.includes(auth.userId.toLowerCase())) {
    return { userId: auth.userId };
  }

  const allowedEmails = parseList(process.env["ADMIN_EMAILS"]);
  if (allowedEmails.length) {
    const user = await clerkClient.users.getUser(auth.userId);
    const emails = user.emailAddresses.map((e) => e.emailAddress.toLowerCase());
    if (emails.some((email) => allowedEmails.includes(email))) {
      return { userId: auth.userId };
    }
  }

  // Fallback: role row in your own Supabase database.
  const { supabaseAdmin } = await import("@/lib/supabase.server");
  const { data: roles, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", auth.userId)
    .eq("role", "admin")
    .limit(1);

  if (error || !roles?.length) {
    throw new Error("Forbidden: admin access required");
  }

  return { userId: auth.userId };
}

export async function getSupabaseAdmin() {
  const { supabaseAdmin } = await import("@/lib/supabase.server");
  return supabaseAdmin;
}
