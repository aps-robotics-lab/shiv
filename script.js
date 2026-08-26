/* =========================================================
   ROBOkriti 2026
   Homepage JavaScript
========================================================= */


/* =========================================================
   LOADER
========================================================= */

document.body.classList.add("loading");

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader = document.getElementById("loader");

    loader.classList.add("hide");

    document.body.classList.remove("loading");

    document.querySelectorAll(".hero .reveal").forEach((element, index) => {

      setTimeout(() => {
        element.classList.add("visible");
      }, index * 130);

    });

  }, 1200);

});


/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

  menuButton.classList.toggle("active");
  mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

  link.addEventListener("click", () => {

    menuButton.classList.remove("active");
    mobileMenu.classList.remove("active");

  });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".section:not(.hero) .section-number, " +
  ".intro-content, " +
  ".intro-stats, " +
  ".experience-heading, " +
  ".experience-card, " +
  ".events-heading, " +
  ".event-card, " +
  ".messages-heading, " +
  ".message-card, " +
  ".countdown-content, " +
  ".register-grid, " +
  ".contact-grid"
);


const revealObserver = new IntersectionObserver(

  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


revealElements.forEach(element => {

  element.classList.add("reveal");

  revealObserver.observe(element);

});


/* =========================================================
   COUNTDOWN
   Registration deadline:
   1 September 2026, 11:59:59 PM IST
========================================================= */

const deadline = new Date(
  "2026-09-01T23:59:59+05:30"
).getTime();


function updateCountdown() {

  const now = new Date().getTime();

  const distance = deadline - now;


  if (distance <= 0) {

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;

  }


  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60))
    / 1000
  );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if (window.matchMedia("(pointer:fine)").matches) {

  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;


  document.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

  });


  function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);

  }


  animateCursor();


  document.querySelectorAll("a, button").forEach(element => {

    element.addEventListener("mouseenter", () => {

      cursorRing.style.width = "55px";
      cursorRing.style.height = "55px";

    });


    element.addEventListener("mouseleave", () => {

      cursorRing.style.width = "34px";
      cursorRing.style.height = "34px";

    });

  });

}


/* =========================================================
   EVENT CARD TILT
========================================================= */

if (window.matchMedia("(pointer:fine)").matches) {

  document.querySelectorAll(".event-card").forEach(card => {

    card.addEventListener("mousemove", event => {

      const rect = card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;


      const rotateX =
        ((y - centerY) / centerY) * -1.5;

      const rotateY =
        ((x - centerX) / centerX) * 1.5;


      card.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0)";

    });

  });

}


/* =========================================================
   SMOOTH ANCHOR OFFSET
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", event => {

    const targetId =
      anchor.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);


    if (!target) {
      return;
    }


    event.preventDefault();


    const navbarHeight =
      navbar.offsetHeight;


    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;


    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });

});
