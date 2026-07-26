/*
 * night-sky.js — ambient "night sky" motion for Folklore Society's dark bands.
 * Quiet twinkle with a rare, slow shooting star. No dependencies.
 *
 * Usage: add `data-night-sky` to any dark (ink-background) section, then
 *   <script src="/night-sky.js" defer></script>
 *
 * The script injects a <canvas> behind the section's content, lifts that
 * content above it, and animates. It honours prefers-reduced-motion (static
 * starfield, no animation), pauses when the band is scrolled off-screen or the
 * tab is hidden, and redraws on resize.
 */
(function () {
  'use strict';

  var CREAM = [250, 248, 245];
  var COPPER = [217, 154, 106];
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  var reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false, addEventListener: function () {} };
  function reduced() { return reduceMQ.matches; }

  // Inject the canvas positioning rule once.
  var style = document.createElement('style');
  style.textContent =
    '.night-sky-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;' +
    'pointer-events:none;display:block;}';
  document.head.appendChild(style);

  function Sky(canvas) {
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, dpr = 1;
    var stars = [], shooters = [];
    var raf = null, last = 0, sinceShot = 0, nextShot = 0, running = false, onScreen = true;

    function rand(a, b) { return a + Math.random() * (b - a); }

    function build() {
      var area = w * h;
      var n = Math.max(18, Math.min(90, Math.round(area / 6800)));
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          r: rand(0.5, 1.7),
          base: rand(0.16, 0.55),
          amp: rand(0.22, 0.5),
          spd: rand(0.35, 1.1),
          ph: Math.random() * Math.PI * 2,
          warm: Math.random() < 0.12
        });
      }
      shooters = [];
      sinceShot = 0;
      nextShot = rand(5, 11);
    }

    function spawnShooter() {
      var fromLeft = Math.random() < 0.5;
      var ang = rand(0.28, 0.42) * Math.PI;
      var speed = rand(360, 540);
      shooters.push({
        x: fromLeft ? rand(-0.05, 0.45) * w : rand(0.55, 1.05) * w,
        y: rand(-0.1, 0.32) * h,
        vx: (fromLeft ? 1 : -1) * Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        len: rand(70, 130),
        life: 0, span: rand(0.75, 1.15)
      });
    }

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function drawStar(s, alpha) {
      var c = s.warm ? COPPER : CREAM;
      if (s.r > 1.15) {
        var g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.2);
        g.addColorStop(0, rgba(c, alpha));
        g.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = rgba(c, alpha);
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) drawStar(stars[i], stars[i].base);
    }

    function frame(now) {
      if (!running) return;
      var dt = Math.min(0.05, (now - last) / 1000 || 0); last = now;
      var t = now / 1000;
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var a = s.base + s.amp * Math.sin(t * s.spd + s.ph);
        if (a < 0.04) a = 0.04;
        drawStar(s, a);
      }

      sinceShot += dt;
      if (sinceShot >= nextShot && shooters.length < 1) {
        spawnShooter(); sinceShot = 0; nextShot = rand(6, 12);
      }
      for (var k = shooters.length - 1; k >= 0; k--) {
        var sh = shooters[k];
        sh.life += dt; sh.x += sh.vx * dt; sh.y += sh.vy * dt;
        var mag = Math.hypot(sh.vx, sh.vy) || 1;
        var ux = sh.vx / mag, uy = sh.vy / mag;
        var tx = sh.x - ux * sh.len, ty = sh.y - uy * sh.len;
        var fade = Math.sin(Math.min(1, sh.life / sh.span) * Math.PI);
        var grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        grad.addColorStop(0, rgba(CREAM, 0.9 * fade));
        grad.addColorStop(0.35, rgba(COPPER, 0.35 * fade));
        grad.addColorStop(1, rgba(CREAM, 0));
        ctx.strokeStyle = grad; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.fillStyle = rgba(CREAM, 0.95 * fade);
        ctx.beginPath(); ctx.arc(sh.x, sh.y, 1.5, 0, Math.PI * 2); ctx.fill();
        if (sh.life > sh.span || sh.x < -sh.len || sh.x > w + sh.len || sh.y > h + sh.len) shooters.splice(k, 1);
      }

      raf = requestAnimationFrame(frame);
    }

    function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

    function refresh() {
      stop();
      if (reduced() || !onScreen || document.hidden) drawStatic();
      else start();
    }

    var io = new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting; refresh();
    }, { threshold: 0.02 });
    io.observe(canvas);

    if (window.ResizeObserver) {
      new ResizeObserver(function () { resize(); refresh(); }).observe(canvas);
    } else {
      window.addEventListener('resize', function () { resize(); refresh(); });
    }

    resize();
    refresh();
    return { refresh: refresh };
  }

  function attach() {
    var bands = document.querySelectorAll('[data-night-sky]');
    var skies = [];
    bands.forEach(function (band) {
      if (band.querySelector(':scope > canvas.night-sky-canvas')) return; // already attached
      if (getComputedStyle(band).position === 'static') band.style.position = 'relative';
      if (getComputedStyle(band).overflow === 'visible') band.style.overflow = 'hidden';

      // Lift existing element children above the canvas.
      Array.prototype.forEach.call(band.children, function (child) {
        var cs = getComputedStyle(child);
        if (cs.position === 'static') child.style.position = 'relative';
        if (cs.zIndex === 'auto') child.style.zIndex = '1';
      });

      var canvas = document.createElement('canvas');
      canvas.className = 'night-sky-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      band.insertBefore(canvas, band.firstChild);
      skies.push(new Sky(canvas));
    });

    reduceMQ.addEventListener && reduceMQ.addEventListener('change', function () {
      skies.forEach(function (s) { s.refresh(); });
    });
    document.addEventListener('visibilitychange', function () {
      skies.forEach(function (s) { s.refresh(); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
