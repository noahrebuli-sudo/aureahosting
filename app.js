/* =========================================
   AUREA HOSTING: App JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Calculator Data ─── */
  function getRevenueData() {
    return (typeof AUREA_DATA !== 'undefined' && AUREA_DATA.calculatorData) || {};
  }

  /* ─── Intel Strip ─── */
  (function renderIntelStrip() {
    const ticker = document.getElementById('intelTicker');
    if (!ticker) return;
    const events = AUREA_DATA.intelEvents;
    const sep = '<span class="intel-sep">◆</span>';
    let html = '';
    for (let pass = 0; pass < 2; pass++) {
      events.forEach(function(e, i) {
        html += '<div class="intel-card">' +
          '<span class="intel-event">' + e.event + '</span>' +
          '<span class="intel-period">' + e.period + '</span>' +
          '<span class="intel-uplift">' + e.uplift + '<em>/night</em></span>' +
          '<span class="intel-ctx">' + e.ctx + '</span>' +
          '</div>';
        if (i < events.length - 1 || pass === 0) html += sep;
      });
    }
    ticker.innerHTML = html;
  })();

  /* ─── Calculator Logic ─── */
  const calcSuburb = document.getElementById('calcSuburb');
  const calcOutput = document.getElementById('calcOutput');
  const bedBtns    = document.querySelectorAll('.bed-btn');
  let activeBeds   = 2;
  let calcAnimFrame = null;

  function getActiveBeds() {
    const active = document.querySelector('.bed-btn.active');
    return active ? parseInt(active.dataset.beds) : null;
  }

  function formatMoney(val) {
    return '$' + val.toLocaleString('en-AU');
  }

  function updateCalc() {
    const suburb = calcSuburb ? calcSuburb.value : '';
    const beds   = getActiveBeds();

    if (!calcOutput) return;

    if (!suburb || !beds) {
      calcOutput.innerHTML = `
        <div class="calc-empty-state">
          <span class="calc-empty-icon" aria-hidden="true">↓</span>
          Select suburb and bedrooms to estimate your revenue
        </div>`;
      return;
    }

    const data = getRevenueData()[suburb];
    if (!data) return;

    const bedKey = Math.min(beds, 4);
    const [low, high] = data.beds[bedKey] || data.beds[4];

    calcOutput.innerHTML = `
      <div class="calc-result" style="width:100%;">
        <div class="calc-range-row">
          <span class="calc-range-low" aria-live="off">${formatMoney(Math.round(low * 0.6))}</span>
          <span class="calc-range-sep">–</span>
          <span class="calc-range-high" aria-live="off">${formatMoney(Math.round(high * 0.6))}</span>
          <span class="calc-range-unit">/mo</span>
        </div>
        <div class="calc-suburb-label">${data.label} · ${beds === 4 ? '4+' : beds} bedroom${beds === 1 ? '' : 's'}</div>
        <div class="calc-events">${data.events}</div>
      </div>`;

    animateCalcNumbers(low, high);
  }

  function animateCalcNumbers(targetLow, targetHigh) {
    if (calcAnimFrame) cancelAnimationFrame(calcAnimFrame);

    const lowEl  = calcOutput ? calcOutput.querySelector('.calc-range-low')  : null;
    const highEl = calcOutput ? calcOutput.querySelector('.calc-range-high') : null;
    if (!lowEl || !highEl) return;

    const startLow  = Math.round(targetLow  * 0.6);
    const startHigh = Math.round(targetHigh * 0.6);
    const duration  = 1100;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);

      lowEl.textContent  = formatMoney(Math.round(startLow  + (targetLow  - startLow)  * eased));
      highEl.textContent = formatMoney(Math.round(startHigh + (targetHigh - startHigh) * eased));

      if (progress < 1) {
        calcAnimFrame = requestAnimationFrame(step);
      } else {
        lowEl.textContent  = formatMoney(targetLow);
        highEl.textContent = formatMoney(targetHigh);
      }
    }
    calcAnimFrame = requestAnimationFrame(step);
  }

  if (calcSuburb) {
    calcSuburb.addEventListener('change', updateCalc);
  }

  bedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBeds = parseInt(btn.dataset.beds);
      updateCalc();
    });
  });

  /* ─── Scroll-to-calculator ─── */
  document.querySelectorAll('.js-scroll-calc').forEach(el => {
    el.addEventListener('click', e => {
      const target = document.getElementById('calc');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          const sel = document.getElementById('calcSuburb');
          if (sel) sel.focus();
        }, 600);
      }
    });
  });

  /* ─── Sticky Header ─── */
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    let ticking    = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          header.classList.toggle('scrolled', y > 60);
          header.classList.toggle('hidden',   y > lastScroll && y > 200);
          lastScroll = y;
          ticking    = false;
        });
        ticking = true;
      }
    });
  }

  /* ─── Mobile Navigation ─── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.getElementById('navLinks') || document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ─── Active Nav Link ─── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── Scroll Reveal ─── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ─── Rule Line Draw ─── */
  const ruleLines = document.querySelectorAll('.rule-line.js-rule');
  if (ruleLines.length) {
    const ruleObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('drawn');
          ruleObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    ruleLines.forEach(el => ruleObs.observe(el));
  }

  /* ─── Animated Counters (starts from data-start) ─── */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el       = e.target;
          const target   = parseInt(el.getAttribute('data-counter'), 10);
          const startVal = parseInt(el.getAttribute('data-start')  || '0', 10);
          const suffix   = el.getAttribute('data-suffix')  || '';
          const prefix   = el.getAttribute('data-prefix')  || '';
          const duration = 2000;
          const startTime = performance.now();

          function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            const current  = Math.round(startVal + (target - startVal) * eased);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(el => counterObs.observe(el));
  }

  /* ─── Parallax ─── */
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  if (parallaxBgs.length) {
    let pTicking = false;
    window.addEventListener('scroll', () => {
      if (!pTicking) {
        requestAnimationFrame(() => {
          parallaxBgs.forEach(bg => {
            bg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
          });
          pTicking = false;
        });
        pTicking = true;
      }
    });
  }

  /* ─── FAQ Accordion ─── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        const a = i.querySelector('.faq-answer');
        if (q) q.setAttribute('aria-expanded', 'false');
        if (a) { a.style.maxHeight = '0'; a.setAttribute('aria-hidden', 'true'); }
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.setAttribute('aria-hidden', 'false');
      }
    });
  });

  /* ─── MapLibre Map (Areas Page) ─── */
  const mapEl = document.getElementById('aurea-map');
  if (mapEl && window.maplibregl) {
    const map = new maplibregl.Map({
      container: 'aurea-map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [138.6007, -34.9285],
      zoom: 11,
      attributionControl: true
    });
    const markers = [
      { coords: [138.5153,-34.9816], name: 'Glenelg',        desc: 'Beachside, 2BR avg $3,900/mo · WomAdelaide +$175/night' },
      { coords: [138.5157,-34.9502], name: 'West Beach',     desc: 'Airport proximity meets coastal demand' },
      { coords: [138.4969,-34.9219], name: 'Henley Beach',   desc: 'Premium coastal village with strong weekend demand' },
      { coords: [138.6007,-34.9285], name: 'Adelaide CBD',   desc: 'Business, Fringe, Gather Round driving year-round occupancy' },
      { coords: [138.5884,-34.9499], name: 'Unley',          desc: 'Leafy city-fringe with boutique appeal' },
      { coords: [138.6297,-34.9211], name: 'Norwood',        desc: 'Vibrant café precinct, 2BR avg $3,600/mo' },
      { coords: [138.6456,-34.9387], name: 'Burnside',       desc: 'Upscale residential with Hills proximity premium' },
      { coords: [138.7140,-35.0003], name: 'Stirling',       desc: 'Hills gateway, 2BR avg $3,800/mo · Tasting Australia' }
    ];
    map.on('load', () => {
      markers.forEach(m => {
        const markerEl       = document.createElement('div');
        markerEl.style.cssText = 'width:14px;height:14px;background:#c8a35d;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.25);cursor:pointer;';
        const popup = new maplibregl.Popup({ offset: 12, closeButton: false })
          .setHTML(`<div style="font-family:'Satoshi',sans-serif;padding:2px 0"><strong style="color:#172226;font-size:13px;font-family:'Switzer',sans-serif">${m.name}</strong><p style="color:#7a8a8f;font-size:12px;margin:4px 0 0;max-width:200px;line-height:1.4">${m.desc}</p></div>`);
        new maplibregl.Marker({ element: markerEl }).setLngLat(m.coords).setPopup(popup).addTo(map);
      });
    });
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
  }

  /* ─── Contact Form: validation + accessible error region ─── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const errorRegion = document.getElementById('form-errors');

    function setFormError(msg) {
      if (!errorRegion) return;
      errorRegion.textContent = msg;
      errorRegion.removeAttribute('hidden');
    }

    function clearFormError() {
      if (!errorRegion) return;
      errorRegion.textContent = '';
      errorRegion.setAttribute('hidden', '');
    }

    /* Clear error as soon as the user starts correcting any field */
    contactForm.addEventListener('input', clearFormError);

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const nameField  = contactForm.querySelector('#fullName');
      const emailField = contactForm.querySelector('#email');
      const nameVal    = nameField  ? nameField.value.trim()  : '';
      const emailVal   = emailField ? emailField.value.trim() : '';
      const emailOk    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

      if (!nameVal && (!emailVal || !emailOk)) {
        setFormError('Please enter your full name and a valid email address.');
        if (nameField) nameField.focus();
        e.stopImmediatePropagation();
        return;
      }
      if (!nameVal) {
        setFormError('Please enter your full name.');
        if (nameField) nameField.focus();
        e.stopImmediatePropagation();
        return;
      }
      if (!emailVal || !emailOk) {
        setFormError('Please enter a valid email address.');
        if (emailField) emailField.focus();
        e.stopImmediatePropagation();
        return;
      }

      clearFormError();
      /* Validation passed; the inline Formspree handler in contact.html takes over */
    });
  }

  /* ─── Cursor Dot ─── */
  const cursorDot = document.getElementById('cursorDot');
  if (cursorDot && window.matchMedia('(hover: hover)').matches) {
    let mouseX = -100, mouseY = -100;
    let dotX   = -100, dotY   = -100;
    let cursorActive = false;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorActive) {
        cursorActive = true;
        cursorDot.classList.add('visible');
      }
    });

    function animateDot() {
      dotX += (mouseX - dotX) * 0.16;
      dotY += (mouseY - dotY) * 0.16;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top  = dotY + 'px';
      requestAnimationFrame(animateDot);
    }
    animateDot();

    const interactiveEls = 'a, button, .bed-btn, .calc-select, input, select, textarea, [role="button"]';
    document.querySelectorAll(interactiveEls).forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('expanded'));
    });
  }

  /* ─── Intel strip pause on focus ─── */
  const ticker = document.getElementById('intelTicker');
  if (ticker) {
    ticker.addEventListener('focusin',  () => ticker.style.animationPlayState = 'paused');
    ticker.addEventListener('focusout', () => ticker.style.animationPlayState = 'running');
  }

});
