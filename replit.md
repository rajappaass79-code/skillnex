# SkillNex - Next.js SaaS MVP

## Overview
SkillNex is a SaaS platform for skill development and tracking, built with Next.js App Router.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 with shadcn/ui components
- **Linting:** ESLint with next/core-web-vitals
- **React:** v19

## Project Structure
```
app/                   # Next.js App Router
  layout.tsx           # Root layout
  page.tsx             # Landing page
  not-found.tsx        # 404 page
  globals.css          # Global styles and CSS variables
  (auth)/              # Auth route group (login, signup)
    layout.tsx         # Auth-specific layout
  (dashboard)/         # Dashboard route group
    layout.tsx         # Dashboard-specific layout
  api/                 # API route handlers
components/            # React components
  ui/                  # shadcn/ui components
hooks/                 # Custom React hooks
lib/                   # Utility functions and constants
  utils.ts             # cn() helper
  constants.ts         # Site config
types/                 # TypeScript type definitions
public/                # Static assets
```

## Configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS theme and plugins
- `tsconfig.json` - TypeScript with `@/*` path alias
- `postcss.config.js` - PostCSS plugins
- `.eslintrc.json` - ESLint with next/core-web-vitals
- `components.json` - shadcn/ui configuration

## Path Aliases
- `@/*` maps to the project root

## Running
- Dev server: `npx next dev -p 5000`
- Build: `npx next build`
- Start: `npx next start -p 5000`
- Lint: `npx next lint`
