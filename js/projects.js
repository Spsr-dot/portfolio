/**
 * Surya Pratap Singh Rathore — Personal Portfolio
 * Projects Showcase Engine (Filterable Gallery & Scroll of Project Secrets Modal)
 */

(function () {
  'use strict';

  const PROJECTS_DATA = [
    {
      id: 'flowpilot-ai',
      title: 'FlowPilot AI — Autonomous Multi-Agent Orchestrator',
      category: 'ai',
      categoryLabel: 'AI & Autonomous Systems',
      image: 'assets/images/project-1.svg',
      tags: ['TypeScript', 'Next.js 14', 'Python', 'LangChain', 'OpenAI API', 'Docker'],
      summary: 'A distributed multi-agent system designed for autonomous programming workflows, self-healing code execution, and conversational tool routing.',
      description: 'FlowPilot AI orchestrates specialized autonomous agents capable of breaking down complex software engineering objectives into verifiable micro-tasks. Features dynamic AST analysis, automated git branching, sandboxed shell execution, and vector-backed conversational memory.',
      architecture: 'Distributed message bus architecture with JSON-RPC tool contracts. Employs prompt distillation pipelines and stateful token-budget controllers to achieve high precision and cost efficiency.',
      metrics: [
        { label: 'Workflow Success Rate', value: '88.4%' },
        { label: 'Dispatch Latency', value: '<380ms' },
        { label: 'Tool Registry', value: '45+ Tools' }
      ],
      githubUrl: 'https://github.com/Spsr-dot/flowpilot',
      demoUrl: 'https://github.com/Spsr-dot/flowpilot'
    },
    {
      id: 'siteguard-pro',
      title: 'SiteGuard Pro — Cloud Infrastructure & Threat Monitor',
      category: 'cloud',
      categoryLabel: 'Cloud & Infrastructure',
      image: 'assets/images/project-2.svg',
      tags: ['Go', 'Docker', 'PostgreSQL', 'WebSockets', 'Render Cloud', 'Linux'],
      summary: 'Real-time cloud observability and threat mitigation platform offering sub-second telemetry ingestion and automated anomaly isolation.',
      description: 'Built for mission-critical cloud deployments, SiteGuard Pro continuously monitors incoming HTTP/TCP requests, parses distributed system health metrics, and immediately flags anomalous spike patterns using statistical rate-deviation algorithms.',
      architecture: 'High-concurrency Go worker pool handling streaming WebSocket connections. Backed by PostgreSQL for immutable audit logging and Redis for ephemeral rate-limiting counters.',
      metrics: [
        { label: 'Ingestion Throughput', value: '100k+ req/s' },
        { label: 'Alert Dispatch', value: '<15ms' },
        { label: 'Uptime SLA', value: '99.98%' }
      ],
      githubUrl: 'https://github.com/Spsr-dot/siteguard',
      demoUrl: 'https://github.com/Spsr-dot/siteguard'
    },
    {
      id: 'archon-season-2',
      title: 'Archon Season 2 — High-Performance Game Physics & Creative Canvas',
      category: 'creative',
      categoryLabel: 'Creative Tech & Systems',
      image: 'assets/images/project-3.svg',
      tags: ['JavaScript (ES6+)', 'Canvas 2D', 'Web Audio API', 'Physics Solvers', 'GLSL'],
      summary: 'An interactive browser physics and audio-visual playground engineered with custom Verlet particle physics and spatial grid collision detection.',
      description: 'Archon Season 2 pushes the boundaries of hardware-accelerated web experiences. Features custom numerical integration solvers, fluid dynamics approximations, responsive multi-touch controls, and zero external framework bloat.',
      architecture: 'Custom rendering loop running at locked 60 FPS with requestAnimationFrame. Spatial hash-grid algorithm optimizes broad-phase collision queries from O(N²) to O(N).',
      metrics: [
        { label: 'Frame Rate', value: 'Locked 60 FPS' },
        { label: 'Particle Count', value: '2,500+ Active' },
        { label: 'Bundle Footprint', value: '0kB External' }
      ],
      githubUrl: 'https://github.com/Spsr-dot/Archon-season-2',
      demoUrl: 'https://github.com/Spsr-dot/Archon-season-2'
    },
    {
      id: 'server-logs-streamer',
      title: 'Server-Logs Streamer — Real-Time High-Throughput Log Aggregator',
      category: 'cloud',
      categoryLabel: 'Cloud & Systems',
      image: 'assets/images/project-4.svg',
      tags: ['Python', 'FastAPI', 'TailwindCSS', 'Chart.js', 'Linux', 'POSIX'],
      summary: 'A developer-first log monitoring dashboard that streams, parses, and surfaces actionable telemetry from distributed microservices in real-time.',
      description: 'Eliminates the complexity of heavy log aggregation stacks. Server-Logs Streamer provides instant pattern search, regex-based log parsing, multi-tier error thresholds, and graphical latency distribution timelines.',
      architecture: 'Asynchronous FastAPI backend streaming structured Server-Sent Events (SSE) to a reactive UI. In-memory circular ring buffers deliver instantaneous text searches across massive log streams.',
      metrics: [
        { label: 'Query Response', value: '<25ms' },
        { label: 'Memory Footprint', value: '<45MB' },
        { label: 'Log Parsing', value: 'Multi-Format' }
      ],
      githubUrl: 'https://github.com/Spsr-dot/Server-logs-...',
      demoUrl: 'https://github.com/Spsr-dot/Server-logs-...'
    }
  ];

  function initProjects() {
    const grid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const searchInput = document.getElementById('project-search-input');
    const modal = document.getElementById('project-detail-modal');

    if (!grid) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function renderCards() {
      const filtered = PROJECTS_DATA.filter((item) => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = !searchQuery || 
          item.title.toLowerCase().includes(searchQuery) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery)) ||
          item.summary.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="projects-empty-state">
            <span class="empty-icon" aria-hidden="true">🍃</span>
            <h3>No matching projects found</h3>
            <p>Try adjusting your search terms or filter category to discover other works in the garden.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map((proj) => `
        <article class="project-card" data-project-id="${proj.id}">
          <div class="project-image-box">
            <img 
              src="${proj.image}" 
              alt="${proj.title}" 
              class="project-img"
              loading="lazy"
              width="800"
              height="500"
            >
            <span class="project-badge-tag">${proj.categoryLabel}</span>
          </div>
          <div class="project-content">
            <h3 class="project-title">${proj.title}</h3>
            
            <div class="project-tags">
              ${proj.tags.slice(0, 4).map((t) => `<span class="project-tag-pill">${t}</span>`).join('')}
              ${proj.tags.length > 4 ? `<span class="project-tag-pill more">+${proj.tags.length - 4}</span>` : ''}
            </div>

            <p class="project-desc">${proj.summary}</p>

            <div class="project-actions">
              <button type="button" class="btn-bamboo btn-bamboo-primary btn-view-project-details" data-id="${proj.id}">
                <span>Project Secrets</span>
                <span class="btn-kanji" aria-hidden="true">秘伝</span>
              </button>
              <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-bamboo btn-bamboo-secondary">
                <span>GitHub Repo</span>
                <span class="btn-kanji" aria-hidden="true">綱</span>
              </a>
            </div>
          </div>
        </article>
      `).join('');

      // Bind detail button clicks
      grid.querySelectorAll('.btn-view-project-details').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pid = btn.getAttribute('data-id');
          openProjectModal(pid);
        });
      });

      // Bind card body click to open details as well
      grid.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('a') || e.target.closest('button')) return;
          const pid = card.getAttribute('data-project-id');
          openProjectModal(pid);
        });
      });
    }

    // Filter Buttons
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter') || 'all';
        if (window.ZenAudio) window.ZenAudio.playChime();
        renderCards();
      });
    });

    // Search Input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderCards();
      });
    }

    // Modal Controller
    function openProjectModal(id) {
      const proj = PROJECTS_DATA.find((p) => p.id === id);
      if (!proj || !modal) return;

      const modalTitle = modal.querySelector('#modal-project-title');
      const modalCategory = modal.querySelector('#modal-project-category');
      const modalImage = modal.querySelector('#modal-project-image');
      const modalTags = modal.querySelector('#modal-project-tags');
      const modalDesc = modal.querySelector('#modal-project-desc');
      const modalArch = modal.querySelector('#modal-project-architecture');
      const modalMetrics = modal.querySelector('#modal-project-metrics');
      const modalLiveBtn = modal.querySelector('#modal-btn-live');
      const modalCodeBtn = modal.querySelector('#modal-btn-code');

      if (modalTitle) modalTitle.textContent = proj.title;
      if (modalCategory) modalCategory.textContent = proj.categoryLabel;
      if (modalImage) {
        modalImage.src = proj.image;
        modalImage.alt = proj.title;
      }
      if (modalTags) {
        modalTags.innerHTML = proj.tags.map((t) => `<span class="project-tag-pill">${t}</span>`).join('');
      }
      if (modalDesc) modalDesc.textContent = proj.description;
      if (modalArch) modalArch.textContent = proj.architecture;

      if (modalMetrics) {
        modalMetrics.innerHTML = proj.metrics.map((m) => `
          <div class="metric-card">
            <span class="metric-val">${m.value}</span>
            <span class="metric-lbl">${m.label}</span>
          </div>
        `).join('');
      }

      if (modalLiveBtn) modalLiveBtn.href = proj.demoUrl;
      if (modalCodeBtn) modalCodeBtn.href = proj.githubUrl;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (window.ZenAudio) window.ZenAudio.playChime(2);
    }

    function closeProjectModal() {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (modal) {
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
          closeProjectModal();
        }
      });
    }

    // Initial render
    renderCards();
  }

  window.addEventListener('DOMContentLoaded', initProjects);

})();

