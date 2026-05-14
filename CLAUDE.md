# Trune Marketing Website — Project Bible

This file is loaded into context on every Claude Code session in this repo. Read it first.

## Project overview

Trune is a personalized sleep analytics platform. It uses N-of-1 experimental methodology to determine what actually improves an individual user's sleep (e.g. magnesium glycinate, caffeine cutoffs, sleep masks, room temperature) rather than relying on population-average advice.

This repo is the **marketing website**: four pages, premium editorial feel, motion-rich. Audience is Hopkins faculty + angel investors at launch.

Pages:
- `/` — long-scroll narrative homepage
- `/about` — founder letter
- `/methodology` — scientific rigor explainer
- `/blog` — MDX-based posts

This is **not** the product. The product app lives elsewhere.

## Tech stack

- **Framework**: Next.js 16 (App Router) + TypeScript (strict)
- **Styling**: Tailwind CSS v4 (CSS-first config in `app/globals.css` via `@theme`, no `tailwind.config.ts`)
- **Font**: Inter via `next/font/google`, weights 400/500/600 only, exposed as `--font-inter`
- **Smooth scroll**: Lenis (`lenis` npm package), wrapped in `components/SmoothScroll.tsx`
- **Animation**: Framer Motion (entrance + microinteractions), GSAP + ScrollTrigger (scroll-locked sequences)
- **Database**: Supabase via `@supabase/ssr` — see `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (server, used by Route Handlers)
- **Email**: Resend (waitlist confirmations, not yet wired)
- **Package manager**: pnpm (Node 24)
- **Deploy**: Vercel

## Design principles

- **Light, premium, editorial.** Reference: Stripe, Fruitful. Not Linear or Vercel (too dense / dark).
- **No dark mode.** Ever. Don't add `dark:` Tailwind classes. Don't add `prefers-color-scheme` media queries.
- **Accent color is orange `#F65A1B`.** Use sparingly — for CTAs, highlights, occasional accents. Never as a background field.
- **Motion philosophy**: every animation must serve comprehension or delight, never decoration. Disciplined choreography over visual noise. Respect `prefers-reduced-motion`.
- **Typography**: Inter only. Never use a weight above 600. Display sizes lean tight: `tracking-tight`, generous leading for body.

## Design tokens

Defined in `app/globals.css` under `@theme`. Reference them via Tailwind utilities or `var(--token-name)`:

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#FAFAF7` | Default page background |
| `--color-bg-soft-blue` | `#E0EEFD` | Section accents |
| `--color-bg-soft-cream` | `#FDF7E0` | Section accents |
| `--color-text-primary` | `#0A0A0A` | Body text, headings |
| `--color-text-secondary` | `#6B6B68` | Supporting copy |
| `--color-text-tertiary` | `#9A9A95` | Captions, metadata |
| `--color-border` | `#E5E5E0` | Hairlines, dividers |
| `--color-accent` | `#F65A1B` | CTAs, highlights |
| `--color-accent-hover` | `#DC4A0E` | Hover state for accent |
| `--radius-md` | `8px` | Cards, inputs |
| `--radius-lg` | `12px` | Larger surfaces |
| `--radius-pill` | `999px` | Buttons, tags |

## Code conventions

- **TypeScript strict mode.** No `any` without a comment justifying it.
- **Server components by default.** Add `"use client"` only when the component needs state, effects, browser APIs, or event handlers tied to interactivity.
- **Component names**: PascalCase, one component per file, file named the same as the export. Co-locate small subcomponents in the same file when they aren't reused.
- **Imports**: use `@/*` alias for anything outside the current directory.
- **Styling**: Tailwind utilities first. For design tokens that need CSS-var access (e.g. dynamic interpolation, `style={{}}`), reference via `var(--token-name)`.
- **No inline styles** except for genuinely dynamic values (animated positions, computed colors, etc.).

## Animation conventions

- **Framer Motion**: entrance animations, microinteractions, layout transitions, hover/tap states. Prefer `motion.div` with `whileInView` for simple reveals.
- **GSAP + ScrollTrigger**: scroll-locked sequences, pinning, complex timelines. Only when Framer Motion's scroll APIs are insufficient.
- **Lenis**: provides the smooth-scroll base. Don't fight it — work with its `requestAnimationFrame` loop.
- **Reduced motion**: always gate non-essential animations behind a `prefers-reduced-motion: no-preference` check.

## Forbidden patterns

- Dark mode (no `dark:` classes, no system theme detection)
- Font weights above 600
- Gradients (unless explicitly approved in a design review)
- Inline styles for static values
- Emojis in UI copy or comments (unless explicitly requested)
- Hardcoded color hex values in components — use design tokens
- Mixing GSAP and Framer Motion on the same element

## Build commands

- `pnpm dev` — start the dev server (Turbopack)
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint

## File structure

```
app/
  layout.tsx              Root layout: html, body, font, Nav, Footer, SmoothScroll
  globals.css             Tailwind v4 + design tokens (@theme)
  page.tsx                Homepage
  about/page.tsx
  methodology/page.tsx
  blog/page.tsx
  api/
    waitlist/route.ts     POST { email } → inserts into Supabase `waitlist` table
components/
  Nav.tsx                 Sticky top nav (server component)
  Footer.tsx              4-column footer + socials row (server component)
  SmoothScroll.tsx        Lenis wrapper (client component)
lib/
  supabase/
    client.ts             Browser client (publishable key)
    server.ts             Server client (secret key) — used by Route Handlers
.env.local                Local secrets (gitignored)
.env.example              Template for required env vars
```

## Environment variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — anon/publishable key (safe in browser)
- `SUPABASE_SECRET_KEY` — service-role key (server only — never expose)

Optional (will be wired later):
- `RESEND_API_KEY` — for waitlist confirmation emails

## Supabase schema

The `waitlist` table:

```sql
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now(),
  source text default 'homepage'
);

alter table public.waitlist enable row level security;

create policy "anon can insert" on public.waitlist
  for insert to anon with check (true);
```

Reads are service-role only. The `/api/waitlist` route handler uses the secret key.
