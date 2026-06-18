# Adding an event page

How to add a new event to the Folklore Society site. This is a plain static
site on Cloudflare Workers — no build step. Follow the checklist; the gotchas
below are the things that have actually broken deploys before.

## The model

- **Events hub:** [`events/index.html`](events/index.html) — lists every event as
  a card, in chronological order, and carries an `ItemList` of `Event` JSON-LD.
- **One folder per event:** e.g. [`freedom-to-read/`](freedom-to-read/index.html),
  [`bookstore-romance-day/`](bookstore-romance-day/index.html). Each is a
  self-contained `index.html` served at a clean URL (`/freedom-to-read/`).
- **Nav:** "Events" links to `/events` and is present in the desktop nav, mobile
  menu, and footer of every top-level page.

## Steps

1. **Copy an existing event page** as your template. The newest
   (`bookstore-romance-day/index.html`) is the most complete: flyer hero,
   details strip with **Add to calendar** + **Get directions** CTAs, "What's
   happening," "Folklore on the bar," partner / featured-guest cards, a "Be
   there" closing, and a footer. Create `your-event/index.html`.

2. **Update the content:** `<title>`, meta description, Open Graph + Twitter
   tags, the `Event` JSON-LD block, the details strip (date/time/where/cost),
   copy, partner cards, and both Google Calendar links. For the calendar link,
   use `dates=YYYYMMDDThhmmss/YYYYMMDDThhmmss&ctz=America/Los_Angeles` for a
   timed event, or `dates=YYYYMMDD/YYYYMMDD` (end-exclusive) for all-day.

3. **Add the flyer image** to `images/` as `your-event-flyer.png`. Ideal art:
   **1920×1080, landscape** — it's used as the page hero (up to 1200px wide),
   the hub card thumbnail, and the social-share `og:image`.
   - ⚠️ **GOTCHA:** `.gitignore` ignores all `*.png`. You **must** add an
     allow-list line or the flyer is silently skipped by `git add` and the live
     hero 404s:
     ```
     !images/your-event-flyer.png
     ```

4. **Add a card to the events hub** (`events/index.html`): copy an existing
   `<article class="event-card">`, point it at `/your-event/`, and add a matching
   `ListItem` (`"position": N`) to the `ItemList` JSON-LD at the top.

5. **Add the URL to [`sitemap.xml`](sitemap.xml)** (`https://folkloresocietywa.org/your-event/`).

6. **Commit and push to `main`.** Cloudflare Workers Builds auto-deploys in
   ~30–90s. Then verify the live page, flyer, and any new SEO files return `200`
   before calling it done (the deploy is async — a green push is not yet live).

## Gotchas / conventions

- **`*.png` allow-list** — see step 3. Same applies to any new image.
- **Clean URLs:** Cloudflare serves `dir/index.html` at `/dir/` (a bare `/dir`
  307-redirects to `/dir/`), and a top-level `name.html` at `/name` (`/name.html`
  redirects to `/name`). Use the canonical form in links and the sitemap.
- **`.assetsignore`** keeps `*.md` (incl. this file), `wrangler.jsonc`, and config
  out of the public site. Anything else in the repo **is** served.
- **Fonts:** the script face is `takemetotuscany-regular-webfont.woff2` (not
  `TakeMeToTuscany.woff2` — that path doesn't exist). Reference `/fonts/...` or
  `../fonts/...` from a subfolder.
- **Structured data:** every event page carries schema.org `Event` JSON-LD
  (date, location, free `offers`, organizers, performers). The hub carries an
  `ItemList`. Validate JSON before pushing — these power Google rich results.
- **Past events:** leave them up after the date. Event pages with structured
  data accumulate SEO equity; add a "this took place on …" note instead of
  deleting.
