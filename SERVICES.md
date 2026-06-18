# External services & accounts

The third-party services this site depends on, and where each is wired into the
code. Logins/credentials are **not** stored here — keep those in the Folklore
Society password manager. This is a map of what lives where.

## Hosting & domain

| What | Service | Notes |
|------|---------|-------|
| Web hosting | **Cloudflare Workers** (Static Assets) | Auto-deploys on push to `main`. Config in [`wrangler.jsonc`](wrangler.jsonc); worker name `folklore`. No build command. |
| DNS | **Cloudflare** | Manages `folkloresocietywa.org`. |
| Code | **GitHub** | `github.com/witchydevpnw/folklore` (the `witchydevpnw` account). |

> History: the site briefly ran on GitHub Pages (June 2026); that's been
> disabled. Cloudflare is the single source of truth. See [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Newsletter — Brevo (formerly Sendinblue)

- The homepage email signup posts directly to a **Brevo hosted form endpoint**
  (`*.sibforms.com/serve/...`) via `fetch`. The handler is the inline `<script>`
  at the bottom of [`index.html`](index.html) (`#signupBtn`).
- Double opt-in: submitting triggers a confirmation email ("Check your inbox to
  confirm").
- To change the list/form, update the endpoint URL in that script. The endpoint
  is a public client-side URL (not a secret), but the Brevo **account login** is.

## Donations — Zeffy

Donation buttons link out to **Zeffy** hosted forms (zero-fee for nonprofits).
Three forms are referenced across the site:

| Purpose | Form slug |
|---------|-----------|
| Author Fund / literacy events | `zeffy.com/en-US/donation-form/support-literacy-events` |
| Bottle dedication | `zeffy.com/en-US/donation-form/dedication` |
| General operations | `zeffy.com/en-US/donation-form/give-where-its-needed-most` |

Linked from `index.html`, `support.html`, and `general-fund.html`.

## Social media

| Platform | Handle |
|----------|--------|
| Instagram | [@folkloresocietywa](https://instagram.com/folkloresocietywa) |
| Facebook | [facebook.com/folkloresocietywa](https://facebook.com/folkloresocietywa) |

Event pages also link to partner/guest socials (e.g. BAGG Books, Obsidian Book
Collective, guest authors/artists) — those live in the individual event pages.

## Email

- Public contact: **hello@folkloresocietywa.org** (used in nav/footer `mailto:`
  links across the site).

## SEO

- `sitemap.xml` + `robots.txt` are live at the repo root.
- **Google Search Console — set up (June 2026).** Domain property verified via a
  Cloudflare DNS TXT record (keep that record in place — removing it un-verifies
  the domain); `sitemap.xml` submitted. Use it to monitor indexing/coverage,
  search performance, and structured-data (rich result) status. When you add a
  new page, you can request faster indexing via URL Inspection → Request indexing.

## Fonts

- **Take Me To Tuscany** (Nicky Laatz) — self-hosted webfont under `/fonts/`,
  licensed per-domain. Keep the purchase confirmation in Folklore records. Don't
  move the files to an unauthorized CDN. See [`DEPLOYMENT.md`](DEPLOYMENT.md).
