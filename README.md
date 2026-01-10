# GSAP Scroll Landing Page

Animated landing page built with **HTML / CSS / JavaScript** and **GSAP**, focused on smooth scrolling, parallax effects, responsiveness, and performance-aware implementation.

## Live Demo
- https://devis4wd.github.io/gsap-scroll-landing-page/

## Overview
This project is a lightweight front-end demo showcasing how to combine **GSAP ScrollSmoother + ScrollTrigger** to create smooth scrolling and scroll-driven motion, while keeping the codebase clean and understandable.  
It also includes a **custom cursor** (Vanilla JS) and a **mobile off-canvas navigation drawer** with accessible toggling.

## Key Features
- **Smooth scrolling** using GSAP ScrollSmoother
- **Parallax effects** via `data-speed` / `data-lag` attributes and GSAP effects
- **Scroll-driven animation** with ScrollTrigger (`scrub`-based)
- **Custom delayed cursor** (Vanilla JS) with `mix-blend-mode: difference`
- **Responsive layout** with a mobile drawer navigation (burger + overlay + ESC close)
- **Semantic HTML** and modular CSS layout helpers
- **Performance-aware approach** (lightweight structure, minimal dependencies)

## Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla)
- GSAP (ScrollSmoother + ScrollTrigger)

## Notes / Implementation Details
- Elements with `position: fixed` (header, modal, custom cursor) are kept **outside** the ScrollSmoother wrappers to avoid transform-related issues.
- Native anchor navigation (`href="#section"`) is replaced with **GSAP scrolling** via `data-target` attributes for more reliable behavior with simulated scroll.

## Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/devis4wd/gsap-scroll-landing-page.git

## License
The source code of this project is released under the GNU GPL v2.0 license.

All images and visual assets used in this demo are either:
- sourced from public-domain or Creative Commons repositories, or
- used here for demonstration and educational purposes only.

If you are the author or rights holder of any asset and believe it is being used improperly,
please contact me and I will promptly remove or replace it.
