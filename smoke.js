
const canvas = document.getElementById("smokeCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const smokeParticles = [];

function createSmokeParticle(x, y, color) {
  return {
    x,
    y,
    alpha: 1,
    radius: Math.random() * 20 + 10,
    speedY: Math.random() * 0.5 + 0.5,
    driftX: Math.random() * 1 - 0.5,
    color
  };
}

function animateSmoke() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  smokeParticles.forEach(p => {
    p.y -= p.speedY;
    p.x += p.driftX;
    p.alpha -= 0.002;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
  });

  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    if (smokeParticles[i].alpha <= 0) {
      smokeParticles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateSmoke);
}

function emitSmoke() {
  const baseY = canvas.height - 180;
  const chimneyXs = [150, 250, 340, 440, 530, 620];
  const colors = ["232,226,213", "132,132,132", "101,83,66"];

  chimneyXs.forEach((x, i) => {
    const color = colors[i % colors.length];
    for (let j = 0; j < 2; j++) {
      smokeParticles.push(createSmokeParticle(x, baseY, color));
    }
  });

  setTimeout(emitSmoke, 250);
}

emitSmoke();
animateSmoke();
