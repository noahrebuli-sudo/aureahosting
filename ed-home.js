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
