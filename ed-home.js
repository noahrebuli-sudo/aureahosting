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
  line2: 'We manage fifteen. On purpose.',
  goldWord: 'fifteen',
  caption: 'A deliberately small portfolio is what keeps guest replies under four minutes and pricing reviewed weekly. When a place opens, we would genuinely like to hear about your property.',
  footnote: 'Dot field illustrative of the Adelaide market.'
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

  /* ─── Areas as chapters ─── */
  (function areaChapters() {
    const section = document.getElementById('edChapters');
    if (!section) return;

    const track   = document.getElementById('edChaptersTrack');
    const counter = document.getElementById('edChaptersCounter');
    const bar     = document.getElementById('edChaptersBar');
    const total   = track.children.length;
    const pinned  = window.matchMedia('(min-width: 841px) and (prefers-reduced-motion: no-preference)');

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function setProgress(progress) {
      const idx = Math.min(Math.floor(progress * total), total - 1);
      if (counter) counter.textContent = pad(idx + 1) + '/' + pad(total);
      if (bar) bar.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
    }

    /* Carousel mode: counter and hairline follow horizontal scroll */
    track.addEventListener('scroll', () => {
      if (pinned.matches) return;
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    }, { passive: true });

    /* Pinned mode: track translated by page scroll over the 320vh wrapper */
    let ticking = false;
    function update() {
      ticking = false;
      if (!pinned.matches) return;
      const range = section.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / range, 0), 1);
      const shift = Math.max(track.scrollWidth - track.clientWidth, 0);
      track.style.transform = 'translate3d(' + (-progress * shift).toFixed(1) + 'px, 0, 0)';
      setProgress(progress);
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    if (pinned.addEventListener) {
      pinned.addEventListener('change', () => {
        track.style.transform = '';
        update();
      });
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
    const footnote = document.getElementById('edMarketFootnote');
    if (line1) line1.textContent = ED_MARKET.line1;
    if (caption) caption.textContent = ED_MARKET.caption;
    if (footnote) footnote.textContent = ED_MARKET.footnote;
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
