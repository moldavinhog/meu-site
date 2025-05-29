const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreEl = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");
const jumpSound = document.getElementById("jumpSound");

let isJumping = false;
let isGameOver = false;
let score = 0;
let speed = 5;
let cactusPosition = 800;
let animationFrame;

function jump() {
  if (isJumping) return;
  isJumping = true;
  dino.classList.add("jump");
  jumpSound?.play();

  dino.addEventListener("animationend", function handleAnimationEnd() {
    dino.classList.remove("jump");
    isJumping = false;
    dino.removeEventListener("animationend", handleAnimationEnd);
  });
}

function startGame() {
  isGameOver = false;
  score = 0;
  speed = 5;
  cactusPosition = 800;
  cactus.style.left = cactusPosition + "px";
  cactus.style.display = "block";
  gameOverText.style.display = "none";
  scoreEl.innerText = "Pontuação: 0";
  animate();
}

function animate() {
  if (isGameOver) return;

  cactusPosition -= speed;
  cactus.style.left = cactusPosition + "px";

  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();

  // Colisão AABB
  if (
    cactusRect.left < dinoRect.right &&
    cactusRect.right > dinoRect.left &&
    cactusRect.bottom > dinoRect.top &&
    cactusRect.top < dinoRect.bottom
  ) {
    gameOver();
    return;
  }

  if (cactusPosition < -30) {
    cactusPosition = 800;
    score++;
    scoreEl.innerText = "Pontuação: " + score;

    if (score % 5 === 0 && speed < 15) {
      speed += 1;
    }
  }

  animationFrame = requestAnimationFrame(animate);
}

function gameOver() {
  isGameOver = true;
  gameOverText.style.display = "block";
  cancelAnimationFrame(animationFrame);
  cactus.style.display = "none";
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (isGameOver) {
      startGame();
    } else {
      jump();
    }
  }
});

window.onload = startGame;
