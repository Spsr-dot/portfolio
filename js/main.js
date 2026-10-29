/**
 * Surya Pratap Singh Rathore — Personal Portfolio
 * Interactive Experience: Cinematic Japanese Garden at Dusk (Spring)
 * Enhanced with Multi-Atmospheric Particles (Sakura & Hotaru Fireflies),
 * Web Audio Integration, Interactive Skills Matrix, and Tactile Katana Controls.
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

    if (window.ZenAudio) {
      window.ZenAudio.playZenBell();
    }

    if (!animated || prefersReducedMotion.matches) {
      gateIntro.classList.add('gate-hidden');
      gateIntro.setAttribute('aria-hidden', 'true');
      try {
        sessionStorage.setItem('spsr_garden_intro_viewed', 'true');
      } catch (e) {}
      return;
    }

    gateIntro.classList.add('gate-opening');
    gateIntro.setAttribute('aria-hidden', 'true');

    try {
      sessionStorage.setItem('spsr_garden_intro_viewed', 'true');
    } catch (e) {}

    setTimeout(() => {
      gateIntro.classList.add('gate-hidden');
    }, 1250);
  }

  function replayGate() {
    if (!gateIntro) return;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
    gateIntro.classList.remove('gate-hidden', 'gate-opening');
    gateIntro.removeAttribute('aria-hidden');
    if (window.ZenAudio) window.ZenAudio.playChime(1);
  }

  if (btnEnterPortfolio) {
    btnEnterPortfolio.addEventListener('click', () => {
      triggerButtonPress(btnEnterPortfolio);
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
  // 3. Tactile Button Interaction (Slicing laser line removed)
  // ---------------------------------------------------------------------------
  function triggerButtonPress(element) {
    if (prefersReducedMotion.matches || !element) return;

    element.classList.remove('btn-pressed');
    void element.offsetWidth; // Force DOM reflow
    element.classList.add('btn-pressed');

    setTimeout(() => {
      element.classList.remove('btn-pressed');
    }, 200);
  }

  const interactiveBamboo = document.querySelectorAll('.btn-bamboo, .nav-bamboo-btn');
  interactiveBamboo.forEach((el) => {
    el.addEventListener('click', function (e) {
      triggerButtonPress(this);

      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({
              behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
            });
          }, 80);
        }
      }
    });

    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        triggerButtonPress(this);
      }
    });

    // Subtle wind chime on hover (occasional)
    el.addEventListener('mouseenter', () => {
      if (window.ZenAudio && Math.random() > 0.65) {
        window.ZenAudio.playChime();
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Cursor Interaction (Click slicing animation removed as requested)
  // ---------------------------------------------------------------------------
  // Slicing animation on cursor clicks has been completely removed.
  // Standard clean pointer and smooth interactive response preserved.

  // ---------------------------------------------------------------------------
  // 5. Multi-Atmosphere Particle Simulation (Sakura Petals & Hotaru Fireflies)
  // ---------------------------------------------------------------------------
  const canvas = document.getElementById('sakura-canvas');
  let ctx = null;
  let particles = [];
  let animFrameId = null;
  let isTabVisible = true;
  let currentAtmosphere = 'dusk';
  let windBreezeX = 0;

  if (canvas && !prefersReducedMotion.matches) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Realistic Sakura Blossom Petal (Dusk, Dawn, Day) — Physics strictly preserved
    class SakuraPetal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        const w = canvas.width;
        const h = canvas.height;
        this.x = Math.random() * (w + 40) - 20;
        this.y = init ? Math.random() * h : -25;
        this.size = 8 + Math.random() * 8;
        this.speedY = 1.1 + Math.random() * 1.5;
        this.speedX = -0.5 + Math.random() * 1.0;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1.8;
        this.tilt = Math.random() * Math.PI;
        this.tiltSpeed = 0.02 + Math.random() * 0.03;
        this.opacity = 0.45 + Math.random() * 0.45;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + windBreezeX + Math.sin(this.tilt) * 0.8;
        this.rotation += this.rotationSpeed;
        this.tilt += this.tiltSpeed;

        if (this.y > canvas.height + 25 || this.x > canvas.width + 35 || this.x < -35) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate((this.rotation * Math.PI) / 180);

        // 3D realistic tumbling flutter - strictly uses original tilt math
        const cosTilt = Math.cos(this.tilt);
        context.scale(cosTilt, 1);

        const s = this.size;

        // Realistic Sakura anatomical petal path with iconic apex cleft notch & tapered stem base
        context.beginPath();
        context.moveTo(0, s * 0.58); // Tapered base attachment point

        // Left curved flank to left apex lobe
        context.bezierCurveTo(
          -s * 0.48, s * 0.28,
          -s * 0.55, -s * 0.22,
          -s * 0.32, -s * 0.58
        );

        // Iconic botanical Sakura apex notch (heart cleft)
        context.quadraticCurveTo(
          0, -s * 0.38,
          s * 0.32, -s * 0.58
        );

        // Right curved flank back to tapered base
        context.bezierCurveTo(
          s * 0.55, -s * 0.22,
          s * 0.48, s * 0.28,
          0, s * 0.58
        );
        context.closePath();

        // Realistic multi-stop linear gradient from rich rose base to delicate translucent rim
        const grad = context.createLinearGradient(0, s * 0.58, 0, -s * 0.58);
        if (currentAtmosphere === 'day') {
          grad.addColorStop(0, `rgba(187, 247, 208, ${this.opacity * 0.95})`);
          grad.addColorStop(0.35, `rgba(134, 239, 172, ${this.opacity * 0.9})`);
          grad.addColorStop(0.85, `rgba(240, 253, 244, ${this.opacity * 0.85})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.75})`);
        } else {
          // Dusk and Dawn authentic Sakura blossom hues
          grad.addColorStop(0, `rgba(225, 29, 72, ${this.opacity * 0.95})`);     // Crimson/rose stem base
          grad.addColorStop(0.28, `rgba(251, 113, 133, ${this.opacity * 0.9})`);  // Vibrant blossom pink
          grad.addColorStop(0.72, `rgba(253, 232, 238, ${this.opacity * 0.88})`); // Soft cream pink
          grad.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.8})`);     // Translucent frosted rim
        }

        context.fillStyle = grad;
        context.shadowColor = 'rgba(225, 29, 72, 0.24)';
        context.shadowBlur = 4;
        context.fill();

        // Subtle 3D curvature highlight along the left lobe
        context.beginPath();
        context.moveTo(0, s * 0.4);
        context.bezierCurveTo(-s * 0.24, s * 0.1, -s * 0.26, -s * 0.2, -s * 0.14, -s * 0.45);
        context.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.42})`;
        context.lineWidth = 0.75;
        context.stroke();

        // Delicate central petal vein
        context.beginPath();
        context.moveTo(0, s * 0.5);
        context.quadraticCurveTo(s * 0.03, 0, 0, -s * 0.28);
        context.strokeStyle = `rgba(244, 114, 182, ${this.opacity * 0.35})`;
        context.lineWidth = 0.6;
        context.stroke();

        context.restore();
      }
    }

    // Hotaru Firefly (Midnight / Tsukiyo)
    class FireflyParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        const w = canvas.width;
        const h = canvas.height;
        this.x = Math.random() * w;
        this.y = init ? Math.random() * h : h + 20;
        this.radius = 1.8 + Math.random() * 2.2;
        this.speedY = -(0.4 + Math.random() * 0.8);
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = 0.04 + Math.random() * 0.03;
        this.glowColor = Math.random() > 0.35 ? '#a3e635' : '#38bdf8';
      }

      update() {
        this.phase += this.phaseSpeed;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.phase * 0.8) * 0.7 + windBreezeX;

        if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
          this.reset(false);
        }
      }

      draw(context) {
        const pulse = (Math.sin(this.phase) + 1) * 0.5;
        const alpha = 0.25 + pulse * 0.7;

        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(254, 252, 232, ${alpha})`;
        context.shadowColor = this.glowColor;
        context.shadowBlur = 10 + pulse * 14;
        context.fill();
        context.restore();
      }
    }

    function initParticles() {
      resizeCanvas();
      const count = window.innerWidth < 768 ? 16 : 36;
      particles = [];

      for (let i = 0; i < count; i++) {
        if (currentAtmosphere === 'midnight') {
          particles.push(new FireflyParticle());
        } else {
          particles.push(new SakuraPetal());
        }
      }
    }

    function renderParticles() {
      if (!isTabVisible || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      windBreezeX *= 0.96;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animFrameId = requestAnimationFrame(renderParticles);
    }

    let lastMouseX = null;
    window.addEventListener('pointermove', (e) => {
      if (lastMouseX !== null) {
        const delta = e.clientX - lastMouseX;
        windBreezeX += Math.max(-1.5, Math.min(1.5, delta * 0.04));
      }
      lastMouseX = e.clientX;
    }, { passive: true });

    window.addEventListener('zen:themechange', (e) => {
      const newTheme = e.detail?.theme || 'dusk';
      if (newTheme !== currentAtmosphere) {
        currentAtmosphere = newTheme;
        initParticles();
      }
    });

    document.addEventListener('visibilitychange', () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(renderParticles);
      }
    });

    window.addEventListener('resize', resizeCanvas, { passive: true });

    initParticles();
    animFrameId = requestAnimationFrame(renderParticles);
  }

  // ---------------------------------------------------------------------------
  // 6. Interactive Skills Matrix Tabs (Category Filter)
  // ---------------------------------------------------------------------------
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (skillTabs.length > 0 && skillCards.length > 0) {
    skillTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        skillTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-skill-filter') || 'all';

        skillCards.forEach((card) => {
          const cat = card.getAttribute('data-skill-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });

        if (window.ZenAudio) window.ZenAudio.playChime();
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 7. Floating Navigation ScrollSpy & Active Link Highlighting
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
  // 8. Mobile Navigation Drawer
  // ---------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinksList = document.querySelector('.nav-links');

  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinksList.classList.toggle('nav-open');
    });

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
  // 9. Back to Top Button
  // ---------------------------------------------------------------------------
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btnBackToTop.classList.add('visible');
      } else {
        btnBackToTop.classList.remove('visible');
      }
    }, { passive: true });

    btnBackToTop.addEventListener('click', (e) => {
      e.preventDefault();
      triggerButtonPress(btnBackToTop);
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 10. Copy Email Address Helper
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
          if (window.ZenAudio) window.ZenAudio.playChime(3);
          setTimeout(() => {
            btnCopyEmail.textContent = originalText;
          }, 2000);
        });
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 11. Contact Form Submission (Client-Side Feedback + mailto Fallback)
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('contact-form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) triggerButtonPress(submitBtn);

      const nameVal = document.getElementById('form-name')?.value || '';
      const emailVal = document.getElementById('form-email')?.value || '';
      const subjectVal = document.getElementById('form-subject')?.value || 'Portfolio Inquiry';
      const msgVal = document.getElementById('form-message')?.value || '';

      const mailtoLink = `mailto:suryapratapsinghrathore741@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(`From: ${nameVal} (${emailVal})\n\n${msgVal}`)}`;

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong>Message Prepared! 🌸</strong><br>
        Thank you, <strong>${escapeHtml(nameVal)}</strong>. Your message is ready.<br>
        <div style="margin-top:10px;">
          <a href="${mailtoLink}" class="btn-bamboo btn-bamboo-primary" style="display:inline-flex; padding:6px 14px; font-size:0.85rem;">
            <span>Send Directly via Email Client ➔</span>
          </a>
        </div>
      `;

      contactForm.reset();

      setTimeout(() => {
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---------------------------------------------------------------------------
  // 12. Parallax for Garden Scenery Layers (Scroll)
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

  // Initialize ZenAudio
  if (window.ZenAudio) {
    window.ZenAudio.init();
  }

})();
