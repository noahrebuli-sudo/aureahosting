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
      map.addSource('coverage-zone', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [[[[138.49957,-35.19059],[138.49033,-35.1907],[138.48951,-35.1804],[138.49602,-35.17998],[138.5016,-35.17176],[138.50185,-35.1747],[138.51104,-35.17368],[138.52215,-35.16432],[138.52656,-35.16432],[138.52875,-35.16261],[138.53839,-35.15177],[138.53824,-35.15002],[138.53434,-35.15025],[138.53447,-35.15192],[138.53142,-35.15209],[138.53246,-35.15413],[138.52586,-35.15534],[138.52563,-35.15248],[138.52322,-35.1525],[138.52517,-35.14908],[138.52506,-35.14527],[138.52288,-35.14728],[138.50617,-35.14819],[138.50565,-35.14179],[138.50268,-35.14197],[138.49918,-35.14468],[138.48663,-35.14299],[138.48987,-35.14933],[138.48757,-35.1552],[138.489,-35.16711],[138.48205,-35.16746],[138.48228,-35.17013],[138.47589,-35.17046],[138.47643,-35.17729],[138.46591,-35.17771],[138.46416,-35.17067],[138.46546,-35.1703],[138.46536,-35.16784],[138.46405,-35.16693],[138.46681,-35.16703],[138.4692,-35.163],[138.46847,-35.15202],[138.46613,-35.1442],[138.46955,-35.14028],[138.46904,-35.1291],[138.47391,-35.12803],[138.47703,-35.12543],[138.47937,-35.12653],[138.48195,-35.12437],[138.48515,-35.12429],[138.48448,-35.11493],[138.46948,-35.11566],[138.4699,-35.11097],[138.47999,-35.09435],[138.49333,-35.08457],[138.49569,-35.07887],[138.49572,-35.07202],[138.50165,-35.0615],[138.50771,-35.04451],[138.51302,-35.03892],[138.51199,-35.03778],[138.51364,-35.03839],[138.51561,-35.03661],[138.51551,-35.02461],[138.51165,-35.00841],[138.53129,-35.00762],[138.53299,-35.02976],[138.54183,-35.02921],[138.54098,-35.01824],[138.54978,-35.01757],[138.5509,-35.03332],[138.55215,-35.03326],[138.54643,-35.0397],[138.55924,-35.03902],[138.56183,-35.03666],[138.55976,-35.02978],[138.56066,-35.03079],[138.56151,-35.02931],[138.56553,-35.02949],[138.56996,-35.03237],[138.57227,-35.03508],[138.57063,-35.03593],[138.57101,-35.03784],[138.57276,-35.03836],[138.5785,-35.0367],[138.5863,-35.03798],[138.59104,-35.03449],[138.5959,-35.03335],[138.59619,-35.03752],[138.6039,-35.03602],[138.60374,-35.03408],[138.60993,-35.03393],[138.60985,-35.03285],[138.63538,-35.03012],[138.63258,-35.0382],[138.62988,-35.0383],[138.63028,-35.04349],[138.63209,-35.0434],[138.6321,-35.04489],[138.63545,-35.04394],[138.63656,-35.0447],[138.63579,-35.04726],[138.63216,-35.04643],[138.62767,-35.04807],[138.63129,-35.05081],[138.63078,-35.0528],[138.63274,-35.05411],[138.62746,-35.05446],[138.62776,-35.05763],[138.62135,-35.05802],[138.62167,-35.06193],[138.61856,-35.05916],[138.61207,-35.06978],[138.61425,-35.07512],[138.60894,-35.07559],[138.60988,-35.0863],[138.59771,-35.09099],[138.59792,-35.09416],[138.59148,-35.0941],[138.59167,-35.09648],[138.58536,-35.09685],[138.58558,-35.0998],[138.58805,-35.10059],[138.59535,-35.10863],[138.59328,-35.1158],[138.58685,-35.12269],[138.58563,-35.13235],[138.58672,-35.13431],[138.6047,-35.13433],[138.60658,-35.13265],[138.60582,-35.14067],[138.6024,-35.14226],[138.59638,-35.14201],[138.59025,-35.14648],[138.58656,-35.14655],[138.58605,-35.14786],[138.58863,-35.14976],[138.58684,-35.15234],[138.58339,-35.15195],[138.58244,-35.1559],[138.57972,-35.15593],[138.57939,-35.16062],[138.57274,-35.15743],[138.56611,-35.15847],[138.56509,-35.16147],[138.56931,-35.21814],[138.59485,-35.21681],[138.59471,-35.21501],[138.61374,-35.21579],[138.61432,-35.21852],[138.58156,-35.24906],[138.52668,-35.25188],[138.52434,-35.22046],[138.49265,-35.22205],[138.49128,-35.20588],[138.49786,-35.20604],[138.50376,-35.19959],[138.50338,-35.19462],[138.49957,-35.19059]]],[[[138.526,-34.9904],[138.50917,-34.99146],[138.51,-34.98165],[138.50772,-34.97578],[138.51076,-34.9749],[138.50952,-34.97432],[138.51062,-34.97347],[138.50998,-34.96874],[138.49555,-34.93474],[138.49529,-34.92908],[138.48656,-34.90226],[138.48585,-34.89746],[138.4869,-34.90132],[138.48706,-34.89973],[138.48043,-34.87679],[138.48341,-34.87737],[138.48544,-34.87532],[138.48923,-34.89452],[138.4939,-34.89428],[138.49496,-34.89376],[138.49258,-34.88199],[138.50385,-34.88163],[138.50374,-34.88007],[138.51282,-34.87965],[138.51272,-34.87856],[138.51936,-34.88317],[138.51892,-34.87623],[138.51679,-34.87632],[138.51638,-34.86821],[138.52815,-34.87608],[138.52877,-34.87001],[138.53835,-34.87751],[138.54349,-34.87223],[138.54858,-34.87532],[138.54009,-34.88402],[138.52923,-34.8768],[138.5186,-34.88659],[138.5223,-34.88786],[138.52256,-34.89144],[138.53155,-34.89099],[138.53176,-34.89374],[138.54161,-34.89919],[138.5406,-34.88437],[138.55105,-34.89131],[138.55394,-34.91247],[138.55578,-34.91093],[138.56449,-34.91191],[138.56691,-34.89937],[138.5681,-34.90028],[138.57337,-34.89508],[138.57186,-34.89417],[138.57475,-34.89119],[138.58427,-34.89696],[138.58287,-34.87832],[138.58077,-34.87092],[138.60172,-34.86985],[138.60296,-34.87958],[138.61109,-34.87872],[138.61019,-34.86743],[138.61879,-34.86703],[138.62008,-34.88413],[138.60828,-34.88393],[138.60869,-34.89074],[138.60322,-34.891],[138.60339,-34.89356],[138.60951,-34.89329],[138.62054,-34.88385],[138.62594,-34.89378],[138.62239,-34.89316],[138.6214,-34.89436],[138.63416,-34.90213],[138.63198,-34.9047],[138.61814,-34.89649],[138.61855,-34.9009],[138.6139,-34.89969],[138.61529,-34.90521],[138.61286,-34.90959],[138.61573,-34.92258],[138.62356,-34.92817],[138.62265,-34.9157],[138.64052,-34.91479],[138.64102,-34.921],[138.6498,-34.92056],[138.65021,-34.92646],[138.64148,-34.92697],[138.64194,-34.93297],[138.65078,-34.93259],[138.65029,-34.92646],[138.65923,-34.92599],[138.65971,-34.93221],[138.66854,-34.93187],[138.66888,-34.93538],[138.67473,-34.9394],[138.67178,-34.94214],[138.67242,-34.95111],[138.67503,-34.95174],[138.67274,-34.95509],[138.67655,-34.95684],[138.67503,-34.95798],[138.67867,-34.96079],[138.67737,-34.96191],[138.67905,-34.96441],[138.67793,-34.96532],[138.6803,-34.96626],[138.68595,-34.97462],[138.68525,-34.97617],[138.68184,-34.97607],[138.67157,-34.96235],[138.66807,-34.96112],[138.66821,-34.95538],[138.66421,-34.9567],[138.66186,-34.95606],[138.66764,-34.95392],[138.66687,-34.95109],[138.6668,-34.95295],[138.66567,-34.95227],[138.66553,-34.94483],[138.66317,-34.9438],[138.6519,-34.94496],[138.65213,-34.94791],[138.64312,-34.94837],[138.64291,-34.94534],[138.62506,-34.94624],[138.62448,-34.94009],[138.61555,-34.94048],[138.62507,-34.94629],[138.62553,-34.95238],[138.61644,-34.95277],[138.61623,-34.95783],[138.61823,-34.9741],[138.62725,-34.97521],[138.62782,-34.98295],[138.62952,-34.98288],[138.6292,-34.99159],[138.6273,-34.99168],[138.62735,-34.99293],[138.63666,-34.99364],[138.63751,-34.99119],[138.6536,-34.98954],[138.65227,-34.99042],[138.65274,-34.99673],[138.6576,-34.99647],[138.66522,-35.00001],[138.66326,-35.00205],[138.66838,-35.00523],[138.68141,-35.00745],[138.67726,-35.01334],[138.67945,-35.01389],[138.67627,-35.01467],[138.6743,-35.01906],[138.68032,-35.0214],[138.67211,-35.02602],[138.66745,-35.02399],[138.65482,-35.02268],[138.64864,-35.0158],[138.6369,-35.01624],[138.63368,-35.01426],[138.63302,-35.00591],[138.61965,-35.00656],[138.6165,-35.01016],[138.61411,-35.00828],[138.61306,-35.01003],[138.60289,-35.01327],[138.60513,-35.0102],[138.60098,-35.01044],[138.60132,-35.00021],[138.60235,-34.99889],[138.60248,-35.00028],[138.61125,-34.99988],[138.61046,-34.99829],[138.61374,-34.99615],[138.61369,-34.99456],[138.61604,-34.99433],[138.6143,-34.99093],[138.61972,-34.98335],[138.61929,-34.97716],[138.61437,-34.97734],[138.60927,-34.97412],[138.6077,-34.95322],[138.59792,-34.95386],[138.59772,-34.95985],[138.59174,-34.96014],[138.58996,-34.95823],[138.59079,-34.96635],[138.59731,-34.96601],[138.59961,-34.96845],[138.59983,-34.97667],[138.59165,-34.97719],[138.59208,-34.98268],[138.59128,-34.98097],[138.58288,-34.98139],[138.58315,-34.98502],[138.59228,-34.98526],[138.59271,-34.99196],[138.58206,-34.99248],[138.58548,-35.01442],[138.57655,-35.01491],[138.57566,-35.00378],[138.56685,-35.00373],[138.56685,-35.01413],[138.5651,-35.01684],[138.55887,-35.01715],[138.55713,-34.99548],[138.55884,-34.9936],[138.56597,-34.99324],[138.56405,-34.9677],[138.573,-34.96725],[138.58138,-34.96067],[138.58093,-34.9546],[138.58626,-34.95433],[138.58277,-34.94371],[138.58121,-34.93018],[138.57035,-34.93183],[138.57019,-34.92987],[138.55231,-34.92983],[138.55192,-34.92461],[138.55425,-34.92448],[138.55347,-34.91383],[138.5517,-34.91475],[138.54898,-34.91346],[138.5449,-34.91485],[138.54498,-34.91694],[138.54306,-34.91759],[138.54447,-34.92496],[138.53708,-34.92757],[138.53416,-34.92671],[138.53466,-34.93301],[138.51737,-34.93438],[138.51832,-34.95236],[138.5143,-34.95699],[138.51431,-34.95932],[138.5169,-34.9628],[138.52335,-34.96105],[138.52167,-34.96503],[138.52796,-34.96471],[138.52868,-34.97428],[138.53193,-34.97361],[138.53243,-34.97568],[138.53779,-34.97596],[138.52913,-34.97939],[138.52966,-34.98693],[138.52372,-34.98723],[138.526,-34.9904]]],[[[138.52803,-34.85145],[138.53789,-34.851],[138.53851,-34.85984],[138.5333,-34.86048],[138.53345,-34.86612],[138.51663,-34.85587],[138.51367,-34.85209],[138.50939,-34.85228],[138.50287,-34.8592],[138.50221,-34.85315],[138.49856,-34.85228],[138.49732,-34.8432],[138.5066,-34.83925],[138.50771,-34.82696],[138.51381,-34.81739],[138.51399,-34.80691],[138.51793,-34.8097],[138.52512,-34.8113],[138.52526,-34.81678],[138.51499,-34.83555],[138.52526,-34.83959],[138.51653,-34.84368],[138.51668,-34.84792],[138.52403,-34.84616],[138.52803,-34.85145]]],[[[138.49467,-34.84681],[138.495,-34.85196],[138.48446,-34.8509],[138.48684,-34.84524],[138.49467,-34.84681]]],[[[138.48591,-34.84507],[138.47639,-34.84309],[138.47724,-34.83629],[138.48085,-34.83174],[138.48621,-34.8333],[138.48548,-34.83516],[138.49185,-34.83418],[138.49353,-34.84038],[138.49276,-34.84263],[138.48823,-34.84181],[138.48591,-34.84507]]],[[[138.5663,-34.87531],[138.55746,-34.87573],[138.5566,-34.8629],[138.54752,-34.86245],[138.54672,-34.85057],[138.56463,-34.84974],[138.5663,-34.87531]]],[[[138.62649,-34.96457],[138.62589,-34.95687],[138.63815,-34.95624],[138.64426,-34.96363],[138.62649,-34.96457]]],[[[138.85253,-35.05922],[138.87087,-35.05354],[138.89226,-35.05386],[138.90716,-35.05715],[138.90539,-35.0577],[138.90461,-35.0651],[138.90043,-35.06487],[138.9,-35.07025],[138.89438,-35.07409],[138.9042,-35.08097],[138.90244,-35.10035],[138.8995,-35.10145],[138.88018,-35.10086],[138.87869,-35.09821],[138.87085,-35.09761],[138.86777,-35.10607],[138.8682,-35.11068],[138.84828,-35.10744],[138.84833,-35.1123],[138.83124,-35.11233],[138.83121,-35.10703],[138.83253,-35.10595],[138.82876,-35.10579],[138.82869,-35.10167],[138.82634,-35.10171],[138.82632,-35.0981],[138.82896,-35.09809],[138.82896,-35.09684],[138.82799,-35.09282],[138.82625,-35.09283],[138.82626,-35.08546],[138.82916,-35.08546],[138.82947,-35.08253],[138.82626,-35.08255],[138.82484,-35.06979],[138.82725,-35.06952],[138.82774,-35.06251],[138.83165,-35.05998],[138.83057,-35.0589],[138.83202,-35.05554],[138.83019,-35.05081],[138.83657,-35.0565],[138.84181,-35.0588],[138.85253,-35.05922]]],[[[138.68256,-35.05229],[138.68397,-35.05995],[138.68544,-35.0796],[138.68382,-35.07966],[138.68406,-35.08269],[138.68099,-35.08485],[138.65979,-35.08608],[138.66026,-35.08418],[138.64595,-35.0904],[138.64475,-35.0879],[138.63579,-35.08268],[138.63439,-35.07633],[138.62896,-35.07172],[138.62694,-35.0718],[138.62806,-35.06885],[138.62189,-35.06588],[138.62546,-35.0646],[138.62281,-35.06207],[138.64004,-35.06099],[138.63987,-35.0593],[138.65029,-35.05868],[138.65331,-35.0518],[138.66472,-35.05524],[138.66559,-35.05109],[138.66841,-35.04788],[138.6784,-35.05017],[138.68256,-35.05229]]],[[[138.84846,-35.03184],[138.8457,-35.02911],[138.84182,-35.03312],[138.83802,-35.0404],[138.8366,-35.04786],[138.83506,-35.04725],[138.83019,-35.05081],[138.81838,-35.04542],[138.80851,-35.03323],[138.80395,-35.04781],[138.80485,-35.05722],[138.79266,-35.06247],[138.78154,-35.06195],[138.78153,-35.05609],[138.78482,-35.05384],[138.78502,-35.05065],[138.78358,-35.04957],[138.78662,-35.04689],[138.77794,-35.04025],[138.77368,-35.03982],[138.77491,-35.03971],[138.77867,-35.03044],[138.7811,-35.02913],[138.7811,-35.02791],[138.77635,-35.02581],[138.77633,-35.02434],[138.7672,-35.02271],[138.76244,-35.02697],[138.75844,-35.02497],[138.75509,-35.02584],[138.75432,-35.02928],[138.75574,-35.03299],[138.75078,-35.03311],[138.75063,-35.03479],[138.7493,-35.03416],[138.7498,-35.03186],[138.7442,-35.03253],[138.74492,-35.02963],[138.73922,-35.03077],[138.73721,-35.0331],[138.73266,-35.02981],[138.73381,-35.02517],[138.72702,-35.02573],[138.72828,-35.02244],[138.72495,-35.01712],[138.716,-35.02104],[138.71092,-35.01234],[138.71126,-35.01566],[138.7078,-35.01814],[138.7,-35.01962],[138.70015,-35.01803],[138.6983,-35.01818],[138.69793,-35.01531],[138.7026,-35.00997],[138.70256,-35.00642],[138.70476,-35.00424],[138.70241,-34.99804],[138.69783,-34.9943],[138.69773,-34.99242],[138.70591,-34.98667],[138.69841,-34.9798],[138.7046,-34.98013],[138.70522,-34.97661],[138.71217,-34.97691],[138.71252,-34.97208],[138.71125,-34.97202],[138.71498,-34.96896],[138.71862,-34.97102],[138.7172,-34.97892],[138.72324,-34.98392],[138.72577,-34.98337],[138.72666,-34.98568],[138.73868,-34.98794],[138.73967,-34.99007],[138.74377,-34.98787],[138.74371,-34.98481],[138.74508,-34.98521],[138.745,-34.98822],[138.74879,-34.98659],[138.74923,-34.98801],[138.74579,-34.98956],[138.74772,-34.99322],[138.74412,-34.99726],[138.75596,-35.00299],[138.76323,-35.00324],[138.77273,-35.00614],[138.77785,-35.00468],[138.78376,-34.99938],[138.78267,-34.99519],[138.78425,-34.99333],[138.78135,-34.98852],[138.78179,-34.98374],[138.78497,-34.98216],[138.78629,-34.97039],[138.8058,-34.94015],[138.80217,-34.93941],[138.80424,-34.93619],[138.80323,-34.93523],[138.80825,-34.93072],[138.81185,-34.93496],[138.8157,-34.93557],[138.81555,-34.93305],[138.81292,-34.93316],[138.81241,-34.92986],[138.81363,-34.92774],[138.81529,-34.92872],[138.81512,-34.92584],[138.82083,-34.92567],[138.81653,-34.92341],[138.82091,-34.92313],[138.82232,-34.92135],[138.81793,-34.91902],[138.81779,-34.91591],[138.81296,-34.91054],[138.81247,-34.90324],[138.80151,-34.90351],[138.80102,-34.89041],[138.81222,-34.88887],[138.82165,-34.89069],[138.82426,-34.88729],[138.8302,-34.88848],[138.83126,-34.89127],[138.84213,-34.89219],[138.84718,-34.88918],[138.85715,-34.88698],[138.85865,-34.8831],[138.8706,-34.88239],[138.87799,-34.87842],[138.89138,-34.87913],[138.89495,-34.87539],[138.89487,-34.87297],[138.89863,-34.87128],[138.89949,-34.86928],[138.91478,-34.87233],[138.91332,-34.8732],[138.91192,-34.8798],[138.90799,-34.88063],[138.90616,-34.88462],[138.90812,-34.89282],[138.91115,-34.89498],[138.91122,-34.9002],[138.88987,-34.90044],[138.88987,-34.90174],[138.88588,-34.90176],[138.88592,-34.90582],[138.8922,-34.90572],[138.89229,-34.91623],[138.88981,-34.91622],[138.89191,-34.91989],[138.88846,-34.92598],[138.89234,-34.93063],[138.9012,-34.93428],[138.90512,-34.93141],[138.91276,-34.93168],[138.9199,-34.92982],[138.92478,-34.93124],[138.92805,-34.93409],[138.94163,-34.93399],[138.94807,-34.93263],[138.95186,-34.92806],[138.95853,-34.92591],[138.96327,-34.92098],[138.96611,-34.91488],[138.97135,-34.92342],[138.96681,-34.92479],[138.96488,-34.92957],[138.96102,-34.93164],[138.9603,-34.93384],[138.96326,-34.93992],[138.96111,-34.9434],[138.96343,-34.9519],[138.95471,-34.96528],[138.95849,-34.97138],[138.95217,-34.97994],[138.94425,-34.9807],[138.94252,-34.98366],[138.92278,-34.98492],[138.91605,-34.98718],[138.90932,-34.99284],[138.90178,-34.99262],[138.89988,-35.00514],[138.8786,-35.00622],[138.87886,-35.00913],[138.87386,-35.01231],[138.86975,-35.01981],[138.86356,-35.0255],[138.86455,-35.02691],[138.86279,-35.0277],[138.86157,-35.02642],[138.85951,-35.02924],[138.85586,-35.02511],[138.8515,-35.03126],[138.84846,-35.03184]]],[[[138.69794,-34.92144],[138.69779,-34.92671],[138.701,-34.92824],[138.69759,-34.93189],[138.69363,-34.92929],[138.68468,-34.9309],[138.68689,-34.93036],[138.68682,-34.92741],[138.6884,-34.92787],[138.6867,-34.92259],[138.6894,-34.92142],[138.69092,-34.91862],[138.68955,-34.91729],[138.69186,-34.91455],[138.69794,-34.92144]]],[[[138.68416,-34.90042],[138.68521,-34.91439],[138.68268,-34.91893],[138.66762,-34.91962],[138.66724,-34.91346],[138.6583,-34.9139],[138.65694,-34.88873],[138.64784,-34.88303],[138.64909,-34.87898],[138.64763,-34.8752],[138.65523,-34.87173],[138.66548,-34.87604],[138.66455,-34.87673],[138.68534,-34.87575],[138.68808,-34.87694],[138.69563,-34.87524],[138.69262,-34.86258],[138.69051,-34.86596],[138.68374,-34.86636],[138.68837,-34.85828],[138.69062,-34.85756],[138.67881,-34.85678],[138.6781,-34.84827],[138.6853,-34.84788],[138.68499,-34.84416],[138.67116,-34.8449],[138.6758,-34.83978],[138.67529,-34.8342],[138.6686,-34.83457],[138.66815,-34.82926],[138.70022,-34.82741],[138.70036,-34.83769],[138.72006,-34.83695],[138.72038,-34.84131],[138.72511,-34.8402],[138.72666,-34.83731],[138.72981,-34.83741],[138.73156,-34.84315],[138.74028,-34.84019],[138.74189,-34.84868],[138.73896,-34.86077],[138.73288,-34.85902],[138.73117,-34.85601],[138.72808,-34.85969],[138.72272,-34.85921],[138.72383,-34.86431],[138.71898,-34.87011],[138.71977,-34.87406],[138.71286,-34.87441],[138.71326,-34.88157],[138.70699,-34.88195],[138.70791,-34.89406],[138.71274,-34.89422],[138.70179,-34.90284],[138.69076,-34.89525],[138.69113,-34.90009],[138.68416,-34.90042]]],[[[138.72814,-34.81553],[138.75389,-34.82131],[138.74787,-34.82622],[138.74823,-34.83025],[138.71961,-34.8318],[138.7183,-34.81599],[138.72814,-34.81553]]]]
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
