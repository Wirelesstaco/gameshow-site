import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


let pageWidth = window.innerWidth;
gsap.registerPlugin(ScrollTrigger);

///Hero
window.addEventListener('load', () => {
  // Once everything else has finished loading:
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadBackgroundVideo, { timeout: 2000 });
  } else {
    setTimeout(loadBackgroundVideo, 1500);
  }
});

function loadBackgroundVideo() {
  const video = document.querySelector('.hero__video');
  const sources = video.querySelectorAll('source[data-src]');
  
  sources.forEach(source => {
    source.src = source.dataset.src; // Activate actual URL
    source.removeAttribute('data-src');
  });
  
  video.load();
  
  // Autoplay after a tiny buffer
  video.addEventListener('loadeddata', () => {
    video.play().catch(() => {});
  });
}






// add will-change hint
document.querySelectorAll(".title, .subtitle, .cta, .section").forEach(el => el.classList.add("will-animate"));

// Intro timeline for hero
gsap.timeline()
  .from('.title1', {
    xPercent: -120,
    skewX: -8,
    opacity: 0,
     duration:.6

  })
  .from('.title2', {
    xPercent: 120,
    skewX: 8,
    opacity: 0,
    duration:.6

  },"-=.01")
  .from('.title3', {
    xPercent: -120,
    skewX: -8,
    opacity: 0,
     duration:.6
   
  },"-=.1")

  

  .to(".cta", { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, "+=3.2");

// Scroll-triggered section reveals // THis is a fade in
gsap.utils.toArray(".section").forEach((section) => {
  gsap.to(section, {
    opacity: 1,
    y: 0,
    duration: 0.3,
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

//video section
gsap.to(".balloon", 
  { scrollTrigger: {
  trigger: ".balloon",
  toggleActions:"restart pause resume pause"}, 
  opacity: 1, yPercent: -50, duration:4 ,delay:0, ease: "back.inOut" })

  gsap.to(".joelook", 
  { scrollTrigger: {
  trigger: ".joelook",
  toggleActions:"restart pause resume pause"}, 
  opacity: 1, scale: 1.1, duration:4 ,delay:4, ease: "back.inOut" })


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
  const fadeDuration = 2;
  const visibleTime = 5;

  // initialize: show first image & set container height
  gsap.set(slides[0], { opacity: 1 });
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
///////// REVIEWS //////////

const reviews = document.querySelectorAll(".review");

const slideDuration = 1.2;  // time to slide in/out
const holdTime = 2.5;       // pause time at center
const overlap = 0.6;        // how early next starts (seconds)

gsap.set(reviews, { xPercent: 100, opacity: 0 });

const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

reviews.forEach((review, i) => {
  const next = reviews[(i + 1) % reviews.length];

  // slide this review in
  tl.to(review, { xPercent: 0, opacity: 1, duration: slideDuration });

  // hold centered
  tl.to(review, { duration: holdTime });

  // slide out left
  tl.to(review, { xPercent: -100, opacity: 0, duration: slideDuration });

  // immediately hide and reset offscreen (so no backward flash)
  tl.set(review, { xPercent: 100, opacity: 0, visibility: "hidden" });


  // overlap next one slightly *after* this one starts leaving
  if (next) {
    tl.to(next, {
      xPercent: 0,
      opacity: 1,
      duration: slideDuration
    }, `-=${overlap}`);
  }

});
///////////////////
