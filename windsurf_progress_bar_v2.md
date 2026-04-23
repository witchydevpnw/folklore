# Windsurf follow-up — Author Fund banner, generic framing

Small adjustment to the `author-fund-progress` branch. Two edits: update the JavaScript and the HTML so the banner defaults to "our next author" instead of a named one. A named author becomes an opt-in override when you have one confirmed.

Apply these to the same `author-fund-progress` branch.

---

## Edit 1 — Update the JavaScript

### Find

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
```

### Replace with

```html
    (function initFeaturedCampaign() {
      const el = document.querySelector('.featured-campaign');
      if (!el) return;
      const author = (el.dataset.author || '').trim();
      const raised = parseFloat(el.dataset.raised) || 0;
      const target = parseFloat(el.dataset.target) || 0;
      const url    = el.dataset.url || '#';
      const fmt = n => '$' + Math.round(n).toLocaleString('en-US');
      if (target > 0) {
        el.classList.add('is-active');
        const pct = Math.max(0, Math.min(100, (raised / target) * 100));
        el.style.setProperty('--progress-width', pct.toFixed(1) + '%');
        el.querySelector('[data-eyebrow]').textContent = 'Currently fundraising';
        if (author) {
          el.querySelector('[data-title]').innerHTML = 'Bringing <em>' + author + '</em> to the Tri-Cities';
        } else {
          el.querySelector('[data-title]').innerHTML = 'Bringing our <em>next author</em> to the Tri-Cities';
        }
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
```

What changed: the active-state title now checks whether `data-author` has a value. If it does, renders the named version. If it's blank, renders "Bringing our next author to the Tri-Cities" with *"next author"* in copper italic. Same mechanic, more honest default.

---

## Edit 2 — Update the HTML banner to default to unnamed

### Find

```html
      <div class="featured-campaign fade-up"
           data-author="Bryn Weaver"
           data-raised="325"
           data-target="1500"
           data-url="https://www.zeffy.com/en-US/donation-form/support-literacy-events">
        <p class="featured-campaign-eyebrow"><span data-eyebrow>Currently fundraising</span></p>
        <p class="featured-campaign-title" data-title>Bringing <em>Bryn Weaver</em> to the Tri-Cities</p>
```

### Replace with

```html
      <div class="featured-campaign fade-up"
           data-author=""
           data-raised="0"
           data-target="1500"
           data-url="https://www.zeffy.com/en-US/donation-form/support-literacy-events">
        <p class="featured-campaign-eyebrow"><span data-eyebrow>Currently fundraising</span></p>
        <p class="featured-campaign-title" data-title>Bringing our <em>next author</em> to the Tri-Cities</p>
```

Now the default state is:
- Unnamed ("our next author")
- Progress at $0 of $1,500
- Still in active state so the bar is visible

That's an honest-if-quiet starting point: you're openly fundraising, you haven't raised anything yet, and no specific author is promised.

---

## How to use this going forward

**Three scenarios, three edits.**

**You have an active campaign, no confirmed author yet.** The default. Leave `data-author=""`, update `data-raised` as money comes in.

**You have a confirmed author.** Fill in `data-author="Their Name"`. The title auto-updates to "Bringing [Their Name] to the Tri-Cities."

**You're between campaigns.** Set `data-target="0"`. Banner switches to "Our next author event is in the works" with a link to the mailing list.

---

## One honest call

Starting at $0 of $1,500 isn't ideal if no one has given yet. Empty progress bars read as "no one has supported this" more than "new campaign." You have three choices:

1. **Ship with $0.** Honest and most likely to trigger action. Works best if you push the site to the small circle who already knows you're launching. That audience understands "new" and contributes to move the bar.
2. **Seed with board contributions first.** Have your four board members contribute something before the banner goes live publicly. A bar at $200-400 of $1,500 reads very differently than $0 of $1,500.
3. **Switch to inactive state until the first dollars come in.** Set `data-target="0"`. Banner says "Our next author event is in the works." Flip it to active when you have seed contributions or a specific campaign start date.

My pick is option 2. The board already has a vested interest in seeing this succeed, and a pre-populated bar creates a starting-line feel that an empty one doesn't. It's also honest — those dollars are real.
