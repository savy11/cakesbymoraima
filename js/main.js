/* ===========================
   CAKES BY MORAIMA & CAFE
   Main JavaScript
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================
     NAVBAR — SCROLL BEHAVIOR
  ======================== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
    toggleScrollTopBtn();
  });

  /* ========================
     NAVBAR — MOBILE TOGGLE
  ======================== */
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    const isOpen = navLinksContainer.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close mobile menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '1';
      });
    });
  });

  /* ========================
     ACTIVE NAV LINK
  ======================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  /* ========================
     MENU TABS
  ======================== */
  const menuTabs  = document.querySelectorAll('.menu-tab');
  const menuPanels = document.querySelectorAll('.menu-panel');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      menuTabs.forEach(t  => t.classList.remove('active'));
      menuPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger card animations
        panel.querySelectorAll('.menu-card').forEach((card, i) => {
          card.style.opacity   = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
      }
    });
  });

  /* ========================
     GALLERY LIGHTBOX
  ======================== */
  const galleryItems  = document.querySelectorAll('.gallery-item');
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img     = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay span');
      lightboxImg.src       = img.src;
      lightboxImg.alt       = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 350);
  }

  /* ========================
     SCROLL REVEAL
  ======================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ========================
     SCROLL TO TOP BUTTON
  ======================== */
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  function toggleScrollTopBtn() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ========================
     ORDER FORM
  ======================== */
  const orderForm    = document.getElementById('order-form');
  const formSuccess  = document.getElementById('form-success');

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = orderForm.querySelector('[type="submit"]');
    const btnSpan   = submitBtn.querySelector('span');
    const origText  = btnSpan.textContent;

    submitBtn.disabled = true;
    btnSpan.textContent = 'Sending…';

    // Simulate sending (in production, replace with real form handler)
    setTimeout(() => {
      submitBtn.disabled = false;
      btnSpan.textContent = origText;
      formSuccess.style.display = 'block';
      orderForm.reset();

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 6000);
    }, 1800);
  });

  /* ========================
     SMOOTH SCROLL FOR ANCHORS
  ======================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ========================
     HERO SCROLL INDICATOR FADE
  ======================== */
  const heroScrollIndicator = document.getElementById('hero-scroll-indicator');
  window.addEventListener('scroll', () => {
    if (heroScrollIndicator) {
      heroScrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }
  });

  /* ========================
     COUNTER ANIMATION
  ======================== */
  const statNums = document.querySelectorAll('.stat-num');

  function animateCounter(el, target, suffix = '') {
    const duration  = 1800;
    const start     = performance.now();
    const startVal  = 0;

    function update(timestamp) {
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
          const num    = parseInt(match[1], 10);
          const suffix = text.replace(/\d+/, '').trim();
          animateCounter(el, num, suffix);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => {
    const text = el.textContent;
    if (/\d/.test(text)) counterObserver.observe(el);
  });

  /* ========================
     PARALLAX (SUBTLE)
  ======================== */
  const heroImg = document.querySelector('.hero-img');
  window.addEventListener('scroll', () => {
    if (heroImg && window.scrollY < window.innerHeight) {
      heroImg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.15}px)`;
    }
  }, { passive: true });

});
