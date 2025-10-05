import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// add will-change hint
document.querySelectorAll(".title, .subtitle, .cta, .section").forEach(el => el.classList.add("will-animate"));

// Intro timeline for hero
gsap.timeline()
  .to(".title", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
  .to(".subtitle", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
  .to(".cta", { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, "-=0.2");

// Scroll-triggered section reveals // THis is a fade in
gsap.utils.toArray(".section").forEach((section) => {
  gsap.to(section, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      once: false,              // set true if you want it to run only once
      toggleActions: "play none none reverse"
    }
  });
});

//video section
gsap.to(".video-section", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".video-section",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

// small hover micro-interaction - button grows in size
const buy = document.querySelector(".btn-primary");
if (buy) {
  buy.addEventListener("mouseenter", () => gsap.to(buy, { scale: 1.05, duration: 0.15 }));
  buy.addEventListener("mouseleave", () => gsap.to(buy, { scale: 1, duration: 0.15 }));
}

// reduced motion preference - ? I think this is for slow machines
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.timeScale(0.001); // effectively pause animations
}

//Contact Form Front end

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    formStatus.textContent = "Sending...";

    // Collect data
    const data = Object.fromEntries(new FormData(contactForm));

    // Example: fake success (no backend yet)
    setTimeout(() => {
      formStatus.textContent = "Message sent! Thank you 😊";
      contactForm.reset();
    }, 800);
  });
}


// Gallery 



const slides = document.querySelectorAll(".gallery-slider img");
const gallery = document.querySelector(".gallery-slider");

if (slides.length > 0) {
  const fadeDuration = 3;
  const visibleTime = 5;

  // initialize: show first image & set container height
  gsap.set(slides[0], { opacity: 1, position: "static" });
  gallery.style.height = `${slides[0].offsetHeight}px`;

  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } });

  slides.forEach((slide, i) => {
    const next = slides[(i + 1) % slides.length];

    tl.to(slide, { opacity: 0, duration: fadeDuration }, `+=${visibleTime}`)
      .to(next, { opacity: 1, duration: fadeDuration }, "<")
      .call(() => {
        // smoothly resize container to next image’s height
        gsap.to(gallery, {
          height: next.offsetHeight,
          duration: fadeDuration,
          ease: "power1.out"
        });
      }, null, "<");
  });
}


/////////////