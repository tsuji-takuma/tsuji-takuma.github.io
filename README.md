# tsuji-takuma.github.io

Personal website of Takuma TSUJI.

🔗 https://tsuji-takuma.github.io/

The production site is a static HTML/CSS/JavaScript site served by GitHub Pages.

- `index.html`: Japanese content, publications, profile and legacy section anchors.
- `css/style.css`: Forest palette, responsive layout and 800ms scroll reveal.
- `js/app.js`: JP / EN switch. Only language is stored in browser storage.
- `js/motion.js`: One-time fade-up for content below the initial viewport (16px on desktop, 8px on mobile). Respects reduced motion, keyboard focus, section links and printing.
- `fonts/`: Self-hosted IBM Plex Sans JP in regular (400) and bold (700), including the original SIL OFL 1.1 license and source manifest.

No build step is required. Preview from the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. Without JavaScript the Japanese page remains fully readable. Domestic publication titles in the English view are reference translations; the original Japanese titles remain alongside them.

When editing `js/app.js`, update its `?v=` value in `index.html` to the first 12 characters of the file's SHA-256. This prevents a cached translation script from being reused with newly added HTML translation keys.

The layout and accessibility foundations reference the [Digital Agency Design System](https://design.digital.go.jp/dads/). The Forest palette and page composition are independent adaptations. The entrance easing references [IBM Carbon motion guidance](https://carbondesignsystem.com/elements/motion/overview/); the 800ms duration is a site-specific choice.
