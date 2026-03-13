# Research: SEO & GEO Optimization

## Objective

Audit the current portfolio site's SEO and GEO (Generative Engine Optimization) readiness. Identify all gaps and document what needs to change to make the site discoverable by search engines, AI models, and social platforms.

## System Analysis

### Rendering Architecture

- **File:** `react-router.config.ts` (line 3)
  - SSR is **disabled** (`ssr: false`) — the app is a pure SPA
  - Crawlers receive an empty HTML shell; content requires JavaScript execution
  - Google renders JS but with delays; Bing and AI crawlers often do not
  - This is the **single biggest SEO blocker**

- **File:** `app/root.tsx` (lines 20-36)
  - HTML structure is sound: `<html lang="en">`, proper `<head>`, charset, viewport
  - `dark` class applied at root level
  - `<Meta />` and `<Links />` components render route-level meta exports

### Meta Tags — Current State

- **File:** `app/root.tsx` (lines 13-18)
  - `meta()` export provides:
    - `title`: "Paul Truitt — AI Engineer"
    - `description`: 124-character summary
  - **Missing:** Open Graph (`og:`), Twitter Cards (`twitter:`), canonical URL, author

- **File:** `app/routes/home.tsx`
  - No route-level `meta()` export — relies entirely on root

### Structured Data

- **Status:** None
- No JSON-LD anywhere in the codebase
- No schema.org markup for Person, WebSite, or Organization
- AI models (Google SGE, Perplexity, ChatGPT Search) strongly prefer structured data for entity extraction

### SEO Files

- **robots.txt:** Missing — no file in `/public/`
- **sitemap.xml:** Missing — no file in `/public/`

### Font Loading

- **File:** `app/app.css` (line 4)
  - `@fontsource-variable/geist` loaded via npm package import
  - Variable font — good for performance (single file, all weights)
  - No explicit `font-display` or preload strategy

### Netlify Configuration

- **File:** `netlify.toml` (lines 1-13)
  - SPA catch-all redirect: `/* → /index.html` with `200` status
  - No custom response headers (no cache-control, no security headers)
  - Functions configured for `netlify/functions` directory

### Client-Side Data Fetching

- **File:** `app/components/ContributionGraph.tsx` (lines 57-67)
  - Uses `useEffect` — client-side only, cannot be SSR'd
  - Fetches from `/.netlify/functions/contributions`
  - Loads after JS hydration → network waterfall
  - If we switch to SSR, this component must remain client-only (use `useEffect`, which is fine)

### Heading Hierarchy

- Sections use `<h2>` for labels and `<h3>` for titles — technically correct but unconventional
- Only `<h1>` exists in `Hero.tsx` ("Paul Truitt")

### External Dependencies

- **Netlify Functions:** GitHub GraphQL API (contribution graph)
- **Netlify CDN:** Static asset serving + function endpoints
- **Netlify Adapter:** Not installed — required for SSR mode (`@netlify/vite-plugin-react-router` or `@react-router/netlify`)

## Key Findings

1. **SPA mode is the critical blocker.** Without SSR or pre-rendering, search engines and AI crawlers may not see content. Google can render JS but with a delay; Bing and most AI crawlers cannot.
2. **No Open Graph or Twitter Cards** — shared links show no preview image, title, or description on social platforms.
3. **No JSON-LD** — AI models can't extract structured entity data (name, role, employer, skills).
4. **No robots.txt or sitemap** — crawlers have no guidance on what to index.
5. **No custom headers** — missing cache-control and security headers.
6. **ContributionGraph uses `useEffect`** — already client-only, so SSR switch won't break it.
7. **React Router v7 has native SSR support** — switching back to `ssr: true` is straightforward, but requires a Netlify adapter for serverless deployment.
