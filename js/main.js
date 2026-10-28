/**
 * Surya Pratap Singh Rathore — Personal Portfolio
 * Interactive Experience: Cinematic Japanese Garden at Dusk
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Feature Detection & Preference Checks
  // ---------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  // ---------------------------------------------------------------------------
  // 2. Gate-Opening First Visit Intro Controller
  // ---------------------------------------------------------------------------
  const gateIntro = document.getElementById('gate-intro');
  const btnEnterPortfolio = document.getElementById('btn-enter-portfolio');
  const btnSkipIntro = document.getElementById('btn-skip-intro');
  const btnReplayIntroNav = document.getElementById('btn-replay-intro');
  const btnReplayIntroFooter = document.getElementById('btn-replay-intro-footer');

  function openGate(animated = true) {
    if (!gateIntro) return;

    if (!animated || prefersReducedMotion.matches) {
      gateIntro.classList.add('gate-hidden');
      gateIntro.setAttribute('aria-hidden', 'true');
      try {
        sessionStorage.setItem('spsr_garden_intro_viewed', 'true');
      } catch (e) {
        /* storage may be blocked in some private modes */
      }
      return;
    }

    gateIntro.classList.add('gate-opening');
    gateIntro.setAttribute('aria-hidden', 'true');

    // Store in session so returning to the tab is seamless
    try {
      sessionStorage.setItem('spsr_garden_intro_viewed', 'true');
    } catch (e) {}

    // Complete removal after gate sliding animation
    setTimeout(() => {
      gateIntro.classList.add('gate-hidden');
    }, 1250);
  }

  function replayGate() {
    if (!gateIntro) return;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
    gateIntro.classList.remove('gate-hidden', 'gate-opening');
    gateIntro.removeAttribute('aria-hidden');
  }

  if (btnEnterPortfolio) {
    btnEnterPortfolio.addEventListener('click', (e) => {
      triggerButtonSlash(btnEnterPortfolio);
      setTimeout(() => openGate(true), 120);
    });
  }

  if (btnSkipIntro) {
    btnSkipIntro.addEventListener('click', () => openGate(false));
  }

  if (btnReplayIntroNav) {
    btnReplayIntroNav.addEventListener('click', (e) => {
      e.preventDefault();
      replayGate();
    });
  }

  if (btnReplayIntroFooter) {
    btnReplayIntroFooter.addEventListener('click', (e) => {
      e.preventDefault();
      replayGate();
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Katana Cut Interaction on Bamboo Buttons
  // ---------------------------------------------------------------------------
  function triggerButtonSlash(element) {
    if (prefersReducedMotion.matches || !element) return;

    // Check if laser slash line already exists
    let laser = element.querySelector('.slash-laser');
    if (!laser) {
      laser = document.createElement('span');
      laser.className = 'slash-laser';
      laser.setAttribute('aria-hidden', 'true');
      element.appendChild(laser);
    }

    element.classList.remove('is-slashing');
    void element.offsetWidth; // Force DOM reflow
    element.classList.add('is-slashing');

    setTimeout(() => {
      element.classList.remove('is-slashing');
    }, 280);
  }

  // Bind Katana Cut to all bamboo buttons and nav plates
  const interactiveBamboo = document.querySelectorAll('.btn-bamboo, .nav-bamboo-btn');
  interactiveBamboo.forEach((el) => {
    el.addEventListener('click', function (e) {
      triggerButtonSlash(this);

      // If it is an anchor link within the page, give a slight beat for the slash feel
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({
              behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
            });
          }, 110);
        }
      }
    });

    // Keyboard activation (Enter / Space)
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        triggerButtonSlash(this);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Katana Click Slash Effect (Desktop with Fine Pointer)
  // ---------------------------------------------------------------------------
  const slashContainer = document.getElementById('katana-slash-container');

  if (hasFinePointer.matches && slashContainer) {
    document.addEventListener('pointerdown', (e) => {
      if (prefersReducedMotion.matches) return;
      // Exclude text input fields from decorative slash so typing/selecting feels native
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      const spark = document.createElement('div');
      spark.className = 'slash-spark';
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;

      // Slight angle variation for natural martial art sword feel
      const angle = -25 + (Math.random() * 20 - 10);
      spark.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

      slashContainer.appendChild(spark);

      setTimeout(() => {
        spark.remove();
      }, 240);
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Falling Sakura Petals Particle Simulation (Canvas)
  // ---------------------------------------------------------------------------
  const canvas = document.getElementById('sakura-canvas');
  let ctx = null;
  let petals = [];
  let animFrameId = null;
  let isTabVisible = true;

  if (canvas && !prefersReducedMotion.matches) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class SakuraPetal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        const w = canvas.width;
        const h = canvas.height;
        this.x = Math.random() * w;
        this.y = init ? Math.random() * h : -20;
        this.size = 9 + Math.random() * 8; // varying sizes
        this.speedY = 1.1 + Math.random() * 1.5;
        this.speedX = -0.4 + Math.random() * 0.9;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1.8;
        this.tilt = Math.random() * Math.PI;
        this.tiltSpeed = 0.02 + Math.random() * 0.03;
        this.opacity = 0.45 + Math.random() * 0.45;
        // Color variation: pale blossom to rose pink
        const isPale = Math.random() > 0.4;
        this.color = isPale
          ? `rgba(255, 230, 235, ${this.opacity})`
          : `rgba(252, 165, 165, ${this.opacity})`;
        this.shadowColor = 'rgba(244, 114, 182, 0.4)';
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.tilt) * 0.8;
        this.rotation += this.rotationSpeed;
        this.tilt += this.tiltSpeed;

        if (this.y > canvas.height + 20 || this.x > canvas.width + 30 || this.x < -30) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate((this.rotation * Math.PI) / 180);
        context.scale(Math.cos(this.tilt), 1); // 3D tumbling flutter

        // Realistic curved sakura petal geometry
        context.beginPath();
        context.moveTo(0, -this.size);
        context.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size * 0.5, 0, this.size);
        context.bezierCurveTo(-this.size * 0.8, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
        context.fillStyle = this.color;
        context.shadowColor = this.shadowColor;
        context.shadowBlur = 4;
        context.fill();

        // Delicate inner vein of petal
        context.beginPath();
        context.moveTo(0, -this.size * 0.7);
        context.lineTo(0, this.size * 0.5);
        context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        context.lineWidth = 0.6;
        context.stroke();

        context.restore();
      }
    }

    function initPetals() {
      resizeCanvas();
      // Mobile optimization: fewer particles on small viewports
      const petalCount = window.innerWidth < 768 ? 14 : 32;
      petals = [];
      for (let i = 0; i < petalCount; i++) {
        petals.push(new SakuraPetal());
      }
    }

    function renderPetals() {
      if (!isTabVisible || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw(ctx);
      }

      animFrameId = requestAnimationFrame(renderPetals);
    }

    // Visibility change handler: pause simulation when tab is hidden
    document.addEventListener('visibilitychange', () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(renderPetals);
      }
    });

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    initPetals();
    animFrameId = requestAnimationFrame(renderPetals);
  }

  // ---------------------------------------------------------------------------
  // 6. Floating Navigation ScrollSpy & Active Link Highlighting
  // ---------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-bamboo-btn');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // ---------------------------------------------------------------------------
  // 7. Mobile Navigation Drawer
  // ---------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinksList = document.querySelector('.nav-links');

  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinksList.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking any link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navLinksList.classList.contains('nav-open')) {
          navLinksList.classList.remove('nav-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 8. Back to Top Button
  // ---------------------------------------------------------------------------
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btnBackToTop.classList.add('visible');
      } else {
        btnBackToTop.classList.remove('visible');
      }
    });

    btnBackToTop.addEventListener('click', (e) => {
      e.preventDefault();
      triggerButtonSlash(btnBackToTop);
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 9. Copy Email Address Helper
  // ---------------------------------------------------------------------------
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const emailDisplay = document.getElementById('contact-email-text');

  if (btnCopyEmail && emailDisplay) {
    btnCopyEmail.addEventListener('click', () => {
      const textToCopy = emailDisplay.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btnCopyEmail.textContent;
          btnCopyEmail.textContent = 'Copied! ✓';
          setTimeout(() => {
            btnCopyEmail.textContent = originalText;
          }, 2000);
        });
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 10. Contact Form Submission (Client-Side Feedback)
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('contact-form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) triggerButtonSlash(submitBtn);

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong>Message Prepared! 🌸</strong><br>
        Thank you for reaching out. In this template, you can connect this form to Formspree, EmailJS, or your backend endpoint in <code>js/main.js</code>.
      `;

      contactForm.reset();

      setTimeout(() => {
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  }

  // ---------------------------------------------------------------------------
  // 11. Subtle Parallax for Garden Scenery Layers (Scroll)
  // ---------------------------------------------------------------------------
  if (!prefersReducedMotion.matches) {
    const mountains = document.querySelector('.scenery-mountains');
    const architecture = document.querySelector('.scenery-architecture');

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (mountains) {
        mountains.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
      if (architecture) {
        architecture.style.transform = `translateY(${scrolled * 0.04}px)`;
      }
    }, { passive: true });
  }

})();

