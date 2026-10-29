/**
 * Surya Pratap Singh Rathore — Personal Portfolio
 * Procedural Web Audio Engine (Zen Soundscape)
 * Synthesizes traditional Japanese garden acoustic elements in real-time
 * Zero external audio files required — 100% offline, zero latency, ultra-lightweight.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isSoundEnabled = false;
  let ambientGain = null;
  let ambientNoiseNode = null;
  let cricketTimer = null;
  let chimeInterval = null;

  // Japanese Hirajoshi / Insen pentatonic scale frequencies (Hz) for authentic wind chimes
  // Pentatonic notes: C5 (523.25), D5 (587.33), Eb5 (622.25), G5 (783.99), Ab5 (830.61), C6 (1046.50), D6 (1174.66)
  const CHIME_PITCHES = [523.25, 587.33, 622.25, 783.99, 830.61, 1046.50, 1174.66, 1244.50];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  /**
   * Procedural Japanese Wind Chime (Fūrin 風鈴)
   * High-resonance metallic bell tone with natural crystal harmonics
   */
  function playChime(pitchIndex) {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const freq = pitchIndex !== undefined && CHIME_PITCHES[pitchIndex]
      ? CHIME_PITCHES[pitchIndex]
      : CHIME_PITCHES[Math.floor(Math.random() * CHIME_PITCHES.length)];

    const now = ctx.currentTime;

    // Fundamental oscillator (pure glass chime tone)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Overtone with slight detune for crystalline bell shimmer
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, now);
    filter.Q.setValueAtTime(4, now);

    // Envelope: instant strike, shimmering decay
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.008);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.85);
    osc2.stop(now + 1.85);
  }

  /**
   * Procedural Katana Blade Slash (Iaijutsu 居合術)
   * Dynamic filtered noise sweep combined with a high-pitched metallic blade ring
   */
  function playSlash() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.22; // 220ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    // Generate white noise with random variation
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Filter creates the high-speed air slicing whoosh
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(2.5, now);
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 0.18);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.35, now + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Metallic Blade Ring (High overtone singing)
    const bladeRing = ctx.createOscillator();
    const ringGain = ctx.createGain();
    bladeRing.type = 'triangle';
    bladeRing.frequency.setValueAtTime(3480, now);
    bladeRing.frequency.exponentialRampToValueAtTime(3120, now + 0.28);

    ringGain.gain.setValueAtTime(0.001, now);
    ringGain.gain.linearRampToValueAtTime(0.12, now + 0.015);
    ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    bladeRing.connect(ringGain);
    ringGain.connect(ctx.destination);

    whiteNoise.start(now);
    bladeRing.start(now);
    whiteNoise.stop(now + 0.22);
    bladeRing.stop(now + 0.33);
  }

  /**
   * Procedural Water Drop (Shishi-odoshi 鹿威し fountain)
   * Smooth falling pitch with sweet acoustic plink
   */
  function playWaterDrop() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1150 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.12);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  /**
   * Procedural Bamboo Clack
   * Hollow resonant percussive sound of bamboo hitting garden stone
   */
  function playBambooClack() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.09;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(540, now);
    filter.Q.setValueAtTime(6.0, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.1);
  }

  /**
   * Procedural Temple Singing Bowl / Zen Bell (Rin 鈴)
   * Deep harmonic resonance for moments of transition
   */
  function playZenBell() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const fundamental = 261.63; // Middle C

    [fundamental, fundamental * 2.02, fundamental * 3.44].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const amp = idx === 0 ? 0.22 : 0.08 / idx;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(amp, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 2.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.9);
    });
  }

  /**
   * Procedural Soft Garden Atmosphere (Breeze & Crickets)
   */
  function startAmbience() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    stopAmbience();

    // Gentle warm breeze generator (filtered pink noise)
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.05;
    }

    ambientNoiseNode = ctx.createBufferSource();
    ambientNoiseNode.buffer = buffer;
    ambientNoiseNode.loop = true;

    const breezeFilter = ctx.createBiquadFilter();
    breezeFilter.type = 'lowpass';
    breezeFilter.frequency.setValueAtTime(320, ctx.currentTime);

    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);

    ambientNoiseNode.connect(breezeFilter);
    breezeFilter.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientNoiseNode.start();

    // Periodic gentle garden wind chimes (every 14-25 seconds)
    chimeInterval = setInterval(() => {
      if (isSoundEnabled && Math.random() > 0.35) {
        // Play a pair of gentle chimes
        playChime();
        setTimeout(() => playChime(), 320 + Math.random() * 400);
      }
    }, 16000);
  }

  function stopAmbience() {
    if (chimeInterval) {
      clearInterval(chimeInterval);
      chimeInterval = null;
    }
    if (ambientNoiseNode) {
      try {
        ambientNoiseNode.stop();
        ambientNoiseNode.disconnect();
      } catch (e) {}
      ambientNoiseNode = null;
    }
    if (ambientGain) {
      ambientGain.disconnect();
      ambientGain = null;
    }
  }

  function setSoundEnabled(enable) {
    isSoundEnabled = !!enable;
    try {
      localStorage.setItem('spsr_garden_sound', isSoundEnabled ? 'true' : 'false');
    } catch (e) {}

    if (isSoundEnabled) {
      getAudioContext();
      startAmbience();
      playChime(3); // welcoming chime
    } else {
      stopAmbience();
    }

    updateAudioButtonUI();
  }

  function toggleSound() {
    setSoundEnabled(!isSoundEnabled);
  }

  function updateAudioButtonUI() {
    const btn = document.getElementById('btn-sound-toggle');
    if (!btn) return;

    if (isSoundEnabled) {
      btn.classList.add('sound-active');
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('title', 'Garden Soundscape: ON (Click to mute)');
      const label = btn.querySelector('.sound-toggle-label');
      if (label) label.textContent = 'Audio: On';
    } else {
      btn.classList.remove('sound-active');
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('title', 'Garden Soundscape: OFF (Click to unmute)');
      const label = btn.querySelector('.sound-toggle-label');
      if (label) label.textContent = 'Audio: Off';
    }
  }

  // Auto-init preference on page load
  function initAudio() {
    let saved = false;
    try {
      saved = localStorage.getItem('spsr_garden_sound') === 'true';
    } catch (e) {}

    const btn = document.getElementById('btn-sound-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        toggleSound();
      });
    }

    if (saved) {
      // Browsers require interaction before autoplay audio
      const resumeOnFirstClick = () => {
        setSoundEnabled(true);
        window.removeEventListener('pointerdown', resumeOnFirstClick);
        window.removeEventListener('keydown', resumeOnFirstClick);
      };
      window.addEventListener('pointerdown', resumeOnFirstClick, { once: true });
      window.addEventListener('keydown', resumeOnFirstClick, { once: true });
    }

    updateAudioButtonUI();
  }

  // Export clean API to window.ZenAudio
  window.ZenAudio = {
    init: initAudio,
    toggle: toggleSound,
    setEnabled: setSoundEnabled,
    isEnabled: () => isSoundEnabled,
    playChime,
    playSlash,
    playWaterDrop,
    playBambooClack,
    playZenBell
  };

})();

