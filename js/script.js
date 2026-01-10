console.log("script.js loaded");

// GSAP: ScrollSmoother depends on ScrollTrigger
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

/*
  ScrollSmoother mental model (important for layout decisions):

  - You wrap all scrollable content inside:
      #smooth-wrapper > #smooth-content

  - GSAP simulates scrolling by translating #smooth-content (transform).
    Because of that:
    1) Elements with position: fixed/sticky should NOT live inside #smooth-content,
       or they may behave incorrectly.
    2) Native anchor jumps (href="#id") are not ideal; we scroll via GSAP instead.
    3) Sticky positioning inside the smoother area can be unreliable.

  The upside:
  - Smooth scroll + consistent parallax/effects, with full control via JS.
*/

// Create and configure smooth scrolling
const smoother = ScrollSmoother.create({
  smooth: 3,     // Higher = more inertia (slower catch-up)
  effects: true, // Enables data-speed and data-lag attributes (parallax-like effects)

  // Useful hooks while debugging / tuning feel
  onStop: () => console.log("Scroll has stopped"),
  onUpdate: (self) => console.log(self.getVelocity()),
});

// ----- “Anchors” replacement (menu navigation) due to GSAP behaviour-----
// We scroll the smoother instance instead of relying on default href behavior.
const headerHeight = document.querySelector("header").offsetHeight;
const navLinks = document.querySelectorAll("nav a[data-target]");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const id = `#${this.dataset.target}`;

    gsap.to(smoother, {
      scrollTop: smoother.offset(id) - headerHeight, // offset to avoid header overlap
      duration: 0.7,
      ease: "power3.out",
    });
  });
});

// ----- Responsive tuning for parallax text in #quote -----
// On small screens, strong parallax can feel “too jumpy”, so we soften speeds.
ScrollTrigger.matchMedia({
  "(max-width: 900px)": function () {
    smoother.effects("#quote span", {
      speed: (i) => [0.95, 0.97, 1, 1.05, 0.9][i] || 1,
    });
  },

  "(max-width: 480px)": function () {
    smoother.effects("#quote span", {
      speed: (i) => [0.96, 0.97, 1, 0.96, 1][i] || 1,
    });
  },
});

/*
  Parallax hero (“Descent” section)

  There are two layers:
  - Background image (absolute, taller than container, overflow hidden)
  - Foreground title text

  The image parallax is handled via data-speed="1.15" in the HTML.
  For the title, we use ScrollTrigger with scrub:
  - scrub ties animation progress to scroll progress (no “time-based” animation).
  - ease: "none" keeps it linear and clean.
*/
gsap.fromTo(
  "#descent h2",
  { autoAlpha: 0, y: -150 },
  {
    autoAlpha: 1,
    y: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#descent",
      start: "top 95%",
      end: "top 5%",
      scrub: true,
    },
  }
);

// ----- Modal: pause smooth scroll while overlay is open -----
// This prevents background scroll (and feels more “app-like”).
const modal = document.querySelector(".modal");

document.getElementById("read-more-link").addEventListener("click", function (e) {
  e.preventDefault();

  gsap.to(modal, { autoAlpha: 1, duration: 0.5 });
  smoother.paused(true);
});

document.getElementById("modal-close-btn").addEventListener("click", function () {
  gsap.to(modal, { autoAlpha: 0, duration: 0.5 });
  smoother.paused(false);
});

// ----- Custom cursor (Vanilla JS) -----
// Kept separate from GSAP on purpose: lightweight and easy to reason about.
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursor-ring");

let coords = { x: -50, y: -50 };
let ringPrevCoords = { x: -50, y: -50 };

window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

// Linear interpolation: moves the ring a fraction closer each frame (inertia feel)
function ringDelay(a, b, t) {
  return a * (1 - t) + b * t;
}

function updateCursor() {
  cursor.style.left = `${coords.x}px`;
  cursor.style.top = `${coords.y}px`;

  const ringY = ringDelay(ringPrevCoords.y, coords.y, 0.15);
  const ringX = ringDelay(ringPrevCoords.x, coords.x, 0.15);

  cursorRing.style.top = `${ringY}px`;
  cursorRing.style.left = `${ringX}px`;

  ringPrevCoords.x = ringX;
  ringPrevCoords.y = ringY;

  requestAnimationFrame(updateCursor);
}

requestAnimationFrame(updateCursor);

// ----- Mobile nav drawer (Vanilla JS) -----
const navToggle = document.querySelector(".nav-toggle");
const navOverlay = document.querySelector(".nav-overlay");

function openNav() {
  document.body.classList.add("nav-open");
  navToggle.setAttribute("aria-expanded", "true");
}

function closeNav() {
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.contains("nav-open");
  isOpen ? closeNav() : openNav();
});

navOverlay.addEventListener("click", closeNav);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

// Close drawer when a link is clicked (scroll animation will still run via GSAP handler)
navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

