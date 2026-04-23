# Windsurf instructions — Option C for program cards + section gradient

Three edits against the current live `index.html`. All find/replace blocks must match exactly. If any `Find` block doesn't hit, stop and flag rather than guessing.

Order of operations:

1. Edit 1: add a gradient background to `#support` section
2. Edit 2: update `.campaign-card` CSS (rounded corners, soft shadow, cream background, corner sparkle setup, softer hover)
3. Edit 3: add the corner sparkle to each of the four cards (HTML)

---

## Edit 1 — Add gradient background to the support section

### Find

```css
    .campaigns-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 900px; margin: 0 auto; }
```

### Replace with

```css
    #support { background: linear-gradient(135deg, var(--copper-lt) 0%, var(--warm) 50%, var(--cream) 100%); }
    .campaigns-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 900px; margin: 0 auto; }
```

This uses the existing brand variables (`--copper-lt`, `--warm`, `--cream`), so no new colors. The gradient runs warm cream → lavender cream → near-white on a diagonal. Clearly visible but stays on brand.

---

## Edit 2 — Update `.campaign-card` for rounded base + shadow + sparkle setup

### Find

```css
    .campaign-card { background: var(--warm); border: 1px solid var(--rule); border-radius: 2px; padding: 2.5rem 2rem; display: flex; flex-direction: column; transition: border-color 0.2s; }
    .campaign-card:hover { border-color: var(--copper); }
```

### Replace with

```css
    .campaign-card { background: var(--cream); border: 1px solid rgba(42,31,61,0.08); border-radius: 14px; padding: 2.5rem 2rem; display: flex; flex-direction: column; position: relative; box-shadow: 0 1px 2px rgba(42,31,61,0.04), 0 8px 24px -8px rgba(42,31,61,0.10); transition: box-shadow 0.25s ease, transform 0.25s ease; }
    .campaign-card:hover { box-shadow: 0 2px 4px rgba(42,31,61,0.05), 0 16px 32px -10px rgba(42,31,61,0.14); transform: translateY(-2px); }
    .campaign-card .card-sparkle { position: absolute; top: 14px; right: 18px; color: var(--copper); font-size: 13px; opacity: 0.55; line-height: 1; pointer-events: none; }
```

What changed:
- Background went from `--warm` (lavender cream, which now clashes with the section gradient) to `--cream`. The cards now pop lighter against the tinted section.
- Border radius went from `2px` to `14px` (soft, not bubbly).
- Border got 33% more transparent so it reads as a hairline rather than a rule.
- Soft two-part shadow for paper-on-paper depth.
- Hover lifts slightly on Y-axis with a deeper shadow. Much warmer than the old border-color swap.
- Added a `.card-sparkle` rule so the next edit can place the ornament.

---

## Edit 3 — Add the `.card-sparkle` span to each of the four cards

### Find

```html
        <div class="campaign-card fade-up">
          <h3>Author Fund</h3>
```

### Replace with

```html
        <div class="campaign-card fade-up">
          <span class="card-sparkle" aria-hidden="true">&#10022;</span>
          <h3>Author Fund</h3>
```

### Find

```html
        <div class="campaign-card fade-up" style="transition-delay:0.1s;">
          <h3>Give where it's needed most</h3>
```

### Replace with

```html
        <div class="campaign-card fade-up" style="transition-delay:0.1s;">
          <span class="card-sparkle" aria-hidden="true">&#10022;</span>
          <h3>Give where it's needed most</h3>
```

### Find

```html
        <div class="campaign-card fade-up" style="transition-delay:0.2s;">
          <h3>Dedication</h3>
```

### Replace with

```html
        <div class="campaign-card fade-up" style="transition-delay:0.2s;">
          <span class="card-sparkle" aria-hidden="true">&#10022;</span>
          <h3>Dedication</h3>
```

### Find

```html
        <div class="campaign-card fade-up" style="transition-delay:0.3s;">
          <h3>Shelf Life</h3>
```

### Replace with

```html
        <div class="campaign-card fade-up" style="transition-delay:0.3s;">
          <span class="card-sparkle" aria-hidden="true">&#10022;</span>
          <h3>Shelf Life</h3>
```

---

## What to check once Windsurf pushes

- The "Support our work" section now sits on a soft diagonal wash (warm cream → lavender cream → near-white). Visible, not loud.
- Each card has rounded 14px corners and a subtle drop shadow. Feels like paper resting on paper.
- A small copper sparkle (✦) sits in the top-right corner of every card.
- Hover on a card: it lifts ~2px and the shadow deepens. No more border-color flip.
- Nothing outside the support section should have shifted.

## Things to tune if any of the above feels off

- **Gradient too strong:** change the stops from `0% / 50% / 100%` to `0% / 60% / 100%` — flatter transition.
- **Shadows too soft:** bump the `-8px` offset on the second shadow to `-6px`, deepens the drop.
- **Sparkle too faint:** raise `opacity: 0.55` to `0.7`.
- **Sparkle too prominent:** drop to `0.4`, or shrink `font-size: 13px` to `11px`.
- **Corners too round:** drop `14px` to `10px` — still soft but less pillow-like.

All single-value tweaks. Tell me which direction and I'll send a one-line adjustment.

## Not touched in this pass

- Nav, hero, pillars, mission, join, footer — all unchanged.
- Mobile breakpoint at 768px collapses the grid to a single column, which still works with the new treatment. The gradient angle holds up on mobile.
