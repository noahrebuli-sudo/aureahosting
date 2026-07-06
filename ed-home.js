/* =========================================
   AUREA HOSTING: Editorial homepage scripts
   Loaded by index.html only
   ========================================= */

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
