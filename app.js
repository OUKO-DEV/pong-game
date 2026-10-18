```javascript
/* ==========================================
   CELINE'S LOVE WEBSITE
   Created by Emmanuel 💗
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTS
  const heartsBackground = document.getElementById("heartsBackground");
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  const openLetter = document.getElementById("openLetter");
  const closeLetter = document.getElementById("closeLetter");
  const letterPaper = document.getElementById("letterPaper");

  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseMessage = document.getElementById("surpriseMessage");

  const yesButton = document.getElementById("yesButton");
  const slowButton = document.getElementById("slowButton");
  const answerResult = document.getElementById("answerResult");

  // FLOATING HEARTS
  // Hearts rise continuously from the bottom of the screen.
  function createHeart() {
    if (!heartsBackground) return;

    // Keep the number of simultaneous hearts reasonable.
    if (heartsBackground.childElementCount >= 35) return;

    const heart = document.createElement("span");
    const symbols = ["♥", "♡", "💗", "💕", "💖", "💜"];
    const colors = [
      "#ff45ad",
      "#f78bd3",
      "#b65ae8",
      "#ff78bd",
      "#d28cff"
    ];

    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.setProperty("--left", `${Math.random() * 100}%`);
    heart.style.setProperty(
      "--heart-size",
      `${14 + Math.random() * 25}px`
    );
    heart.style.setProperty(
      "--duration",
      `${7 + Math.random() * 7}s`
    );
    heart.style.setProperty(
      "--drift",
      `${Math.round(Math.random() * 120 - 60)}px`
    );
    heart.style.setProperty(
      "--heart-color",
      colors[Math.floor(Math.random() * colors.length)]
    );
    heart.style.setProperty(
      "--heart-opacity",
      `${0.25 + Math.random() * 0.45}`
    );

    heartsBackground.appendChild(heart);

    // Remove the heart when its animation finishes.
    heart.addEventListener("animationend", () => {
      heart.remove();
    }, { once: true });
  }

  // Create some hearts immediately, then keep adding them.
  for (let i = 0; i < 12; i++) {
    setTimeout(createHeart, i * 250);
  }

  setInterval(createHeart, 650);

  // MOBILE NAVIGATION
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", (event) => {
      if (
        navigation.classList.contains("open") &&
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      }
    });
  }

  // OPEN AND CLOSE THE LOVE LETTER
  if (openLetter && letterPaper) {
    openLetter.addEventListener("click", () => {
      letterPaper.hidden = false;
      openLetter.setAttribute("aria-expanded", "true");

      openLetter.querySelector(".envelope-hint").textContent =
        "Your letter is open 💗";

      setTimeout(() => {
        letterPaper.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);
    });
  }

  if (closeLetter && letterPaper && openLetter) {
    closeLetter.addEventListener("click", () => {
      letterPaper.hidden = true;
      openLetter.setAttribute("aria-expanded", "false");

      openLetter.querySelector(".envelope-hint").textContent =
        "Tap to open ♡";

      openLetter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  }

  // SURPRISE MESSAGES
  const sweetMessages = [
    "Celine, you don't have to be perfect to be appreciated. You deserve kindness just as you are. 🌷",
    "One honest conversation can be the beginning of something beautiful. I'm happy to start there with you. 💗",
    "You deserve someone who listens, respects your feelings and gives you room to be yourself. 🦋",
    "I hope I can give you more reasons to smile, one genuine moment at a time. 💕",
    "The best connections grow without force. I hope ours can grow with honesty, friendship and laughter. 💜",
    "Celine, your happiness matters. Whatever happens between us, I hope you always feel respected. 🌸"
  ];

  let previousMessage = -1;

  if (surpriseButton && surpriseMessage) {
    surpriseButton.addEventListener("click", () => {
      let nextMessage;

      do {
        nextMessage = Math.floor(Math.random() * sweetMessages.length);
      } while (
        sweetMessages.length > 1 &&
        nextMessage === previousMessage
      );

      previousMessage = nextMessage;

      surpriseMessage.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 450, easing: "ease-out" }
      );

      surpriseMessage.textContent = sweetMessages[nextMessage];
      surpriseButton.textContent = "Another Little Surprise 💝";

      // A small burst of hearts for the surprise.
      for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 120);
      }
    });
  }

  // DISPLAY CELINE'S RESPONSE
  function showResponse(message) {
    if (!answerResult) return;

    answerResult.hidden = false;
    answerResult.textContent = message;

    answerResult.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  if (yesButton) {
    yesButton.addEventListener("click", () => {
      showResponse(
        "Celine, thank you for giving this a chance! 💗 Let's start with honesty, friendship and getting to know each other better. We'll take each step together, at a pace that feels right for both of us. — Emmanuel"
      );

      for (let i = 0; i < 14; i++) {
        setTimeout(createHeart, i * 100);
      }
    });
  }

  if (slowButton) {
    slowButton.addEventListener("click", () => {
      showResponse(
        "That's completely okay, Celine. 💜 We don't have to rush anything. I'll respect your pace, and we can start with friendship and honest conversations. Thank you for telling me how you feel. — Emmanuel"
      );
    });
  }

  // KEEP THE YEAR CURRENT
  const footer = document.querySelector(".footer");

  if (footer) {
    const year = new Date().getFullYear();
    const yearNote = document.createElement("p");

    yearNote.className = "footer-year";
    yearNote.textContent = `© ${year} Emmanuel`;
    footer.appendChild(yearNote);
  }

  // RESPECT REDUCED-MOTION SETTINGS
  // The CSS also reduces animation when requested by the device.
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reduceMotion.matches && heartsBackground) {
    heartsBackground.replaceChildren();
  }
});
```
