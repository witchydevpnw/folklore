# Folklore Society website

The website for **Folklore Society**, a literary nonprofit for the Tri-Cities,
Washington — live at **[folkloresocietywa.org](https://folkloresocietywa.org)**.

## What it is

A plain static HTML/CSS site. **No build step, no framework, no dependencies** —
each page is a self-contained `.html` file with inline `<style>`. Hosted on
**Cloudflare Workers (Static Assets)**, which also manages the domain's DNS.

## Repo layout

```
index.html              Homepage
about/                  About page
shelf-life.html         Shelf Life program
support.html            Support / donate
general-fund.html       General fund
events/                 Events hub (lists all events)
freedom-to-read/        Event page
bookstore-romance-day/  Event page
fonts/                  Take Me To Tuscany webfonts (self-hosted, licensed)
images/                 Logos, favicon, event flyers
sitemap.xml, robots.txt SEO
wrangler.jsonc          Cloudflare Workers config (serves repo root as static)
.assetsignore           Files kept OUT of the public site (*.md, config)
.gitignore              Note: ignores all *.png except an allow-list
```

## Deploying

Push to `main` → **Cloudflare Workers Builds auto-deploys** in ~30–90s (it's
async — a finished push is not yet live; confirm by loading the URL). There is
no build command. Details in [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Common tasks

- **Add an event page:** follow [`ADDING-AN-EVENT.md`](ADDING-AN-EVENT.md).
- **Edit a page:** open the relevant `.html`, change it, commit, push.
- **External services** (newsletter, donations, hosting, socials): [`SERVICES.md`](SERVICES.md).
- **Brand / typography:** [`SKILL.md`](SKILL.md) and [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Preview locally

Serve the repo root with any static server, e.g.:

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Note: Cloudflare's clean-URL rewrites
(`/shelf-life` → `shelf-life.html`, `/events/` → `events/index.html`) won't be
fully reproduced locally, so use the actual file paths when testing directly.

## Conventions worth knowing

- **`*.png` are gitignored by default** — new images (e.g. event flyers) must be
  allow-listed in [`.gitignore`](.gitignore) or `git add` silently skips them.
- **`*.md` files are not served** (excluded via `.assetsignore`) — they're
  internal docs only.
- **Clean URLs:** directories serve at `/dir/`; top-level `name.html` serves at
  `/name`. Link to the canonical form.
- **The script font** is `takemetotuscany-regular-webfont.woff2` under `/fonts/`.
