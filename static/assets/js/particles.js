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
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(ratio, canvas.width / canvas.height);
  };
  const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().replace("#", "");
  const rgb = /^[0-9a-f]{6}$/i.test(themeColor)
    ? [0, 2, 4].map(index => Number.parseInt(themeColor.slice(index, index + 2), 16) / 255)
    : [0.4, 0.8, 1.0];

  resize();
  gl.uniform3f(color, rgb[0], rgb[1], rgb[2]);
  window.addEventListener("resize", resize);
  const render = now => {
    gl.uniform1f(time, now);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
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
  } else if (particleMode !== "false") {
    initStarParticles();
  }
}
