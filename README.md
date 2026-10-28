# Surya Pratap Singh Rathore — Personal Portfolio

A cinematic, interactive personal portfolio website inspired by a tranquil **Japanese Garden at Dusk (Spring)**. Crafted with semantic HTML5, modern responsive CSS, and vanilla JavaScript.

---

## 🌸 Experience & Art Direction

- **First Visit Gate-Opening Intro**: Traditional Japanese wooden lattice (Shoji/Fusuma) gates slide apart smoothly to reveal the portfolio garden upon clicking **"Enter the Portfolio"**. Includes an instant **"Skip Intro"** button and replay controls.
- **Atmospheric Dusk Garden Scenery**: Layered twilight sky, crescent moon glow, silhouette of a traditional Japanese tea house with warm glowing shoji windows, a stone lantern (*tōrō*), an arched vermilion bridge (*taiko-bashi*), and tranquil water reflections.
- **Falling Sakura Petals**: A lightweight, 60fps HTML5 Canvas particle simulation with natural fluttering, wind drift, and 3D rotation. Automatically pauses when the browser tab is hidden and respects `prefers-reduced-motion`.
- **Handcrafted Bamboo Navigation & Buttons**: Tactile wooden plates with beveled edges, wood grain, restrained shadows, and warm golden highlights.
- **Katana Cut Interaction**: Clicking any bamboo button unleashes a swift, razor-sharp diagonal katana slash across the plate with a subtle split effect before smooth navigation.
- **Katana Desktop Cursor**: Sleek Japanese blade cursor with warm-white and cherry blossom glint effects on click (active only on desktop pointer devices; automatically disabled on touchscreens and for reduced-motion preferences).
- **Accessible & High-Contrast**: Washi parchment and rice-paper panels ensure AAA text readability against the atmospheric twilight backdrop.

---

## 📁 File Structure

```text
├── index.html                           # Main portfolio markup & editable placeholders
├── css/
│   └── style.css                        # Complete styles, design tokens, & animations
├── js/
│   └── main.js                          # Gate intro, sakura simulation, katana effects, scrollspy
├── assets/
│   ├── icons/
│   │   └── katana-cursor.svg            # Custom Katana SVG pointer
│   └── images/
│       ├── portrait-placeholder.svg     # Stylized Japanese scroll portrait placeholder
│       ├── project-1.svg                # Project 1 dusk pavilion preview
│       ├── project-2.svg                # Project 2 stone lantern preview
│       ├── project-3.svg                # Project 3 pagoda spire preview
│       └── project-4.svg                # Project 4 mountain reflection preview
└── README.md
```

---

## 🛠️ How to Customize Your Information

Every piece of information has been cleanly labeled with `[Placeholder]` tags and code comments throughout `index.html`.

### 1. Replacing Your Portrait
1. Place your photo inside `assets/images/` (e.g. `assets/images/portrait.jpg`).
2. Open `index.html` and locate line ~182:
   ```html
   <img 
     src="assets/images/portrait.jpg" 
     alt="Portrait of Surya Pratap Singh Rathore" 
     class="portrait-img"
   >
   ```

### 2. Updating Your Introduction
In `index.html` under `<section id="hero">`, update the text inside `.hero-intro-card`:
```html
<p class="hero-intro-text">
  [Write your introduction here...]
</p>
```

### 3. Updating Your Biography & Facts
In `index.html` under `<section id="about">`:
- **Current Role / Focus**: Update `[Add your title / current focus]`
- **Location**: Update `[Add your location / timezone]`
- **Biography**: Edit the paragraphs inside `.bio-placeholder-box`
- **Pillars**: Customize your education, hobbies, and personal philosophy cards.

### 4. Updating Skills
In `index.html` under `<section id="skills">`:
- Replace the tags inside each category card with your actual technical stack, programming languages, and creative proficiencies.

### 5. Adding Your Projects
In `index.html` under `<section id="projects">`:
- For each `.project-card`:
  - Update `src="..."` with your screenshot.
  - Update the Project Title, Category Tag, Technology Pills, and Description.
  - Replace the links (`href="..."`) for Live Demo and Source Code.

### 6. Updating Contact Details & Social Links
In `index.html` under `<section id="contact">`:
- Update `[Add your email: e.g. contact@example.com]`.
- Add your actual URLs to the social links (`GitHub`, `LinkedIn`, `X/Twitter`, etc.).

---

## 🚀 How to Run

Simply double-click `index.html` to open it directly in any modern web browser (Chrome, Safari, Firefox, Edge).

Alternatively, run a simple local web server:
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .
```
Then visit `http://localhost:8000` in your browser.

