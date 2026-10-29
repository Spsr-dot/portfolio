/**
 * Surya Pratap Singh Rathore — Personal Portfolio
 * Procedural Reflecting Pond & Swimming Koi Simulation (Nishikigoi 錦鯉)
 * Features natural spine undulation physics, water ripples, interactive feeding, and scattering.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  class WaterRipple {
    constructor(x, y, radius = 5, maxRadius = 80, strength = 0.8) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.maxRadius = maxRadius;
      this.strength = strength;
      this.currentStrength = strength;
      this.speed = 1.6;
    }

    update() {
      this.radius += this.speed;
      this.currentStrength = this.strength * (1 - this.radius / this.maxRadius);
      return this.radius < this.maxRadius;
    }

    draw(ctx) {
      if (this.currentStrength <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 235, 180, ${this.currentStrength * 0.35})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Outer secondary faint ripple
      if (this.radius > 15) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.72, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 220, 255, ${this.currentStrength * 0.18})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  class FoodPellet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 4;
      this.life = 1.0;
      this.decay = 0.003;
      this.isEaten = false;
    }

    update() {
      this.life -= this.decay;
      return this.life > 0 && !this.isEaten;
    }

    draw(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(217, 119, 6, ${this.life * 0.9})`;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }
  }

  class KoiFish {
    constructor(canvas, type = 'kohaku') {
      this.canvas = canvas;
      this.type = type; // 'kohaku', 'yamabuki', 'showa', 'asagi'

      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.angle = Math.random() * Math.PI * 2;
      this.targetAngle = this.angle;
      this.targetX = this.x;
      this.targetY = this.y;

      this.speed = 1.2 + Math.random() * 0.6;
      this.baseSpeed = this.speed;
      this.turnSpeed = 0.045;

      // Fish anatomy
      this.length = 50 + Math.random() * 18;
      this.numSegments = 10;
      this.segmentDistance = this.length / this.numSegments;

      // Spine nodes for realistic sinuous swimming
      this.spine = [];
      for (let i = 0; i < this.numSegments; i++) {
        this.spine.push({
          x: this.x - Math.cos(this.angle) * (i * this.segmentDistance),
          y: this.y - Math.sin(this.angle) * (i * this.segmentDistance)
        });
      }

      this.wigglePhase = Math.random() * Math.PI * 2;
      this.wiggleSpeed = 0.12;

      this.colors = this.getColorScheme(type);
      this.changeTargetTimer = 0;
    }

    getColorScheme(type) {
      switch (type) {
        case 'yamabuki':
          return {
            body: '#facc15',
            belly: '#fef08a',
            spots: '#eab308',
            fins: 'rgba(254, 240, 138, 0.65)',
            glow: 'rgba(250, 204, 21, 0.45)'
          };
        case 'showa':
          return {
            body: '#18181b',
            belly: '#f4f4f5',
            spots: '#ef4444',
            fins: 'rgba(244, 244, 245, 0.55)',
            glow: 'rgba(239, 68, 68, 0.35)'
          };
        case 'asagi':
          return {
            body: '#93c5fd',
            belly: '#f8fafc',
            spots: '#f97316',
            fins: 'rgba(249, 115, 22, 0.5)',
            glow: 'rgba(147, 197, 253, 0.35)'
          };
        case 'kohaku':
        default:
          return {
            body: '#fdfbf7',
            belly: '#ffffff',
            spots: '#e11d48',
            fins: 'rgba(255, 255, 255, 0.6)',
            glow: 'rgba(225, 29, 72, 0.4)'
          };
      }
    }

    pickNewTarget() {
      const padding = 60;
      this.targetX = padding + Math.random() * (this.canvas.width - padding * 2);
      this.targetY = padding + Math.random() * (this.canvas.height - padding * 2);
      this.changeTargetTimer = 180 + Math.random() * 240;
    }

    update(foodPellets = [], mousePos = null) {
      // 1. Check for nearby food pellets
      let nearestFood = null;
      let minFoodDist = 350;

      for (let i = 0; i < foodPellets.length; i++) {
        const food = foodPellets[i];
        if (food.isEaten) continue;
        const dx = food.x - this.x;
        const dy = food.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < minFoodDist) {
          minFoodDist = dist;
          nearestFood = food;
        }
      }

      if (nearestFood) {
        // Swim toward food with excited burst
        this.targetX = nearestFood.x;
        this.targetY = nearestFood.y;
        this.speed = this.baseSpeed * 1.6;
        this.wiggleSpeed = 0.22;

        if (minFoodDist < 16) {
          nearestFood.isEaten = true;
          if (window.ZenAudio) window.ZenAudio.playWaterDrop();
          this.pickNewTarget();
        }
      } else {
        this.speed = this.baseSpeed;
        this.wiggleSpeed = 0.12;

        // Mouse avoidance (scared when cursor gets very close)
        if (mousePos && mousePos.x !== null) {
          const mdx = this.x - mousePos.x;
          const mdy = this.y - mousePos.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 90) {
            // Scatter away!
            this.targetX = this.x + (mdx / (mdist || 1)) * 140;
            this.targetY = this.y + (mdy / (mdist || 1)) * 140;
            this.speed = this.baseSpeed * 2.2;
            this.wiggleSpeed = 0.28;
          }
        }

        this.changeTargetTimer--;
        if (this.changeTargetTimer <= 0) {
          this.pickNewTarget();
        }
      }

      // Smooth heading angle interpolation
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      this.targetAngle = Math.atan2(dy, dx);

      // Shortest angle wrap around PI
      let diff = this.targetAngle - this.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.angle += diff * this.turnSpeed;

      // Forward step
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Soft boundary bounce
      const margin = 30;
      if (this.x < margin) this.targetX = this.canvas.width * 0.5;
      if (this.x > this.canvas.width - margin) this.targetX = this.canvas.width * 0.5;
      if (this.y < margin) this.targetY = this.canvas.height * 0.5;
      if (this.y > this.canvas.height - margin) this.targetY = this.canvas.height * 0.5;

      // Sinuous spine propagation (Inverse Kinematics / Follow the leader)
      this.wigglePhase += this.wiggleSpeed;
      this.spine[0].x = this.x;
      this.spine[0].y = this.y;

      for (let i = 1; i < this.numSegments; i++) {
        const prev = this.spine[i - 1];
        const curr = this.spine[i];

        const segDx = curr.x - prev.x;
        const segDy = curr.y - prev.y;
        const segAngle = Math.atan2(segDy, segDx);

        // Natural sinusoidal wiggle gets amplified toward the tail
        const wiggleOffset = Math.sin(this.wigglePhase - i * 0.45) * (i * 0.65);
        const perpAngle = segAngle + Math.PI / 2;

        curr.x = prev.x + Math.cos(segAngle) * this.segmentDistance + Math.cos(perpAngle) * wiggleOffset * 0.15;
        curr.y = prev.y + Math.sin(segAngle) * this.segmentDistance + Math.sin(perpAngle) * wiggleOffset * 0.15;
      }
    }

    draw(ctx) {
      ctx.save();

      // Shadow in pond depth
      ctx.shadowColor = 'rgba(4, 6, 12, 0.45)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 8;
      ctx.shadowOffsetY = 14;

      // Body widths along spine (tapered head, broad shoulders, slim tail)
      const widths = [
        this.length * 0.16, // head
        this.length * 0.22, // shoulders
        this.length * 0.24, // main torso
        this.length * 0.22,
        this.length * 0.19,
        this.length * 0.15,
        this.length * 0.11,
        this.length * 0.08,
        this.length * 0.05,
        this.length * 0.03  // caudal peduncle
      ];

      // Draw Pectoral Fins (attached around segment 2)
      if (this.spine[2] && this.spine[1]) {
        const finAngle = Math.atan2(this.spine[1].y - this.spine[3].y, this.spine[1].x - this.spine[3].x);
        const finWiggle = Math.sin(this.wigglePhase) * 0.2;

        ctx.fillStyle = this.colors.fins;

        // Left Fin
        ctx.save();
        ctx.translate(this.spine[2].x, this.spine[2].y);
        ctx.rotate(finAngle + Math.PI / 2.2 + finWiggle);
        ctx.beginPath();
        ctx.ellipse(0, this.length * 0.2, this.length * 0.09, this.length * 0.22, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Right Fin
        ctx.save();
        ctx.translate(this.spine[2].x, this.spine[2].y);
        ctx.rotate(finAngle - Math.PI / 2.2 - finWiggle);
        ctx.beginPath();
        ctx.ellipse(0, -this.length * 0.2, this.length * 0.09, this.length * 0.22, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Tail Fin (Caudal Fin attached to last segment)
      const last = this.spine[this.numSegments - 1];
      const secondLast = this.spine[this.numSegments - 2];
      const tailAngle = Math.atan2(last.y - secondLast.y, last.x - secondLast.x);

      ctx.save();
      ctx.translate(last.x, last.y);
      ctx.rotate(tailAngle);
      ctx.fillStyle = this.colors.fins;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        this.length * 0.3, -this.length * 0.28,
        this.length * 0.45, -this.length * 0.15,
        this.length * 0.38, 0
      );
      ctx.bezierCurveTo(
        this.length * 0.45, this.length * 0.15,
        this.length * 0.3, this.length * 0.28,
        0, 0
      );
      ctx.fill();
      ctx.restore();

      // Construct Smooth Body Hull around spine nodes
      const leftPoints = [];
      const rightPoints = [];

      for (let i = 0; i < this.numSegments; i++) {
        let pAngle = 0;
        if (i === 0) {
          pAngle = Math.atan2(this.spine[0].y - this.spine[1].y, this.spine[0].x - this.spine[1].x);
        } else if (i === this.numSegments - 1) {
          pAngle = Math.atan2(this.spine[i - 1].y - this.spine[i].y, this.spine[i - 1].x - this.spine[i].x);
        } else {
          pAngle = Math.atan2(this.spine[i - 1].y - this.spine[i + 1].y, this.spine[i - 1].x - this.spine[i + 1].x);
        }

        const perp = pAngle + Math.PI / 2;
        const w = widths[i] || 4;

        leftPoints.push({
          x: this.spine[i].x + Math.cos(perp) * w,
          y: this.spine[i].y + Math.sin(perp) * w
        });
        rightPoints.push({
          x: this.spine[i].x - Math.cos(perp) * w,
          y: this.spine[i].y - Math.sin(perp) * w
        });
      }

      // Fill Main Body Path
      ctx.beginPath();
      // Round snout
      ctx.arc(this.spine[0].x, this.spine[0].y, widths[0], this.angle - Math.PI / 2, this.angle + Math.PI / 2, false);

      // Trace left flank down to tail
      for (let i = 0; i < leftPoints.length; i++) {
        ctx.lineTo(leftPoints[i].x, leftPoints[i].y);
      }

      // Around caudal base
      ctx.lineTo(last.x, last.y);

      // Trace right flank back up to head
      for (let i = rightPoints.length - 1; i >= 0; i--) {
        ctx.lineTo(rightPoints[i].x, rightPoints[i].y);
      }
      ctx.closePath();

      ctx.fillStyle = this.colors.body;
      ctx.fill();

      // Characteristic Nishikigoi Pattern Patches (Hi / Beni markings)
      if (this.type !== 'yamabuki') {
        ctx.fillStyle = this.colors.spots;

        // Shoulder patch
        if (this.spine[1] && this.spine[3]) {
          ctx.beginPath();
          ctx.ellipse(
            this.spine[2].x,
            this.spine[2].y,
            widths[2] * 0.75,
            widths[2] * 0.55,
            this.angle,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Mid-back patch
        if (this.spine[4] && this.spine[6]) {
          ctx.beginPath();
          ctx.ellipse(
            this.spine[5].x,
            this.spine[5].y,
            widths[5] * 0.8,
            widths[5] * 0.45,
            this.angle + 0.3,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Tail crest patch
        if (this.spine[7]) {
          ctx.beginPath();
          ctx.arc(this.spine[7].x, this.spine[7].y, widths[7] * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Gentle Dorsal Fin line along spine
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(this.spine[1].x, this.spine[1].y);
      for (let i = 2; i < 7; i++) {
        ctx.lineTo(this.spine[i].x, this.spine[i].y);
      }
      ctx.stroke();

      // Subtle Eyes
      const headPerp = this.angle + Math.PI / 2;
      const eyeOffset = widths[0] * 0.7;
      const eyeX1 = this.spine[0].x + Math.cos(headPerp) * eyeOffset;
      const eyeY1 = this.spine[0].y + Math.sin(headPerp) * eyeOffset;
      const eyeX2 = this.spine[0].x - Math.cos(headPerp) * eyeOffset;
      const eyeY2 = this.spine[0].y - Math.sin(headPerp) * eyeOffset;

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(eyeX1, eyeY1, 1.8, 0, Math.PI * 2);
      ctx.arc(eyeX2, eyeY2, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Master Koi Pond Controller
  function initKoiPond() {
    const container = document.getElementById('koi-pond-container');
    const canvas = document.getElementById('koi-pond-canvas');
    if (!container || !canvas || prefersReducedMotion.matches) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animId = null;
    let isVisible = true;

    const ripples = [];
    const foodPellets = [];
    const fishList = [];
    const mousePos = { x: null, y: null };

    function resize() {
      const rect = container.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || 220;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Spawn classic Nishikigoi family
    const types = ['kohaku', 'yamabuki', 'showa', 'kohaku', 'asagi'];
    types.forEach((t) => {
      fishList.push(new KoiFish(canvas, t));
    });

    // Feeding & Ripple Interactions
    function addRippleAt(x, y, maxR = 85, strength = 0.8) {
      ripples.push(new WaterRipple(x, y, 4, maxR, strength));
      if (ripples.length > 25) ripples.shift();
    }

    function feedAt(x, y) {
      foodPellets.push(new FoodPellet(x, y));
      addRippleAt(x, y, 55, 0.9);
      if (window.ZenAudio) {
        window.ZenAudio.playWaterDrop();
      }
    }

    container.addEventListener('pointerdown', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      feedAt(x, y);
    });

    container.addEventListener('pointermove', (e) => {
      const rect = container.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
      if (Math.random() > 0.88) {
        addRippleAt(mousePos.x, mousePos.y, 40, 0.4);
      }
    });

    container.addEventListener('pointerleave', () => {
      mousePos.x = null;
      mousePos.y = null;
    });

    // Animation Loop
    function render() {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update water ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const alive = ripples[i].update();
        if (alive) {
          ripples[i].draw(ctx);
        } else {
          ripples.splice(i, 1);
        }
      }

      // 2. Draw and update food pellets
      for (let i = foodPellets.length - 1; i >= 0; i--) {
        const alive = foodPellets[i].update();
        if (alive) {
          foodPellets[i].draw(ctx);
        } else {
          foodPellets.splice(i, 1);
        }
      }

      // 3. Update and draw Koi fish
      for (let i = 0; i < fishList.length; i++) {
        fishList[i].update(foodPellets, mousePos);
        fishList[i].draw(ctx);
      }

      animId = requestAnimationFrame(render);
    }

    // Visibility Observer: Pause when off-screen to conserve CPU/Battery
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting && !document.hidden;
          if (isVisible) {
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(render);
          }
        });
      }, { threshold: 0.05 });
      observer.observe(container);
    }

    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    });

    animId = requestAnimationFrame(render);

    // Export feed helper
    window.KoiPond = {
      feed: () => {
        feedAt(width * 0.4 + Math.random() * width * 0.2, height * 0.4 + Math.random() * height * 0.2);
      }
    };
  }

  window.addEventListener('DOMContentLoaded', initKoiPond);

})();

