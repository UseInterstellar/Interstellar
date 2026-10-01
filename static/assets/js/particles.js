function initSmokeParticles() {
  if (document.getElementById("smoke-particles")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "smoke-particles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");
  const smokeTexture = new Image();
  smokeTexture.src = "/assets/media/background/smoke-element.png";
  const particles = [];
  const sessionStateKey = "particles";
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

  function saveParticleState() {
    try {
      sessionStorage.setItem(sessionStateKey, JSON.stringify({ mode: "smoke", savedAt: Date.now(), particles }));
    } catch {}
  }

  function restoreParticleState() {
    try {
      const state = JSON.parse(sessionStorage.getItem(sessionStateKey) || "null");
      if (state?.mode === "smoke" && Array.isArray(state.particles)) {
        particles.length = 0;
        particles.push(...state.particles);
      }
    } catch {}
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
  restoreParticleState();
  window.addEventListener("resize", resize);
  window.addEventListener("pagehide", saveParticleState);
  window.setInterval(saveParticleState, 3000);
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

function initAuroraParticles() {
  if (document.getElementById("aurora-particles")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "aurora-particles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);
  const gl = canvas.getContext("webgl", { alpha: true }) || canvas.getContext("experimental-webgl");
  if (!gl) return;

  const vertexSource = `
    precision mediump float;
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = 0.5 * (a_position + 1.0);
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec2 v_uv;
    uniform float u_time;
    uniform float u_ratio;
    uniform vec3 u_color;

    vec2 rotate(vec2 uv, float angle) {
      return mat2(cos(angle), sin(angle), -sin(angle), cos(angle)) * uv;
    }

    float neuro_shape(vec2 uv, float time) {
      vec2 sine_acc = vec2(0.0);
      vec2 result = vec2(0.0);
      float scale = 8.0;
      for (int layer = 0; layer < 15; layer++) {
        uv = rotate(uv, 1.0);
        sine_acc = rotate(sine_acc, 1.0);
        vec2 current = uv * scale + float(layer) + sine_acc - time;
        sine_acc += sin(current) + 0.28;
        result += (0.5 + 0.5 * cos(current)) / scale;
        scale *= 1.2;
      }
      return result.x + result.y;
    }

    void main() {
      vec2 uv = 0.5 * v_uv;
      uv.x *= u_ratio;
      float noise = neuro_shape(uv, 0.0008 * u_time);
      noise = 1.2 * pow(noise, 3.0);
      noise += pow(noise, 10.0);
      noise = max(0.0, noise - 0.5);
      noise *= 1.0 - length(v_uv - 0.5);
      gl_FragColor = vec4(u_color * noise, noise * 0.9);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const time = gl.getUniformLocation(program, "u_time");
  const ratio = gl.getUniformLocation(program, "u_ratio");
  const color = gl.getUniformLocation(program, "u_color");
  const sessionStateKey = "interstellar-particle-session";
  let timeOffset = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(ratio, canvas.width / canvas.height);
  };
  const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().replace("#", "");
  const rgb = /^[0-9a-f]{6}$/i.test(themeColor) ? [0, 2, 4].map(index => Number.parseInt(themeColor.slice(index, index + 2), 16) / 255) : [0.4, 0.8, 1.0];

  resize();
  gl.uniform3f(color, rgb[0], rgb[1], rgb[2]);
  try {
    const state = JSON.parse(sessionStorage.getItem(sessionStateKey) || "null");
    if (state?.mode === "aurora" && Number.isFinite(state.time)) timeOffset = state.time + Math.max(0, Date.now() - Number(state.savedAt));
  } catch {}
  const saveAuroraState = () => {
    try {
      sessionStorage.setItem(sessionStateKey, JSON.stringify({ mode: "aurora", savedAt: Date.now(), time: performance.now() + timeOffset }));
    } catch {}
  };
  window.addEventListener("resize", resize);
  window.addEventListener("pagehide", saveAuroraState);
  window.setInterval(saveAuroraState, 3000);
  const render = now => {
    gl.uniform1f(time, now + timeOffset);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

function initShimmeringDots() {
  if (document.getElementById("shimmering-dots-particles")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "shimmering-dots-particles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");
  const patternNames = ["grid", "wiggle", "wiggle-grid", "starfield", "twist", "displace", "shimmer", "organic", "shimmer-aurora", "morph", "meteors"];
  const savedMode = store.get("particles");
  const savedPattern = store.get("shimmerPattern");
  const settings = {
    pattern: savedPattern || (patternNames.includes(savedMode) ? savedMode : "grid"),
    speed: Number(store.get("shimmerSpeed")) || 1,
    brightness: Number(store.get("shimmerBrightness")) || 1,
    dotSize: Number(store.get("shimmerDotSize")) || 2,
    density: Number(store.get("shimmerDensity")) || 1,
    scale: Number(store.get("shimmerScale")) || 1,
    vignette: Number(store.get("shimmerVignette")) || 1,
  };
  let width = 0;
  let height = 0;
  let cells = [];
  let wiggleParticles = [];
  let previousFrame = 0;
  let lastPattern = settings.pattern;

  function rebuild() {
    const spacing = Math.max(10, Math.min(60, (28 * settings.scale) / settings.density));
    cells = [];
    for (let y = spacing / 2; y < height + spacing; y += spacing) {
      for (let x = spacing / 2; x < width + spacing; x += spacing) {
        cells.push({ x, y, phase: Math.random() * Math.PI * 2, seed: Math.random() });
      }
    }
  }

  function rebuildWiggle() {
    const count = Math.max(80, Math.round(340 * settings.density));
    const speed = Math.max(0.05, settings.speed);
    wiggleParticles = Array.from({ length: count }, () => {
      const baseX = Math.random() * width;
      const baseY = Math.random() * height;
      const driftRate = 0.5 + Math.random();
      const twinkleRate = 0.5 + Math.random();
      const driftDuration = (1200 + Math.random() * 2400) / (speed * driftRate);
      const twinkleDuration = (600 + Math.random() * 1600) / (speed * settings.twinkle * twinkleRate);
      const opacity = Math.random();
      const scale = 0.1 + Math.random() * 1.9;
      return {
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        fromX: baseX,
        fromY: baseY,
        toX: baseX + (Math.random() * 2 - 1) * 20,
        toY: baseY + (Math.random() * 2 - 1) * 20,
        driftRate,
        twinkleRate,
        driftElapsed: Math.random() * driftDuration,
        driftDuration,
        driftState: Math.random() < 0.75 ? "animating" : "waiting",
        twinkleElapsed: Math.random() * twinkleDuration,
        twinkleDuration,
        twinkleState: Math.random() < 0.75 ? "animating" : "waiting",
        opacity,
        fromOpacity: opacity,
        targetOpacity: Math.random(),
        scale,
        fromScale: scale,
        targetScale: 0.1 + Math.random() * 1.9,
        size: 0.5 + Math.random() * 0.7,
      };
    });
  }

  function easeInOut(value) {
    return value * value * (3 - 2 * value);
  }

  function drawWiggle(delta) {
    const speed = Math.max(0, settings.speed);
    const dt = (delta / 1000) * speed;
    for (const particle of wiggleParticles) {
      particle.driftElapsed += dt * 1000;
      if (particle.driftState === "waiting") {
        if (particle.driftElapsed >= particle.driftDuration) {
          particle.driftState = "animating";
          particle.driftElapsed = 0;
          particle.fromX = particle.x;
          particle.fromY = particle.y;
          particle.toX = particle.baseX + (Math.random() * 2 - 1) * 20;
          particle.toY = particle.baseY + (Math.random() * 2 - 1) * 20;
          particle.driftDuration = (1200 + Math.random() * 2400) / (Math.max(0.05, settings.speed) * particle.driftRate);
        }
      } else {
        const driftProgress = easeInOut(Math.min(1, particle.driftElapsed / particle.driftDuration));
        particle.x = particle.fromX + (particle.toX - particle.fromX) * driftProgress;
        particle.y = particle.fromY + (particle.toY - particle.fromY) * driftProgress;
        if (particle.driftElapsed >= particle.driftDuration) {
          particle.driftState = "waiting";
          particle.driftElapsed = 0;
          particle.driftDuration = ((1200 + Math.random() * 2400) / (Math.max(0.05, settings.speed) * particle.driftRate)) * 0.5;
        }
      }

      particle.twinkleElapsed += dt * 1000;
      if (particle.twinkleState === "waiting") {
        if (particle.twinkleElapsed >= particle.twinkleDuration) {
          particle.twinkleState = "animating";
          particle.twinkleElapsed = 0;
          particle.fromOpacity = particle.opacity;
          particle.fromScale = particle.scale;
          particle.targetOpacity = Math.random();
          particle.targetScale = 0.1 + Math.random() * 1.9;
          particle.twinkleDuration = (600 + Math.random() * 1600) / (Math.max(0.05, settings.speed) * settings.twinkle * particle.twinkleRate);
        }
      } else {
        const twinkleProgress = easeInOut(Math.min(1, particle.twinkleElapsed / particle.twinkleDuration));
        particle.opacity = particle.fromOpacity + (particle.targetOpacity - particle.fromOpacity) * twinkleProgress;
        particle.scale = particle.fromScale + (particle.targetScale - particle.fromScale) * twinkleProgress;
        if (particle.twinkleElapsed >= particle.twinkleDuration) {
          particle.twinkleState = "waiting";
          particle.twinkleElapsed = 0;
          particle.twinkleDuration = ((600 + Math.random() * 1600) / (Math.max(0.05, settings.speed) * 3.45 * particle.twinkleRate)) * 0.4;
        }
      }
      const alpha = Math.min(1, particle.opacity * settings.brightness);
      if (alpha <= 0.005) continue;
      context.fillStyle = colorWithAlpha(alpha);
      context.beginPath();
      context.arc(particle.x, particle.y, Math.max(0.35, particle.size * particle.scale * (settings.dotSize / 2)), 0, Math.PI * 2);
      context.fill();
    }
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    rebuild();
    rebuildWiggle();
  }

  function colorWithAlpha(alpha) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(raw)) return `rgba(255, 255, 255, ${alpha})`;
    const red = Number.parseInt(raw.slice(0, 2), 16);
    const green = Number.parseInt(raw.slice(2, 4), 16);
    const blue = Number.parseInt(raw.slice(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  function draw(now) {
    const time = now * 0.001 * settings.speed;
    const delta = previousFrame ? Math.min(50, now - previousFrame) : 16;
    previousFrame = now;
    context.clearRect(0, 0, width, height);
    if (settings.pattern !== lastPattern) {
      lastPattern = settings.pattern;
      if (settings.pattern === "wiggle") rebuildWiggle();
    }
    if (settings.pattern === "wiggle") {
      drawWiggle(delta);
      requestAnimationFrame(draw);
      return;
    }
    for (const cell of cells) {
      const nx = cell.x / Math.max(width, 1) - 0.5;
      const ny = cell.y / Math.max(height, 1) - 0.5;
      let intensity = 0.35;
      let offsetX = 0;
      let offsetY = 0;
      switch (settings.pattern) {
        case "wiggle-grid":
          offsetX = Math.sin(time * 0.35 + cell.phase) * 5;
          offsetY = Math.cos(time * 0.28 + cell.phase) * 5;
          intensity = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(time * 1.2 + cell.phase));
          break;
        case "starfield":
          intensity = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(time * (0.5 + cell.seed) + cell.phase));
          break;
        case "twist": {
          const angle = Math.atan2(ny, nx) + time * 0.18;
          const radius = Math.hypot(nx, ny);
          intensity = Math.max(0, Math.cos(radius * 28 - angle * 3) * (1 - radius * 1.2));
          break;
        }
        case "displace":
          offsetX = Math.sin(time * 0.4 + ny * 12) * 9;
          offsetY = Math.cos(time * 0.32 + nx * 10) * 9;
          intensity = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(time + cell.phase));
          break;
        case "shimmer":
          intensity = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(time * 1.5 + cell.x * 0.025 + cell.y * 0.018 + cell.phase));
          break;
        case "organic":
          offsetX = Math.sin(ny * 10 + time * 0.35) * 8;
          offsetY = Math.cos(nx * 12 - time * 0.3) * 8;
          intensity = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(nx * 16 + ny * 13 + time));
          break;
        case "shimmer-aurora":
          intensity = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(nx * 14 + time * 0.7 + Math.sin(ny * 8 + time)));
          break;
        case "morph":
          intensity = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(nx * 17 + Math.sin(ny * 10 + time) * 3 - time));
          break;
        case "meteors": {
          const trail = (cell.x + cell.y - time * 180) % (width + height);
          intensity = trail > 0 && trail < 75 ? 0.9 : 0.08;
          offsetX = -trail * 0.08;
          offsetY = -trail * 0.04;
          break;
        }
        default:
          intensity = 0.3;
      }
      const edge = Math.max(0, 1 - settings.vignette * Math.max(Math.abs(nx), Math.abs(ny)) * 1.35);
      const alpha = Math.max(0, Math.min(1, intensity * edge * settings.brightness * 0.55));
      if (alpha < 0.01) continue;
      context.fillStyle = colorWithAlpha(alpha);
      context.beginPath();
      context.arc(cell.x + offsetX, cell.y + offsetY, Math.max(0.5, settings.dotSize * (0.55 + intensity * 0.7)), 0, Math.PI * 2);
      context.fill();
    }
    requestAnimationFrame(draw);
  }

  window.updateShimmeringDots = values => {
    Object.assign(settings, values);
    if (values.density || values.scale) rebuild();
    if (values.density) rebuildWiggle();
  };
  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

function initShimmeringDotsSource() {
  if (document.getElementById("shimmering-dots-source-particles")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "shimmering-dots-source-particles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");
  if (!context) return;

  const patterns = ["grid", "wiggle", "wiggle-grid", "starfield", "twist", "displace", "shimmer", "organic", "shimmer-aurora", "morph", "meteors"];
  const storedPattern = store.get("shimmerPattern");
  const particleMode = store.get("particles");
  const activePattern = patterns.includes(storedPattern) ? storedPattern : patterns.includes(particleMode) ? particleMode : "grid";
  const readModeSetting = (key, fallback) => {
    const rawValue = store.get(`particle_${activePattern}_${key}`);
    const value = Number(rawValue);
    return rawValue !== undefined && rawValue !== null && rawValue !== "" && Number.isFinite(value) ? value : fallback;
  };
  const settings = {
    pattern: activePattern,
    speed: readModeSetting("speed", activePattern === "wiggle" ? 0.6 : activePattern === "displace" || activePattern === "meteors" ? (activePattern === "meteors" ? 500 : 50) : Number(store.get("shimmerSpeed")) || 1),
    brightness: readModeSetting("brightness", Number(store.get("shimmerBrightness")) || 1),
    dotSize: readModeSetting("dotSize", Number(store.get("shimmerDotSize")) || 2),
    density: readModeSetting("density", Number(store.get("shimmerDensity")) || 1),
    scale: readModeSetting("scale", Number(store.get("shimmerScale")) || 1),
    vignette: readModeSetting("vignette", Number(store.get("shimmerVignette")) || 1),
    opacity: readModeSetting("opacity", 1),
    gap: readModeSetting("gap", activePattern === "grid" ? 32 : 25),
    size: readModeSetting("size", 3.5),
    count: readModeSetting("count", activePattern === "meteors" ? 2 : 340),
    sizeRange: readModeSetting("sizeRange", 0.7),
    twinkle: readModeSetting("twinkle", 3.45),
    drift: readModeSetting("drift", 20),
    faded: readModeSetting("faded", 0.03),
    duration: readModeSetting("duration", 4200),
    spacing: readModeSetting("spacing", 15),
    waveX: readModeSetting("waveX", 0.25),
    waveY: readModeSetting("waveY", 0.21),
    base: readModeSetting("base", 0.2),
    intensity: readModeSetting("intensity", 3),
    emission: readModeSetting("emission", 20),
    lifetime: readModeSetting("lifetime", 11),
    forceRadius: readModeSetting("forceRadius", 120),
    force: readModeSetting("force", 470),
    friction: readModeSetting("friction", 0.92),
    peak: readModeSetting("peak", 1),
    twist: readModeSetting("twist", 1.5),
    arms: readModeSetting("arms", 2),
    spin: readModeSetting("spin", 0.42),
    floor: readModeSetting("floor", 0),
    zoom: readModeSetting("zoom", 60),
    angle: readModeSetting("angle", 20),
    lifespan: readModeSetting("lifespan", 0.7),
    fadeSpeed: readModeSetting("fadeSpeed", 0.2),
    length: readModeSetting("length", 240),
    width: readModeSetting("width", 2),
    delay: readModeSetting("delay", 5),
  };
  let width = 0;
  let height = 0;
  let cells = [];
  let fieldCells = [];
  let shimmerCells = [];
  let stars = [];
  let gridPixels = [];
  let wiggleParticles = [];
  let floaters = [];
  let meteors = [];
  let pointerForces = [];
  let previousFrame = 0;
  let animationTime = 0;
  let lastStateSave = 0;
  let lastPattern = settings.pattern;
  const tau = Math.PI * 2;
  const clamp01 = value => Math.max(0, Math.min(1, value));
  const sessionStateKey = "interstellar-particle-session";

  function saveParticleState() {
    try {
      const now = performance.now() / 1000;
      sessionStorage.setItem(
        sessionStateKey,
        JSON.stringify({
          pattern: settings.pattern,
          savedAt: Date.now(),
          animationTime,
          width,
          height,
          stars,
          gridPixels,
          wiggleParticles,
          floaters: floaters.map(floater => ({ ...floater, age: now - floater.birth })),
          meteors,
        }),
      );
      lastStateSave = now;
    } catch {}
  }

  function restoreParticleState() {
    try {
      const rawState = sessionStorage.getItem(sessionStateKey);
      if (!rawState) return;
      const state = JSON.parse(rawState);
      if (!state || state.pattern !== settings.pattern) return;
      const now = performance.now() / 1000;
      const elapsedSinceSave = Math.max(0, (Date.now() - Number(state.savedAt)) / 1000);
      if (Number.isFinite(state.animationTime)) animationTime = state.animationTime + elapsedSinceSave;
      if (Array.isArray(state.stars)) stars = state.stars;
      if (Array.isArray(state.gridPixels)) gridPixels = state.gridPixels;
      if (Array.isArray(state.wiggleParticles)) wiggleParticles = state.wiggleParticles;
      if (Array.isArray(state.floaters)) {
        floaters = state.floaters.map(({ age, ...floater }) => ({ ...floater, birth: now - Math.max(0, Number(age) || 0) }));
      }
      if (Array.isArray(state.meteors)) meteors = state.meteors.slice(0, 3);
    } catch {}
  }

  function seededRandom(seed) {
    let value = seed | 0;
    return () => {
      value = (value + 0x6d2b79f5) | 0;
      let result = Math.imul(value ^ (value >>> 15), 1 | value);
      result = (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result;
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function colorWithAlpha(alpha) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(raw)) return `rgba(255,255,255,${alpha * settings.opacity})`;
    const red = Number.parseInt(raw.slice(0, 2), 16);
    const green = Number.parseInt(raw.slice(2, 4), 16);
    const blue = Number.parseInt(raw.slice(4, 6), 16);
    return `rgba(${red},${green},${blue},${alpha * settings.opacity})`;
  }

  function morphColorWithAlpha(alpha, intensity) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(raw)) return `rgba(255,255,255,${alpha * settings.opacity})`;
    const blend = clamp01(intensity * 0.7);
    const red = Math.round(Number.parseInt(raw.slice(0, 2), 16) + (255 - Number.parseInt(raw.slice(0, 2), 16)) * blend);
    const green = Math.round(Number.parseInt(raw.slice(2, 4), 16) + (255 - Number.parseInt(raw.slice(2, 4), 16)) * blend);
    const blue = Math.round(Number.parseInt(raw.slice(4, 6), 16) + (255 - Number.parseInt(raw.slice(4, 6), 16)) * blend);
    return `rgba(${red},${green},${blue},${alpha * settings.opacity})`;
  }

  function makeFieldCells(pitch) {
    const result = [];
    if (pitch <= 0) return result;
    const maxX = Math.ceil(width / (2 * height) / pitch) + 1;
    const maxY = Math.ceil(0.5 / pitch) + 1;
    for (let ky = -maxY; ky <= maxY; ky++) {
      const v = ky * pitch;
      const y = v * height + height / 2;
      if (y < -4 || y > height + 4) continue;
      const normalizedY = (y - height / 2) / height;
      for (let kx = -maxX; kx <= maxX; kx++) {
        const u = kx * pitch;
        const x = u * height + width / 2;
        if (x < -4 || x > width + 4) continue;
        const normalizedX = (x - width / 2) / width;
        result.push({ x, y, u, v, length: Math.hypot(u, v), distance: normalizedX * normalizedX + normalizedY * normalizedY });
      }
    }
    return result;
  }

  function buildStars(quantity, seed) {
    const random = seededRandom(seed);
    stars = Array.from({ length: Math.max(0, Math.floor(quantity)) }, () => ({
      x: random(),
      y: random(),
      size: random(),
      duration: random(),
      phase: random() * tau,
    }));
  }

  function rebuildWiggle() {
    const count = Math.max(0, Math.floor(settings.count * settings.density));
    wiggleParticles = Array.from({ length: count }, () => {
      const baseX = Math.random() * width;
      const baseY = Math.random() * height;
      const driftRate = 0.5 + Math.random();
      const twinkleRate = 0.5 + Math.random();
      const size = 0.5 + Math.random() * Math.max(0.1, settings.sizeRange);
      const scale = 0.1 + Math.random() * 1.9;
      return {
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        fromX: baseX,
        fromY: baseY,
        toX: baseX + (Math.random() * 2 - 1) * settings.drift,
        toY: baseY + (Math.random() * 2 - 1) * settings.drift,
        driftRate,
        twinkleRate,
        size,
        scale,
        fromOpacity: Math.random(),
        opacity: Math.random(),
        targetOpacity: Math.random(),
        fromScale: scale,
        targetScale: 0.1 + Math.random() * 1.9,
        driftElapsed: Math.random() * 2000,
        driftDuration: 1200 + Math.random() * 2400,
        twinkleElapsed: Math.random() * 1200,
        twinkleDuration: 600 + Math.random() * 1600,
        driftState: Math.random() < 0.75 ? "animating" : "waiting",
        twinkleState: Math.random() < 0.75 ? "animating" : "waiting",
      };
    });
  }

  function spawnFloater(now, ageOffset = 0) {
    const jitter = 1 + (Math.random() * 2 - 1) * 0.15;
    return {
      x: Math.random() * width,
      y: height * (0.3 + Math.random() * 0.75),
      size: Math.random(),
      speed: Math.random(),
      drift: Math.random() * 2 - 1,
      phase: Math.random() * tau,
      vx: 0,
      vy: 0,
      birth: now - ageOffset,
      lifetime: Math.max(0.5, settings.lifetime * jitter),
      peak: 0.9,
    };
  }

  function spawnMeteor() {
    const angle = ((settings.angle + (Math.random() * 2 - 1) * 12) * Math.PI) / 180;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const px = -dy;
    const py = dx;
    const corners = [
      [0, 0],
      [width, 0],
      [0, height],
      [width, height],
    ];
    const along = corners.map(point => point[0] * dx + point[1] * dy);
    const across = corners.map(point => point[0] * px + point[1] * py);
    const minAlong = Math.min(...along);
    const maxAlong = Math.max(...along);
    const minAcross = Math.min(...across);
    const maxAcross = Math.max(...across);
    const reach = Math.max(0.05, Math.min(0.95, settings.lifespan * (0.35 + Math.random() * 1.3)));
    const spawnDelay = Math.random() < 0.1 ? 0.02 : 0.4 + Math.random() * 0.6;
    const fadeFraction = Math.min(0.98, Math.max(0.02, settings.fadeSpeed * (0.25 + Math.random() * 1.5)));
    const trailLength = settings.length * (0.65 + Math.random() * 0.7);
    return {
      dx,
      dy,
      px,
      py,
      minAlong,
      length: Math.max(1, maxAlong - minAlong),
      cross: minAcross + Math.random() * (maxAcross - minAcross),
      reach,
      fadeStart: reach * fadeFraction,
      trailLength,
      opacityScale: 0.65 + Math.random() * 0.35,
      progress: -spawnDelay,
      speed: settings.speed * (0.3 + Math.random() * 1.4),
      state: "active",
      timer: 0,
    };
  }

  function rebuild() {
    const spacing = Math.max(4, (settings.pattern === "twist" ? settings.gap : settings.pattern === "grid" ? settings.gap : settings.pattern === "wiggle-grid" ? 28 * settings.scale : 32) / settings.density);
    cells = [];
    for (let x = spacing / 2; x < width; x += spacing) for (let y = spacing / 2; y < height; y += spacing) cells.push({ x, y });
    const diagonal = Math.hypot(width, height);
    gridPixels = [];
    for (let x = 0; x < width; x += spacing)
      for (let y = 0; y < height; y += spacing)
        gridPixels.push({
          x,
          y,
          size: 0,
          minimum: 0.35,
          maximum: Math.max(0.7, (settings.pattern === "grid" ? settings.size : settings.dotSize) * (0.55 + Math.random() * 0.45)),
          sizeStep: Math.random() * 0.4,
          speed: Math.max(0.001, settings.speed * 0.001 * (0.55 + Math.random() * 0.9)),
          delay: Math.random() * diagonal * 2,
          counter: Math.random() * diagonal * 1.5,
          counterStep: Math.random() * 4 + (width + height) * 0.01,
          reverse: false,
          shimmering: false,
        });
    fieldCells = makeFieldCells((settings.pattern === "organic" ? 0.02 : 0.018) / Math.max(0.01, settings.density));
    shimmerCells = [];
    const shimmerSpacing = Math.max(4, settings.spacing / settings.density);
    const cols = Math.floor(width / shimmerSpacing) + 2;
    const rows = Math.floor(height / shimmerSpacing) + 2;
    for (let row = 0; row <= rows; row++)
      for (let col = 0; col <= cols; col++) {
        const hash = (Math.imul(row, 73856093) ^ Math.imul(col, 19349663)) >>> 0;
        shimmerCells.push({ x: col * shimmerSpacing, y: row * shimmerSpacing, col, row, phase: ((hash & 255) / 255) * tau, frequency: 0.7 + ((hash >>> 8) & 255) / 255 });
      }
    rebuildWiggle();
    buildStars((settings.pattern === "starfield" ? settings.count : settings.pattern === "meteors" ? 800 : 550) * settings.density, Number(store.get(`particle_${activePattern}_seed`)) || 12345);
    const now = performance.now() / 1000;
    floaters = Array.from({ length: activePattern === "displace" ? Math.floor(settings.count) : 260 }, (_, index) => {
      const floater = spawnFloater(now, Math.random() * 2);
      floater.x = (((index % 32) + Math.random() * 0.8) / 32) * width;
      floater.y = height * (0.05 + (((index * 37) % 260) / 260) * 0.95);
      floater.birth = now - Math.random() * 7;
      return floater;
    });
    meteors = Array.from({ length: Math.min(3, Math.max(1, Math.floor(settings.count))) }, spawnMeteor);
  }

  function drawWiggle(dt) {
    const speed = Math.max(0.05, settings.speed) * 1.35;
    const ease = value => value * value * (3 - 2 * value);
    for (const particle of wiggleParticles) {
      particle.driftElapsed += dt * speed;
      if (particle.driftState === "waiting") {
        if (particle.driftElapsed >= particle.driftDuration) {
          particle.driftState = "animating";
          particle.driftElapsed = 0;
          particle.fromX = particle.x;
          particle.fromY = particle.y;
          particle.toX = particle.baseX + (Math.random() * 2 - 1) * settings.drift;
          particle.toY = particle.baseY + (Math.random() * 2 - 1) * settings.drift;
          particle.driftDuration = (1200 + Math.random() * 2400) / (speed * particle.driftRate);
        }
      } else {
        const progress = ease(Math.min(1, particle.driftElapsed / particle.driftDuration));
        particle.x = particle.fromX + (particle.toX - particle.fromX) * progress;
        particle.y = particle.fromY + (particle.toY - particle.fromY) * progress;
        if (particle.driftElapsed >= particle.driftDuration) {
          particle.driftState = "waiting";
          particle.driftElapsed = 0;
          particle.driftDuration *= 0.5;
        }
      }
      particle.twinkleElapsed += dt * speed;
      if (particle.twinkleState === "waiting") {
        if (particle.twinkleElapsed >= particle.twinkleDuration) {
          particle.twinkleState = "animating";
          particle.twinkleElapsed = 0;
          particle.fromOpacity = particle.opacity;
          particle.fromScale = particle.scale;
          particle.targetOpacity = Math.random();
          particle.targetScale = 0.1 + Math.random() * 1.9;
          particle.twinkleDuration = (600 + Math.random() * 1600) / (speed * 3.45 * particle.twinkleRate);
        }
      } else {
        const progress = ease(Math.min(1, particle.twinkleElapsed / particle.twinkleDuration));
        particle.opacity = particle.fromOpacity + (particle.targetOpacity - particle.fromOpacity) * progress;
        particle.scale = particle.fromScale + (particle.targetScale - particle.fromScale) * progress;
        if (particle.twinkleElapsed >= particle.twinkleDuration) {
          particle.twinkleState = "waiting";
          particle.twinkleElapsed = 0;
          particle.twinkleDuration *= 0.4;
        }
      }
      const alpha = Math.min(1, particle.opacity * settings.brightness * 0.85);
      if (alpha > 0.005) {
        context.fillStyle = colorWithAlpha(alpha);
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * particle.scale * settings.dotSize * 0.35, 0, tau);
        context.fill();
      }
    }
  }

  function draw(now) {
    const dt = Math.min(64, previousFrame ? now - previousFrame : 16);
    previousFrame = now;
    animationTime += dt / 1000;
    const time = animationTime;
    if (settings.pattern !== lastPattern) {
      lastPattern = settings.pattern;
      rebuild();
    }
    context.clearRect(0, 0, width, height);
    const pattern = settings.pattern;
    if (pattern === "wiggle") drawWiggle(dt);
    else if (pattern === "starfield") {
      for (const star of stars) {
        const cycle = Math.cos((tau * 1000 * time) / Math.max(50, settings.duration) + star.phase) * 0.5 + 0.5;
        const opacity = settings.faded * 0.35 + (1 - settings.faded * 0.35) * cycle;
        const opacityScale = 0.35 + star.size * 0.65;
        context.fillStyle = colorWithAlpha(opacity * opacityScale * settings.brightness);
        context.beginPath();
        context.arc(star.x * width, star.y * height, Math.max(0.08, (0.2 + star.size * settings.size) * 0.5), 0, tau);
        context.fill();
      }
    } else if (pattern === "twist") {
      const reference = Math.min(width, height) * 0.5;
      const zoom = Math.max(0.3, settings.zoom);
      const spread = reference * 0.056 * zoom;
      const pitch = spread / Math.max(0.5, settings.twist);
      const centerX = width / 2 + settings.drift * (0.62 * Math.sin(time * 0.11) + 0.38 * Math.sin(time * 0.041 + 2.1));
      const centerY = height / 2 + settings.drift * (0.62 * Math.sin(time * 0.09 + 1.7) + 0.38 * Math.sin(time * 0.034 + 0.5));
      const spin = time * settings.spin;
      const coreRadius = pitch * 0.35;
      for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
        const cell = cells[cellIndex];
        const dx = cell.x - centerX;
        const dy = cell.y - centerY;
        const radius = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const wave = Math.cos((tau * radius) / pitch - Math.max(1, Math.round(settings.arms)) * angle - spin);
        const crest = Math.pow(Math.max(0, wave), Math.max(0.3, settings.width));
        const coreFade = Math.pow(Math.min(1, radius / coreRadius), 2) * (3 - 2 * Math.min(1, radius / coreRadius));
        const envelope = Math.exp(-Math.pow(radius / spread, 2)) * coreFade;
        const alpha = (settings.floor + (settings.peak - settings.floor) * crest * envelope) * settings.brightness;
        if (alpha > 0.01) {
          context.fillStyle = colorWithAlpha(alpha);
          context.beginPath();
          context.arc(cell.x, cell.y, Math.max(0.35, settings.size * 0.5), 0, tau);
          context.fill();
        }
      }
    } else if (pattern === "shimmer") {
      const shimmerZoom = 1.35;
      for (const cell of shimmerCells) {
        const wave = Math.sin(time * 0.6 + cell.col * settings.waveX) + Math.cos(time * 0.4 + cell.row * settings.waveY);
        const pulse = Math.sin(time * settings.speed * cell.frequency + cell.phase);
        const alpha = (settings.base + settings.intensity * Math.abs((pulse + wave) / 4)) * settings.brightness;
        if (alpha > 0.01) {
          context.fillStyle = colorWithAlpha(Math.min(1, alpha * 0.78));
          context.beginPath();
          context.arc((cell.x - width / 2) * shimmerZoom + width / 2, (cell.y - height / 2) * shimmerZoom + height / 2, Math.max(0.35, settings.size * 0.34), 0, tau);
          context.fill();
        }
      }
    } else if (pattern === "organic" || pattern === "shimmer-aurora" || pattern === "morph") {
      const scale = pattern === "organic" ? settings.scale * 1.15 : settings.scale;
      const fieldTime = pattern === "morph" ? time * 0.72 * settings.speed : pattern === "shimmer-aurora" ? time * 0.75 * settings.speed : time * settings.speed;
      for (const cell of fieldCells) {
        let intensity;
        if (pattern === "organic") {
          const n = Math.sin(cell.u * 3 * scale + fieldTime * 0.4) * Math.cos(cell.v * 3 * scale - fieldTime * 0.35) + 0.5 * Math.sin(cell.u * 7 * scale - fieldTime * 0.6) * Math.sin(cell.v * 7 * scale + fieldTime * 0.55);
          intensity = (0.1 + Math.pow(Math.max(0, Math.sin(n * 6 + cell.length * 8 * scale - fieldTime * 1.8)), 1.8)) * clamp01(1 - cell.distance * 0.85 * settings.vignette);
        } else if (pattern === "shimmer-aurora") {
          let value = Math.sin(cell.u * 8 * scale + fieldTime * 1.3) + Math.sin(cell.v * 8 * scale + fieldTime * 1.1) + Math.sin((cell.u + cell.v) * 6 * scale + fieldTime * 1.5) + Math.sin(cell.length * 10 * scale - fieldTime * 1.8);
          intensity = Math.pow(clamp01(0.5 + 0.125 * value), 2.5) * clamp01(1 - cell.distance * 0.9 * settings.vignette);
        } else {
          const angle = Math.sin(cell.u * 4 * scale + fieldTime * 0.6) * 1.2 + Math.cos(cell.v * 4 * scale - fieldTime * 0.5) * 1.2 + Math.sin((cell.u + cell.v) * 3 * scale + fieldTime * 0.9);
          const phase = (cell.u * Math.cos(angle) + cell.v * Math.sin(angle)) * 12 * scale - fieldTime * 4;
          const bright = Math.pow(0.5 + 0.5 * Math.sin(phase), 4);
          intensity = (0.1 + 1.1 * bright) * clamp01(1 - cell.distance * 0.7 * settings.vignette);
        }
        if (intensity > 0.01) {
          const morphBrightness = pattern === "morph" ? 0.75 + intensity * 0.35 : 1;
          const alpha = Math.min(1, intensity * settings.brightness * morphBrightness);
          context.fillStyle = pattern === "morph" ? morphColorWithAlpha(alpha, intensity) : colorWithAlpha(alpha);
          context.beginPath();
          context.arc(cell.x, cell.y, Math.max(0.22, settings.dotSize * (pattern === "organic" ? 0.55 : pattern === "shimmer-aurora" ? 0.8 : 0.45)), 0, tau);
          context.fill();
        }
      }
    } else if (pattern === "displace") {
      const nowSeconds = now / 1000;
      let write = 0;
      for (let floaterIndex = 0; floaterIndex < floaters.length; floaterIndex++) {
        const floater = floaters[floaterIndex];
        for (const force of pointerForces) {
          const dx = floater.x - force.x;
          const dy = floater.y - force.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 120) {
            const strength = 470 * Math.pow(1 - distance / 120, 2);
            floater.vx += ((dx / distance) * strength * dt) / 1000;
            floater.vy += ((dy / distance) * strength * dt) / 1000;
          }
        }
        floater.vx *= Math.pow(0.92, dt / 16);
        floater.vy *= Math.pow(0.92, dt / 16);
        floater.x += (floater.vx * dt) / 1000;
        floater.y += (floater.vy * dt) / 1000;
        const wander = dt / 1000;
        floater.x += Math.sin(nowSeconds * 0.9 + floater.phase) * 18 * wander;
        floater.y += Math.cos(nowSeconds * 0.7 + floater.phase * 1.7) * 14 * wander;
        floater.y -= ((35 + floater.speed * 30) * (settings.speed / 50) * 0.81 * dt) / 1000;
        floater.x += (floater.drift * 10 * (settings.speed / 50) * 0.81 * dt) / 1000;
        const age = nowSeconds - floater.birth;
        if (age > floater.lifetime || floater.y <= -10 || floater.y > height + 10) {
          floater.x = (((floaterIndex % 32) + Math.random() * 0.8) / 32) * width;
          floater.y = height * (0.84 + Math.random() * 0.16);
          floater.birth = nowSeconds;
          floater.vx = 0;
          floater.vy = 0;
        }
        floaters[write++] = floater;
      }
      floaters.length = write;
      pointerForces = pointerForces.filter(force => nowSeconds - force.time < 0.3);
      while (floaters.length < Math.floor(settings.count * settings.density)) {
        const floater = spawnFloater(nowSeconds);
        floater.y = height * (0.82 + Math.random() * 0.25);
        floaters.push(floater);
      }
      for (const floater of floaters) {
        const age = nowSeconds - floater.birth;
        const fade = age < 0.5 ? age / 0.5 : age > floater.lifetime - 1 ? Math.max(0, floater.lifetime - age) : 0.9;
        context.fillStyle = colorWithAlpha(fade * settings.brightness);
        context.beginPath();
        context.arc(floater.x, floater.y, (1 + floater.size * 2) * settings.dotSize * 0.22, 0, tau);
        context.fill();
      }
    } else if (pattern === "meteors") {
      for (const star of stars) {
        const opacity = 0.12 + 0.88 * (Math.cos((tau * 1000 * time) / (1000 + star.duration * 3000) + star.phase) * 0.5 + 0.5);
        context.fillStyle = colorWithAlpha(Math.min(1, opacity * settings.brightness * 0.7));
        context.beginPath();
        context.arc(star.x * width, star.y * height, Math.max(0.1, (0.2 + star.size * 1.3) * settings.dotSize * 0.3), 0, tau);
        context.fill();
      }
      for (const meteor of meteors) {
        meteor.progress += (meteor.speed * 0.45 * dt) / 1000 / meteor.length;
        if (meteor.progress >= meteor.reach) Object.assign(meteor, spawnMeteor());
        const head = meteor.minAlong + meteor.progress * meteor.length;
        const tail = head - meteor.trailLength;
        const hx = head * meteor.dx + meteor.cross * meteor.px;
        const hy = head * meteor.dy + meteor.cross * meteor.py;
        const tx = tail * meteor.dx + meteor.cross * meteor.px;
        const ty = tail * meteor.dy + meteor.cross * meteor.py;
        const opacity = Math.max(0, Math.min(1, meteor.progress / (0.12 * meteor.reach), (meteor.reach - meteor.progress) / Math.max(0.01, meteor.reach - meteor.fadeStart))) * meteor.opacityScale;
        const gradient = context.createLinearGradient(hx, hy, tx, ty);
        gradient.addColorStop(0, colorWithAlpha(Math.min(1, opacity * 1.35)));
        gradient.addColorStop(1, colorWithAlpha(0));
        context.strokeStyle = gradient;
        context.lineWidth = Math.max(0.3, settings.width * 0.35);
        context.beginPath();
        context.moveTo(hx, hy);
        context.lineTo(tx, ty);
        context.stroke();
      }
    } else if (pattern === "grid") {
      for (const pixel of gridPixels) {
        if (pixel.counter <= pixel.delay) {
          pixel.counter += pixel.counterStep;
          continue;
        }
        if (pixel.size >= pixel.maximum) pixel.shimmering = true;
        if (pixel.shimmering) {
          if (pixel.size >= pixel.maximum) pixel.reverse = true;
          else if (pixel.size <= pixel.minimum) pixel.reverse = false;
          pixel.size += pixel.reverse ? -pixel.speed : pixel.speed;
        } else pixel.size += pixel.sizeStep;
        context.fillStyle = colorWithAlpha(Math.min(1, (pixel.size / pixel.maximum) * settings.brightness * 0.45));
        context.fillRect(pixel.x + pixel.maximum * 0.5 - pixel.size * 0.5, pixel.y + pixel.maximum * 0.5 - pixel.size * 0.5, pixel.size, pixel.size);
      }
    } else if (pattern === "wiggle-grid") {
      for (const cell of cells) {
        const offsetX = Math.sin(time * 0.35 + cell.x * 0.03) * 5;
        const offsetY = Math.cos(time * 0.28 + cell.y * 0.03) * 5;
        const intensity = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(time * 1.2 + cell.x * 0.025 + cell.y * 0.018));
        context.fillStyle = colorWithAlpha(intensity * settings.brightness * 0.65);
        context.beginPath();
        context.arc(cell.x + offsetX, cell.y + offsetY, Math.max(0.35, settings.dotSize * 0.55), 0, tau);
        context.fill();
      }
    }
    requestAnimationFrame(draw);
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    rebuild();
  }

  window.updateShimmeringDots = values => {
    Object.assign(settings, values);
    if (values.density || values.scale || values.gap || values.size || values.count || values.spacing || values.seed) rebuild();
  };
  resize();
  restoreParticleState();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", event => {
    if (settings.pattern === "displace") pointerForces.push({ x: event.clientX, y: event.clientY, time: performance.now() / 1000 });
  });
  window.addEventListener("pagehide", saveParticleState);
  window.setInterval(() => {
    const now = performance.now() / 1000;
    if (now - lastStateSave >= 3) saveParticleState();
  }, 3000);
  requestAnimationFrame(draw);
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
  } else if (particleMode === "aurora") {
    initAuroraParticles();
  } else if (["grid", "wiggle", "wiggle-grid", "starfield", "twist", "displace", "shimmer", "organic", "shimmer-aurora", "morph", "meteors"].includes(particleMode)) {
    initShimmeringDotsSource();
  } else if (particleMode !== "false") {
    initStarParticles();
  }
}
