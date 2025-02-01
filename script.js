let percentage = 0;
const progressCircle = document.getElementById("progress-circle");
const percentageText = document.getElementById("percentage-text");

const interval = setInterval(() => {
  if (percentage < 100) {
    percentage++;
    const dashArray = 283;
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    progressCircle.style.strokeDashoffset = dashOffset;
    percentageText.textContent = `${percentage}%`;
  } else {
    clearInterval(interval);
    document.getElementById("loading").style.display = "none";
    document.getElementById("completed").style.display = "block";
    document.getElementById("mentor-section").style.display = "block";
  }
}, 50);

function scrollToMentor() {
  document.getElementById("mentor-section").style.display = "block";
  document.getElementById("mentor-section").scrollIntoView({ behavior: "smooth" });
}

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBackground();
}

function drawBackground() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);


  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

 
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateParticles();
}

function createParticle() {
  let size = Math.random() * 3 + 1; 
  let speedX = Math.random() * 2 - 1; 
  let speedY = Math.random() * 2 - 1; 
  let opacity = Math.random() * 0.5 + 0.2; 

  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size,
    speedX,
    speedY,
    opacity
  };
}

function updateParticles() {
  if (particles.length < 200) {
    particles.push(createParticle());
  }

  particles.forEach((particle, index) => {
  
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
    ctx.fill();

  
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(drawBackground);
}

drawBackground();
