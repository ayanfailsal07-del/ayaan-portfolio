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

if (navToggle) {
  navToggle.addEventListener('click', () => {
    linksList.classList.toggle('open');
  });
}

navLinks.forEach(l => {
  l.addEventListener('click', () => linksList.classList.remove('open'));
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

if (techSlides.length) {
  techDots.forEach((d, i) => {
    d.addEventListener('click', () => { techGoTo(i); startTechAuto(); });
  });
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

function certStep() { return window.innerWidth <= 768 ? 1 : 3; }
function certMax() { return Math.max(0, certCards.length - certStep()); }
function certMove() {
  const gap = 16;
  const stepPx = certCards[0].offsetWidth + gap;
  certTrack.style.transform = `translateX(-${certIndex * stepPx}px)`;
}
certBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    if (i === 0) certIndex = Math.max(0, certIndex - certStep());
    else certIndex = Math.min(certMax(), certIndex + certStep());
    certMove();
  });
});
window.addEventListener('resize', () => {
  certIndex = Math.min(certIndex, certMax());
  certMove();
});
if (certCards.length) certMove();

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
// CONTACT FORM (stores message via backend -> MongoDB)
// ===========================
const CONTACT_API_URL = '/api/contact';

function handleContact(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  const project = (form.project.value || '').trim();
  const budget = (form.budget.value || '').trim();
  const timeline = (form.timeline.value || '').trim();

  const btn = form.querySelector('.form-btn');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  fetch(CONTACT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      projectType: project,
      budget,
      timeline
    })
  })
  .then(res => {
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  })
  .then(() => {
    btn.textContent = 'Message Sent!';
    form.reset();
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 2500);
  })
  .catch(() => {
    btn.textContent = 'Failed - Try Again';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = originalText; }, 2500);
  });

  return false;
}
