# Implementation Plan: SEO & GEO Optimization

## Summary

Switch the portfolio site from SPA mode to server-side rendering so crawlers see fully rendered HTML, add Open Graph / Twitter Card meta tags for social sharing, inject JSON-LD structured data for AI model discoverability, and add robots.txt, sitemap.xml, and security/cache headers via Netlify.

## Success Criteria

- [ ] Crawlers receive fully rendered HTML (no JS required to see content)
- [ ] Shared links on social platforms show title, description, and preview image
- [ ] Google Rich Results Test validates Person + WebSite JSON-LD
- [ ] `robots.txt` and `sitemap.xml` are accessible at their canonical URLs
- [ ] Lighthouse SEO score ≥ 95
- [ ] All existing functionality works identically (contribution graph, iframes, nav)

## Detailed Changes

### 1. Enable SSR + Netlify Adapter

**Files:** `react-router.config.ts`, `vite.config.ts`, `netlify.toml`, `package.json`
**Change Type:** Modify

**What changes:**

Install the Netlify adapter:
```bash
npm install @netlify/vite-plugin-react-router
```

`react-router.config.ts`:
```typescript
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
} satisfies Config;
```

`vite.config.ts`:
```typescript
import { netlifyPlugin } from "@netlify/vite-plugin-react-router";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), netlifyPlugin(), tsconfigPaths()],
});
```

`netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build/client"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

Remove the SPA catch-all redirect (`/* → /index.html`) — the Netlify adapter handles routing via serverless functions.

**Why:** SSR is the single most impactful SEO change. Crawlers and AI models get complete HTML on first request without executing JavaScript.

---

### 2. Add Open Graph + Twitter Card Meta Tags

**File:** `app/root.tsx` — `meta()` export
**Change Type:** Modify

**What changes:**

```typescript
export function meta() {
  return [
    { title: "Paul Truitt — AI Engineer" },
    { name: "description", content: "Portfolio of Paul Truitt, AI Engineer at Ayzenberg with 3 years of experience building intelligent systems, AI agents, and full-stack applications." },
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Paul Truitt — AI Engineer" },
    { property: "og:description", content: "Portfolio of Paul Truitt, AI Engineer at Ayzenberg with 3 years of experience building intelligent systems, AI agents, and full-stack applications." },
    { property: "og:url", content: "https://paultruitt-portfolio.netlify.app" },
    { property: "og:site_name", content: "Paul Truitt" },
    { property: "og:locale", content: "en_US" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Paul Truitt — AI Engineer" },
    { name: "twitter:description", content: "AI Engineer at Ayzenberg. Building intelligent systems, AI agents, and full-stack applications." },
    // Additional SEO
    { name: "author", content: "Paul Truitt" },
    { tagName: "link", rel: "canonical", href: "https://paultruitt-portfolio.netlify.app" },
  ];
}
```

**Why:** Social platforms (LinkedIn, Slack, Discord, X/Twitter) scrape OG tags to render link previews. Without them, shared links show a blank card.

---

### 3. Add JSON-LD Structured Data

**File:** `app/root.tsx` — inside `Layout` component `<head>`
**Change Type:** Modify

**What changes:**

Add a `<script type="application/ld+json">` block with `Person` + `WebSite` schemas:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://paultruitt-portfolio.netlify.app/#person",
      "name": "Paul Truitt",
      "jobTitle": "AI Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Ayzenberg",
        "url": "https://ayzenberg.com"
      },
      "url": "https://paultruitt-portfolio.netlify.app",
      "sameAs": [
        "https://github.com/donslaine",
        "https://linkedin.com/in/"
      ],
      "knowsAbout": [
        "Artificial Intelligence", "Machine Learning", "TypeScript",
        "Python", "React", "FastAPI", "LangChain", "Google Cloud Platform"
      ]
    },
    {
      "@type": "WebSite",
      "url": "https://paultruitt-portfolio.netlify.app",
      "name": "Paul Truitt — AI Engineer",
      "author": { "@id": "https://paultruitt-portfolio.netlify.app/#person" }
    }
  ]
}
```

**Why:** JSON-LD is the primary signal AI models (Google SGE, Perplexity, ChatGPT Search) use to extract structured facts about entities. It tells them unambiguously who Paul is, where he works, and what he knows.

---

### 4. Add robots.txt

**File:** `public/robots.txt`
**Change Type:** New

```
User-agent: *
Allow: /

Sitemap: https://paultruitt-portfolio.netlify.app/sitemap.xml
```

**Why:** Standard file crawlers look for. Declares the site is fully indexable and points to the sitemap.

---

### 5. Add sitemap.xml

**File:** `public/sitemap.xml`
**Change Type:** New

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemapschemas.org/sitemap/0.9">
  <url>
    <loc>https://paultruitt-portfolio.netlify.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Why:** Helps search engines discover and prioritize pages. Single-page site, so a single entry is sufficient.

---

### 6. Add Cache-Control and Security Headers

**File:** `netlify.toml`
**Change Type:** Modify

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Why:** Security headers are baseline web hygiene. Asset cache headers improve performance and Lighthouse score. Vite already hashes filenames, so immutable caching is safe.

---

### 7. ContributionGraph — No Changes Needed

**File:** `app/components/ContributionGraph.tsx`
**Change Type:** None

The component uses `useEffect` for data fetching, which only runs on the client. During SSR the component will render the loading skeleton, then hydrate and fetch on the client. This is the correct pattern — no changes required.

---

## Testing Strategy

### Manual Verification

- [ ] `curl -s https://paultruitt-portfolio.netlify.app/ | head -100` returns full HTML with content (not empty `<div id="root">`)
- [ ] View page source in browser shows rendered section content
- [ ] Share link on LinkedIn/Slack/Discord — verify rich preview renders
- [ ] `curl https://paultruitt-portfolio.netlify.app/robots.txt` returns valid robots file
- [ ] `curl https://paultruitt-portfolio.netlify.app/sitemap.xml` returns valid XML
- [ ] Run Google Rich Results Test on the URL — Person schema validates
- [ ] Run Lighthouse audit — SEO score ≥ 95
- [ ] Contribution graph still loads and renders after page load
- [ ] Live site iframe previews still function
- [ ] Smooth scroll navigation between sections works

### Regression Checks

- [ ] All 6 project cards render
- [ ] All 5 live site cards render with iframe previews
- [ ] Skills badges render in all categories
- [ ] Contact links open in new tabs
- [ ] Nav links scroll to correct sections
- [ ] Dark theme applies consistently

## Rollback Plan

Revert `ssr` back to `false` in `react-router.config.ts`, remove the Netlify adapter plugin from `vite.config.ts`, and re-add the SPA redirect to `netlify.toml`. One commit to revert.

## Dependencies & Risks

- **Dependency:** `@netlify/vite-plugin-react-router@3.0.0` must be compatible with `react-router@7.12.0`
- **Risk:** Netlify adapter may change build output structure — deploy and verify
- **Risk:** Some live site iframes may have `X-Frame-Options: DENY` — already a pre-existing issue, unrelated to this change
- **Mitigation:** Test full deploy on Netlify before merging, use unique deploy preview URL
