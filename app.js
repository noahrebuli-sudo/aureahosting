/* =========================================
   AUREA HOSTING: App JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Intel Strip ─── */
  (function renderIntelStrip() {
    const ticker = document.getElementById('intelTicker');
    if (!ticker) return;
    const events = AUREA_DATA.intelEvents;
    const sep = '<span class="intel-sep">&#9670;</span>';
    let html = '';
    for (let pass = 0; pass < 2; pass++) {
      events.forEach(function(e, i) {
        html += '<div class="intel-card">' +
          '<span class="intel-event">' + e.event + '</span>' +
          '<span class="intel-uplift">' + e.uplift + '</span>' +
          '<span class="intel-caption">' + e.period + ' &middot; ' + e.ctx + '</span>' +
          '</div>';
        if (i < events.length - 1 || pass === 0) html += sep;
      });
    }
    ticker.innerHTML = html;
  })();

  /* ─── Sticky Header ─── */
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  if (header) {
    const reduceMotionNav = window.matchMedia('(prefers-reduced-motion: reduce)');
    const heroSection = document.querySelector('.ed-hero');
    /* Hide only after the hero on the editorial homepage, 200px elsewhere */
    let hideAfter = heroSection ? heroSection.offsetHeight : 200;
    window.addEventListener('resize', () => {
      if (heroSection) hideAfter = heroSection.offsetHeight;
    });
    let lastScroll = 0;
    let ticking    = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          header.classList.toggle('scrolled', y > 60);
          header.classList.toggle('hidden',
            !reduceMotionNav.matches && y > lastScroll && y > hideAfter);
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

          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = prefix + target + suffix;
            counterObs.unobserve(el);
            return;
          }

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

  /* ─── Comparison Table Row Expand/Collapse ─── */
  document.querySelectorAll('.compare-row').forEach(function(row) {
    row.addEventListener('click', function() {
      var isOpen = row.classList.contains('open');
      document.querySelectorAll('.compare-row').forEach(function(r) {
        r.classList.remove('open');
        r.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        row.classList.add('open');
        row.setAttribute('aria-expanded', 'true');
      }
    });
    row.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); }
    });
  });

  /* ─── Process Step Expand/Collapse ─── */
  document.querySelectorAll('.process-toggle').forEach(function(heading) {
    heading.style.cursor = 'pointer';
    heading.addEventListener('click', function() {
      const row     = heading.closest('.process-row');
      const detail  = row.querySelector('.process-detail');
      const chevron = heading.querySelector('.process-chevron');
      if (!detail) return;
      const isOpen = row.classList.contains('open');
      row.classList.toggle('open', !isOpen);
      detail.style.maxHeight = isOpen ? '0' : detail.scrollHeight + 'px';
      if (chevron) chevron.textContent = isOpen ? '+' : '−';
    });
    heading.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); heading.click(); }
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
      { coords: [138.5153,-34.9816], name: 'Glenelg',        desc: 'Beachside, priced at a premium · WomAdelaide brings a strong seasonal lift' },
      { coords: [138.5157,-34.9502], name: 'West Beach',     desc: 'Airport proximity meets coastal demand' },
      { coords: [138.4969,-34.9219], name: 'Henley Beach',   desc: 'Premium coastal village with strong weekend demand' },
      { coords: [138.6007,-34.9285], name: 'Adelaide CBD',   desc: 'Business, Fringe, Gather Round driving year-round occupancy' },
      { coords: [138.5884,-34.9499], name: 'Unley',          desc: 'Leafy city-fringe with boutique appeal' },
      { coords: [138.6297,-34.9211], name: 'Norwood',        desc: 'Vibrant café precinct, steady demand all year round' },
      { coords: [138.6456,-34.9387], name: 'Burnside',       desc: 'Upscale residential with Hills proximity premium' },
      { coords: [138.7140,-35.0003], name: 'Stirling',       desc: 'Hills gateway, sharp lift around Tasting Australia' }
    ];
    map.on('load', () => {
      map.addSource('coverage-zone', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[138.545,-34.84],[138.578,-34.838],[138.612,-34.838],[138.645,-34.841],[138.677,-34.847],[138.706,-34.856],[138.731,-34.868],[138.751,-34.883],[138.765,-34.902],[138.776,-34.922],[138.787,-34.946],[138.8,-34.972],[138.815,-34.999],[138.832,-35.026],[138.849,-35.051],[138.864,-35.074],[138.877,-35.098],[138.889,-35.124],[138.896,-35.15],[138.895,-35.175],[138.884,-35.199],[138.865,-35.221],[138.839,-35.24],[138.807,-35.254],[138.771,-35.264],[138.733,-35.27],[138.692,-35.272],[138.65,-35.27],[138.608,-35.262],[138.568,-35.249],[138.532,-35.232],[138.504,-35.212],[138.483,-35.188],[138.469,-35.161],[138.459,-35.132],[138.452,-35.101],[138.448,-35.068],[138.447,-35.034],[138.449,-35.001],[138.454,-34.971],[138.46,-34.942],[138.465,-34.914],[138.468,-34.887],[138.469,-34.863],[138.474,-34.849],[138.492,-34.842],[138.519,-34.839],[138.545,-34.84]]]
          }
        }
      });
      map.addLayer({ id: 'coverage-fill', type: 'fill', source: 'coverage-zone', paint: { 'fill-color': '#1b7f74', 'fill-opacity': 0.15 } });
      map.addLayer({ id: 'coverage-stroke', type: 'line', source: 'coverage-zone', paint: { 'line-color': '#1b7f74', 'line-opacity': 0.40, 'line-width': 2 } });
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

  /* ─── Testimonials ─── */
  (function renderTestimonials() {
    const container = document.getElementById('testimonials');
    if (!container || typeof AUREA_DATA === 'undefined') return;
    const items = AUREA_DATA.testimonials;
    if (!items || !items.length) return;

    let active = 0;
    const inner = document.createElement('div');
    inner.className = 'testimonials-inner';

    items.forEach(function(t, i) {
      const card = document.createElement('div');
      card.className = 'card testimonial-card' + (i === 0 ? ' active' : '');
      card.innerHTML =
        '<blockquote class="testimonial-quote">' + t.quote + '</blockquote>' +
        '<div class="testimonial-meta">' + t.meta + '</div>' +
        '<div class="testimonial-stat">' + t.stat + '</div>';
      inner.appendChild(card);
    });

    const nav = document.createElement('div');
    nav.className = 'testimonials-nav';
    nav.innerHTML =
      '<button class="testimonials-prev" aria-label="Previous testimonial">&#8592;</button>' +
      '<button class="testimonials-next" aria-label="Next testimonial">&#8594;</button>';

    container.appendChild(inner);
    container.appendChild(nav);

    function showCard(idx) {
      inner.querySelectorAll('.testimonial-card').forEach(function(c) {
        c.classList.remove('active');
      });
      inner.querySelectorAll('.testimonial-card')[idx].classList.add('active');
    }

    nav.querySelector('.testimonials-prev').addEventListener('click', function() {
      active = (active - 1 + items.length) % items.length;
      showCard(active);
    });
    nav.querySelector('.testimonials-next').addEventListener('click', function() {
      active = (active + 1) % items.length;
      showCard(active);
    });
  })();

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

    const interactiveEls = 'a, button, input, select, textarea, [role="button"]';
    document.querySelectorAll(interactiveEls).forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('expanded'));
    });
  }

  /* ─── Intel strip pause on focus ─── */
  const intelTicker = document.getElementById('intelTicker');
  if (intelTicker) {
    intelTicker.addEventListener('focusin',  () => intelTicker.style.animationPlayState = 'paused');
    intelTicker.addEventListener('focusout', () => intelTicker.style.animationPlayState = 'running');
  }

});
