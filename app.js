
/* =========================================================
   TIYANA'S BESTIE CORNER 💗
   Created with love by Emmanuel
   File: app.js
   ========================================================= */

"use strict";

/* ---------- 1. HELPER FUNCTIONS ---------- */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function safelyRun(callback) {
  try {
    callback();
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

/* ---------- 2. MOBILE NAVIGATION ---------- */

const menuToggle = $("#menuToggle");
const navigation = $("#navigation");

function closeNavigation() {
  if (!menuToggle || !navigation) return;

  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  const icon = menuToggle.querySelector("i");

  if (icon) {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
    }
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      navigation.classList.contains("open") &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeNavigation();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeNavigation();
    }
  });
}

/* ---------- 3. FLOATING HEARTS ---------- */

const floatingHearts = $("#floatingHearts");

const heartColors = [
  "#ff70ad",
  "#d49aff",
  "#ff9bc8",
  "#b79aff",
  "#f7b6dc"
];

function createFloatingHeart() {
  if (!floatingHearts) return;

  // Avoid filling the screen with too many elements.
  if (floatingHearts.childElementCount >= 22) return;

  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = randomItem(["♥", "♡", "❤", "✧"]);

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.setProperty(
    "--heart-color",
    randomItem(heartColors)
  );
  heart.style.setProperty(
    "--heart-size",
    `${12 + Math.random() * 20}px`
  );
  heart.style.setProperty(
    "--heart-duration",
    `${7 + Math.random() * 7}s`
  );

  floatingHearts.appendChild(heart);

  heart.addEventListener(
    "animationend",
    () => heart.remove(),
    { once: true }
  );
}

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reducedMotion) {
  // Start gently and continue creating hearts.
  for (let i = 0; i < 7; i++) {
    setTimeout(createFloatingHeart, i * 350);
  }

  setInterval(createFloatingHeart, 850);
}

/* ---------- 4. SURPRISE MESSAGES ---------- */

const surpriseButton = $("#surpriseButton");
const surpriseButtonTwo = $("#surpriseButtonTwo");
const surpriseResult = $("#surpriseResult");
const surpriseText = $("#surpriseText");

const surpriseMessages = [
  "Tiyana, never forget how special you are. The world needs your beautiful smile! 💗",

  "Official reminder: you are loved, appreciated, and an absolutely wonderful bestie! 🥹💕",

  "If happiness had a name, today it would be Tiyana! Keep shining, bestie. ✨",

  "You deserve laughter, peace, beautiful memories, and every good thing life has to offer. 🌸",

  "Bestie status: UNREPLACEABLE. Your friendship means more than you know! 💖",

  "Dear Tiyana, keep being yourself. There is something beautiful about the person you are. 🦋",

  "Sending you a pocket full of hugs, a sky full of stars, and a million reasons to smile! 💜",

  "Some people make ordinary days feel special. Thank you for being one of those people, Tiyana. 🌷"
];

let previousSurprise = -1;

function revealSurprise() {
  if (!surpriseResult || !surpriseText) return;

  let nextIndex = Math.floor(
    Math.random() * surpriseMessages.length
  );

  // Try not to repeat the immediately previous message.
  if (surpriseMessages.length > 1) {
    while (nextIndex === previousSurprise) {
      nextIndex = Math.floor(
        Math.random() * surpriseMessages.length
      );
    }
  }

  previousSurprise = nextIndex;

  surpriseText.textContent = surpriseMessages[nextIndex];
  surpriseResult.hidden = false;

  surpriseResult.animate(
    [
      { opacity: 0, transform: "translateY(12px) scale(0.97)" },
      { opacity: 1, transform: "translateY(0) scale(1)" }
    ],
    {
      duration: 450,
      easing: "ease-out"
    }
  );

  burstHearts();
}

if (surpriseButton) {
  surpriseButton.addEventListener("click", () => {
    revealSurprise();

    const section = $("#surprise");

    if (section) {
      section.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center"
      });
    }
  });
}

if (surpriseButtonTwo) {
  surpriseButtonTwo.addEventListener("click", revealSurprise);
}

/* ---------- 5. HEART BURST EFFECT ---------- */

function burstHearts() {
  if (reducedMotion) return;

  const symbols = ["💗", "💕", "💖", "♡", "✨"];
  const container = document.createElement("div");

  Object.assign(container.style, {
    position: "fixed",
    inset: "0",
    zIndex: "999",
    overflow: "hidden",
    pointerEvents: "none"
  });

  document.body.appendChild(container);

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");

    particle.textContent = randomItem(symbols);

    Object.assign(particle.style, {
      position: "absolute",
      left: `${35 + Math.random() * 30}%`,
      top: `${35 + Math.random() * 25}%`,
      fontSize: `${16 + Math.random() * 18}px`,
      opacity: "1",
      willChange: "transform, opacity"
    });

    container.appendChild(particle);

    const destinationX = (Math.random() - 0.5) * 400;
    const destinationY = -80 - Math.random() * 300;
    const rotation = (Math.random() - 0.5) * 160;

    const animation = particle.animate(
      [
        {
          transform: "translate(0, 0) scale(0.5) rotate(0deg)",
          opacity: 1
        },
        {
          transform:
            `translate(${destinationX}px, ${destinationY}px) ` +
            `scale(1.1) rotate(${rotation}deg)`,
          opacity: 0
        }
      ],
      {
        duration: 900 + Math.random() * 700,
        easing: "cubic-bezier(.15,.75,.3,1)"
      }
    );

    animation.onfinish = () => particle.remove();
  }

  setTimeout(() => container.remove(), 1900);
}

/* ---------- 6. OPENABLE FRIENDSHIP LETTER ---------- */

const letterButton = $("#letterButton");
const letterContent = $("#letterContent");
const closeLetterButton = $("#closeLetter");

function setLetterOpen(isOpen) {
  if (!letterButton || !letterContent) return;

  letterContent.hidden = !isOpen;

  letterButton.setAttribute("aria-expanded", String(isOpen));

  const hint = letterButton.querySelector(".envelope-hint");

  if (hint) {
    hint.innerHTML = isOpen
      ? '<i class="fa-solid fa-heart"></i> Your letter is open'
      : '<i class="fa-solid fa-hand-pointer"></i> Tap to open your letter';
  }

  if (isOpen) {
    if (!reducedMotion && letterContent.animate) {
      letterContent.animate(
        [
          { opacity: 0, transform: "translateY(15px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 450,
          easing: "ease-out"
        }
      );
    }

    burstHearts();
  }
}

if (letterButton) {
  letterButton.addEventListener("click", () => {
    const currentlyOpen =
      letterButton.getAttribute("aria-expanded") === "true";

    setLetterOpen(!currentlyOpen);
  });
}

if (closeLetterButton) {
  closeLetterButton.addEventListener("click", () => {
    setLetterOpen(false);

    if (letterButton) {
      letterButton.focus();
    }
  });
}

/* ---------- 7. FRIENDSHIP QUIZ ---------- */

const quizQuestions = [
  {
    question: "What makes a great friendship?",
    answers: [
      "A. Trust and kindness",
      "B. Competing all the time",
      "C. Never talking"
    ],
    correct: 0,
    feedback: "Exactly! Trust and kindness make friendships stronger. 💗"
  },
  {
    question: "What should besties do on a difficult day?",
    answers: [
      "A. Ignore each other",
      "B. Offer support and listen",
      "C. Make everything a competition"
    ],
    correct: 1,
    feedback: "Yes! Listening and supporting each other really matters. 🫶"
  },
  {
    question: "What is the best thing about being yourself?",
    answers: [
      "A. Pretending to be someone else",
      "B. Comparing yourself to everyone",
      "C. Being proud of who you are"
    ],
    correct: 2,
    feedback: "Correct! Tiyana, your uniqueness is worth celebrating. ✨"
  }
];

const quizQuestion = $("#quizQuestion");
const quizOptions = $("#quizOptions");
const quizFeedback = $("#quizFeedback");
const quizNext = $("#quizNext");
const quizProgressText = $("#quizProgressText");
const quizProgressFill = $("#quizProgressFill");
const quizContent = $("#quizContent");
const quizResult = $("#quizResult");
const quizScore = $("#quizScore");
const restartQuiz = $("#restartQuiz");

let currentQuestion = 0;
let quizPoints = 0;
let questionAnswered = false;

function renderQuestion() {
  if (
    !quizQuestion ||
    !quizOptions ||
    !quizFeedback ||
    !quizNext ||
    !quizProgressText ||
    !quizProgressFill ||
    !quizContent ||
    !quizResult
  ) {
    return;
  }

  const question = quizQuestions[currentQuestion];

  questionAnswered = false;

  quizResult.hidden = true;
  quizContent.hidden = false;
  quizNext.hidden = true;

  quizQuestion.textContent = question.question;
  quizFeedback.textContent = "";
  quizOptions.replaceChildren();

  quizProgressText.textContent =
    `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

  quizProgressFill.style.width =
    `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "quiz-option";
    button.textContent = answer;
    button.dataset.answer = String(index);

    button.addEventListener("click", () => {
      answerQuestion(index);
    });

    quizOptions.appendChild(button);
  });
}

function answerQuestion(selectedIndex) {
  if (questionAnswered) return;

  const question = quizQuestions[currentQuestion];

  const buttons = quizOptions
    ? quizOptions.querySelectorAll(".quiz-option")
    : [];

  questionAnswered = true;

  const isCorrect = selectedIndex === question.correct;

  if (isCorrect) {
    quizPoints++;
    quizFeedback.textContent = question.feedback;
  } else {
    quizFeedback.textContent =
      `Not quite! The correct answer is: ` +
      question.answers[question.correct] + ". 💕";
  }

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.correct) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (quizNext) {
    quizNext.hidden = false;

    quizNext.innerHTML =
      currentQuestion === quizQuestions.length - 1
        ? 'See my score <i class="fa-solid fa-heart"></i>'
        : 'Next question <i class="fa-solid fa-arrow-right"></i>';
  }
}

function showQuizResult() {
  if (!quizContent || !quizResult || !quizScore) return;

  quizContent.hidden = true;
  quizResult.hidden = false;

  const total = quizQuestions.length;

  let message;

  if (quizPoints === total) {
    message = "Perfect score! You're a friendship superstar, Tiyana! 💖";
  } else if (quizPoints >= 2) {
    message = "Amazing job, bestie! Keep spreading those good vibes. 🌸";
  } else {
    message = "Every quiz is a chance to learn something new. You got this! 💗";
  }

  quizScore.textContent =
    `You scored ${quizPoints} out of ${total}. ${message}`;

  burstHearts();
}

if (quizNext) {
  quizNext.addEventListener("click", () => {
    if (!questionAnswered) return;

    if (currentQuestion < quizQuestions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showQuizResult();
    }
  });
}

if (restartQuiz) {
  restartQuiz.addEventListener("click", () => {
    currentQuestion = 0;
    quizPoints = 0;
    questionAnswered = false;

    renderQuestion();

    if (quizProgressFill) {
      quizProgressFill.style.width = "33.333%";
    }
  });
}

// Set up the first question.
renderQuestion();

/* ---------- 8. SECRET MESSAGE ---------- */

const secretButton = $("#secretButton");
const secretMessage = $("#secretMessage");
const secretLock = $("#secretLock");

if (secretButton && secretMessage) {
  secretButton.addEventListener("click", () => {
    const isRevealed = !secretMessage.hidden;

    if (isRevealed) {
      secretMessage.hidden = true;

      secretButton.innerHTML =
        'Unlock your message <i class="fa-solid fa-key"></i>';

      secretButton.setAttribute("aria-expanded", "false");

      if (secretLock) {
        secretLock.classList.remove("unlocked");
        secretLock.innerHTML =
          '<i class="fa-solid fa-lock"></i>';
      }

      return;
    }

    secretMessage.hidden = false;

    secretButton.innerHTML =
      'Hide secret message <i class="fa-solid fa-heart"></i>';

    secretButton.setAttribute("aria-expanded", "true");

    if (secretLock) {
      secretLock.classList.add("unlocked");
      secretLock.innerHTML =
        '<i class="fa-solid fa-lock-open"></i>';
    }

    if (!reducedMotion && secretMessage.animate) {
      secretMessage.animate(
        [
          { opacity: 0, transform: "translateY(12px) scale(0.98)" },
          { opacity: 1, transform: "translateY(0) scale(1)" }
        ],
        {
          duration: 450,
          easing: "ease-out"
        }
      );
    }

    burstHearts();
  });
}

/* ---------- 9. MUSIC PLAYER ---------- */

const musicToggle = $("#musicToggle");
const backgroundMusic = $("#backgroundMusic");

let musicIsPlaying = false;

function updateMusicButton(isPlaying) {
  if (!musicToggle) return;

  const icon = musicToggle.querySelector("i");
  const label = musicToggle.querySelector("span");

  musicIsPlaying = isPlaying;

  musicToggle.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute("aria-pressed", String(isPlaying));

  if (icon) {
    icon.className = isPlaying
      ? "fa-solid fa-pause"
      : "fa-solid fa-play";
  }

  if (label) {
    label.textContent = isPlaying ? "Pause music" : "Play music";
  }
}

async function toggleMusic() {
  if (!backgroundMusic) return;

  if (musicIsPlaying) {
    backgroundMusic.pause();
    updateMusicButton(false);
    return;
  }

  try {
    // Browsers permit playback following a visitor's button press.
    await backgroundMusic.play();

    updateMusicButton(true);
  } catch (error) {
    updateMusicButton(false);

    alert(
      "Please add bestie-music.mp3 to your website folder, " +
      "then press Play again. 💗"
    );

    console.warn("Music could not start:", error);
  }
}

if (musicToggle && backgroundMusic) {
  musicToggle.addEventListener("click", toggleMusic);

  backgroundMusic.addEventListener("play", () => {
    updateMusicButton(true);
  });

  backgroundMusic.addEventListener("pause", () => {
    updateMusicButton(false);
  });

  backgroundMusic.addEventListener("ended", () => {
    updateMusicButton(false);
  });

  // Do not start the music automatically.
  updateMusicButton(false);
}

/* ---------- 10. SMOOTH SCROLLING ---------- */

$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = $(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });

    // Update the URL fragment without causing a second jump.
    if (window.location.hash !== targetId) {
      history.pushState(null, "", targetId);
    }
  });
});

/* ---------- 11. WELCOME MESSAGE IN CONSOLE ---------- */

console.log(
  "%c💗 Welcome to Tiyana's Bestie Corner!",
  "color: #ed4b98; font-size: 17px; font-weight: bold;"
);

console.log(
  "%cCreated with love by Emmanuel ✨",
  "color: #9664ed; font-size: 12px;"
);
