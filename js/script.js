/* =========================================================
   NADIA CRUZ — PREMIUM PORTFOLIO — SCRIPT
   Vanilla JS only. Sections below: DATA, then INTERACTIONS.
========================================================= */

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   LOADER
--------------------------------------------------------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('done'), 700);
});

/* ---------------------------------------------------------
   CUSTOM CURSOR
--------------------------------------------------------- */
const cursorDot = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
let glowX = mouseX, glowY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  document.body.classList.add('cursor-active');
});
function animateGlow(){
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.style.transform = 'translate(-50%,-50%) scale(2.4)');
  el.addEventListener('mouseleave', () => cursorDot.style.transform = 'translate(-50%,-50%) scale(1)');
});

/* ---------------------------------------------------------
   SCROLL PROGRESS + NAVBAR HIDE/SHOW + ACTIVE LINK + BACK TOP
--------------------------------------------------------- */
const progress = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
let lastScroll = 0;

const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollTop / docHeight * 100) + '%';

  navbar.classList.toggle('scrolled', scrollTop > 40);
  if(scrollTop > lastScroll && scrollTop > 200){
    navbar.classList.add('hide-nav');
  } else {
    navbar.classList.remove('hide-nav');
  }
  lastScroll = scrollTop;

  backTop.classList.toggle('show', scrollTop > 700);

  let current = 'home';
  sections.forEach(sec => {
    if(scrollTop >= sec.offsetTop - 200) current = sec.id;
  });
  navAnchors.forEach(a => a.classList.toggle('active', a.dataset.section === current));
}, { passive:true });

backTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ---------------------------------------------------------
   MOBILE MENU
--------------------------------------------------------- */
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
navBurger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  navBurger.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ---------------------------------------------------------
   TYPING ANIMATION (hero)
--------------------------------------------------------- */
const typeTarget = document.getElementById('typeTarget');
const phrases = ['compilers.', 'full-stack systems.', 'premium interfaces.', 'things that ship.'];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeLoop(){
  const current = phrases[phraseIdx];
  if(!deleting){
    charIdx++;
    typeTarget.textContent = current.slice(0, charIdx);
    if(charIdx === current.length){
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIdx--;
    typeTarget.textContent = current.slice(0, charIdx);
    if(charIdx === 0){
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

/* ---------------------------------------------------------
   MAGNETIC BUTTONS
--------------------------------------------------------- */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.25}px, ${y*0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0,0)');
});

/* ---------------------------------------------------------
   SCROLL REVEAL (IntersectionObserver)
--------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.15 });

function observeReveals(){
  document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => revealObserver.observe(el));
}

/* ---------------------------------------------------------
   ANIMATED COUNTERS
--------------------------------------------------------- */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if(current >= target){ el.textContent = target; return; }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold:0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* =========================================================
   DATA — edit here to update site content
========================================================= */

const PROJECTS_DATA = [
  {
    title:'Medical Booking App',
    desc:'A convenient appointment-booking application that helps patients find doctors, schedule consultations, and manage their healthcare visits in one place.',
    tags:['Healthcare', 'Appointment Booking', 'Mobile App', 'UI/UX'],
    image:'images/online-doctor-and-calendar-medical-booking.jpg',
    glyph:'MEDICAL BOOKING\n>_ appointments made simple'
  },
  {
    title:'Boarding House Management System',
    desc:'A management system for handling boarding house rooms, tenant records, rental payments, and availability in one organized platform.',
    tags:['Management System', 'Tenant Records', 'Room Booking', 'UI/UX'],
    image:'images/bh.png',
    glyph:'BOARDING HOUSE\n>_ rooms and tenants organized'
  },
  {
    title:'RegEx Game',
    desc:'An interactive game that makes regular expressions easier to learn through pattern-matching challenges and instant feedback.',
    tags:['JavaScript', 'Regular Expressions', 'Game Design', 'Learning Tool'],
    image:'images/RegEx_game.jpg',
    glyph:'REGEX GAME\n>_ match the pattern'
  },
  {
    title:'Lexical Analyzer',
    desc:'A tool that reads source code and breaks it into meaningful tokens, helping users understand the first stage of compiler design.',
    tags:['JavaScript', 'Compiler Design', 'Tokenization', 'Programming'],
    image:'images/Lexical_Analizer.jpg',
    glyph:'LEXICAL ANALYZER\n>_ tokenizing source code'
  },
];

const SERVICES_DATA = [
  { title:'Web Development', desc:'Responsive, accessible, performant websites built from scratch.' },
  { title:'Full-Stack Systems', desc:'End-to-end apps — from database schema to polished front end.' },
  { title:'UI/UX Design', desc:'Interfaces designed for clarity first, delight second.' },
  { title:'Database Design', desc:'Normalized schemas and CRUD systems that hold up under load.' },
  { title:'API Integration', desc:'Connecting services cleanly with REST and third-party APIs.' },
  { title:'Desktop & Mobile', desc:'C#/.NET desktop tools and Flutter cross-platform apps.' },
];

/* =========================================================
   RENDERERS
========================================================= */

function renderProjects(){
  const list = document.getElementById('projectsList');
  PROJECTS_DATA.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal-up';
    card.innerHTML = `
      <div class="pj-media${p.image ? ' has-image' : ''}">${p.image ? `<img src="${p.image}" alt="${p.title}" class="pj-image">` : `<div class="pj-glyph">${p.glyph.replace(/\n/g,'<br>')}</div>`}</div>
      <div class="pj-body">
        <span class="pj-index">Project 0${i+1}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="pj-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="pj-links">
          <a href="https://github.com/Rhea-Mae06" target="_blank" rel="noopener noreferrer">View Code</a>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
  observeReveals();
}
renderProjects();

function renderServices(){
  const grid = document.getElementById('servicesGrid');
  SERVICES_DATA.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'service-card reveal-up';
    card.style.transitionDelay = (i * 0.06) + 's';
    card.innerHTML = `<span class="sc-num">0${i+1}</span><h4>${s.title}</h4><p>${s.desc}</p>`;
    grid.appendChild(card);
  });
  observeReveals();
}
renderServices();

/* ---------------------------------------------------------
   INITIAL REVEAL OBSERVE (for static sections)
--------------------------------------------------------- */
observeReveals();
