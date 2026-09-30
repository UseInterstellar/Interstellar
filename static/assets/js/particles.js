function initSmokeParticles() {
  if (document.getElementById("smoke-particles")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "smoke-particles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);
  const context = canvas.getContext("2d");
  const smokeTexture = new Image();
  smokeTexture.src = "/assets/media/background/smoke-element.png";
  const particles = [];
  const textureCanvas = document.createElement("canvas");
  const textureContext = textureCanvas.getContext("2d");
  let width = 0;
  let height = 0;
  let textureReady = false;
  let textureColor = "";

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function tintTexture(color) {
    if (!textureReady || textureColor === color) return;
    textureColor = color;
    textureCanvas.width = smokeTexture.naturalWidth;
    textureCanvas.height = smokeTexture.naturalHeight;
    textureContext.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
    textureContext.drawImage(smokeTexture, 0, 0);
    textureContext.globalCompositeOperation = "source-atop";
    textureContext.fillStyle = color;
    textureContext.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
    textureContext.globalCompositeOperation = "source-over";
  }

  function resetParticle(particle, initial = false) {
    particle.size = 220 + Math.random() * 280;
    particle.x = Math.random() * width;
    particle.y = initial ? Math.random() * height : height + particle.size;
    particle.rotation = Math.random() * Math.PI * 2;
    particle.rotationSpeed = (Math.random() - 0.5) * 0.0012;
    particle.velocityX = (Math.random() - 0.5) * 0.5;
    particle.velocityY = (Math.random() - 0.5) * 0.5;
    particle.flow = Math.random() * Math.PI * 2;
    particle.opacity = 0.09 + Math.random() * 0.12;
  }

  function animate() {
    const color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#ffffff";
    tintTexture(color);
    context.clearRect(0, 0, width, height);
    for (const particle of particles) {
      particle.flow += 0.006;
      particle.x += particle.velocityX + Math.sin(particle.flow) * 0.24;
      particle.y += particle.velocityY + Math.cos(particle.flow * 0.7) * 0.08;
      particle.rotation += particle.rotationSpeed;
      if (particle.y < -particle.size) particle.y = height + particle.size;
      if (particle.x < -particle.size) particle.x = width + particle.size;
      if (particle.x > width + particle.size) particle.x = -particle.size;

      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.globalAlpha = particle.opacity;
      context.globalCompositeOperation = "screen";
      if (textureReady) context.drawImage(textureCanvas, -particle.size / 2, -particle.size / 2, particle.size, particle.size);
      context.restore();
    }
    requestAnimationFrame(animate);
  }

  smokeTexture.onload = () => {
    textureReady = true;
    tintTexture(getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#ffffff");
  };

  resize();
  for (let index = 0; index < 220; index += 1) {
    const particle = {};
    resetParticle(particle, true);
    particles.push(particle);
  }
  window.addEventListener("resize", resize);
  animate();
}

function initStarParticles() {
  ["stars", "stars2", "stars3"].forEach(id => {
    if (!document.getElementById(id)) {
      const el = document.createElement("div");
      el.id = id;
      document.body.insertBefore(el, document.body.firstChild);
    }
  });
}

function isTabsPage() {
  try {
    return window.top.location.pathname === "/tabs";
  } catch {
    try {
      return window.parent.location.pathname === "/tabs";
    } catch {
      return false;
    }
  }
}

if (!isTabsPage()) {
  const particleMode = store.get("particles");
  if (particleMode === "smoke") {
    initSmokeParticles();
  } else if (particleMode !== "false") {
    initStarParticles();
  }
}
