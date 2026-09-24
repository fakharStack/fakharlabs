# Fakhar Labs — Digital Experiences

> High-performance digital agency portfolio, interactive client showcase, and administrative management platform built with React 19, TanStack Start (SSR), and Tailwind CSS.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-SSR-ff4154.svg)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38bdf8.svg)](https://tailwindcss.com/)

---

## Overview

**Fakhar Labs** crafts bespoke, high-conversion websites, modern web applications, and digital experiences for ambitious businesses and brands. Engineered with speed, responsive precision, and contemporary aesthetics, this platform serves as the agency's primary digital flagship and client collaboration gateway.

### Key Features

- **Brand Identity & Favicon:**
  - Official Fakhar Labs purple brand logo (`logo.png`) configured directly as the site favicon and touch icon.
  - Multi-resolution `favicon.ico` companion generated directly from the original brand logo.
- **Interactive Hero Showcase:**
  - Dynamic dual-mode project showcase carousel (vertical bottom-to-top fluid motion on desktop side-by-side view, curved layered flow on mobile and stacked viewports).
  - Touch gesture support, keyboard navigation, and zero-flicker client transitions.
- **Client Portfolio Showcase:**
  - Curated, live client projects with interactive case studies, tech stack indicators, and verified external demo links (e.g. *Kids Care Clinic*, *Iron Man Gym*, *Tiny Tool Kit*, *Dr. Amna*, *Fitness Arena*, *Dental Parlor*, *CaseConvertor*, *Doctor Fitness*, *Shift Canvas*).
- **Service Modules & Funnels:**
  - In-depth service breakdowns for Website Design, Full-Stack Web Development, High-Conversion Landing Pages, and Complete Website Redesigns.
  - Transparent pricing tiers, interactive project scope estimator, and streamlined consultation booking.
- **Direct Client Communication:**
  - Non-intrusive floating WhatsApp instant-connect launcher and structured project inquiry forms with real-time validation.
- **Secure Admin Management:**
  - Private admin area powered by Clerk authentication and Supabase Postgres for lead tracking and content management.

---

## Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/vite` |
| **Routing** | [TanStack Router](https://tanstack.com/router) (file-based routing) |
| **State & Cache** | [TanStack Query](https://tanstack.com/query) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), Sonner |
| **Authentication** | [Clerk](https://clerk.com/) (private admin portal) |
| **Database** | [Supabase](https://supabase.com/) Postgres (service-role server functions) |
| **Build & Tooling** | [Vite 8](https://vitejs.dev/) + Nitro Engine |

---

## Quick Start

### Prerequisites

- Node.js 20+ installed
- npm or bun

### 1. Clone & Install

```bash
git clone <repository-url>
cd fakhar-labs
npm install
```

### 2. Environment Configuration

Copy the example environment template:

```bash
cp .env.example .env
```

Configure your credentials in `.env`:

```env
# Clerk Authentication (Admin Area)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (Database)
VITE_SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=ey...

# Admin Permissions
ADMIN_EMAILS=your-email@example.com
```

### 3. Database Initialization (Optional for Admin)

If setting up the private admin dashboard, execute `supabase/schema.sql` in your Supabase SQL Editor.

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Structure

```
├── public/                     # Static assets (logo.png, favicon.ico, robots.txt)
├── src/
│   ├── components/
│   │   ├── site/               # Public site components (HeroShowcase, WhatsAppButton, etc.)
│   │   ├── admin/              # Private admin shell and data tables
│   │   └── ui/                 # Accessible Radix UI primitives
│   ├── data/
│   │   └── projects.ts         # Portfolio projects metadata and assets
│   ├── lib/                    # Utilities, Supabase clients, and server actions
│   ├── routes/                 # TanStack Router file-based route definitions
│   │   ├── __root.tsx          # Root HTML shell, SEO meta, favicon headers
│   │   ├── index.tsx           # Home page with hero, showcase, services, reviews
│   │   ├── services/           # Service catalog and dedicated service pages
│   │   ├── work/               # Portfolio grid and case studies
│   │   ├── pricing.tsx         # Pricing calculator and plans
│   │   ├── contact.tsx         # Contact and project inquiry form
│   │   └── admin/              # Private Clerk-authenticated admin routes
│   └── styles.css              # Tailwind CSS v4 design tokens and theme rules
├── supabase/
│   └── schema.sql              # Supabase Postgres database schema
├── package.json
└── vite.config.ts
```

---

## Available Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the local development server on port 3000 |
| `npm run build` | Compile and bundle production serverless assets |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all TypeScript and TSX files |
| `npm run format` | Format codebase using Prettier |

---

## Deployment

This project is configured for serverless deployment on [Vercel](https://vercel.com) via Nitro:

1. Import the Git repository into Vercel.
2. Ensure Build Command is set to `npm run build` and Output Directory is `.output`.
3. Add the production environment variables (`VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `VITE_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`).
4. Deploy!

Detailed database setup, RLS policies, and domain configuration guides are available in [SETUP.md](./SETUP.md).

---

## Brand & Attribution

Designed and maintained by **Fakhar Labs**. All rights reserved.
