# Surya Pratap Singh Rathore — Personal Portfolio

An ultra-advanced, interactive, cinematic personal portfolio website inspired by a tranquil **Japanese Garden (Zen & Bushido Aesthetic)**. Crafted with semantic HTML5, modern modular CSS with design tokens, and zero-dependency vanilla JavaScript.

---

## 🌸 Flagship Features & Art Direction

### 1. Procedural Web Audio Soundscape (Zen Audio Engine)
- **Zero Audio Files Required**: 100% procedurally synthesized in real-time using the **Web Audio API**. Zero latency, 0kB external file weight, works completely offline.
- **Procedural Elements**:
  - **Japanese Wind Chime (*Fūrin* 風鈴)**: High pentatonic Hirajoshi/Insen bell harmonics with crystalline resonance.
  - **Katana Slash (*Iaijutsu* 居合術)**: Filtered noise frequency sweep with metallic blade ring.
  - **Bamboo Water Fountain (*Shishi-odoshi* 鹿威し)**: Falling sine water plinks and hollow bamboo strikes on stone.
  - **Temple Singing Bowl (*Rin* 鈴)**: Deep harmonic resonance celebrating transitions.
  - **Ambient Garden Breeze**: Filtered binaural pink noise with intermittent natural chimes.
- Accessible **Sound Controller** in the navbar with animated equalizer bars.

### 2. Atmospheric Time-of-Day & Weather Engine
Live atmosphere switcher with four distinct garden moods:
- **Dusk (*Yuugure* 夕暮れ)**: Warm shoji lantern glow, crimson twilight sky, crescent moon, falling cherry blossom petals.
- **Midnight (*Tsukiyo* 月夜)**: Obsidian starry night, glowing **Hotaru (蛍)** fireflies rising from the pond with bioluminescent pulsation, cool silver moonlight.
- **Dawn (*Akebono* 曙)**: Lavender-rose sunrise, golden morning mist, peach horizon glow.
- **Day (*Komorebi* 木漏れ日)**: Crisp sunlight filtering through bamboo leaves, turquoise reflections, fresh green petals.

### 3. Interactive Reflecting Koi Pond (*Nishikigoi* 錦鯉)
- Procedural Japanese Koi fish swimming in an interactive reflecting pond canvas.
- Sinuous multi-segment spine undulation physics with pectoral and caudal fin animations.
- **Interactive Feeding & Waves**: Click or tap anywhere in the pond to drop food pellets; nearby Koi immediately detect and swim toward the food with ripple physics.
- Automatic viewport observer to pause rendering when off-screen to preserve CPU and battery.

### 4. Torii Shell ⛩️ (Interactive Developer CLI)
- Floating retro-zen developer terminal accessible via hotkey `` ` `` (backtick/tilde) or the navbar button.
- Built-in commands:
  - `help`: list available terminal commands
  - `about`: Surya's background, education, and focus
  - `projects`: summary list of flagship software systems
  - `skills`: categorized technical proficiencies
  - `theme [dusk|midnight|dawn|day]`: live shift garden atmosphere
  - `audio [on|off]`: toggle soundscape
  - `koi feed`: toss food into the pond
  - `quote`: reveal Japanese idioms (*Kaizen*, *Shoshin*, *Ichigo Ichie*, *Kintsugi*)
  - `slash`: execute a katana strike
  - `contact`: display direct communication channels
  - `clear`: clear terminal screen

### 5. Filterable Projects & "Scroll of Project Secrets" Modal
- Real-time instant search bar and category filter pills (`All`, `AI & Autonomous Systems`, `Cloud & Infrastructure`, `Creative Tech & Systems`).
- Four flagship projects tailored to Surya's systems engineering focus:
  1. **FlowPilot AI**: Autonomous Multi-Agent Orchestrator
  2. **SiteGuard Pro**: Cloud Infrastructure & Threat Monitor
  3. **Archon Season 2**: Game Physics & Creative Canvas Engine
  4. **Server-Logs Streamer**: Real-Time High-Throughput Log Aggregator
- **Scroll of Project Secrets Modal**: Deep technical breakdown covering system overview, architectural rationale, and performance metric benchmarks.

### 6. Interactive Dojo Skills Matrix
- Category tabs filtering by Languages, Frontend, Cloud/DevOps, and AI Systems.
- Animated proficiency progress bars, technology badges, and hover tooltips.

### 7. Authentic Katana Blade Cursor & Tactile Controls
- Custom SVG katana blade pointer with sparks and trailing gleam on pointer down.
- Bamboo button slash animations with diagonal split effect.

---

## 📁 Architecture & File Structure

```text
├── index.html                           # Semantic markup, modals & accessible structure
├── css/
│   └── style.css                        # Complete tokens, atmospheric themes & responsive styles
├── js/
│   ├── audio.js                         # Procedural Web Audio synthesis engine (chimes, slash, water)
│   ├── theme.js                         # Time-of-day atmospheric controller (Dusk, Night, Dawn, Day)
│   ├── koi.js                           # Procedural swimming Nishikigoi fish & ripple physics
│   ├── projects.js                      # Searchable projects gallery & detail modal controller
│   ├── terminal.js                      # Torii Shell ⛩️ interactive developer CLI
│   └── main.js                          # Particle canvas, gate intro, katana effects & scrollspy
├── assets/
│   ├── icons/
│   │   └── katana-cursor.svg            # Custom Katana SVG pointer
│   └── images/
│       ├── portrait-placeholder.svg     # Stylized Japanese scroll portrait
│       ├── project-1.svg                # FlowPilot AI preview
│       ├── project-2.svg                # SiteGuard Pro preview
│       ├── project-3.svg                # Archon Season 2 preview
│       └── project-4.svg                # Server-Logs preview
└── README.md
```

---

## 🚀 Running the Portfolio Locally

Run a simple local web server in the project directory:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🌐 Live Deployment

Hosted for free on GitHub Pages:
- **Live URL:** [https://spsr-dot.github.io/portfolio/](https://spsr-dot.github.io/portfolio/)
- **Repository:** [https://github.com/Spsr-dot/portfolio](https://github.com/Spsr-dot/portfolio)

---

## 📜 License & Credits

Crafted with dedication by **Surya Pratap Singh Rathore** (Age 19).
Open source under the [MIT License](LICENSE).
