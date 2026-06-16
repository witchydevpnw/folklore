# Folklore Society Website — Deployment Notes

**April 2026 — Logo and Typography Update**

This package contains an updated website build with the new whimsigoth typography direction, incorporating the Take Me To Tuscany typeface for headlines and the new Folklore Society logo for social/press use.

---

## What's in this package

```
deploy/
├── index.html                           ← updated homepage
├── fonts/
│   ├── takemetotuscany-regular-webfont.woff
│   ├── takemetotuscany-regular-webfont.woff2
│   ├── takemetotuscany-weight1-webfont.woff
│   ├── takemetotuscany-weight1-webfont.woff2
│   ├── takemetotuscany-slant1-webfont.woff      (available, not currently used)
│   └── takemetotuscany-slant1-webfont.woff2     (available, not currently used)
└── images/
    ├── logo.svg                                 (plum fill — for light backgrounds)
    └── logo-cream.svg                           (cream fill — for dark backgrounds)
```

## How deployment works

The site is hosted on **Cloudflare Workers** (Static Assets) and the domain
`folkloresocietywa.org` is managed by Cloudflare DNS. It is a plain static
site — there is no build step.

1. Commit and push to GitHub.
2. Cloudflare Workers Builds picks up the push and deploys automatically,
   serving the repo's files as configured in [`wrangler.jsonc`](wrangler.jsonc).
3. Files listed in [`.assetsignore`](.assetsignore) (planning docs, config)
   are excluded from the public site.

> Note: This site previously ran on GitHub Pages (June 2026). GitHub Pages has
> been disabled — Cloudflare is now the single source of truth for hosting.

## What changed in the HTML

1. **New `@font-face` declarations** for Take Me To Tuscany (Regular at weight 400, Weight1 at weight 700) — loaded from `/fonts/`.
2. **New CSS variable** `--script` added alongside `--serif` and `--sans`.
3. **Nav logo**: now rendered in Take Me To Tuscany at 34px (was Cormorant Garamond text).
4. **Hero title (H1)**: now uses Take Me To Tuscany, with sizing bumped to `clamp(56px, 7vw, 108px)` to give the script room to breathe. The `<em>` emphasis now uses Weight1 instead of italic, plus the existing copper color.
5. **"Stay in the loop." H2**: now uses Take Me To Tuscany at `clamp(44px, 5.5vw, 72px)`.
6. **Footer logo**: now rendered in Take Me To Tuscany at 28px.

## What stayed the same

- **Pull quotes** (hero-right quote, mission-quote): still Cormorant Garamond italic — per the "Cormorant only for pull quotes" design direction.
- **H3 section headings** (pillars, event titles, aside-card headings): still Cormorant Garamond — these are smaller than 24px and Tuscany wouldn't read well at those sizes.
- **Body text, buttons, nav links, labels**: still Jost.
- **All colors, spacing, layout, animations, JavaScript, event cards, email signup**: unchanged.

## About the logo SVGs

The full logo (crescent moon + wordmark + stars) lives in `/images/` but is **not referenced on the site itself**. Here's why and what to use it for:

At the size the nav and footer logos render (~30–44px tall), the fine script lines and star scatter get muddy and become unreadable. The elegant solution is to let Take Me To Tuscany do the rendering for small "Folklore Society" placements, reserving the full SVG logo for contexts where it has room to breathe:

- Instagram profile grid and story graphics
- Email newsletter headers
- Press kit downloads
- Printed collateral (event programs, business cards, letterhead)
- Merchandise (tote bags, stickers, etc.)
- Future hero/splash screens (if you add them later)

The `logo.svg` is the plum version for light backgrounds; `logo-cream.svg` is the cream version for dark backgrounds.

## Take Me To Tuscany license notes

- Files are the webfont-licensed versions from Nicky Laatz. Keep your purchase confirmation email in your Folklore Society records.
- Nicky Laatz webfont licenses typically cover one domain with generous pageview allowances — you won't approach the limits at current scale.
- The font must be self-hosted (which is what this setup does). Don't move the font files to a CDN unless that CDN is specifically authorized by the license.

## Things not touched in this update

- The favicon (still a default) — worth addressing in a future pass.
- Meta tags, Open Graph preview images — the OG description should still work, but you might want a custom OG image eventually.
- Analytics, tracking, structured data — none present; add when ready.
