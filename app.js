
/* ==========================================
   CELINE'S WORLD — APP.JS
   Made with love by Emmanuel 💗
========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------
  // 1. Floating hearts
  // ----------------------------------------

  const heartsContainer = document.getElementById("floatingHearts");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const heartSymbols = ["♥", "♡", "❤", "💕", "✦"];

  function createHeart() {
    if (!heartsContainer || reducedMotion) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.setAttribute("aria-hidden", "true");

    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 17}px`;
    heart.style.setProperty("--duration", `${7 + Math.random() * 6}s`);
    heart.style.setProperty(
      "--drift",
      `${Math.round(Math.random() * 120 - 60)}px`
    );

    heartsContainer.appendChild(heart);

    window.setTimeout(() => {
      heart.remove();
    }, 14000);
  }

  if (!reducedMotion) {
    for (let i = 0; i < 8; i++) {
      window.setTimeout(createHeart, i * 350);
    }

    window.setInterval(createHeart, 1100);
  }

  // ----------------------------------------
  // 2. Background music
  // ----------------------------------------

  const music = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicButton");
  const musicIcon = document.getElementById("musicIcon");
  const musicLabel = document.getElementById("musicLabel");

  let musicStarted = false;

  function updateMusicButton(isPlaying) {
    musicButton.classList.toggle("is-playing", isPlaying);
    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.setAttribute(
      "aria-label",
      isPlaying ? "Pause background music" : "Play background music"
    );

    musicIcon.textContent = isPlaying ? "♫" : "♪";
    musicLabel.textContent = isPlaying ? "Pause our vibe" : "Play our vibe";
  }

  musicButton.addEventListener("click", async () => {
    if (!music) return;

    if (!musicStarted) {
      musicStarted = true;
      music.volume = 0.35;
    }

    if (music.paused) {
      try {
        await music.play();
        updateMusicButton(true);
      } catch (error) {
        updateMusicButton(false);
        musicLabel.textContent = "Add music.mp3";
        console.warn(
          "Music could not play. Check that music.mp3 exists and is a valid audio file.",
          error
        );
      }
    } else {
      music.pause();
      updateMusicButton(false);
    }
  });

  music.addEventListener("play", () => updateMusicButton(true));
  music.addEventListener("pause", () => updateMusicButton(false));
  music.addEventListener("ended", () => updateMusicButton(false));

  music.addEventListener("error", () => {
    if (musicStarted) {
      updateMusicButton(false);
      musicLabel.textContent = "Music unavailable";
    }
  });

  // ----------------------------------------
  // 3. Surprise button
  // ----------------------------------------

  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseResult = document.getElementById("surpriseResult");
  const surpriseIllustration = document.getElementById(
    "surpriseIllustration"
  );
  const surpriseHint = document.getElementById("surpriseHint");
  const anotherSurprise = document.getElementById("anotherSurprise");

  const sweetMessages = [
    {
      emoji: "💖",
      title: "You make this world sweeter!",
      message:
        "Celine, keep smiling, keep shining, and keep being the wonderful person you are. Your bestie Emmanuel is cheering for you! 🥹💕"
    },
    {
      emoji: "🌷",
      title: "A little reminder for you",
      message:
        "You are one of a kind, Celine. Be proud of how far you've come and excited about all the beautiful things still ahead. 💗"
    },
    {
      emoji: "🫶🏽",
      title: "Bestie appreciation moment!",
      message:
        "Some people make life brighter just by being themselves. Thank you for being you, Celine. Sending you a big virtual hug! 🤗"
    },
    {
      emoji: "✨",
      title: "Your smile deserves to stay!",
      message:
        "Whatever today brings, remember that you are worthy of happiness, kindness, and beautiful new beginnings. Keep glowing, bestie! 💕"
    },
    {
      emoji: "🎀",
      title: "A gift with no wrapping paper",
      message:
        "If this website could give you one thing, it would be a pocket full of happiness for every day. Stay amazing, Celine! 💗"
    }
  ];

  let lastMessageIndex = -1;

  function showSweetMessage() {
    let index;

    do {
      index = Math.floor(Math.random() * sweetMessages.length);
    } while (
      sweetMessages.length > 1 &&
      index === lastMessageIndex
    );

    lastMessageIndex = index;
    const item = sweetMessages[index];

    surpriseResult.querySelector(".surprise-result-icon").textContent =
      item.emoji;
    surpriseResult.querySelector("h3").textContent = item.title;
    surpriseResult.querySelector("p").textContent = item.message;

    surpriseResult.hidden = false;
    surpriseIllustration.textContent = item.emoji;
    surpriseHint.textContent = "Here's a little happiness for you! 💌";

    surpriseButton.textContent = "Surprise opened! 💗";
    surpriseButton.setAttribute("aria-expanded", "true");

    if (!reducedMotion) {
      for (let i = 0; i < 9; i++) {
        window.setTimeout(createHeart, i * 90);
      }
    }
  }

  surpriseButton.addEventListener("click", showSweetMessage);
  anotherSurprise.addEventListener("click", showSweetMessage);

  // ----------------------------------------
  // 4. Click-to-open friendship letter
  // ----------------------------------------

  const letterButton = document.getElementById("letterButton");
  const letterContent = document.getElementById("letterContent");
  const letterInstruction = document.getElementById("letterInstruction");

  letterButton.addEventListener("click", () => {
    const isOpen = letterButton.getAttribute("aria-expanded") === "true";
    const shouldOpen = !isOpen;

    letterButton.setAttribute("aria-expanded", String(shouldOpen));
    letterContent.hidden = !shouldOpen;

    letterInstruction.textContent = shouldOpen
      ? "Your letter is open 💌"
      : "Tap to open your letter ✉️";

    if (shouldOpen) {
      letterButton.querySelector(".envelope-heart").textContent = "💗";
      letterContent.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "nearest"
      });
    } else {
      letterButton.querySelector(".envelope-heart").textContent = "♥";
    }
  });

  // ----------------------------------------
  // 5. Friendship quiz
  // ----------------------------------------

  // These questions use the website itself rather than assuming
  // personal facts about Celine or Emmanuel.

  const quizQuestions = [
    {
      question: "Who made this little website for Celine?",
      options: [
        "Her favourite singer",
        "Emmanuel",
        "A random stranger",
        "A friendly robot"
      ],
      answer: 1,
      correct: "That's right! Emmanuel made this little world for you. 💗",
      incorrect: "It was Emmanuel! He made this website especially for you."
    },
    {
      question: "What is the main purpose of this website?",
      options: [
        "To sell shoes",
        "To teach mathematics",
        "To celebrate friendship",
        "To book flights"
      ],
      answer: 2,
      correct: "Exactly! It's a little celebration of your friendship. 🫶🏽",
      incorrect: "It's all about celebrating friendship and making you smile!"
    },
    {
      question: "What can you open by clicking on the envelope?",
      options: [
        "A secret letter",
        "A shopping cart",
        "A weather report",
        "A calculator"
      ],
      answer: 0,
      correct: "Yes! A sweet friendship letter is waiting inside. 💌",
      incorrect: "A sweet friendship letter! You can open and close it."
    },
    {
      question: "What's the best way to be a wonderful bestie?",
      options: [
        "Never listen",
        "Always compete",
        "Be kind, honest and supportive",
        "Ignore every message"
      ],
      answer: 2,
      correct: "Absolutely! Kindness, honesty and support matter. 💕",
      incorrect: "Being kind, honest and supportive is always a lovely start!"
    }
  ];

  const quizProgress = document.getElementById("quizProgress");
  const quizProgressFill = document.getElementById("quizProgressFill");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizFeedback = document.getElementById("quizFeedback");
  const quizNext = document.getElementById("quizNext");
  const quizQuestionArea = document.getElementById("quizQuestionArea");
  const quizResult = document.getElementById("quizResult");
  const quizResultEmoji = document.getElementById("quizResultEmoji");
  const quizResultTitle = document.getElementById("quizResultTitle");
  const quizResultText = document.getElementById("quizResultText");
  const restartQuiz = document.getElementById("restartQuiz");

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const item = quizQuestions[currentQuestion];
    answered = false;

    quizProgress.textContent =
      `QUESTION ${currentQuestion + 1} OF ${quizQuestions.length}`;

    quizProgressFill.style.width =
      `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

    quizQuestion.textContent = item.question;
    quizOptions.replaceChildren();
    quizFeedback.textContent = "";
    quizNext.disabled = true;

    quizNext.textContent =
      currentQuestion === quizQuestions.length - 1
        ? "See my results 💗"
        : "Next question →";

    item.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";

      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = String.fromCharCode(65 + index);

      const label = document.createElement("span");
      label.textContent = option;

      button.append(letter, label);
      button.addEventListener("click", () => selectAnswer(index));

      quizOptions.appendChild(button);
    });
  }

  function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const item = quizQuestions[currentQuestion];
    const buttons = quizOptions.querySelectorAll(".quiz-option");
    const isCorrect = selectedIndex === item.answer;

    buttons.forEach((button, index) => {
      button.disabled = true;

      if (index === item.answer) {
        button.classList.add("correct");
      }

      if (index === selectedIndex && !isCorrect) {
        button.classList.add("incorrect");
      }

      if (index === selectedIndex) {
        button.classList.add("selected");
      }
    });

    if (isCorrect) {
      score++;
      quizFeedback.textContent = item.correct;
    } else {
      quizFeedback.textContent = item.incorrect;
    }

    quizNext.disabled = false;
  }

  function showQuizResult() {
    quizQuestionArea.hidden = true;
    quizResult.hidden = false;

    quizProgress.textContent = "QUIZ COMPLETE!";
    quizProgressFill.style.width = "100%";

    quizResultEmoji.textContent =
      score === quizQuestions.length
        ? "🏆"
        : score >= 2
          ? "💖"
          : "🌷";

    quizResultTitle.textContent =
      score === quizQuestions.length
        ? "Friendship superstar!"
        : score >= 2
          ? "Lovely effort, bestie!"
          : "There's more to discover!";

    quizResultText.textContent =
      `You got ${score} out of ${quizQuestions.length} correct! ` +
      (
        score === quizQuestions.length
          ? "Perfect score! You know your way around Celine's little world. 💕"
          : "Keep exploring the website and enjoy all the little surprises! 💗"
      );
  }

  quizNext.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < quizQuestions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showQuizResult();
    }
  });

  restartQuiz.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answered = false;

    quizResult.hidden = true;
    quizQuestionArea.hidden = false;

    renderQuestion();

    document.getElementById("quizCard").scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center"
    });
  });

  renderQuestion();

  // ----------------------------------------
  // 6. Scroll reveal animations
  // ----------------------------------------

  const revealElements = document.querySelectorAll(
    ".section-heading, .reminder-card, .message-panel, " +
    ".surprise-box, .letter-envelope, .quiz-card, .final-heart"
  );

  if (!reducedMotion && "IntersectionObserver" in window) {
    document.body.classList.add("js-ready");

    revealElements.forEach(element => {
      element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // ----------------------------------------
  // 7. Footer year is not hardcoded:
  // keep the website simple and ready to use.
  // ----------------------------------------

  console.log("💗 Celine's World is ready. Made with care by Emmanuel!");
});
