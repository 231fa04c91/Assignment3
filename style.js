const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 20;

let snake;
let food;
let direction;
let score;
let game;

function startGame() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = null;
  score = 0;
  generateFood();
  clearInterval(game);
  game = setInterval(draw, 100);
  document.getElementById("score").textContent = score;
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
  };
}

// Fix: Use "keydown" on window and ensure it triggers immediately
window.addEventListener("keydown", (event) => {
  const key = event.key;
  if ((key === "ArrowLeft" || key === "a") && direction !== "RIGHT") {
    direction = "LEFT";
  } else if ((key === "ArrowUp" || key === "w") && direction !== "DOWN") {
    direction = "UP";
  } else if ((key === "ArrowRight" || key === "d") && direction !== "LEFT") {
    direction = "RIGHT";
  } else if ((key === "ArrowDown" || key === "s") && direction !== "UP") {
    direction = "DOWN";
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#fff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    collision(headX, headY, snake)
  ) {
    clearInterval(game);
    alert("💥 Game Over! Your score: " + score);
    return;
  }

  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").textContent = score;
    generateFood();
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };
  snake.unshift(newHead);
}

function collision(x, y, array) {
  return array.some(segment => segment.x === x && segment.y === y);
}

startGame();
