/**
 * Surya Pratap Singh Rathore — Personal Portfolio
 * Torii Shell ⛩️ (Interactive Zen CLI Terminal)
 * Accessible via ` (backtick) or the floating Torii terminal trigger
 */

(function () {
  'use strict';

  const COMMANDS = {
    help: 'List all available terminal commands',
    about: 'Display Surya’s background, philosophy, and focus',
    projects: 'View featured software engineering projects & repositories',
    skills: 'Display technical disciplines, languages, and proficiencies',
    theme: 'Change garden atmosphere: `theme [dusk|midnight|dawn|day]`',
    audio: 'Toggle procedural Web Audio soundscape: `audio [on|off]`',
    koi: 'Interact with the pond: `koi feed`',
    quote: 'Reveal traditional Japanese philosophical wisdom',
    contact: 'Get direct communication channels & social links',
    slash: 'Trigger a Katana blade slash strike',
    clear: 'Clear terminal screen',
    exit: 'Close the Torii Shell'
  };

  const QUOTES = [
    {
      kanji: '改善 (Kaizen)',
      romaji: 'Continuous refinement',
      meaning: 'Great architectures are not born in a day; they are sculpted through deliberate, daily micro-improvements.'
    },
    {
      kanji: '初心 (Shoshin)',
      romaji: 'Beginner’s Mind',
      meaning: 'In the beginner’s mind there are many possibilities, but in the expert’s mind there are few. Stay eternally curious.'
    },
    {
      kanji: '一期一会 (Ichigo Ichie)',
      romaji: 'One time, one meeting',
      meaning: 'Every interaction, like each visitor stepping into this garden, is a once-in-a-lifetime encounter to be treasured.'
    },
    {
      kanji: '金継ぎ (Kintsugi)',
      romaji: 'Golden joinery',
      meaning: 'Imperfections and past refactors are not flaws to hide, but the golden seams of hard-won resilience.'
    }
  ];

  let history = [];
  let historyIndex = -1;

  function initTerminal() {
    const modal = document.getElementById('terminal-modal');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const closeBtn = document.getElementById('terminal-close-btn');
    const openBtns = document.querySelectorAll('.btn-open-terminal');

    if (!modal || !input || !output) return;

    function openTerminal() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      if (window.ZenAudio) window.ZenAudio.playChime(4);
      setTimeout(() => input.focus(), 80);
    }

    function closeTerminal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }

    // Toggle via hotkey: ` (Backtick / Tilde)
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' || e.key === '~') {
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea') {
          // Allow normal backtick typing in regular form inputs
          if (e.target.id !== 'terminal-input') return;
        }
        e.preventDefault();
        if (modal.classList.contains('is-open')) {
          closeTerminal();
        } else {
          openTerminal();
        }
      } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeTerminal();
      }
    });

    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openTerminal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeTerminal);
    }

    // Backdrop click to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTerminal();
    });

    function appendOutput(html) {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = html;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }

    function executeCommand(rawCmd) {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;

      history.push(trimmed);
      historyIndex = history.length;

      // Echo command
      appendOutput(`<span class="term-prompt">spsr@garden:~$</span> <span class="term-echo">${escapeHtml(trimmed)}</span>`);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = (parts[1] || '').toLowerCase();

      switch (cmd) {
        case 'help':
        case '?':
          let helpText = '<div class="term-table-header">Torii Shell ⛩️ — Available Commands</div>';
          Object.entries(COMMANDS).forEach(([name, desc]) => {
            helpText += `<div class="term-cmd-row"><span class="term-cmd-name">${name.padEnd(10, ' ')}</span> <span class="term-cmd-desc">${desc}</span></div>`;
          });
          helpText += '<div class="term-tip">Tip: Press [Tab] to auto-complete or [↑/↓] for command history.</div>';
          appendOutput(helpText);
          break;

        case 'about':
          appendOutput(`
            <div class="term-highlight">Surya Pratap Singh Rathore (Age 19)</div>
            <div>Full-Stack Software Engineer & AI Systems Developer</div>
            <div class="term-dim">Specializing in autonomous agents, high-performance web applications, and resilient cloud architecture.</div>
            <div style="margin-top:6px;">📍 Location: India (IST / UTC+5:30)</div>
            <div>🍵 Philosophy: Kaizen (Continuous Mastery) &amp; Shoshin (Beginner's Mind)</div>
          `);
          break;

        case 'projects':
        case 'ls':
          appendOutput(`
            <div class="term-highlight">Featured Garden of Works:</div>
            <div>1. <span class="term-accent">FlowPilot AI</span> — Multi-Agent Autonomous Orchestration Framework (TypeScript/Python)</div>
            <div>2. <span class="term-accent">SiteGuard Pro</span> — Cloud Telemetry &amp; Threat Detection Platform (Go/Docker/Postgres)</div>
            <div>3. <span class="term-accent">Archon Season 2</span> — High-Performance Game Physics &amp; Creative Canvas Engine</div>
            <div>4. <span class="term-accent">Server-Logs Streamer</span> — Real-Time High-Throughput Log Aggregator</div>
            <div class="term-dim">Type <code>exit</code> or scroll to #projects to view full interactive live previews!</div>
          `);
          break;

        case 'skills':
        case 'matrix':
          appendOutput(`
            <div class="term-highlight">Disciplines &amp; Proficiencies:</div>
            <div>▸ Languages:   JavaScript (ESNext), TypeScript, Python, Go, HTML5, CSS3/PostCSS</div>
            <div>▸ Frameworks:  React, Next.js 14, Node.js, FastAPI, Express, Tailwind CSS</div>
            <div>▸ Systems:     Docker, Linux/POSIX, Git &amp; CI/CD Actions, REST, WebSockets, Postgres</div>
            <div>▸ Creative:    Canvas API, Web Audio API, SVG Graphics, UI/UX Systems</div>
          `);
          break;

        case 'theme':
          if (['dusk', 'midnight', 'dawn', 'day'].includes(arg)) {
            if (window.GardenTheme) {
              window.GardenTheme.setTheme(arg);
              appendOutput(`<span class="term-success">Garden atmosphere shifted to: <strong>${arg.toUpperCase()}</strong></span>`);
            } else {
              appendOutput(`Theme module loading...`);
            }
          } else {
            appendOutput(`Usage: <code>theme [dusk | midnight | dawn | day]</code>`);
          }
          break;

        case 'audio':
          if (arg === 'on') {
            if (window.ZenAudio) {
              window.ZenAudio.setEnabled(true);
              appendOutput(`<span class="term-success">Garden Soundscape enabled 🌸 (Procedural Web Audio active)</span>`);
            }
          } else if (arg === 'off') {
            if (window.ZenAudio) {
              window.ZenAudio.setEnabled(false);
              appendOutput(`<span class="term-dim">Garden Soundscape muted.</span>`);
            }
          } else {
            appendOutput(`Usage: <code>audio [on | off]</code>`);
          }
          break;

        case 'koi':
          if (arg === 'feed') {
            if (window.KoiPond) {
              window.KoiPond.feed();
              appendOutput(`<span class="term-success">Food tossed into the reflecting pond! The Nishikigoi are swimming over. 🐟</span>`);
            } else {
              appendOutput(`Reflecting pond is tranquil.`);
            }
          } else {
            appendOutput(`Usage: <code>koi feed</code>`);
          }
          break;

        case 'quote':
        case 'zen':
          const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
          appendOutput(`
            <div class="term-quote-kanji">${q.kanji}</div>
            <div class="term-accent">"${q.romaji}"</div>
            <div class="term-quote-meaning">${q.meaning}</div>
          `);
          if (window.ZenAudio) window.ZenAudio.playZenBell();
          break;

        case 'slash':
          if (window.ZenAudio) window.ZenAudio.playSlash();
          const slashEvent = new CustomEvent('zen:slash');
          window.dispatchEvent(slashEvent);
          appendOutput(`<span class="term-accent">⚔️ SWISH! Razor-sharp Katana strike executed.</span>`);
          break;

        case 'contact':
          appendOutput(`
            <div>✉ Email:   <a href="mailto:suryapratapsinghrathore741@gmail.com" class="term-link">suryapratapsinghrathore741@gmail.com</a></div>
            <div>🐙 GitHub:  <a href="https://github.com/Spsr-dot" target="_blank" rel="noopener" class="term-link">https://github.com/Spsr-dot</a></div>
            <div>📍 Status:  Open to high-impact software engineering roles &amp; collaborations</div>
          `);
          break;

        case 'clear':
        case 'cls':
          output.innerHTML = '';
          break;

        case 'exit':
        case 'quit':
          closeTerminal();
          break;

        default:
          appendOutput(`<span class="term-error">Command not recognized: "${escapeHtml(cmd)}". Type <code>help</code> for available commands.</span>`);
          break;
      }
    }

    // Input Keydown Handling (Enter, Arrow Up/Down, Tab)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = input.value;
        input.value = '';
        executeCommand(value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          input.value = history[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = input.value.trim().toLowerCase();
        if (!current) return;
        const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(current));
        if (matches.length === 1) {
          input.value = matches[0] + ' ';
        } else if (matches.length > 1) {
          appendOutput(`<div class="term-dim">${matches.join('   ')}</div>`);
        }
      }
    });

    // Helper: Escape HTML
    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    // Export terminal trigger
    window.ToriiShell = {
      open: openTerminal,
      close: closeTerminal,
      exec: executeCommand
    };
  }

  window.addEventListener('DOMContentLoaded', initTerminal);

})();

