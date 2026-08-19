// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottom = window.scrollY > 50
    ? '1px solid #c9a84c33'
    : '1px solid #2a2a2a';
});

// ===========================
// MOBILE NAV TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-links a');
const linksList = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeNav() {
  linksList.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('show');
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = linksList.classList.toggle('open');
    if (navOverlay) navOverlay.classList.toggle('show', isOpen);
  });
}

if (navOverlay) {
  navOverlay.addEventListener('click', closeNav);
}

navLinks.forEach(l => {
  l.addEventListener('click', closeNav);
});

// ===========================
// TYPEWRITER (rotating roles)
// ===========================
const phrases = [
  'Open Source Contributor.',
  'Future Full Stack Dev.',
  'React Specialist.',
  'Frontend Developer.',
  'UI/UX Enthusiast.'
];
const typeEl = document.getElementById('typewriter');
let pIndex = 0;
let cIndex = 0;
let deleting = false;

function type() {
  if (!typeEl) return;
  const phrase = phrases[pIndex];
  if (!deleting) {
    cIndex++;
    typeEl.textContent = phrase.slice(0, cIndex);
    if (cIndex === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 90);
  } else {
    cIndex--;
    typeEl.textContent = phrase.slice(0, cIndex);
    if (cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
      setTimeout(type, 350);
      return;
    }
    setTimeout(type, 45);
  }
}

type();

// ===========================
// PHOTO FLOAT + MOUSE TILT
// ===========================
const photoWrap = document.querySelector('.hero-photo-wrap');
const photoInner = document.querySelector('.hero-photo-inner');

if (photoWrap && photoInner) {
  photoWrap.addEventListener('mousemove', (e) => {
    const rect = photoWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const rotate = (x - 0.5) * 30;
    photoInner.style.transform = `rotateY(${rotate}deg)`;
  });

  photoWrap.addEventListener('mouseleave', () => {
    photoInner.style.transform = 'rotateY(0deg)';
  });
}

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
  navLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + cur ? '#c9a84c' : '';
  });
});

// ===========================
// FADE IN ON SCROLL (reveal)
// ===========================
const revealEls = document.querySelectorAll('.about-grid, .services-slider-wrap, .projects-slider-wrap, .journey-slider-wrap, .contact-grid, .skills-slider-wrap, .testimonial-slider, .stats-strip');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.01 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

setTimeout(() => {
  revealEls.forEach(el => el.classList.add('visible'));
}, 1500);

// ===========================
// STATS COUNTER
// ===========================
const statNumbers = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 25);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===========================
// SKILLS SLIDER — ONE CARD AT A TIME
// ===========================
const cards   = document.querySelectorAll('.skill-card');
const dots    = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current   = 0;
let autoTimer;

function showCard(index) {
  cards.forEach(c => c.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  cards[index].classList.add('active');
  dots[index].classList.add('active');
}

function goTo(index) {
  current = (index + cards.length) % cards.length;
  showCard(current);
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    goTo(current + 1);
  }, 3000);
}

dots.forEach((d, i) => {
  d.addEventListener('click', () => { goTo(i); startAuto(); });
});

prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

showCard(0);
startAuto();

// ===========================
// JOURNEY SLIDER — ONE CARD AT A TIME (3s each)
// ===========================
const journeySlides = document.querySelectorAll('.journey-slide');
const journeyDots  = document.querySelectorAll('.journey-dots .dot');
const journeyPrev  = document.getElementById('journeyPrevBtn');
const journeyNext  = document.getElementById('journeyNextBtn');
let journeyCurrent = 0;
let journeyTimer;

function showJourneySlide(index) {
  journeySlides.forEach(s => s.classList.remove('active'));
  journeyDots.forEach(d => d.classList.remove('active'));
  journeySlides[index].classList.add('active');
  journeyDots[index].classList.add('active');
}

function journeyGoTo(index) {
  journeyCurrent = (index + journeySlides.length) % journeySlides.length;
  showJourneySlide(journeyCurrent);
}

function startJourneyAuto() {
  clearInterval(journeyTimer);
  journeyTimer = setInterval(() => {
    journeyGoTo(journeyCurrent + 1);
  }, 3000);
}

journeyDots.forEach((d, i) => {
  d.addEventListener('click', () => { journeyGoTo(i); startJourneyAuto(); });
});

journeyPrev.addEventListener('click', () => { journeyGoTo(journeyCurrent - 1); startJourneyAuto(); });
journeyNext.addEventListener('click', () => { journeyGoTo(journeyCurrent + 1); startJourneyAuto(); });

if (journeySlides.length) {
  showJourneySlide(0);
  startJourneyAuto();
}

// ===========================
// SERVICES SLIDER — ONE CARD AT A TIME (3s each)
// ===========================
const serviceSlides = document.querySelectorAll('.service-slide');
const serviceDots  = document.querySelectorAll('.services-dots .dot');
const servicePrev  = document.getElementById('servicePrevBtn');
const serviceNext  = document.getElementById('serviceNextBtn');
let serviceCurrent = 0;
let serviceTimer;

function showServiceSlide(index) {
  serviceSlides.forEach(s => s.classList.remove('active'));
  serviceDots.forEach(d => d.classList.remove('active'));
  serviceSlides[index].classList.add('active');
  serviceDots[index].classList.add('active');
}

function serviceGoTo(index) {
  serviceCurrent = (index + serviceSlides.length) % serviceSlides.length;
  showServiceSlide(serviceCurrent);
}

function startServiceAuto() {
  clearInterval(serviceTimer);
  serviceTimer = setInterval(() => {
    serviceGoTo(serviceCurrent + 1);
  }, 3000);
}

serviceDots.forEach((d, i) => {
  d.addEventListener('click', () => { serviceGoTo(i); startServiceAuto(); });
});

servicePrev.addEventListener('click', () => { serviceGoTo(serviceCurrent - 1); startServiceAuto(); });
serviceNext.addEventListener('click', () => { serviceGoTo(serviceCurrent + 1); startServiceAuto(); });

if (serviceSlides.length) {
  showServiceSlide(0);
  startServiceAuto();
}

// ===========================
// PROJECTS SLIDER — ONE CARD AT A TIME (3s each)
// ===========================
const projectSlides = document.querySelectorAll('.project-slide');
const projectDots  = document.querySelectorAll('.projects-dots .dot');
const projectPrev  = document.getElementById('projectPrevBtn');
const projectNext  = document.getElementById('projectNextBtn');
let projectCurrent = 0;
let projectTimer;

function showProjectSlide(index) {
  projectSlides.forEach(s => s.classList.remove('active'));
  projectDots.forEach(d => d.classList.remove('active'));
  projectSlides[index].classList.add('active');
  projectDots[index].classList.add('active');
}

function projectGoTo(index) {
  projectCurrent = (index + projectSlides.length) % projectSlides.length;
  showProjectSlide(projectCurrent);
}

function startProjectAuto() {
  clearInterval(projectTimer);
  projectTimer = setInterval(() => {
    projectGoTo(projectCurrent + 1);
  }, 3000);
}

projectDots.forEach((d, i) => {
  d.addEventListener('click', () => { projectGoTo(i); startProjectAuto(); });
});

projectPrev.addEventListener('click', () => { projectGoTo(projectCurrent - 1); startProjectAuto(); });
projectNext.addEventListener('click', () => { projectGoTo(projectCurrent + 1); startProjectAuto(); });

if (projectSlides.length) {
  showProjectSlide(0);
  startProjectAuto();
}

// ===========================
// TESTIMONIAL SLIDER
// ===========================
const slides = document.querySelectorAll('.testimonial-slide');
const tDots  = document.querySelectorAll('.t-dot');
let tIndex   = 0;
let tTimer;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  tDots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  tDots[index].classList.add('active');
}

function nextSlide() {
  tIndex = (tIndex + 1) % slides.length;
  showSlide(tIndex);
}

function prevSlide() {
  tIndex = (tIndex - 1 + slides.length) % slides.length;
  showSlide(tIndex);
}

function startTestimonials() {
  clearInterval(tTimer);
  tTimer = setInterval(nextSlide, 3000);
}

tDots.forEach((d, i) => {
  d.addEventListener('click', () => {
    tIndex = i;
    showSlide(tIndex);
    startTestimonials();
  });
});

const tPrevBtn = document.getElementById('tPrevBtn');
const tNextBtn = document.getElementById('tNextBtn');
if (tPrevBtn) tPrevBtn.addEventListener('click', () => { prevSlide(); startTestimonials(); });
if (tNextBtn) tNextBtn.addEventListener('click', () => { nextSlide(); startTestimonials(); });

if (slides.length) {
  showSlide(0);
  startTestimonials();
}

// ===========================
// ABOUT SKILLS — OVAL TABS (Frontend / Backend / Tools)
// ===========================
const ovalBtns   = document.querySelectorAll('.oval-btn');
const skillLists = document.querySelectorAll('.skill-list');

function activateSkills(tab) {
  ovalBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  skillLists.forEach(list => {
    const on = list.dataset.list === tab;
    list.classList.toggle('active', on);
    if (on) {
      list.querySelectorAll('.as-fill').forEach(fill => {
        const target = fill.dataset.w;
        fill.style.transition = 'none';
        fill.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fill.style.transition = 'width 1.1s ease-out';
            fill.style.width = target;
          });
        });
      });
    }
  });
}

if (ovalBtns.length) {
  ovalBtns.forEach(b => b.addEventListener('click', () => activateSkills(b.dataset.tab)));
  activateSkills('frontend');
}

// ===========================
// TECH STACK SLIDER — ONE CARD AT A TIME (3s each)
// ===========================
const techSlides = document.querySelectorAll('.tech-slide');
const techDots   = document.querySelectorAll('.tech-dot');
let techCurrent  = 0;
let techTimer;

function showTechSlide(index) {
  techSlides.forEach(s => s.classList.remove('active'));
  techDots.forEach(d => d.classList.remove('active'));
  techSlides[index].classList.add('active');
  techDots[index].classList.add('active');
}

function techGoTo(index) {
  techCurrent = (index + techSlides.length) % techSlides.length;
  showTechSlide(techCurrent);
}

function startTechAuto() {
  clearInterval(techTimer);
  techTimer = setInterval(() => {
    techGoTo(techCurrent + 1);
  }, 3000);
}

const techPrevBtn = document.getElementById('techPrevBtn');
const techNextBtn = document.getElementById('techNextBtn');

if (techSlides.length) {
  techDots.forEach((d, i) => {
    d.addEventListener('click', () => { techGoTo(i); startTechAuto(); });
  });
  if (techPrevBtn) techPrevBtn.addEventListener('click', () => { techGoTo(techCurrent - 1); startTechAuto(); });
  if (techNextBtn) techNextBtn.addEventListener('click', () => { techGoTo(techCurrent + 1); startTechAuto(); });
  showTechSlide(0);
  startTechAuto();
}

// ===========================
// FEATURED PROJECTS FILTER
// ===========================
const projFilters = document.querySelectorAll('.proj-filter');
const projCards = document.querySelectorAll('.proj-card');

projFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    projFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projCards.forEach(card => {
      const show = filter === 'all' || card.dataset.cat.includes(filter);
      card.classList.toggle('active', show);
    });
  });
});

// ===========================
// CERTIFICATES SLIDER
// ===========================
const certTrack = document.querySelector('.cert-track');
const certCards = document.querySelectorAll('.cert-card');
const certBtns = document.querySelectorAll('.cert-btn');
let certIndex = 0;
let certTimer;

function certStep() { return window.innerWidth <= 768 ? 1 : 3; }
function certMax() { return Math.max(0, certCards.length - certStep()); }
function certMove() {
  const gap = 16;
  const stepPx = certCards[0].offsetWidth + gap;
  certTrack.style.transform = `translateX(-${certIndex * stepPx}px)`;
}
function certStartAuto() {
  clearInterval(certTimer);
  certTimer = setInterval(() => {
    if (certIndex < certMax()) certIndex += certStep();
    else certIndex = 0;
    certMove();
  }, 3000);
}
certBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    if (i === 0) certIndex = Math.max(0, certIndex - certStep());
    else certIndex = Math.min(certMax(), certIndex + certStep());
    certMove();
    certStartAuto();
  });
});
window.addEventListener('resize', () => {
  certIndex = Math.min(certIndex, certMax());
  certMove();
});
if (certCards.length) {
  certMove();
  certStartAuto();
}

// ===========================
// CODING JOURNEY CONTRIBUTION GRAPH
// ===========================
const cjGraph = document.getElementById('cjGraph');
if (cjGraph) {
  const cells = 126;
  for (let i = 0; i < cells; i++) {
    const cell = document.createElement('span');
    cell.classList.add('cj-cell');
    const r = Math.random();
    let lv = 0;
    if (r > 0.85) lv = 4;
    else if (r > 0.7) lv = 3;
    else if (r > 0.5) lv = 2;
    else if (r > 0.3) lv = 1;
    if (lv) cell.classList.add('lv' + lv);
    cjGraph.appendChild(cell);
  }
}

// ===========================
// FAQ ACCORDION
// ===========================
const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  const btn = card.querySelector('.faq-q');
  const wrap = card.querySelector('.faq-a-wrap');
  btn.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');
    faqCards.forEach(c => {
      c.classList.remove('open');
      c.querySelector('.faq-a-wrap').style.maxHeight = null;
      c.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      card.classList.add('open');
      wrap.style.maxHeight = wrap.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===========================
// NEXT STEP TRACKER (1-2-3)
// ===========================
const stepsSection = document.querySelector('.steps-section');
const stepsLineFill = document.getElementById('stepsLineFill');
const stepEls = document.querySelectorAll('.step');
let stepStarted = false;

function stepUpTo(n) {
  stepEls.forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
  if (n === 1) stepsLineFill.style.width = '0%';
  else if (n === 2) stepsLineFill.style.width = '50%';
  else if (n === 3) stepsLineFill.style.width = '100%';
}

if (stepsSection && stepsLineFill && stepEls.length) {
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !stepStarted) {
        stepStarted = true;
        setTimeout(() => stepUpTo(1), 300);
        setTimeout(() => stepUpTo(2), 2300);
        setTimeout(() => stepUpTo(3), 4300);
      }
    });
  }, { threshold: 0.3 });
  stepObserver.observe(stepsSection);
}

// ===========================
// CONTACT FORM (Netlify Forms - iframe method)
// ===========================
(function() {
  var form = document.getElementById('contactForm');
  if (!form) return;
  var btn = form.querySelector('.form-btn');
  var status = document.getElementById('formStatus');
  var origText = btn.textContent;

  var iframeName = 'formspree_iframe_' + Math.random().toString(36).substr(2);
  var iframe = document.createElement('iframe');
  iframe.name = iframeName;
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  form.setAttribute('target', iframeName);

  iframe.addEventListener('load', function() {
    var success = true;
    try {
      var body = iframe.contentDocument || iframe.contentWindow.document;
      if (body && body.body && body.body.textContent && body.body.textContent.indexOf('Redirect') === -1) {
        success = true;
      }
    } catch(e) {
      success = true;
    }

    btn.textContent = 'Message Sent!';
    btn.style.background = '#22c55e';
    btn.style.color = '#fff';
    btn.style.opacity = '1';
    form.reset();
    if (status) { status.textContent = 'Message sent successfully! Check your email.'; status.className = 'form-status success'; }
    setTimeout(function() {
      btn.textContent = origText;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.opacity = '';
      btn.disabled = false;
      if (status) { status.textContent = ''; status.className = 'form-status'; }
    }, 4000);
  });

  form.addEventListener('submit', function() {
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.6';
    if (status) { status.textContent = ''; status.className = 'form-status'; }

    setTimeout(function() {
      if (btn.textContent === 'Sending...') {
        btn.textContent = 'Not Send';
        btn.style.background = '#ef4444';
        btn.style.color = '#fff';
        btn.style.opacity = '1';
        if (status) { status.textContent = 'Failed to send. Please try again.'; status.className = 'form-status error'; }
        setTimeout(function() {
          btn.textContent = origText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.opacity = '';
          btn.disabled = false;
          if (status) { status.textContent = ''; status.className = 'form-status'; }
        }, 4000);
      }
    }, 10000);
  });
})();

// ===========================
// THEME TOGGLE (dark / light)
// ===========================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===========================
// BACK TO TOP
// ===========================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// BACK TO BOTTOM
// ===========================
const backToBottom = document.getElementById('backToBottom');
window.addEventListener('scroll', () => {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
  if (window.scrollY > 400 && !atBottom) backToBottom.classList.add('show');
  else backToBottom.classList.remove('show');
});
backToBottom.addEventListener('click', () => {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
});

// ===========================
// THEME COLOR PICKER
// ===========================
const THEME_PRESETS = [
  { name: 'Gold',     hex: '#c9a84c', hex2: '#e8c97a' },
  { name: 'Orange',   hex: '#f97316', hex2: '#fb923c' },
  { name: 'Red',      hex: '#ef4444', hex2: '#f87171' },
  { name: 'Pink',     hex: '#ec4899', hex2: '#f472b6' },
  { name: 'Purple',   hex: '#8b5cf6', hex2: '#a78bfa' },
  { name: 'Blue',     hex: '#3b82f6', hex2: '#60a5fa' },
  { name: 'Cyan',     hex: '#06b6d4', hex2: '#22d3ee' },
  { name: 'Green',    hex: '#22c55e', hex2: '#4ade80' },
  { name: 'Lime',     hex: '#84cc16', hex2: '#a3e635' },
  { name: 'Teal',     hex: '#14b8a6', hex2: '#2dd4bf' }
];

const themePanel = document.getElementById('themePanel');
const themeOverlay = document.getElementById('themeOverlay');
const themePickerBtn = document.getElementById('themePickerBtn');
const themePanelClose = document.getElementById('themePanelClose');
const themeSwatches = document.getElementById('themeSwatches');
const themeCustomInput = document.getElementById('themeCustomInput');
const themeCustomBtn = document.getElementById('themeCustomBtn');

function hexToRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const num = parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function lightenHex(hex, amt) {
  const [r, g, b] = hexToRgb(hex).map(v => Math.min(255, Math.round(v + (255 - v) * amt)));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function applyThemeColor(hex) {
  if (!/^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const root = document.documentElement;
  const body = document.body;
  const rgb = hexToRgb(hex).join(', ');
  const light = lightenHex(hex, 0.35);
  root.style.setProperty('--accent', hex);
  root.style.setProperty('--accent2', light);
  root.style.setProperty('--accent-rgb', rgb);
  body.style.setProperty('--accent', hex);
  body.style.setProperty('--accent2', light);
  body.style.setProperty('--accent-rgb', rgb);
  localStorage.setItem('themeColor', hex);
  markActiveSwatch(hex);
  return true;
}

function markActiveSwatch(hex) {
  const target = hex.toLowerCase();
  document.querySelectorAll('.theme-swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.hex === target);
  });
}

function renderSwatches() {
  themeSwatches.innerHTML = '';
  THEME_PRESETS.forEach(p => {
    const sw = document.createElement('div');
    sw.className = 'theme-swatch';
    sw.dataset.hex = p.hex.toLowerCase();
    sw.innerHTML = `<span class="theme-swatch-dot" style="background:${p.hex}"></span><span class="theme-swatch-code">${p.hex}</span>`;
    sw.addEventListener('click', () => {
      applyThemeColor(p.hex);
    });
    themeSwatches.appendChild(sw);
  });
}

if (themePanel && themeSwatches) {
  renderSwatches();

  const savedColor = localStorage.getItem('themeColor');
  if (savedColor) {
    applyThemeColor(savedColor);
  } else {
    markActiveSwatch('#c9a84c');
  }

  const openPanel = () => {
    themePanel.classList.add('open');
    themeOverlay.classList.add('show');
    themeCustomInput.value = '';
  };
  const closePanel = () => {
    themePanel.classList.remove('open');
    themeOverlay.classList.remove('show');
  };

  themePickerBtn.addEventListener('click', openPanel);
  themePanelClose.addEventListener('click', closePanel);
  themeOverlay.addEventListener('click', closePanel);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  const applyCustom = () => {
    let val = themeCustomInput.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (applyThemeColor(val)) {
      themeCustomInput.style.borderColor = 'var(--accent)';
      setTimeout(() => { themeCustomInput.style.borderColor = ''; }, 1200);
    } else {
      themeCustomInput.style.borderColor = '#ef4444';
      setTimeout(() => { themeCustomInput.style.borderColor = ''; }, 1200);
    }
  };

  themeCustomBtn.addEventListener('click', applyCustom);
  themeCustomInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') applyCustom();
  });
}
