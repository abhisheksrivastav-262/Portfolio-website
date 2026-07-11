/* ============================================
   Mr. Perfect Water Tank Cleaning Service
   JavaScript — Interactions & Animations
   ============================================ */

(function () {
  'use strict';

  /* ---- Navbar scroll behaviour ---- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- Mobile nav overlay ---- */
  let overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMobileMenu() {
    navLinks.classList.add('open');
    overlay.classList.add('show');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    navLinks.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  overlay.addEventListener('click', closeMobileMenu);
  navLinksItems.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Scroll Reveal Animation ---- */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- Counter Animation for Trust Stats ---- */
  const counters = document.querySelectorAll('.trust-number[data-target]');
  let countersAnimated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    });
  }

  const trustSection = document.getElementById('trust');
  if (trustSection) {
    const trustObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    }, { threshold: 0.4 });
    trustObserver.observe(trustSection);
  }

  /* ---- Hero Particle Animation ---- */
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    function createParticle() {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 12 + 4;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 5}s;
        opacity: ${Math.random() * 0.6 + 0.1};
      `;
      particleContainer.appendChild(p);
      setTimeout(() => p.remove(), 20000);
    }
    // Create initial particles
    for (let i = 0; i < 18; i++) {
      setTimeout(createParticle, i * 300);
    }
    // Keep spawning
    setInterval(createParticle, 1200);
  }

  /* ---- Hero Parallax ---- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

  /* ---- Smooth Scroll for all anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Floating button hover text on desktop ---- */
  function initFloatingButtons() {
    const floatBtns = document.querySelectorAll('.float-btn');
    floatBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.borderRadius = '50px';
      });
      btn.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 768) {
          btn.style.borderRadius = '50%';
        }
      });
    });
  }
  initFloatingButtons();

  /* ---- Service cards tilt effect ---- */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---- Importance cards staggered appear ---- */
  const impCards = document.querySelectorAll('.importance-card');
  impCards.forEach((card, i) => {
    card.style.setProperty('--delay', `${i * 0.1}s`);
  });

  /* ---- WhatsApp floating button pulse ---- */
  const waBtn = document.getElementById('float-whatsapp');
  if (waBtn) {
    setInterval(() => {
      waBtn.style.boxShadow = '0 0 0 0 rgba(37,211,102,0.6)';
      waBtn.style.animation = 'waPulse 0.6s ease-out forwards';
      setTimeout(() => {
        waBtn.style.animation = '';
        waBtn.style.boxShadow = '0 6px 25px rgba(0,0,0,0.25)';
      }, 800);
    }, 3500);
  }

  /* ---- Add whatsapp pulse keyframe dynamically ---- */
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes waPulse {
      0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
      70% { box-shadow: 0 0 0 16px rgba(37,211,102,0); }
      100% { box-shadow: 0 6px 25px rgba(0,0,0,0.25); }
    }
    @keyframes callPulse {
      0% { box-shadow: 0 0 0 0 rgba(0,102,204,0.6); }
      70% { box-shadow: 0 0 0 16px rgba(0,102,204,0); }
      100% { box-shadow: 0 6px 25px rgba(0,0,0,0.25); }
    }
  `;
  document.head.appendChild(styleSheet);

  const callBtn = document.getElementById('float-call');
  if (callBtn) {
    setInterval(() => {
      callBtn.style.animation = 'callPulse 0.6s ease-out forwards';
      setTimeout(() => {
        callBtn.style.animation = '';
      }, 800);
    }, 4000);
  }

  /* ---- Process step entrance animation ---- */
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((step, i) => {
    step.style.setProperty('--delay', `${i * 0.15}s`);
  });

  /* ---- Trust cards entrance ---- */
  const trustCards = document.querySelectorAll('.trust-card');
  trustCards.forEach((card, i) => {
    card.style.setProperty('--delay', `${i * 0.1}s`);
  });

  /* ---- Navbar logo click scrolls to top ---- */
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      if (navLogo.getAttribute('href') === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  console.log('%cMr. Perfect Water Tank Cleaning Service', 'color:#0066cc; font-size:16px; font-weight:bold;');
  console.log('%c📞 Call: +91 8082810098 | 📍 Resham Ghar Colony, Jammu', 'color:#00b4d8; font-size:12px;');

})();
