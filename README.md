# Aether Studio

Marketing website + private admin dashboard for a web design agency.

- **Frontend:** React 19 + TanStack Start (Vite), SSR, deployed serverless
- **Auth:** Clerk (admin area only)
- **Database:** Supabase Postgres, accessed exclusively from server functions
- **Hosting:** Vercel

## Quick start

```bash
cp .env.example .env   # fill in your Clerk + Supabase values
npm install
npm run dev            # http://localhost:8080
```

Run `supabase/schema.sql` in your Supabase SQL Editor before first use.

Full A-to-Z instructions (accounts, keys, RLS, deployment, custom domain,
security checklist, troubleshooting): see [SETUP.md](./SETUP.md).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (serverless output) |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |

## Structure

```
src/routes/            public website + /admin pages (file-based routing)
src/components/admin/  admin shell and UI primitives
src/lib/admin/         Clerk-protected server functions (all DB access)
src/lib/supabase*.ts   browser (anon) and server (service role) clients
supabase/schema.sql    portable database schema
```

Secrets (`CLERK_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are server-only and
never reach the browser.
