
/* =====================================================
   PH YLLIS MORAA — GET WELL SOON WEBSITE
   Created with love by Emmanuel ❤️
   File: app.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- 1. MOBILE NAVIGATION ----------

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      }
    });
  }

  // ---------- 2. FLOATING HEART ANIMATION ----------

  const heartsBackground = document.getElementById("heartsBackground");

  const heartSymbols = ["💗", "💕", "💖", "💓", "❤️", "💞"];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (heartsBackground && !reducedMotion) {
    let heartTimer = null;

    function createHeart() {
      // Stop adding hearts if the page is hidden.
      if (document.hidden) return;

      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

      heart.setAttribute("aria-hidden", "true");

      const size = 13 + Math.random() * 21;
      const duration = 7 + Math.random() * 5;

      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${size}px`;
      heart.style.animationDuration = `${duration}s`;
      heart.style.animationDelay = `${Math.random() * 0.5}s`;

      heartsBackground.appendChild(heart);

      window.setTimeout(() => {
        heart.remove();
      }, (duration + 1) * 1000);
    }

    function startHeartAnimation() {
      if (heartTimer !== null) return;

      createHeart();
      heartTimer = window.setInterval(createHeart, 650);
    }

    function stopHeartAnimation() {
      if (heartTimer !== null) {
        window.clearInterval(heartTimer);
        heartTimer = null;
      }
    }

    startHeartAnimation();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopHeartAnimation();
      } else {
        startHeartAnimation();
      }
    });

    // Keep the floating animation gentle on smaller screens.
    if (window.innerWidth < 480) {
      stopHeartAnimation();

      heartTimer = window.setInterval(createHeart, 1100);
      createHeart();
    }
  }

  // ---------- 3. VIRTUAL HUG BUTTON ----------

  const hugButton = document.getElementById("hugButton");
  const hugMessage = document.getElementById("hugMessage");

  if (hugButton && hugMessage) {
    hugButton.addEventListener("click", () => {
      hugMessage.textContent =
        "🤗 Sending you the biggest, warmest hug, Mom! " +
        "May you feel surrounded by love today and every day. " +
        "I love you so much, Phyllis Moraa! ❤️";

      hugButton.textContent = "Another Hug for Mom 💗";
    });
  }

  // ---------- 4. SURPRISE MESSAGE BUTTON ----------

  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseMessage = document.getElementById("surpriseMessage");

  if (surpriseButton && surpriseMessage) {
    surpriseButton.addEventListener("click", () => {
      const isHidden = surpriseMessage.hidden;

      surpriseMessage.hidden = !isHidden;

      if (isHidden) {
        surpriseButton.textContent = "Close Surprise 💕";

        // Bring the revealed message into view.
        window.setTimeout(() => {
          surpriseMessage.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "nearest"
          });
        }, 100);

        // Add a few extra hearts for the surprise.
        if (heartsBackground && !reducedMotion) {
          for (let i = 0; i < 8; i++) {
            const heart = document.createElement("span");

            heart.className = "floating-heart";
            heart.textContent = "💗";
            heart.style.left = `${15 + Math.random() * 70}%`;
            heart.style.fontSize = `${18 + Math.random() * 15}px`;
            heart.style.animationDuration = "5s";

            heartsBackground.appendChild(heart);

            window.setTimeout(() => heart.remove(), 6000);
          }
        }
      } else {
        surpriseButton.textContent = "Open Your Surprise 💝";
      }
    });
  }

  // ---------- 5. SMOOTH INTERNAL NAVIGATION ----------

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start"
        });

        // Keep the URL in sync without reloading the page.
        if (window.location.hash !== targetId) {
          window.history.replaceState(null, "", targetId);
        }
      }
    });
  });

  // ---------- 6. GENTLE CARD REVEAL ANIMATIONS ----------

  const animatedElements = document.querySelectorAll(
    ".message-card, .letter-card, .surprise-card"
  );

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
  }

  // ---------- 7. CURRENT YEAR (IF NEEDED) ----------

  // Update a footer element if you add id="currentYear" later.
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ---------- 8. INITIALIZATION ----------

  console.log(
    "❤️ Get Well Soon, Phyllis Moraa! Website initialized with love by Emmanuel."
  );
});
