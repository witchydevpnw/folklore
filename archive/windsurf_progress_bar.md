# Windsurf instructions — Author Fund progress banner

Adds a featured campaign banner above the four program cards inside the "Support our work" section. Displays the current Author Fund campaign with a progress bar that fills as donations come in. Handles two states: active campaign and between-campaigns.

Recommended branch name: `author-fund-progress`. Keep it separate from the `donor-wall` branch so you can merge them independently.

Three edits total:

1. Edit 1: add `.featured-campaign` CSS
2. Edit 2: add the banner HTML inside `#support`, above `.campaigns-grid`
3. Edit 3: add the small JS that reads the data attributes and populates the banner

---

## Edit 1 — Add `.featured-campaign` CSS

### Find

```css
    #support { background: linear-gradient(135deg, var(--copper-lt) 0%, var(--warm) 50%, var(--cream) 100%); }
    .campaigns-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 900px; margin: 0 auto; }
```

### Replace with

```css
    #support { background: linear-gradient(135deg, var(--copper-lt) 0%, var(--warm) 50%, var(--cream) 100%); }
    .featured-campaign { max-width: 900px; margin: 0 auto 2.5rem; background: var(--ink); color: var(--cream); border-radius: 14px; padding: 2rem 2.25rem; position: relative; overflow: hidden; box-shadow: 0 1px 2px rgba(42,31,61,0.06), 0 12px 32px -10px rgba(42,31,61,0.25); }
    .featured-campaign-eyebrow { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--copper); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.6rem; }
    .featured-campaign-eyebrow::after { content: ''; flex: 1; height: 1px; background: rgba(193,123,74,0.35); }
    .featured-campaign-title { font-family: var(--serif); font-size: clamp(22px, 2.8vw, 32px); font-style: italic; font-weight: 400; line-height: 1.25; margin-bottom: 1.5rem; }
    .featured-campaign-title em { font-style: normal; color: var(--copper); }
    .progress-rail { width: 100%; height: 6px; background: rgba(250,248,245,0.12); border-radius: 3px; overflow: hidden; margin-bottom: 0.75rem; }
    .progress-fill { height: 100%; background: var(--copper); border-radius: 3px; width: 0; transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1); }
    .fade-up.visible .progress-fill { width: var(--progress-width, 0%); }
    .progress-meta { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; font-size: 13px; color: rgba(250,248,245,0.7); margin-bottom: 1.5rem; flex-wrap: wrap; }
    .progress-meta strong { color: var(--cream); font-weight: 500; font-size: 15px; font-variant-numeric: tabular-nums; }
    .featured-campaign .btn-copper { display: inline-block; }
    .featured-campaign.is-inactive .progress-rail,
    .featured-campaign.is-inactive .progress-meta { display: none; }
    .featured-campaign.is-inactive .featured-campaign-title { margin-bottom: 0.5rem; }
    .featured-campaign.is-inactive .featured-campaign-subtext { font-size: 14px; color: rgba(250,248,245,0.7); line-height: 1.7; margin-bottom: 1.5rem; }
    .featured-campaign.is-active .featured-campaign-subtext { display: none; }
    .campaigns-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 900px; margin: 0 auto; }
```

Plain-language summary:
- Banner is deep plum with cream text, matching the "Stay in the loop" section
- Eyebrow reads "Currently fundraising" in copper small-caps, with a hairline trailing off to the right
- Campaign title uses Cormorant italic, with key words like the author's name optionally in copper
- Progress bar is copper on a dim rail; fills via CSS animation when the section scrolls into view
- Two states built in: `is-active` (shows bar and amounts) and `is-inactive` (shows subtext about next campaign). JS toggles between them.

---

## Edit 2 — Add the banner HTML inside `#support`

### Find

```html
  <section id="support">
    <div class="section-inner">
      <p class="section-label">Support our work<span class="section-star" aria-hidden="true">&#10022;</span></p>
      <div class="campaigns-grid">
```

### Replace with

```html
  <section id="support">
    <div class="section-inner">
      <p class="section-label">Support our work<span class="section-star" aria-hidden="true">&#10022;</span></p>

      <!-- ================================================================ -->
      <!-- FEATURED CAMPAIGN BANNER                                         -->
      <!-- To update: change data-author, data-raised, data-target below.   -->
      <!-- When there's no active campaign, set data-target="0".            -->
      <!-- The JS reads these values and fills in the rest.                 -->
      <!-- ================================================================ -->
      <div class="featured-campaign fade-up"
           data-author="Bryn Weaver"
           data-raised="325"
           data-target="1500"
           data-url="https://www.zeffy.com/en-US/donation-form/support-literacy-events">
        <p class="featured-campaign-eyebrow"><span data-eyebrow>Currently fundraising</span></p>
        <p class="featured-campaign-title" data-title>Bringing <em>Bryn Weaver</em> to the Tri-Cities</p>
        <p class="featured-campaign-subtext" data-subtext>Sign up below to be the first to hear about our next author event.</p>
        <div class="progress-rail" aria-hidden="true"><div class="progress-fill" data-fill></div></div>
        <div class="progress-meta">
          <span><strong data-raised-display>$325</strong> raised</span>
          <span>of <strong data-target-display>$1,500</strong> goal</span>
        </div>
        <a href="https://www.zeffy.com/en-US/donation-form/support-literacy-events" class="btn btn-copper" target="_blank" rel="noopener" data-cta>Contribute</a>
      </div>

      <div class="campaigns-grid">
```

Notice I used Bryn Weaver / $325 / $1,500 as sample values. These match the first event you've mentioned (June 8 book release). Swap to real numbers anytime.

---

## Edit 3 — Add the small script that makes the banner work

### Find

```html
    document.getElementById('signupBtn').addEventListener('click', function() {
```

### Replace with

```html
    (function initFeaturedCampaign() {
      const el = document.querySelector('.featured-campaign');
      if (!el) return;
      const author = el.dataset.author || '';
      const raised = parseFloat(el.dataset.raised) || 0;
      const target = parseFloat(el.dataset.target) || 0;
      const url    = el.dataset.url || '#';
      const fmt = n => '$' + Math.round(n).toLocaleString('en-US');
      if (target > 0) {
        el.classList.add('is-active');
        const pct = Math.max(0, Math.min(100, (raised / target) * 100));
        el.style.setProperty('--progress-width', pct.toFixed(1) + '%');
        el.querySelector('[data-eyebrow]').textContent = 'Currently fundraising';
        el.querySelector('[data-title]').innerHTML = 'Bringing <em>' + author + '</em> to the Tri-Cities';
        el.querySelector('[data-raised-display]').textContent = fmt(raised);
        el.querySelector('[data-target-display]').textContent = fmt(target);
        const cta = el.querySelector('[data-cta]');
        cta.href = url;
        cta.textContent = 'Contribute';
      } else {
        el.classList.add('is-inactive');
        el.querySelector('[data-eyebrow]').textContent = 'Between campaigns';
        el.querySelector('[data-title]').textContent = 'Our next author event is in the works.';
        el.querySelector('[data-cta]').textContent = 'Get notified';
        el.querySelector('[data-cta]').setAttribute('href', '#join');
        el.querySelector('[data-cta]').removeAttribute('target');
      }
    })();

    document.getElementById('signupBtn').addEventListener('click', function() {
```

What it does in plain terms:
- Reads the three data attributes from the banner (author, raised, target, url)
- If target > 0: active state. Computes the percentage (raised / target), sets it as a CSS custom property so the bar knows how wide to fill, formats the dollar amounts, writes the author name into the italic title
- If target = 0: inactive state. Switches eyebrow to "Between campaigns," title to "Our next author event is in the works.", and points the button to the mailing list signup (`#join`) instead of Zeffy.

---

## How to update this when a campaign changes

Exactly three fields to edit in `index.html`, inside the `.featured-campaign` div:

```html
data-author="[New Author Name]"
data-raised="[new raised amount, no dollar sign, no commas]"
data-target="[new target, no dollar sign, no commas]"
```

Everything else updates automatically.

**Between authors?** Set `data-target="0"` and the banner switches to "Our next author event is in the works" with a link to the mailing list. No other edits needed.

**Updating the raised amount weekly?** Recommended cadence during an active campaign. Pull the number from Zeffy's dashboard, update `data-raised`, push the file. I'd aim for Friday updates so the weekend crowd sees progress.

---

## What to check once it's live

- Banner sits above the four program cards, inside the tinted section
- Deep plum with cream text, gentle shadow, matches the visual language of "Stay in the loop"
- Eyebrow in copper reads "Currently fundraising"
- Italic title reads "Bringing Bryn Weaver to the Tri-Cities" with the author's name in copper
- Progress bar fills smoothly from 0 to about 22% when you scroll it into view
- "$325 raised / of $1,500 goal" sits below the bar in tabular numerals
- Copper "Contribute" button links to Zeffy
- Test the inactive state: temporarily change `data-target="1500"` to `data-target="0"`, refresh, and the banner should switch to "Between campaigns" with a link to signup. Set it back to `1500` when you're done testing.

## Things to tune if something feels off

- **Banner too tall/boxy:** reduce `padding: 2rem 2.25rem` to `padding: 1.5rem 2rem`
- **Progress bar too thin:** bump `height: 6px` to `8px`
- **Progress bar animation too slow/fast:** change `transition: width 1.4s ...` (lower = faster)
- **Title too big/small:** adjust `clamp(22px, 2.8vw, 32px)`
- **Banner fighting with the cards below:** add more space by changing `margin: 0 auto 2.5rem` to `margin: 0 auto 3.5rem`

---

## One honest note

The sample values I used ($325 of $1,500 for Bryn Weaver on June 8) aren't real numbers. Before merging to `main`, either:

- Replace them with actual Zeffy totals for the Bryn Weaver event, if you're comfortable showing a specific named author on the homepage before the WSLCB license is approved, **or**
- Set `data-target="0"` so it shows the inactive state until the first real campaign goes live

I'd lean toward option two until licensing and dates are locked. Putting a specific author's name on a progress bar before the event is confirmed is a promise in public. Better to soft-launch the mechanism in inactive state, and flip it to active when you're ready to ask for money against a specific ask.
