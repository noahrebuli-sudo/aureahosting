/* =========================================
   AUREA HOSTING: Editorial homepage scripts
   Loaded by index.html only
   ========================================= */

/* Market field configuration: all counts and copy strings live here */
const ED_MARKET = {
  totalDots: 400,
  goldDots: 15,
  populateStaggerMs: 2.4,
  igniteEveryMs: 150,
  line1: 'Adelaide has thousands of short stay listings.',
  line2: 'Every home we manage gets our full attention.',
  goldWord: 'full attention',
  caption: 'That attention is the product: pricing reviewed weekly, guests answered in minutes, an operator who knows your property personally. It is why we keep the portfolio deliberately small, and why the results follow.'
};

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = window.matchMedia('(pointer: fine)').matches;

  /* ─── Hero slideshow ─── */
  (function heroSlideshow() {
    const hero = document.querySelector('.ed-hero');
    if (!hero) return;

    const SLIDE_MS = 10000;
    const slides   = Array.from(hero.querySelectorAll('.ed-slide'));
    const progBtns = Array.from(hero.querySelectorAll('.ed-prog'));
    const caption  = document.getElementById('edHeroCaption');
    let current    = 0;
    let timer      = null;

    if (slides.length < 2) return;

    function setCaption(text) {
      if (!caption || !text) return;
      caption.classList.add('is-fading');
      setTimeout(() => {
        caption.textContent = text;
        caption.classList.remove('is-fading');
      }, 600);
    }

    function show(idx) {
      if (idx === current) return;
      slides[current].classList.remove('is-active');
      progBtns[current] && progBtns[current].classList.remove('is-active');
      current = idx;
      slides[current].classList.add('is-active');
      progBtns[current] && progBtns[current].classList.add('is-active');
      setCaption(slides[current].getAttribute('data-caption'));
    }

    function next() {
      show((current + 1) % slides.length);
    }

    function startTimer() {
      if (reduceMotion) return;
      if (timer) clearInterval(timer);
      timer = setInterval(next, SLIDE_MS);
    }

    progBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-slide'), 10);
        if (!isNaN(idx)) {
          show(idx);
          startTimer();
        }
      });
    });

    /* Pause rotation while the tab is hidden so slides and
       progress bars do not drift out of sync */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (timer) clearInterval(timer);
        timer = null;
      } else {
        startTimer();
      }
    });

    startTimer();
  })();

  /* ─── Collage scroll parallax, pointer fine only ─── */
  (function collageParallax() {
    if (!finePointer || reduceMotion) return;
    const section = document.getElementById('edCollage');
    if (!section) return;

    const items = Array.from(section.querySelectorAll('.ed-collage-item'));
    const word  = document.getElementById('edCollageWord');
    let ticking = false;

    function update() {
      const r = section.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        const delta = r.top + r.height / 2 - window.innerHeight / 2;
        items.forEach(item => {
          const speed = parseFloat(item.getAttribute('data-speed')) || 0;
          item.style.transform = 'translate3d(0, ' + (delta * speed).toFixed(1) + 'px, 0)';
        });
        if (word) {
          word.style.transform = 'translate3d(' + (delta * 0.12).toFixed(1) + 'px, 0, 0)';
        }
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  })();

  /* ─── Areas as chapters: free horizontal scroller ─── */
  (function areaChapters() {
    const section = document.getElementById('edChapters');
    if (!section) return;

    const track   = document.getElementById('edChaptersTrack');
    const counter = document.getElementById('edChaptersCounter');
    const bar     = document.getElementById('edChaptersBar');
    const prev    = document.getElementById('edChaptersPrev');
    const next    = document.getElementById('edChaptersNext');
    const cards   = Array.from(track.children);
    const total   = cards.length;

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    /* Counter, hairline and arrow visibility all follow scrollLeft */
    function update() {
      const max = Math.max(track.scrollWidth - track.clientWidth, 0);
      const progress = max > 0 ? Math.min(track.scrollLeft / max, 1) : 0;
      const idx = total > 1 ? Math.round(progress * (total - 1)) : 0;
      if (counter) counter.textContent = pad(idx + 1) + '/' + pad(total);
      if (bar) bar.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
      if (prev) prev.classList.toggle('is-hidden', track.scrollLeft <= 2);
      if (next) next.classList.toggle('is-hidden', track.scrollLeft >= max - 2);
    }

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    function step(dir) {
      const stride = total > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : track.clientWidth;
      track.scrollBy({ left: dir * stride, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', () => step(-1));
    if (next) next.addEventListener('click', () => step(1));

    /* Drag to scroll on mouse pointers; snap is suspended while dragging */
    if (finePointer) {
      let down = false;
      let dragged = false;
      let startX = 0;
      let startLeft = 0;

      track.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse') return;
        down = true;
        dragged = false;
        startX = e.clientX;
        startLeft = track.scrollLeft;
      });
      track.addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!dragged && Math.abs(dx) > 5) {
          dragged = true;
          track.classList.add('is-dragging');
          track.setPointerCapture(e.pointerId);
        }
        if (dragged) track.scrollLeft = startLeft - dx;
      });
      function endDrag() {
        down = false;
        track.classList.remove('is-dragging');
      }
      track.addEventListener('pointerup', endDrag);
      track.addEventListener('pointercancel', endDrag);

      /* A drag must not register as a click on the card links */
      track.addEventListener('click', e => {
        if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
      }, true);
    }

    update();
  })();

  /* ─── Market dot field ─── */
  (function marketField() {
    const field = document.getElementById('edDotfield');
    if (!field) return;

    /* Copy comes from the ED_MARKET config; the markup carries the
       same strings as a no-script fallback */
    const line1    = document.getElementById('edMarketLine1');
    const line2    = document.getElementById('edMarketLine2');
    const caption  = document.getElementById('edMarketCaption');
    if (line1) line1.textContent = ED_MARKET.line1;
    if (caption) caption.textContent = ED_MARKET.caption;
    if (line2) {
      const at = ED_MARKET.line2.indexOf(ED_MARKET.goldWord);
      line2.textContent = '';
      if (at >= 0) {
        line2.appendChild(document.createTextNode(ED_MARKET.line2.slice(0, at)));
        const gold = document.createElement('span');
        gold.className = 'ed-gold';
        gold.textContent = ED_MARKET.goldWord;
        line2.appendChild(gold);
        line2.appendChild(document.createTextNode(ED_MARKET.line2.slice(at + ED_MARKET.goldWord.length)));
      } else {
        line2.textContent = ED_MARKET.line2;
      }
    }

    const dots = [];
    for (let i = 0; i < ED_MARKET.totalDots; i++) {
      const d = document.createElement('span');
      d.className = 'ed-dot';
      d.style.transitionDelay = Math.round(i * ED_MARKET.populateStaggerMs) + 'ms';
      field.appendChild(d);
      dots.push(d);
    }

    /* Evenly spread gold dots with a fixed pseudo-random jitter so the
       constellation is stable between visits */
    const goldIdx = [];
    const step = ED_MARKET.totalDots / ED_MARKET.goldDots;
    for (let g = 0; g < ED_MARKET.goldDots; g++) {
      const jitter = ((g * 7919) % 13) - 6;
      const idx = Math.min(Math.max(Math.round(g * step + step / 2 + jitter), 0), ED_MARKET.totalDots - 1);
      goldIdx.push(idx);
    }

    function ignite(instant) {
      const populateMs = instant ? 0 : 400 + ED_MARKET.totalDots * ED_MARKET.populateStaggerMs;
      goldIdx.forEach((idx, order) => {
        const delay = instant ? 0 : populateMs + order * ED_MARKET.igniteEveryMs;
        setTimeout(() => { dots[idx].classList.add('ed-dot-gold'); }, delay);
      });
    }

    if (reduceMotion) {
      dots.forEach(d => {
        d.style.transitionDelay = '0ms';
        d.style.transition = 'none';
      });
      field.classList.add('is-populated');
      ignite(true);
      return;
    }

    const fieldObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          field.classList.add('is-populated');
          ignite(false);
          fieldObs.unobserve(field);
        }
      });
    }, { threshold: 0.3 });
    fieldObs.observe(field);
  })();

  /* ─── Hero scroll cue: gone for good on first scroll ─── */
  (function scrollCue() {
    const cue = document.getElementById('edScrollCue');
    if (!cue) return;
    function onFirstScroll() {
      if (window.scrollY <= 4) return;
      cue.classList.add('is-done');
      window.removeEventListener('scroll', onFirstScroll);
    }
    window.addEventListener('scroll', onFirstScroll, { passive: true });
    onFirstScroll();
  })();

  /* ─── Mobile sticky CTA ─── */
  (function stickyCta() {
    const bar = document.getElementById('edStickyCta');
    if (!bar) return;

    let dismissed = false;
    try { dismissed = sessionStorage.getItem('edStickyCtaDismissed') === '1'; } catch (err) {}
    if (dismissed) {
      bar.parentNode.removeChild(bar);
      return;
    }

    const mobile = window.matchMedia('(max-width: 720px)');
    const footer = document.querySelector('.site-footer');
    let footerInView = false;

    function pastHalf() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 && window.scrollY / max >= 0.5;
    }
    function sync() {
      bar.classList.toggle('is-visible', mobile.matches && pastHalf() && !footerInView);
    }

    if (footer && 'IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          footerInView = e.isIntersecting;
          sync();
        });
      }, { threshold: 0 }).observe(footer);
    }

    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();

    document.getElementById('edStickyCtaDismiss').addEventListener('click', () => {
      try { sessionStorage.setItem('edStickyCtaDismissed', '1'); } catch (err) {}
      bar.classList.remove('is-visible');
      setTimeout(() => {
        if (bar.parentNode) bar.parentNode.removeChild(bar);
      }, 450);
    });
  })();

  /* ─── Difference-blend cursor ring, pointer fine only ─── */
  (function cursorRing() {
    if (!finePointer || reduceMotion) return;

    const ring = document.createElement('div');
    ring.className = 'ed-cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);

    let mx = -100, my = -100, rx = -100, ry = -100;
    let visible = false;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        ring.classList.add('is-visible');
      }
    });

    document.addEventListener('mouseover', e => {
      const interactive = e.target.closest &&
        e.target.closest('a, button, input, select, textarea, [role="button"]');
      ring.classList.toggle('is-hover', !!interactive);
    });

    (function loop() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx.toFixed(1) + 'px';
      ring.style.top  = ry.toFixed(1) + 'px';
      requestAnimationFrame(loop);
    })();
  })();

  /* ─── Magnetic hover, pointer fine only ─── */
  (function magneticButtons() {
    if (!finePointer || reduceMotion) return;
    const RANGE = 0.22;
    document.querySelectorAll('.ed-magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r  = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (dx * RANGE) + 'px, ' + (dy * RANGE) + 'px)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  })();

});
