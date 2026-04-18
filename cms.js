/* =========================================
   AUREA HOSTING — CMS System v2
   All site content, calculator data, and
   intel strip data live here as the single
   source of truth.
   ========================================= */

const AUREA_DEFAULTS = {

  /* ── Brand ─────────────────────────────── */
  brandName:   "Aurea Hosting",
  tagline:     "Adelaide's most selective short-term rental management.",
  phone:       "0404 608 196",
  email:       "noah@aureahosting.com.au",
  ctaTitle:    "Ready to earn more from your property?",
  ctaText:     "Book a free, no-obligation property assessment.",

  /* ── Colours ────────────────────────────── */
  primary:     "#1b7f74",
  primaryDeep: "#14605a",
  gold:        "#c8a35d",
  sand:        "#fffdf9",
  ink:         "#172226",

  /* ── Homepage Hero ──────────────────────── */
  homeHeroHeadline: "We manage fewer properties. On purpose.",
  homeHeroSub:      "For Adelaide owners who treat their homes as high\u2011yield assets, not hobbies.",
  homePrimaryBtn:   "Get your property's number",
  homeApplyBtn:     "Apply for asset management",

  /* ── Performance Stats ──────────────────── */
  perfLabel1:   "Average occupancy",
  perfNum1:     "74",
  perfSuffix1:  "%",
  perfPrefix1:  "",
  perfStart1:   "45",
  perfContext1: "Across all managed Adelaide properties",
  perfLabel2:   "Revenue lift vs self-managed",
  perfNum2:     "32",
  perfSuffix2:  "%",
  perfPrefix2:  "+",
  perfStart2:   "20",
  perfContext2: "Average across owners\u2019 first 12 months",
  perfLabel3:   "Guest response time",
  perfContext3: "Every message, every platform, every hour",

  /* ── Intel Strip Events ─────────────────── */
  intelEvents: [
    { event: "WomAdelaide",      period: "March \u00b7 Annual",          uplift: "+$175", ctx: "portfolio average" },
    { event: "Adelaide Fringe",  period: "Feb\u2013Mar \u00b7 14 nights",     uplift: "+$160", ctx: "above baseline rate" },
    { event: "Gather Round",     period: "April \u00b7 4-night surge",   uplift: "+$210", ctx: "AFL city premium" },
    { event: "Tour Down Under",  period: "January \u00b7 Coastal",       uplift: "+$140", ctx: "beachside corridor" },
    { event: "LIV Golf",         period: "April \u00b7 Glenelg",         uplift: "+$190", ctx: "above event baseline" },
    { event: "Tasting Australia",period: "Apr\u2013May \u00b7 Hills + CBD", uplift: "+$120", ctx: "food & wine season" }
  ],

  /* ── Testimonials / Owner Results ──────── */
  result1Quote: "Switching to Aurea added $1,100 to my monthly income within the first 60 days. The dynamic pricing alone was worth it.",
  result1Meta:  "S.M. \u00b7 Norwood \u00b7 Townhouse",
  result1Stat:  "+34% revenue, Q1 2025",
  result2Quote: "I\u2019d been self-managing for two years. In our first Fringe season with Aurea, the property earned more in six weeks than it had in the previous six months.",
  result2Meta:  "T.K. \u00b7 Glenelg \u00b7 2BR Apartment",
  result2Stat:  "+$8,400 Fringe season 2025",
  result3Quote: "A Hills property at 74% occupancy in its first quarter wasn\u2019t what we were expecting. We\u2019re now looking at a second property.",
  result3Meta:  "R. & J.P. \u00b7 Stirling \u00b7 Hills Retreat",
  result3Stat:  "74% occupancy, first quarter",

  /* ── Apply Close ─────────────────────────── */
  applyOverline: "Limited availability",
  applyHeadline: "We take on a limited number of properties each quarter.",
  applySub:      "Currently assessing properties in Glenelg, Norwood, Burnside, Stirling, and surrounds.",

  /* ── Calculator / Revenue Data ─────────── */
  calculatorData: {
    glenelg: {
      label:  "Glenelg \u00b7 West Beach \u00b7 Henley",
      beds:   { 1: [2800,3400], 2: [3600,4400], 3: [4800,6000], 4: [5600,7200] },
      events: "WomAdelaide +$175/night \u00b7 LIV Golf +$190/night \u00b7 Summer peak Dec\u2013Feb"
    },
    cbd: {
      label:  "Adelaide CBD",
      beds:   { 1: [2600,3200], 2: [3400,4000], 3: [4800,5600], 4: [5500,6800] },
      events: "Adelaide Fringe +$155/night \u00b7 Gather Round +$210/night \u00b7 Tour Down Under +$130/night"
    },
    norwood: {
      label:  "Norwood \u00b7 Unley \u00b7 Burnside",
      beds:   { 1: [2400,3000], 2: [3200,3900], 3: [4200,5200], 4: [5000,6200] },
      events: "Adelaide Fringe +$140/night \u00b7 Tasting Australia +$90/night \u00b7 Gather Round +$180/night"
    },
    stirling: {
      label:  "Stirling \u00b7 Hahndorf \u00b7 Hills",
      beds:   { 1: [2200,2800], 2: [3400,4200], 3: [5000,6500], 4: [6000,8000] },
      events: "Adelaide Fringe +$120/night \u00b7 Tasting Australia +$140/night \u00b7 Winter retreats Jun\u2013Aug"
    },
    brighton: {
      label:  "Brighton \u00b7 Marino \u00b7 Hallett Cove",
      beds:   { 1: [2600,3200], 2: [3400,4000], 3: [4400,5400], 4: [5200,6500] },
      events: "Adelaide Fringe +$130/night \u00b7 LIV Golf +$160/night \u00b7 Summer season Dec\u2013Feb"
    },
    prospect: {
      label:  "Prospect \u00b7 Nailsworth \u00b7 Broadview",
      beds:   { 1: [2200,2800], 2: [2900,3600], 3: [3800,4600], 4: [4500,5500] },
      events: "Adelaide Fringe +$120/night \u00b7 Gather Round +$160/night \u00b7 Tasting Australia +$80/night"
    }
  },

  /* ── Homepage Process (index.html) ────── */
  proc1Title:    "Assessment",
  proc1Text:     "We evaluate your property\u2019s position, earning potential, and fit with Aurea\u2019s portfolio standards. Honest, specific, no obligation.",
  proc1Timeline: "Day 1",
  proc2Title:    "Setup",
  proc2Text:     "Professional photography, SEO-optimised listing creation, and full onboarding into Guesty\u2019s enterprise property management platform.",
  proc2Timeline: "Days 2\u20135",
  proc3Title:    "Go Live",
  proc3Text:     "Listed across 50+ booking channels simultaneously. Pricing calibrated to Adelaide\u2019s current market conditions and upcoming event demand.",
  proc3Timeline: "Day 7",
  proc4Title:    "Ongoing",
  proc4Text:     "Dynamic pricing, 24/7 guest communications, hotel-grade property turnovers, and monthly owner performance statements with full transparency.",
  proc4Timeline: "Continuous",

  /* ── Services Page Process Rows ─────────── */
  serv1Title:    "Listing & Channel Distribution",
  serv1Text:     "Professional copywriting, photography direction, and SEO-optimised listing creation. Your property goes live across 50+ booking channels via Guesty \u2014 with a single unified calendar and zero double-booking risk.",
  serv1Timeline: "Live in 7 days",
  serv2Title:    "Dynamic Revenue Pricing",
  serv2Text:     "Fixed rates leave yield on the table. Our pricing model responds to Adelaide\u2019s full event calendar in real time. Rates adjust daily based on live demand, competitor positioning, and seasonal patterns.",
  serv2Timeline: "Daily optimisation",
  serv3Title:    "Guest Experience Management",
  serv3Text:     "Every guest interaction handled 24/7. Under 4-minute average response time across all platforms. Digital property handbooks, automated pre-arrival instructions, and rapid issue resolution.",
  serv3Timeline: "24/7 coverage",
  serv4Title:    "Hotel-Grade Turnovers",
  serv4Text:     "Every changeover follows our 47-point checklist. Professional linen \u2014 laundered and pressed to hospitality standards \u2014 supplied and managed by us. Photo-verified quality inspections before every check-in.",
  serv4Timeline: "Every changeover",
  serv5Title:    "Owner Intelligence & Reporting",
  serv5Text:     "You see exactly what your property earns. Real-time Guesty owner dashboard \u2014 bookings, revenue, occupancy, guest reviews \u2014 accessible 24/7. Monthly performance statements with full transparency.",
  serv5Timeline: "Real-time access",
  servicesStop1: "Worrying about guest messages at midnight",
  servicesStop2: "Juggling multiple booking calendars",
  servicesStop3: "Coordinating cleaners between bookings",
  servicesStop4: "Guessing the right nightly price",
  servicesStop5: "Handling complaints and damage disputes",
  servicesGet1:  "A dedicated team handling every guest interaction",
  servicesGet2:  "One calendar, synced across 50+ platforms",
  servicesGet3:  "Professional turnovers with quality-checked results",
  servicesGet4:  "Dynamic pricing that maximises your revenue",
  servicesGet5:  "Transparent reporting and honest performance reviews",

  /* ── Why Us ─────────────────────────────── */
  whyHeroTitle:   "The comparison is straightforward.",
  whyHeroText:    "Volume operators optimise for scale. We optimise for your property\u2019s yield.",
  whyTableHead1:  "Feature",
  whyTableHead2:  "Generic Agency",
  whyTableHead3:  "Aurea Hosting",
  whyRow1Label:   "Pricing Strategy",
  whyRow1Left:    "Fixed nightly rate",
  whyRow1Right:   "Dynamic, data-driven pricing",
  whyRow2Label:   "Channel Distribution",
  whyRow2Left:    "1\u20133 platforms",
  whyRow2Right:   "50+ channels via Guesty",
  whyRow3Label:   "Guest Communication",
  whyRow3Left:    "Business hours only",
  whyRow3Right:   "24/7 automated + personal",
  whyRow4Label:   "Cleaning Standard",
  whyRow4Left:    "Basic turnover",
  whyRow4Right:   "47-point hotel-grade checklist",
  whyRow5Label:   "Owner Reporting",
  whyRow5Left:    "Monthly PDF",
  whyRow5Right:   "Real-time dashboard + statements",
  whyEdgeTitle:   "The Aurea Edge",
  whyCard1Title:  "Confidence",
  whyCard1Text:   "Know exactly how your property is performing with real-time data and honest reporting.",
  whyCard2Title:  "Performance",
  whyCard2Text:   "Our dynamic pricing consistently outperforms fixed-rate strategies by 20\u201335%.",
  whyCard3Title:  "Clarity",
  whyCard3Text:   "No hidden fees, no jargon. Just straightforward management you can trust.",
  whyFitTitle:    "Best fit for owners who\u2026",
  whyFit1:        "Own a quality property in Adelaide\u2019s key short-term rental corridors",
  whyFit2:        "Want professional, hands-off management with full transparency",
  whyFit3:        "Value revenue optimisation over set-and-forget approaches",
  whyCtaTitle:    "See if your property is a good fit",
  whyCtaText:     "We\u2019re selective about the properties we manage \u2014 because quality drives results.",

  /* ── Technology ─────────────────────────── */
  techHeroTitle:    "50+ channels. One source of truth.",
  techHeroText:     "Guesty \u2014 the world\u2019s leading property management platform \u2014 connecting your listing to global demand while giving us the tools to price, automate, and report with precision.",
  techChip1:        "Guesty Pro",
  techChip2:        "50+ Channels",
  techChip3:        "Real-Time Data",
  techSignalTop:    "Connected Channels",
  techSignalText:   "Airbnb \u00b7 Booking.com \u00b7 Vrbo \u00b7 Expedia \u00b7 Google Travel \u00b7 Tripadvisor \u00b7 Domain \u00b7 Stayz \u00b7 HomeAway",
  techCard1Title:   "Unified Calendar",
  techCard1Text:    "One calendar syncs across all platforms, eliminating double-bookings and manual updates.",
  techCard2Title:   "Smart Automation",
  techCard2Text:    "Automated messaging, pricing adjustments, and task management that runs 24/7 without manual input.",
  techCard3Title:   "Owner Dashboard",
  techCard3Text:    "Real-time access to bookings, revenue, and performance metrics via your personal portal.",
  techOutcome1Cap:  "50+ channels, live-synced",
  techOutcome1Res:  "Your property reaches guests who never open Airbnb directly \u2014 corporate bookers, international travellers, guests on Domain and Stayz. Each additional channel is occupancy you wouldn\u2019t otherwise capture.",
  techOutcome2Cap:  "Event-aware pricing engine",
  techOutcome2Res:  "During Adelaide Fringe, Gather Round, or LIV Golf, rates adjust 3\u20135 days before demand peaks. The revenue gap between static pricing and dynamic is most visible in the two weeks surrounding each major Adelaide event.",
  techOutcome3Cap:  "Unified calendar, real-time sync",
  techOutcome3Res:  "A booking on Booking.com closes your Airbnb availability within seconds. Across 50+ channels, double-booking risk is not recoverable without automation. Double-booking incidents across our current portfolio: zero.",
  techOutcome4Cap:  "Owner dashboard, live data",
  techOutcome4Res:  "Revenue, occupancy, and booking pace are visible in real-time \u2014 not in a monthly PDF. If a week is underperforming against forecast, you see it before the month closes. So do we.",

  /* ── Areas ──────────────────────────────── */
  areasHeroTitle: "We know every suburb by its yield curve.",
  areasHeroText:  "From beachside surge suburbs to Hills retreat properties \u2014 every area we operate in is mapped by demand, event uplift, and seasonal yield.",
  areasTag1: "Beachside", areasTag2: "City Fringe", areasTag3: "Adelaide Hills", areasTag5: "Event Corridors",
  areasSuburb1:  "Glenelg",      areasSuburb2:  "West Beach",   areasSuburb3:  "Henley Beach",
  areasSuburb4:  "Adelaide CBD", areasSuburb5:  "Unley",        areasSuburb6:  "Norwood",
  areasSuburb7:  "Burnside",     areasSuburb8:  "Stirling",     areasSuburb9:  "Crafers",
  areasSuburb10: "Hahndorf",     areasSuburb11: "Brighton",     areasSuburb12: "Prospect",

  /* ── FAQ ─────────────────────────────────── */
  faqHeroTitle: "The questions owners actually ask.",
  faqHeroText:  "Straight answers on management, pricing, fees, and how Aurea actually works.",
  faq1Q: "How much does Aurea charge?",
  faq1A: "We charge a management fee based on your property\u2019s revenue. Our fee structure is transparent, with no hidden charges \u2014 you\u2019ll see every booking, every cost, and every dollar earned in your monthly statement. Contact us for a specific quote based on your property.",
  faq2Q: "How quickly can my property go live?",
  faq2A: "Most properties go live within 7 days of signing. Day 1 is assessment, Days 2\u20135 cover photography and listing creation, and Day 7 is live across all 50+ platforms.",
  faq3Q: "Which booking platforms will my property be listed on?",
  faq3A: "Your property will be listed on 50+ channels including Airbnb, Booking.com, Vrbo, Expedia, Google Travel, Tripadvisor, Stayz, Domain, and more \u2014 all managed through Guesty\u2019s centralised platform.",
  faq4Q: "Can I block out dates for my own use?",
  faq4A: "Yes. You have full control over owner-use dates through the owner portal. Simply block any dates you want to use the property yourself and they\u2019ll be unavailable for guest bookings.",
  faq5Q: "How does dynamic pricing work?",
  faq5A: "We use a combination of market data, Adelaide\u2019s event calendar, competitor rates, and demand signals to set optimal nightly rates. During high-demand periods like WomAdelaide, Adelaide Fringe, or Gather Round, rates are adjusted to capture maximum revenue.",
  faq6Q: "What happens if there\u2019s a guest issue or damage?",
  faq6A: "Our team handles all guest issues 24/7. For damage, we manage the full claims process on your behalf \u2014 documenting, reporting, and following up with the relevant platform and insurance provider.",
  faq7Q: "How do I receive my earnings?",
  faq7A: "Earnings are transferred monthly after deduction of our management fee and any approved property costs. You\u2019ll receive a full statement detailing every booking, rate, and deduction.",
  faq8Q: "Is my property a good fit for Aurea?",
  faq8A: "We look for quality properties in Adelaide\u2019s key short-term rental corridors \u2014 beachside, city fringe, and Hills regions. Properties should be well-presented and ideally achieve a nightly rate above the suburb median. The best way to find out is to apply \u2014 we\u2019ll give you an honest assessment.",

  /* ── Contact / Apply ─────────────────────── */
  contactHeroTitle:  "Let\u2019s assess your property.",
  contactHeroText:   "We take on a limited number of properties each quarter and evaluate every application individually. Tell us about yours \u2014 we\u2019ll respond within one business day.",
  contactFastTitle:  "We review your application",
  contactFastText:   "Within one business day, we assess your property\u2019s suburb, configuration, and situation against our current portfolio capacity. You\u2019ll hear from us either way.",
  contactHonestTitle:"A brief assessment call",
  contactHonestText: "If your property looks like a strong fit, we\u2019ll schedule a 20-minute call to discuss your goals, timeframe, and answer any questions about how we work.",
  contactLocalTitle: "Onboarding begins",
  contactLocalText:  "Once we agree it\u2019s the right match, onboarding starts immediately. Photography, listing creation, channel distribution \u2014 live within seven days."
};

/* ─── In-memory store ────────────────────── */
let aureaStore = {};

function getAureaSetting(key) {
  if (aureaStore[key] !== undefined) return aureaStore[key];
  const d = AUREA_DEFAULTS[key];
  return d !== undefined ? d : undefined;
}

function setAureaSetting(key, value) { aureaStore[key] = value; }
function resetAureaSettings()        { aureaStore = {}; }
function getAllAureaSettings()        { return Object.assign({}, AUREA_DEFAULTS, aureaStore); }

/* ─── Render: Intel Strip ─────────────────── */
function renderIntelStrip(s) {
  const ticker = document.getElementById('intelTicker');
  if (!ticker) return;
  const events = s.intelEvents || AUREA_DEFAULTS.intelEvents;
  function cardHTML(e) {
    return '<div class="intel-card">' +
      '<span class="intel-event">' + e.event + '</span>' +
      '<span class="intel-period">' + e.period + '</span>' +
      '<span class="intel-uplift">' + e.uplift + '<em>/night</em></span>' +
      '<span class="intel-ctx">' + e.ctx + '</span>' +
      '</div>';
  }
  const sep = '<span class="intel-sep">\u25c6</span>';
  let html = '';
  // Set A + Set B for seamless loop
  for (let pass = 0; pass < 2; pass++) {
    events.forEach(function(e, i) {
      html += cardHTML(e);
      if (i < events.length - 1 || pass === 0) html += sep;
    });
  }
  ticker.innerHTML = html;
}

/* ─── Render: Performance Stats ─────────── */
function renderPerfStats(s) {
  // Stat 1
  var n1 = document.querySelector('.perf-stat:nth-child(1) .perf-number[data-counter]');
  var l1 = document.querySelector('.perf-stat:nth-child(1) .perf-label');
  var c1 = document.querySelector('.perf-stat:nth-child(1) .perf-context');
  if (n1) { n1.setAttribute('data-counter', s.perfNum1 || '74'); n1.setAttribute('data-suffix', s.perfSuffix1 || '%'); n1.setAttribute('data-prefix', s.perfPrefix1 || ''); n1.setAttribute('data-start', s.perfStart1 || '45'); }
  if (l1) l1.textContent = s.perfLabel1 || AUREA_DEFAULTS.perfLabel1;
  if (c1) c1.textContent = s.perfContext1 || AUREA_DEFAULTS.perfContext1;
  // Stat 2
  var n2 = document.querySelector('.perf-stat:nth-child(2) .perf-number[data-counter]');
  var l2 = document.querySelector('.perf-stat:nth-child(2) .perf-label');
  var c2 = document.querySelector('.perf-stat:nth-child(2) .perf-context');
  if (n2) { n2.setAttribute('data-counter', s.perfNum2 || '32'); n2.setAttribute('data-suffix', s.perfSuffix2 || '%'); n2.setAttribute('data-prefix', s.perfPrefix2 || '+'); n2.setAttribute('data-start', s.perfStart2 || '20'); }
  if (l2) l2.textContent = s.perfLabel2 || AUREA_DEFAULTS.perfLabel2;
  if (c2) c2.textContent = s.perfContext2 || AUREA_DEFAULTS.perfContext2;
  // Stat 3 (static — no counter)
  var l3 = document.querySelector('.perf-stat:nth-child(3) .perf-label');
  var c3 = document.querySelector('.perf-stat:nth-child(3) .perf-context');
  if (l3) l3.textContent = s.perfLabel3 || AUREA_DEFAULTS.perfLabel3;
  if (c3) c3.textContent = s.perfContext3 || AUREA_DEFAULTS.perfContext3;
}

/* ─── Render: Testimonials ───────────────── */
function renderTestimonials(s) {
  var rows = document.querySelectorAll('.result-row');
  function setRow(el, quote, meta, stat) {
    if (!el) return;
    var q = el.querySelector('.result-quote');
    var m = el.querySelector('.result-meta');
    var st = el.querySelector('.result-stat');
    if (q) q.textContent = quote;
    if (m && st) {
      m.childNodes[0].textContent = meta + ' \u00b7 ';
      st.textContent = stat;
    }
  }
  if (rows[0]) setRow(rows[0], s.result1Quote||AUREA_DEFAULTS.result1Quote, s.result1Meta||AUREA_DEFAULTS.result1Meta, s.result1Stat||AUREA_DEFAULTS.result1Stat);
  if (rows[1]) setRow(rows[1], s.result2Quote||AUREA_DEFAULTS.result2Quote, s.result2Meta||AUREA_DEFAULTS.result2Meta, s.result2Stat||AUREA_DEFAULTS.result2Stat);
  if (rows[2]) setRow(rows[2], s.result3Quote||AUREA_DEFAULTS.result3Quote, s.result3Meta||AUREA_DEFAULTS.result3Meta, s.result3Stat||AUREA_DEFAULTS.result3Stat);
}

/* ─── Expose calculator data globally ───── */
/* app.js reads window.AUREA_REVENUE_DATA */
function refreshCalculatorData(s) {
  window.AUREA_REVENUE_DATA = (s && s.calculatorData) ? s.calculatorData : AUREA_DEFAULTS.calculatorData;
}

/* ─── Apply All Settings ─────────────────── */
function applyAureaSettings() {
  var s = getAllAureaSettings();

  /* data-content text nodes */
  document.querySelectorAll('[data-content]').forEach(function(el) {
    var key = el.getAttribute('data-content');
    var val = s[key];
    if (val !== undefined && typeof val === 'string') el.textContent = val;
  });

  /* data-setting (phone/email links) */
  document.querySelectorAll('[data-setting]').forEach(function(el) {
    var key = el.getAttribute('data-setting');
    var val = s[key];
    if (val === undefined) return;
    if (el.tagName === 'A') {
      if (key === 'phone') el.href = 'tel:' + val.replace(/\s/g, '');
      else if (key === 'email') el.href = 'mailto:' + val;
      el.textContent = val;
    } else {
      el.textContent = val;
    }
  });

  /* Colour tokens */
  var root = document.documentElement;
  if (s.primary)     root.style.setProperty('--primary',     s.primary);
  if (s.primaryDeep) root.style.setProperty('--primary-deep',s.primaryDeep);
  if (s.gold)        root.style.setProperty('--gold',        s.gold);
  if (s.sand)        root.style.setProperty('--sand',        s.sand);
  if (s.ink)         root.style.setProperty('--ink',         s.ink);

  /* Dynamic components */
  renderIntelStrip(s);
  renderPerfStats(s);
  renderTestimonials(s);
  refreshCalculatorData(s);
}

/* ─── Admin Helpers ──────────────────────── */
function loadAdminForm() {
  var s = getAllAureaSettings();
  document.querySelectorAll('[data-key]').forEach(function(el) {
    var key = el.getAttribute('data-key');
    /* Skip complex objects — handled separately */
    var val = s[key];
    if (val === undefined || typeof val === 'object') return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
      el.value = val;
    }
  });
  /* Load complex objects (calculator, intel events) */
  loadCalcFields(s);
  loadIntelFields(s);
}

function saveAdminForm() {
  document.querySelectorAll('[data-key]').forEach(function(el) {
    var key = el.getAttribute('data-key');
    if (!key) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
      setAureaSetting(key, el.value);
    }
  });
  saveCalcFields();
  saveIntelFields();
  applyAureaSettings();
}

function resetAureaAdmin() {
  resetAureaSettings();
  loadAdminForm();
  applyAureaSettings();
}

/* ─── Calculator field helpers ───────────── */
function loadCalcFields(s) {
  var data = (s && s.calculatorData) ? s.calculatorData : AUREA_DEFAULTS.calculatorData;
  Object.keys(data).forEach(function(cluster) {
    var d = data[cluster];
    var el;
    el = document.getElementById('calc_' + cluster + '_label');   if (el) el.value = d.label || '';
    el = document.getElementById('calc_' + cluster + '_events');  if (el) el.value = d.events || '';
    [1,2,3,4].forEach(function(b) {
      var beds = d.beds[b] || [0,0];
      el = document.getElementById('calc_' + cluster + '_' + b + '_lo'); if (el) el.value = beds[0];
      el = document.getElementById('calc_' + cluster + '_' + b + '_hi'); if (el) el.value = beds[1];
    });
  });
}

function saveCalcFields() {
  var data = JSON.parse(JSON.stringify((getAureaSetting('calculatorData') && typeof getAureaSetting('calculatorData') === 'object') ? getAureaSetting('calculatorData') : AUREA_DEFAULTS.calculatorData));
  Object.keys(data).forEach(function(cluster) {
    var el;
    el = document.getElementById('calc_' + cluster + '_label');  if (el) data[cluster].label = el.value;
    el = document.getElementById('calc_' + cluster + '_events'); if (el) data[cluster].events = el.value;
    [1,2,3,4].forEach(function(b) {
      var lo = document.getElementById('calc_' + cluster + '_' + b + '_lo');
      var hi = document.getElementById('calc_' + cluster + '_' + b + '_hi');
      if (lo && hi) data[cluster].beds[b] = [parseInt(lo.value)||0, parseInt(hi.value)||0];
    });
  });
  setAureaSetting('calculatorData', data);
}

/* ─── Intel field helpers ───────────────── */
function loadIntelFields(s) {
  var events = (s && s.intelEvents) ? s.intelEvents : AUREA_DEFAULTS.intelEvents;
  events.forEach(function(e, i) {
    var idx = i + 1;
    var el;
    el = document.getElementById('intel_' + idx + '_event');  if (el) el.value = e.event || '';
    el = document.getElementById('intel_' + idx + '_period'); if (el) el.value = e.period || '';
    el = document.getElementById('intel_' + idx + '_uplift'); if (el) el.value = e.uplift || '';
    el = document.getElementById('intel_' + idx + '_ctx');    if (el) el.value = e.ctx || '';
  });
}

function saveIntelFields() {
  var events = [];
  for (var i = 1; i <= 6; i++) {
    var ev = document.getElementById('intel_' + i + '_event');
    var pe = document.getElementById('intel_' + i + '_period');
    var up = document.getElementById('intel_' + i + '_uplift');
    var ct = document.getElementById('intel_' + i + '_ctx');
    if (ev) events.push({ event: ev.value, period: pe ? pe.value : '', uplift: up ? up.value : '', ctx: ct ? ct.value : '' });
  }
  if (events.length) setAureaSetting('intelEvents', events);
}

/* ─── Export: generate updated cms.js ───── */
function exportCmsJs() {
  var s = getAllAureaSettings();
  /* Produce a new cms.js with current values baked into AUREA_DEFAULTS */
  var lines = ['/* AUREA HOSTING — cms.js (exported ' + new Date().toLocaleDateString('en-AU') + ') */\n'];
  lines.push('/* This file was generated by the admin panel. Deploy it to make changes permanent. */\n\n');
  lines.push('const AUREA_DEFAULTS = ' + JSON.stringify(s, null, 2) + ';\n\n');
  /* Append the runtime code from the original cms.js (everything after AUREA_DEFAULTS) */
  lines.push('/* ─ runtime helpers — do not edit below this line ─ */\n');
  lines.push('let aureaStore = {};\n');
  lines.push('function getAureaSetting(k){return aureaStore[k]!==undefined?aureaStore[k]:AUREA_DEFAULTS[k];}\n');
  lines.push('function setAureaSetting(k,v){aureaStore[k]=v;}\n');
  lines.push('function resetAureaSettings(){aureaStore={};}\n');
  lines.push('function getAllAureaSettings(){return Object.assign({},AUREA_DEFAULTS,aureaStore);}\n');
  lines.push('function applyAureaSettings(){var s=getAllAureaSettings();document.querySelectorAll("[data-content]").forEach(function(el){var k=el.getAttribute("data-content"),v=s[k];if(v!==undefined&&typeof v==="string")el.textContent=v;});document.querySelectorAll("[data-setting]").forEach(function(el){var k=el.getAttribute("data-setting"),v=s[k];if(v===undefined)return;if(el.tagName==="A"){if(k==="phone")el.href="tel:"+v.replace(/\\s/g,"");else if(k==="email")el.href="mailto:"+v;el.textContent=v;}else el.textContent=v;});var r=document.documentElement;if(s.primary)r.style.setProperty("--primary",s.primary);if(s.gold)r.style.setProperty("--gold",s.gold);if(s.sand)r.style.setProperty("--sand",s.sand);if(s.ink)r.style.setProperty("--ink",s.ink);window.AUREA_REVENUE_DATA=s.calculatorData||AUREA_DEFAULTS.calculatorData;}\n');
  lines.push('document.addEventListener("DOMContentLoaded",applyAureaSettings);\n');
  var blob = new Blob(lines, { type: 'text/javascript' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href   = url; a.download = 'cms.js'; a.click();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
}

/* ─── Export: JSON settings snapshot ────── */
function exportJSON() {
  var s    = getAllAureaSettings();
  var blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href   = url; a.download = 'aurea-settings.json'; a.click();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
}

/* ─── Import: JSON settings snapshot ────── */
function importJSON(jsonText) {
  try {
    var obj = JSON.parse(jsonText);
    Object.keys(obj).forEach(function(k) { setAureaSetting(k, obj[k]); });
    loadAdminForm();
    applyAureaSettings();
    return true;
  } catch(e) {
    return false;
  }
}

/* ─── Auto-apply on page load ────────────── */
document.addEventListener('DOMContentLoaded', applyAureaSettings);
