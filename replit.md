# SkillNex - Next.js SaaS MVP

## Overview
SkillNex is a SaaS platform for skill development and tracking, built with Next.js App Router.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 with shadcn/ui components
- **Linting:** ESLint with next/core-web-vitals
- **Auth:** Supabase (email + password)
- **React:** v19

## Project Structure
```
app/                   # Next.js App Router
  layout.tsx           # Root layout (wraps with AuthProvider)
  providers.tsx        # Client-side providers (AuthProvider)
  page.tsx             # Landing page (redirects to dashboard if logged in)
  not-found.tsx        # 404 page
  globals.css          # Global styles and CSS variables
  (auth)/              # Auth route group
    layout.tsx         # Centered layout for auth pages
    login/page.tsx     # Login + signup page
  (dashboard)/         # Dashboard route group
    layout.tsx         # Dashboard layout
    dashboard/page.tsx # Protected dashboard page
  api/                 # API route handlers
components/            # React components
  ui/                  # shadcn/ui components
hooks/                 # Custom React hooks
lib/                   # Utility functions
  utils.ts             # cn() helper
  constants.ts         # Site config
  supabaseClient.ts    # Supabase client instance
  AuthContext.tsx       # Auth context provider + useAuth hook
types/                 # TypeScript type definitions
public/                # Static assets
```

## Auth Flow
- `/` — Landing page, redirects to `/dashboard` if authenticated
- `/login` — Login/signup form (email + password via Supabase)
- `/dashboard` — Protected, redirects to `/login` if not authenticated

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key

## Path Aliases
- `@/*` maps to the project root

## Running
- Dev server: `npx next dev -p 5000`
- Build: `npx next build`
- Lint: `npx next lint`
