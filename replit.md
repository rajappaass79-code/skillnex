# Skillonize Network - Next.js SaaS MVP

## Overview
Skillonize Network is a platform where educators connect and grow, built with Next.js App Router.

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
  page.tsx             # Home — redirects to /login
  not-found.tsx        # 404 page
  globals.css          # Global styles and CSS variables
  (auth)/              # Auth route group
    layout.tsx         # Centered layout for auth pages
    login/page.tsx     # Login + signup page
    complete-profile/page.tsx  # Profile creation form (post-signup)
  (dashboard)/         # Dashboard route group
    layout.tsx         # Dashboard layout
    dashboard/page.tsx # Protected dashboard page (requires profile)
  api/                 # API route handlers
components/            # React components
  ui/                  # shadcn/ui components
hooks/                 # Custom React hooks
lib/                   # Utility functions
  utils.ts             # cn() helper
  constants.ts         # Site config
  supabaseClient.ts    # Supabase client instance
  AuthContext.tsx       # Auth context provider + useAuth hook (includes profile state)
types/                 # TypeScript type definitions
  index.ts             # Profile type, SiteConfig
public/                # Static assets
```

## Auth + Profile Flow
- `/` — Redirects to `/login`
- `/login` — Login/signup form (email + password via Supabase)
- `/complete-profile` — Profile creation form (shown after first login if no profile exists)
- `/dashboard` — Protected, redirects to `/login` if not authenticated, to `/complete-profile` if no profile

## Supabase Table: profiles
- `id` (uuid, references auth.users, primary key)
- `full_name` (text)
- `institution` (text)
- `subject` (text)
- `experience_years` (integer)
- `location` (text)
- `bio` (text)
- `avatar_url` (text)
- `created_at` (timestamp with time zone, default now())

SQL to create:
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT '',
  institution TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  experience_years INTEGER DEFAULT 0,
  location TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key

## Path Aliases
- `@/*` maps to the project root

## Running
- Dev server: `npx next dev -p 5000`
- Build: `npx next build`
- Lint: `npx next lint`
