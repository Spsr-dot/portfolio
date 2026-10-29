/**
 * Surya Pratap Singh Rathore — Personal Portfolio
 * Atmospheric Garden Time-of-Day Engine (Yuugure / Tsukiyo / Akebono / Komorebi)
 * Syncs CSS custom properties, lighting shaders, and seasonal particle behaviors.
 */

(function () {
  'use strict';

  const THEMES = ['dusk', 'midnight', 'dawn', 'day'];
  let currentTheme = 'dusk';

  function applyTheme(themeName, animate = true) {
    if (!THEMES.includes(themeName)) return;

    currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);

    try {
      localStorage.setItem('spsr_garden_theme', themeName);
    } catch (e) {}

    // Update active button indicator in UI
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach((btn) => {
      const targetTheme = btn.getAttribute('data-theme-target');
      if (targetTheme === themeName) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Notify particle and audio engines
    window.dispatchEvent(new CustomEvent('zen:themechange', {
      detail: { theme: themeName }
    }));
  }

  function initTheme() {
    let savedTheme = 'dusk';
    try {
      savedTheme = localStorage.getItem('spsr_garden_theme') || 'dusk';
    } catch (e) {}

    // Hook up buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-theme-target');
        if (target) {
          applyTheme(target);
          if (window.ZenAudio) window.ZenAudio.playChime();
        }
      });
    });

    applyTheme(savedTheme, false);
  }

  // Export API
  window.GardenTheme = {
    init: initTheme,
    setTheme: applyTheme,
    getTheme: () => currentTheme,
    themes: THEMES
  };

  window.addEventListener('DOMContentLoaded', initTheme);

})();
