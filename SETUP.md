# Aether Studio — Setup & Deployment Guide

This project is a standalone React + TanStack Start application.
It has **no runtime dependency on Lovable**. Everything below assumes you are
working locally and deploying to Vercel with your own accounts.

Stack:

- **Frontend / SSR:** React 19 + TanStack Start (Vite), deployed serverless
- **Auth:** Clerk (your account) — admin only, the public site needs no login
- **Database:** Supabase Postgres (your project) — reached only through
  server functions using the service role key
- **Hosting:** Vercel + your custom domain

---

## 1. Required accounts

| Service  | Purpose                    | URL |
| -------- | -------------------------- | --- |
| Clerk    | Admin authentication       | https://clerk.com |
| Supabase | Postgres database          | https://supabase.com |
| Vercel   | Hosting / serverless build | https://vercel.com |
| Node 20+ | Local development          | https://nodejs.org |

---

## 2. Clerk account setup

1. Create a Clerk account and a new **Application**.
2. Name it e.g. `Aether Studio Admin`.
3. Under **User & Authentication → Email, Phone, Username**, enable
   *Email address* + *Password* (and any social provider you want).
4. Under **Restrictions**, turn **Sign-ups** OFF — this is a private admin area
   and the app ships with **no public signup UI at all** (`/admin/login` renders
   Clerk Sign In only; the "create account" footer is hidden). Disabling sign-ups
   in the Clerk Dashboard is **required** so nobody can register via Clerk's own
   hosted pages or API.
   You can still add teammates manually: Clerk Dashboard → **Users → Create user**.
   Remember to add each new admin's email to `ADMIN_EMAILS` (or their user id to
   `ADMIN_CLERK_USER_IDS`) — otherwise the admin API denies them.

## 3. Clerk application setup

1. Create your own admin user (Clerk Dashboard → **Users → Create user**).
2. Copy the user's **User ID** (`user_...`) or remember the email — you will
   put one of them in the admin allowlist (step 10).

## 4. Clerk keys

Clerk Dashboard → **API Keys**:

- `Publishable key` → `VITE_CLERK_PUBLISHABLE_KEY`
- `Secret key` → `CLERK_SECRET_KEY` (server only, never expose)

## 5. Supabase project creation

1. Supabase → **New project**, pick a region close to your users.
2. Save the database password somewhere safe.

## 6. Supabase URL / key retrieval

Supabase → **Project Settings → API**:

- `Project URL` → `VITE_SUPABASE_URL` **and** `SUPABASE_URL`
- `anon` / `publishable` key → `VITE_SUPABASE_ANON_KEY`
- `service_role` / `secret` key → `SUPABASE_SERVICE_ROLE_KEY` (server only)

## 7. Running `supabase/schema.sql`

1. Open Supabase → **SQL Editor → New query**.
2. Paste the whole contents of `supabase/schema.sql`.
3. Click **Run**. It creates every table, index, trigger, grant and policy.

The script is idempotent-by-design only for a *fresh* project — run it once.

## 8. Verifying tables

Supabase → **Table Editor**. You should see:

`leads`, `clients`, `projects`, `tasks`, `notifications`, `activity_logs`,
`agency_settings`, plus the optional `users` / `user_roles` fallback tables.

## 9. Verifying RLS

Supabase → **Authentication → Policies**:

- Every table has **RLS enabled**.
- The only public policy is `Public can submit contact leads`
  (INSERT on `leads`, restricted to `source = 'Website'`, `status = 'New'`,
  `notes IS NULL`).
- No table is publicly readable. The admin dashboard reads through the
  service role key from server-side code only.

## 10. Environment variables

Copy `.env.example` to `.env` and fill it in:

```bash
cp .env.example .env
```

| Variable | Scope | Notes |
| --- | --- | --- |
| `VITE_CLERK_PUBLISHABLE_KEY` | client | Clerk publishable key |
| `VITE_SUPABASE_URL` | client | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | client | Used **only** by the public contact form |
| `CLERK_SECRET_KEY` | **server only** | Verifies the admin session |
| `CLERK_PUBLISHABLE_KEY` | **server only** | Same value as the publishable key; required by Clerk session verification |
| `SUPABASE_URL` | **server only** | Same URL as above |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Bypasses RLS — never expose |
| `ADMIN_EMAILS` | **server only** | Comma-separated admin emails |
| `ADMIN_CLERK_USER_IDS` | **server only** | Alternative allowlist by Clerk id |

Set at least one of `ADMIN_EMAILS` / `ADMIN_CLERK_USER_IDS`, otherwise every
admin request is denied. (A row in `user_roles` with `role = 'admin'` and the
Clerk user id also works as a fallback.)

## 11. Local installation

```bash
npm install
```

## 12. Local development

```bash
npm run dev      # http://localhost:8080
```

Public site: `/`  ·  Admin: `/admin/login`

## 13. Clerk configuration (local)

In Clerk → **Domains / Paths**, allow `http://localhost:8080`.
Sign-in is rendered in-app by the Clerk `<SignIn />` component at
`/admin/login`, so no hosted-page URLs are required.

## 14. Supabase configuration

Nothing else to configure. The app does **not** use Supabase Auth:

- the browser only ever inserts leads with the anon key under one narrow policy
- all admin reads/writes go through server functions with the service role key

## 15. Vercel deployment

1. Push the project to GitHub.
2. Vercel → **Add New → Project → Import** the repo.
3. Framework preset: **Other** (`vercel.json` already sets the build command).
4. Build command: `npm run build` · Install: `npm install`.
5. Deploy. The build emits a serverless Nitro bundle — there is no long-running
   Node server.

If the deploy does not auto-detect Vercel, add the env var
`NITRO_PRESET=vercel` in project settings and redeploy.

## 16. Vercel environment variables

Add **all** variables from step 10 in **Settings → Environment Variables**
(Production + Preview). Server-only variables must NOT be prefixed with `VITE_`.

## 17. Custom domain

Vercel → **Settings → Domains → Add**, then point your DNS as instructed
(A record or CNAME). Wait for the SSL certificate to issue.

## 18. Production Clerk setup

1. In Clerk, create/switch to a **Production instance**.
2. Add your custom domain under **Domains** and complete the DNS records.
3. Replace the Vercel env values with the live `pk_live_...` / `sk_live_...`
   keys and redeploy.

## 19. Production Supabase setup

- Use the same project, or create a separate production project and re-run
  `supabase/schema.sql`.
- Consider enabling **Point-in-Time Recovery** / daily backups.
- Rotate the service role key if it was ever shared.

## 20. Contact form testing

1. Open `/contact` on the deployed site and submit the form.
2. Supabase → `leads` should show a new row with `source = Website`,
   `status = New`.
3. A `notifications` row and an `activity_logs` row are created automatically
   by the `leads_after_insert` trigger.

## 21. Admin login testing

1. Go to `/admin/login`, sign in with your Clerk user.
2. You should land on `/admin/dashboard` with live counts.
3. Test: create a lead, change status, convert to client, create a project,
   add a task, complete it, mark notifications read, save settings.
4. Sign out and confirm `/admin/dashboard` bounces you back to the login page,
   and that admin data cannot be fetched while signed out.

## 22. Security checklist

- [ ] `CLERK_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` exist only as
      server-side env vars (no `VITE_` prefix, not in the repo).
- [ ] `.env` is git-ignored; `.env.example` holds placeholders only.
- [ ] RLS is enabled on every table; the only public policy is the lead insert.
- [ ] `ADMIN_EMAILS` / `ADMIN_CLERK_USER_IDS` contains only you.
- [ ] Every admin server function runs through the Clerk-verifying middleware —
      route guards are UX only, the server check is the real boundary.
- [ ] Destructive actions (delete lead/client/project/task) ask for
      confirmation in the UI.
- [ ] Clerk sign-ups are disabled in production.

## 23. Troubleshooting

| Symptom | Fix |
| --- | --- |
| "Missing Clerk key" screen | `VITE_CLERK_PUBLISHABLE_KEY` not set at build time |
| Admin pages show "Forbidden: admin access required" | Your Clerk email/id is not in `ADMIN_EMAILS` / `ADMIN_CLERK_USER_IDS` |
| "Unauthorized" on every admin call | `CLERK_SECRET_KEY` missing on the server, or the Clerk domain does not match the site domain |
| Contact form fails | `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` wrong, or `schema.sql` was not run |
| Admin lists are empty but tables have rows | `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_URL` missing on the server |
| Build fails on Vercel | Ensure Node 20+, and try `NITRO_PRESET=vercel` |

## 24. Future updates

```bash
git pull
npm install
npm run build     # verify locally
git push          # Vercel redeploys automatically
```

Schema changes: write the SQL, run it in the Supabase SQL Editor, and append it
to `supabase/schema.sql` so a fresh environment can be recreated from scratch.
