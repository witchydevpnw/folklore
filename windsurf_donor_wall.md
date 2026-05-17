# Windsurf instructions — Donor wall (scrolling ticker)

Three edits against the current live `index.html`. This adds a new section between "Support our work" and "About us" with a slow-scrolling marquee of donor names. Sample content only — real names go in later.

**Recommended approach:** create a branch called `donor-wall` in Windsurf, apply these edits there, commit, and leave it unmerged until you've seen it locally and decided. I can write follow-up edits to the same branch. When you're happy, merge to `main` and GitHub Pages picks it up.

Order of operations:

1. Edit 1: add `.donor-wall` CSS
2. Edit 2: add the new `<section>` HTML between `#support` and `#about`

---

## Edit 1 — Add `.donor-wall` CSS

### Find

```css
    #support { background: linear-gradient(135deg, var(--copper-lt) 0%, var(--warm) 50%, var(--cream) 100%); }
    .campaigns-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 900px; margin: 0 auto; }
```

### Replace with

```css
    #support { background: linear-gradient(135deg, var(--copper-lt) 0%, var(--warm) 50%, var(--cream) 100%); }
    .campaigns-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 900px; margin: 0 auto; }
    .donor-wall { background: var(--cream); padding: 4rem 0 4.5rem; overflow: hidden; position: relative; }
    .donor-wall-label { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-mute); text-align: center; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
    .donor-wall-label::before, .donor-wall-label::after { content: ''; width: 40px; height: 1px; background: var(--rule); }
    .donor-wall-title { font-family: var(--serif); font-style: italic; font-size: clamp(22px, 2.8vw, 30px); font-weight: 400; color: var(--ink-soft); text-align: center; margin-bottom: 2.5rem; }
    .ticker { position: relative; width: 100%; overflow: hidden; mask-image: linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%); }
    .ticker-track { display: flex; width: max-content; animation: ticker-scroll 60s linear infinite; }
    .ticker:hover .ticker-track { animation-play-state: paused; }
    .ticker-group { display: flex; flex-shrink: 0; padding-right: 2.5rem; }
    .ticker-item { font-family: var(--serif); font-size: 18px; color: var(--ink); padding: 0 2.5rem; white-space: nowrap; position: relative; }
    .ticker-item + .ticker-item::before { content: '\2726'; position: absolute; left: -6px; top: 50%; transform: translateY(-50%); color: var(--copper); opacity: 0.55; font-size: 10px; }
    @keyframes ticker-scroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ticker { mask-image: none; -webkit-mask-image: none; }
      .ticker-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; max-width: 900px; margin: 0 auto; }
      .ticker-group { padding: 0; flex-wrap: wrap; justify-content: center; }
      .ticker-item { padding: 0.5rem 1.25rem; }
    }
```

Reading this in plain terms:
- The section sits on the flat cream background (stands apart from the tinted "Support our work" above it)
- The label says "With gratitude" (editorial small-caps) with hairlines on either side
- The subtitle is a soft Cormorant italic "To the readers who make this work possible"
- The ticker itself has feathered edges (fades in/out on left/right) so names don't appear out of nowhere
- Between each name is a small copper sparkle
- Hovering pauses the scroll so you can read
- Reduced-motion users see a static centered grid of names instead

The animation uses `translateX(-50%)` which relies on the track containing the names twice in a row. That's how seamless-loop CSS marquees work. The Edit 2 HTML reflects that — the list appears twice.

---

## Edit 2 — Add the donor wall section HTML

### Find

```html
  </section>

  <section id="about">
    <div class="section-inner">
      <p class="section-label">About us<span class="section-star" aria-hidden="true">&#10022;</span></p>
```

### Replace with

```html
  </section>

  <!-- ============================================================ -->
  <!-- DONOR WALL                                                   -->
  <!-- Sample names below are placeholders. Replace the contents of -->
  <!-- BOTH .ticker-group divs with the real donor list (keep them  -->
  <!-- identical to each other for the seamless loop to work).      -->
  <!-- ============================================================ -->
  <section class="donor-wall" aria-label="Our supporters">
    <p class="donor-wall-label">With gratitude</p>
    <p class="donor-wall-title">To the readers who make this work possible</p>
    <div class="ticker" aria-hidden="true">
      <div class="ticker-track">

        <!-- Group 1 - real list goes here -->
        <div class="ticker-group">
          <span class="ticker-item">Margaret Ashworth</span>
          <span class="ticker-item">The Harlow Family</span>
          <span class="ticker-item">Dr. Ellison Park</span>
          <span class="ticker-item">Juno &amp; Rafael Mendez</span>
          <span class="ticker-item">Beatrice Calder</span>
          <span class="ticker-item">The Winslow Foundation</span>
          <span class="ticker-item">Sam Okafor</span>
          <span class="ticker-item">Anonymous</span>
          <span class="ticker-item">Lily Whitford</span>
          <span class="ticker-item">The Radich Household</span>
          <span class="ticker-item">Teddy &amp; Fran Bellweather</span>
          <span class="ticker-item">Priya Nair</span>
          <span class="ticker-item">August Kemper</span>
          <span class="ticker-item">The Sagemoor Book Club</span>
          <span class="ticker-item">Wren Dalloway</span>
          <span class="ticker-item">Marcus &amp; Elena Shore</span>
          <span class="ticker-item">Anonymous</span>
          <span class="ticker-item">Joanna Finch</span>
        </div>

        <!-- Group 2 - MUST be identical to Group 1 for seamless loop -->
        <div class="ticker-group" aria-hidden="true">
          <span class="ticker-item">Margaret Ashworth</span>
          <span class="ticker-item">The Harlow Family</span>
          <span class="ticker-item">Dr. Ellison Park</span>
          <span class="ticker-item">Juno &amp; Rafael Mendez</span>
          <span class="ticker-item">Beatrice Calder</span>
          <span class="ticker-item">The Winslow Foundation</span>
          <span class="ticker-item">Sam Okafor</span>
          <span class="ticker-item">Anonymous</span>
          <span class="ticker-item">Lily Whitford</span>
          <span class="ticker-item">The Radich Household</span>
          <span class="ticker-item">Teddy &amp; Fran Bellweather</span>
          <span class="ticker-item">Priya Nair</span>
          <span class="ticker-item">August Kemper</span>
          <span class="ticker-item">The Sagemoor Book Club</span>
          <span class="ticker-item">Wren Dalloway</span>
          <span class="ticker-item">Marcus &amp; Elena Shore</span>
          <span class="ticker-item">Anonymous</span>
          <span class="ticker-item">Joanna Finch</span>
        </div>

      </div>
    </div>
  </section>

  <section id="about">
    <div class="section-inner">
      <p class="section-label">About us<span class="section-star" aria-hidden="true">&#10022;</span></p>
```

---

## What to check once Windsurf pushes (or opens locally)

- A new section appears between "Support our work" and "About us"
- Small label "With gratitude" with hairlines on both sides
- Italic subtitle "To the readers who make this work possible"
- 18 names scrolling slowly right-to-left, with small copper sparkles between them
- Edges fade out so names don't pop in abruptly
- Hover anywhere on the ticker: scroll pauses
- On mobile (narrow viewport): works the same way, just with the same names scrolling
- If you flip your OS motion setting to "reduce motion" (macOS: System Settings → Accessibility → Display → Reduce motion), the section should flip to a static centered grid of names

## Things to tune if something feels off

- **Too slow / too fast:** change `60s` in `.ticker-track { animation: ... 60s ... }` — lower is faster, higher is slower. I'd try 45s if you want more energy, 80s if you want more dignity.
- **Names too spaced out:** drop `padding: 0 2.5rem` on `.ticker-item` to `0 1.75rem`.
- **Sparkles too faint:** raise `opacity: 0.55` on the sparkle rule to `0.75`.
- **Subtitle copy doesn't land:** easy to swap. Some alternatives that are on-brand:
  - "The readers, supporters, and accomplices of Folklore"
  - "Every name here is a reason we can do this"
  - "A standing thank you"

## Maintaining the list later

When real donors come in:
1. Pull names from Zeffy (manual export is fine for now)
2. Ask each donor's recognition preference (Author Fund Framework Section 6.4 — explicit opt-in required)
3. Update BOTH `.ticker-group` divs with the same list
4. If someone wants to be listed anonymously, just add `<span class="ticker-item">Anonymous</span>` — duplicates are fine and normalize anonymity
5. Push the file

Rough guidance on list size: 15-40 names scrolls well. Under 10 and the loop is too short to feel populated. Over 50 and the cycle is longer than anyone will watch. If you ever have more than ~40 supporters to recognize, switch to the quarterly Author Fund Report as the canonical donor wall and keep this section for a rotating selection.

## Branching workflow reminder

If this is on a `donor-wall` branch (recommended): Windsurf commits here won't show on the live site until you merge the branch into `main`. To preview: pull the branch down and open `index.html` in your browser. To publish: merge `donor-wall` into `main` via GitHub's web interface or Windsurf.
