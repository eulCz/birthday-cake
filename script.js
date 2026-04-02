const candle = document.getElementById("candle");
const flame = document.getElementById("flame");
const smoke = document.getElementById("smoke");
const message = document.getElementById("message");
const hintBtn = document.getElementById("hintBtn");

let blown = false;

function blowCandle() {
  if (blown) return;
  blown = true;

  flame.style.display = "none";
  smoke.classList.remove("hidden");

  setTimeout(() => {
    message.classList.remove("hidden");
    startConfetti();
  }, 500);

  hintBtn.textContent = "Wish granted ✨";
  hintBtn.disabled = true;
  hintBtn.style.opacity = "0.75";
  hintBtn.style.cursor = "default";
}

candle.addEventListener("click", blowCandle);
hintBtn.addEventListener("click", blowCandle);

// Simple confetti
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let pieces = [];
let animationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfetti() {
  pieces = [];
  const count = 160;

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: random(0, canvas.width),
      y: random(-canvas.height, 0),
      w: random(6, 12),
      h: random(8, 16),
      speed: random(2, 5),
      drift: random(-1.5, 1.5),
      rotation: random(0, Math.PI * 2),
      rotationSpeed: random(-0.15, 0.15),
      color: `hsl(${random(0, 360)}, 90%, 75%)`
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach((p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();

    p.y += p.speed;
    p.x += p.drift;
    p.rotation += p.rotationSpeed;

    if (p.y > canvas.height + 20) {
      p.y = -20;
      p.x = random(0, canvas.width);
    }
  });

  animationId = requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  createConfetti();
  drawConfetti();

  setTimeout(() => {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4500);
}