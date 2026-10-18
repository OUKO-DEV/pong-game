```javascript
document.addEventListener("DOMContentLoaded", function () {
  // =====================================
  // 1. FLOATING HEARTS AND LOVE EMOJIS 💗
  // =====================================

  let heartsContainer = document.getElementById("heartsBackground");

  if (!heartsContainer) {
    heartsContainer = document.createElement("div");
    heartsContainer.id = "heartsBackground";
    heartsContainer.className = "hearts-background";
    heartsContainer.setAttribute("aria-hidden", "true");
    document.body.prepend(heartsContainer);
  }

  const heartSymbols = [
    "💗", "💖", "💕", "💘", "💝",
    "💜", "❤️", "♥", "♡", "🌸", "🦋"
  ];

  function createFloatingHeart() {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (18 + Math.random() * 24) + "px";
    heart.style.animationDuration = (6 + Math.random() * 5) + "s";
    heart.style.color = [
      "#ff35a8", "#ed65c9", "#b967f4", "#ff8bc9"
    ][Math.floor(Math.random() * 4)];

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", function () {
      heart.remove();
    }, { once: true });
  }

  // Show hearts immediately, then continuously.
  for (let i = 0; i < 18; i++) {
    setTimeout(createFloatingHeart, i * 180);
  }

  setInterval(createFloatingHeart, 450);

  // =====================================
  // 2. MOBILE NAVIGATION
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
      navigation.classList.toggle("open");

      const open = navigation.classList.contains("open");
      menuToggle.textContent = open ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =====================================
  // 3. OPEN AND CLOSE THE LOVE LETTER 💌
  // =====================================

  const openLetter = document.getElementById("openLetter");
  const closeLetter = document.getElementById("closeLetter");
  const letterPaper = document.getElementById("letterPaper");

  function openLoveLetter() {
    if (!letterPaper) {
      alert("Please check that the letterPaper section exists in index.html.");
      return;
    }

    letterPaper.hidden = false;

    if (openLetter) {
      openLetter.setAttribute("aria-expanded", "true");

      const hint = openLetter.querySelector(".envelope-hint");
      if (hint) hint.textContent = "Your letter is open 💗";
    }

    setTimeout(function () {
      letterPaper.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 100);

    // Add a small heart burst.
    for (let i = 0; i < 8; i++) {
      setTimeout(createFloatingHeart, i * 100);
    }
  }

  function closeLoveLetter() {
    if (!letterPaper) return;

    letterPaper.hidden = true;

    if (openLetter) {
      openLetter.setAttribute("aria-expanded", "false");

      const hint = openLetter.querySelector(".envelope-hint");
      if (hint) hint.textContent = "Tap to open ♡";

      openLetter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  if (openLetter) {
    openLetter.addEventListener("click", openLoveLetter);
  }

  if (closeLetter) {
    closeLetter.addEventListener("click", closeLoveLetter);
  }

  // =====================================
  // 4. SURPRISE BUTTON 🎁
  // =====================================

  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseMessage = document.getElementById("surpriseMessage");

  const messages = [
    "Surprise, Celine! 💗 You are special, and I hope life gives you countless reasons to smile.",
    "A little reminder from Emmanuel: you deserve honesty, kindness and someone who respects your heart. 🌸",
    "If trust takes time, that's okay. I would rather build something real with you slowly than rush something beautiful. 💕",
    "Your smile is precious, Celine. I hope I can be one of the reasons you smile today. 🦋",
    "Maybe our story starts with friendship, grows through trust and becomes something wonderful. 💜",
    "Dear Celine, you don't owe me an answer. I simply wanted you to know that I care about you. ❤️",
    "Sending you a little cloud of happiness, a thousand virtual hugs and a sky full of hearts! ☁️💖"
  ];

  let messageIndex = -1;

  if (surpriseButton) {
    surpriseButton.addEventListener("click", function () {
      if (surpriseMessage) {
        messageIndex = (messageIndex + 1) % messages.length;

        surpriseMessage.textContent = messages[messageIndex];
        surpriseMessage.hidden = false;

        surpriseMessage.classList.remove("surprise-pop");
        void surpriseMessage.offsetWidth;
        surpriseMessage.classList.add("surprise-pop");
      } else {
        alert(messages[(messageIndex = (messageIndex + 1) % messages.length)]);
      }

      surpriseButton.textContent = "Open Another Surprise 💝";

      for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHeart, i * 100);
      }
    });
  }

  // =====================================
  // 5. CELINE'S ANSWER 💞
  // =====================================

  const yesButton = document.getElementById("yesButton");
  const slowButton = document.getElementById("slowButton");
  const answerResult = document.getElementById("answerResult");

  function showAnswer(message) {
    if (!answerResult) return;

    answerResult.textContent = message;
    answerResult.hidden = false;
    answerResult.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  if (yesButton) {
    yesButton.addEventListener("click", function () {
      showAnswer(
        "Thank you, Celine! 💗 Let's start with friendship, honesty and getting to know each other better. We can let our connection grow naturally, together. — Emmanuel"
      );

      for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 100);
      }
    });
  }

  if (slowButton) {
    slowButton.addEventListener("click", function () {
      showAnswer(
        "That's completely okay, Celine. 💜 We can take our time. I'll respect your feelings and let trust grow naturally, without pressure. Thank you for being honest with me. — Emmanuel"
      );
    });
  }

  console.log("Celine's love website is ready! 💗");
});
```
