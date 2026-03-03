# Next.js App Router Project

## Overview
A Next.js application using the App Router with TypeScript and Tailwind CSS.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 with shadcn/ui components
- **React:** v19

## Project Structure
```
app/              # Next.js App Router pages and layouts
  layout.tsx      # Root layout
  page.tsx        # Home page
  not-found.tsx   # 404 page
  globals.css     # Global styles and CSS variables
components/       # React components
  ui/             # shadcn/ui components
hooks/            # Custom React hooks
lib/              # Utility functions
public/           # Static assets
```

## Configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS theme and plugins
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS plugins
- `components.json` - shadcn/ui configuration

## Path Aliases
- `@/*` maps to the project root (e.g., `@/components/ui/button`)

## Running
- Dev server: `npx next dev -p 5000`
- Build: `npx next build`
- Start: `npx next start -p 5000`
