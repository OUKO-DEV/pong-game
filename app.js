const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const WINNING_SCORE = 10;

// Player
const player = {
  x: 20,
  y: HEIGHT / 2 - 50,
  width: 15,
  height: 100,
  speed: 7
};

// Computer
const computer = {
  x: WIDTH - 35,
  y: HEIGHT / 2 - 50,
  width: 15,
  height: 100,
  speed: 5
};

// Ball
const ball = {
  x: WIDTH / 2,
  y: HEIGHT / 2,
  radius: 9,
  speedX: 5,
  speedY: 4
};

let playerScore = 0;
let computerScore = 0;

let gameRunning = false;
let animationId = null;

let moveUp = false;
let moveDown = false;

// Draw rectangle
function drawRect(x, y, width, height) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, width, height);
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

// Draw center line
function drawCenterLine() {
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 10]);

  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();

  ctx.setLineDash([]);
}

// Draw game
function drawGame() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  drawCenterLine();

  drawRect(
    player.x,
    player.y,
    player.width,
    player.height
  );

  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height
  );

  drawBall();
}

// Move player
function movePlayer() {

  if (moveUp) {
    player.y -= player.speed;
  }

  if (moveDown) {
    player.y += player.speed;
  }

  // Keep player inside canvas
  if (player.y < 0) {
    player.y = 0;
  }

  if (player.y + player.height > HEIGHT) {
    player.y = HEIGHT - player.height;
  }
}

// Move computer
function moveComputer() {

  const computerCenter =
    computer.y + computer.height / 2;

  if (computerCenter < ball.y - 10) {
    computer.y += computer.speed;
  }

  if (computerCenter > ball.y + 10) {
    computer.y -= computer.speed;
  }

  if (computer.y < 0) {
    computer.y = 0;
  }

  if (computer.y + computer.height > HEIGHT) {
    computer.y = HEIGHT - computer.height;
  }
}

// Reset ball
function resetBall(direction) {

  ball.x = WIDTH / 2;
  ball.y = HEIGHT / 2;

  ball.speedX = 5 * direction;

  ball.speedY =
    (Math.random() > 0.5 ? 1 : -1) *
    (3 + Math.random() * 2);
}

// Ball collision with paddles
function paddleCollision(paddle) {

  return (
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.x + ball.radius > paddle.x &&
    ball.y - ball.radius < paddle.y + paddle.height &&
    ball.y + ball.radius > paddle.y
  );
}

// Move ball
function moveBall() {

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Top wall
  if (ball.y - ball.radius <= 0) {
    ball.y = ball.radius;
    ball.speedY *= -1;
  }

  // Bottom wall
  if (ball.y + ball.radius >= HEIGHT) {
    ball.y = HEIGHT - ball.radius;
    ball.speedY *= -1;
  }

  // Player paddle collision
  if (paddleCollision(player) && ball.speedX < 0) {

    ball.x = player.x + player.width + ball.radius;

    ball.speedX *= -1;

    const hitPosition =
      (ball.y - (player.y + player.height / 2)) /
      (player.height / 2);

    ball.speedY = hitPosition * 6;

    increaseSpeed();
  }

  // Computer paddle collision
  if (paddleCollision(computer) && ball.speedX > 0) {

    ball.x = computer.x - ball.radius;

    ball.speedX *= -1;

    const hitPosition =
      (ball.y - (computer.y + computer.height / 2)) /
      (computer.height / 2);

    ball.speedY = hitPosition * 6;

    increaseSpeed();
  }

  // Ball goes past player
  if (ball.x + ball.radius < 0) {

    computerScore++;

    updateScore();

    checkWinner();

    if (gameRunning) {
      resetBall(1);
    }
  }

  // Ball goes past computer
  if (ball.x - ball.radius > WIDTH) {

    playerScore++;

    updateScore();

    checkWinner();

    if (gameRunning) {
      resetBall(-1);
    }
  }
}

// Increase ball speed
function increaseSpeed() {

  const maxSpeed = 12;

  if (Math.abs(ball.speedX) < maxSpeed) {
    ball.speedX *= 1.08;
  }

  if (Math.abs(ball.speedY) < maxSpeed) {
    ball.speedY *= 1.05;
  }
}

// Update score
function updateScore() {

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

// Check winner
function checkWinner() {

  if (playerScore >= WINNING_SCORE) {

    gameRunning = false;

    alert("🏆 YOU WIN!");

    startBtn.textContent = "▶️ START";
  }

  if (computerScore >= WINNING_SCORE) {

    gameRunning = false;

    alert("🤖 COMPUTER WINS!");

    startBtn.textContent = "▶️ START";
  }
}

// Game loop
function gameLoop() {

  if (!gameRunning) {
    return;
  }

  movePlayer();
  moveComputer();
  moveBall();
  drawGame();

  animationId = requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {

  if (gameRunning) {
    return;
  }

  gameRunning = true;

  startBtn.textContent = "⏸️ PLAYING";

  gameLoop();
}

// Restart game
function restartGame() {

  cancelAnimationFrame(animationId);

  playerScore = 0;
  computerScore = 0;

  player.y = HEIGHT / 2 - player.height / 2;
  computer.y = HEIGHT / 2 - computer.height / 2;

  resetBall(
    Math.random() > 0.5 ? 1 : -1
  );

  updateScore();

  gameRunning = true;

  startBtn.textContent = "⏸️ PLAYING";

  gameLoop();
}

// Keyboard controls
document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowUp") {
    moveUp = true;
    event.preventDefault();
  }

  if (event.key === "ArrowDown") {
    moveDown = true;
    event.preventDefault();
  }

  if (event.code === "Space") {
    startGame();
  }
});

document.addEventListener("keyup", function(event) {

  if (event.key === "ArrowUp") {
    moveUp = false;
  }

  if (event.key === "ArrowDown") {
    moveDown = false;
  }
});

// Mobile UP button
upBtn.addEventListener("mousedown", () => {
  moveUp = true;
});

upBtn.addEventListener("mouseup", () => {
  moveUp = false;
});

upBtn.addEventListener("mouseleave", () => {
  moveUp = false;
});

upBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveUp = true;
});

upBtn.addEventListener("touchend", () => {
  moveUp = false;
});

// Mobile DOWN button
downBtn.addEventListener("mousedown", () => {
  moveDown = true;
});

downBtn.addEventListener("mouseup", () => {
  moveDown = false;
});

downBtn.addEventListener("mouseleave", () => {
  moveDown = false;
});

downBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveDown = true;
});

downBtn.addEventListener("touchend", () => {
  moveDown = false;
});

// Buttons
startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restartGame);

// Initial screen
drawGame();
