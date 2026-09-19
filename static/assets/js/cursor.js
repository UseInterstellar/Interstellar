// Loaded dynamically by main.js only when a cursor effect is active.
function setupIframeTracking(moveCallback, hideCallback) {
  function attachToIframe(iframe) {
    if (iframe.dataset.cursorTracked) return;
    iframe.dataset.cursorTracked = "1";

    function tryAttach() {
      try {
        const iwin = iframe.contentWindow;
        if (!iwin) return;
        iwin.addEventListener("mousemove", e => {
          const rect = iframe.getBoundingClientRect();
          moveCallback(rect.left + e.clientX, rect.top + e.clientY);
        });
        iwin.addEventListener("mouseleave", () => hideCallback());
      } catch (_) {}
    }

    if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
      tryAttach();
    } else {
      iframe.addEventListener("load", tryAttach);
    }
  }

  document.querySelectorAll("iframe").forEach(attachToIframe);
  new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(n => {
        if (n.tagName === "IFRAME") attachToIframe(n);
        else if (n.querySelectorAll) n.querySelectorAll("iframe").forEach(attachToIframe);
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
}

function createFullscreenCanvas(id) {
  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  return canvas;
}

// Based on codepen.io/tommyho/pen/ZEmjWGY
function initRainbowStars() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");

  const bNum = 3,
    bSize = 8,
    bSpeed = 6,
    bDep = 0.1;
  const bDist = 30,
    bStarVar = 2,
    bHue = 4;
  let spots = [],
    hue = 0;
  const mouse = { x: undefined, y: undefined };

  class Particle {
    constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
      this.size = Math.random() * bSize + 0.1;
      this.speedX = Math.random() * bSpeed - bSpeed / 2;
      this.speedY = Math.random() * bSpeed - bSpeed / 2;
      this.points = Math.floor(Math.random() * bStarVar) + 5;
      this.radius = Math.random() * bSize + 0.1;
      this.color = `hsl(${bHue * hue}, 100%, 50%)`;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      star(this.x, this.y, this.radius * 2, this.radius, this.points);
      ctx.fill();
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > bDep) this.size -= bDep;
    }
  }

  function star(x, y, r1, r2, npts) {
    const angle = (2 * Math.PI) / npts;
    const half = angle / 2;
    ctx.moveTo(x + Math.cos(half) * r1, y + Math.sin(half) * r1);
    for (let a = 0; a <= 2 * Math.PI; a += angle) {
      ctx.lineTo(x + Math.cos(a) * r2, y + Math.sin(a) * r2);
      ctx.lineTo(x + Math.cos(a + half) * r1, y + Math.sin(a + half) * r1);
    }
  }

  function onMove(x, y) {
    mouse.x = x;
    mouse.y = y;
    for (let i = 0; i < bNum; i++) spots.push(new Particle());
  }

  window.addEventListener("mousemove", e => onMove(e.clientX, e.clientY));
  setupIframeTracking(onMove, () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < spots.length; i++) {
      spots[i].update();
      spots[i].draw();
      for (let j = i; j < spots.length; j++) {
        const dx = spots[i].x - spots[j].x;
        const dy = spots[i].y - spots[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < bDist) {
          ctx.beginPath();
          ctx.strokeStyle = spots[i].color;
          ctx.lineWidth = spots[i].size / 3;
          ctx.moveTo(spots[i].x, spots[i].y);
          ctx.bezierCurveTo(spots[j].x, spots[j].y, spots[j].x, spots[i].y, spots[j].x, spots[j].y);
          ctx.stroke();
        }
      }
      if (spots[i].size <= bDep) {
        spots.splice(i, 1);
        i--;
      }
    }
    hue++;
    requestAnimationFrame(animate);
  })();
}

// Based on codepen.io/gabezink17-cmd/pen/WbGmeyR
function initWhiteOrbs() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const particles = [];

  class OrbParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
      this.size = Math.random() * 3 + 1;
      this.life = 100;
    }
    update() {
      this.vx += (mouse.x - this.x) * 0.0005;
      this.vy += (mouse.y - this.y) * 0.0005;
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.life -= 1;
    }
    draw() {
      ctx.fillStyle = "white";
      ctx.globalAlpha = this.life / 100;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function spawn(x, y, n = 10) {
    for (let i = 0; i < n; i++) particles.push(new OrbParticle(x, y));
  }

  function onMove(x, y) {
    mouse.x = x;
    mouse.y = y;
    spawn(x, y, 1);
  }

  window.addEventListener("mousemove", e => onMove(e.clientX, e.clientY));
  window.addEventListener("click", e => spawn(e.clientX, e.clientY, 40));
  window.addEventListener("mousedown", () => {
    for (let i = 0; i < 50; i++) spawn(mouse.x, mouse.y, 1);
  });
  setupIframeTracking(onMove, () => {});

  (function animate() {
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.update();
      p.draw();
      if (p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
  })();
}

// Based on codepen.io/Jiironimo/pen/vEXbVNP
function initRainbowTrail() {
  if (document.getElementById("pointer-canvas")) return;

  const cursorDot = document.createElement("div");
  cursorDot.id = "rainbow-trail-cursor";
  cursorDot.style.visibility = "hidden";
  document.body.appendChild(cursorDot);
  document.body.classList.add("rainbow-trail-cursor");

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");
  let W = canvas.width,
    H = canvas.height;
  let mx = null,
    my = null,
    clicking = false,
    hue = 0;
  const particles = [];

  window.addEventListener("resize", () => {
    W = canvas.width;
    H = canvas.height;
  });

  class RainbowTrailParticle {
    constructor(x, y, isClicking) {
      this.x = x + (Math.random() - 0.5) * (isClicking ? 18 : 4);
      this.y = y + (Math.random() - 0.5) * (isClicking ? 18 : 4);
      const speed = isClicking ? 1.5 + Math.random() * 3.5 : 0.4 + Math.random() * 1.2;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - (isClicking ? 0 : 0.5);
      this.life = 1;
      this.decay = isClicking ? 0.018 + Math.random() * 0.025 : 0.012 + Math.random() * 0.018;
      this.size = isClicking ? 3 + Math.random() * 7 : 1.5 + Math.random() * 3.5;
      this.hue = hue + (Math.random() - 0.5) * 40;
      this.sat = 80 + Math.random() * 20;
      this.lit = 55 + Math.random() * 25;
      this.shape = isClicking ? Math.floor(Math.random() * 3) : 0;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpd = (Math.random() - 0.5) * 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.04;
      this.vx *= 0.98;
      this.life -= this.decay;
      this.rot += this.rotSpd;
      this.size *= 0.992;
    }
    draw() {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life * this.life);
      ctx.fillStyle = `hsl(${this.hue},${this.sat}%,${this.lit}%)`;
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = this.size * 3;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      if (this.shape === 1) {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      } else if (this.shape === 2) {
        ctx.beginPath();
        const r1 = this.size,
          r2 = this.size * 0.4,
          pts = 4;
        for (let i = 0; i < pts * 2; i++) {
          const r = i % 2 === 0 ? r1 : r2;
          const ang = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
          i === 0 ? ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r) : ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
        }
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function showAt(x, y) {
    mx = x;
    my = y;
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;
    cursorDot.style.visibility = "visible";
  }

  function hide() {
    mx = null;
    my = null;
    cursorDot.style.visibility = "hidden";
  }

  window.addEventListener("mousemove", e => showAt(e.clientX, e.clientY));
  document.addEventListener("mouseleave", hide);
  window.addEventListener("mousedown", () => {
    clicking = true;
  });
  window.addEventListener("mouseup", () => {
    clicking = false;
  });
  setupIframeTracking(showAt, hide);

  (function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, W, H);
    hue = (hue + 0.8) % 360;
    if (mx !== null && my !== null) {
      const count = clicking ? 6 : 2;
      for (let i = 0; i < count; i++) particles.push(new RainbowTrailParticle(mx, my, clicking));
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].life <= 0 || particles[i].size < 0.3) particles.splice(i, 1);
    }
  })();
}

// Based on codepen.io/perror12/pen/JoRwZwg
function initBlueOrbs() {
  if (document.getElementById("blue-orbs-glow")) return;

  document.body.classList.add("blue-orbs-cursor");

  const glow = document.createElement("div");
  glow.id = "blue-orbs-glow";
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  const core = document.createElement("div");
  core.id = "blue-orbs-core";
  core.className = "cursor-core";
  document.body.appendChild(core);

  let mouseX = null,
    mouseY = null;
  let glowX = 0,
    glowY = 0,
    lastX = 0,
    lastY = 0;

  function createTrail(x, y, speed) {
    const trail = document.createElement("div");
    trail.className = "orb-trail";
    const size = Math.max(18, Math.min(60, 20 + speed * 0.35));
    trail.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;animation-duration:${0.5 + Math.random() * 0.35}s`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 900);
  }

  function createSpark(x, y) {
    const spark = document.createElement("div");
    spark.className = "orb-spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--dx", `${(Math.random() - 0.5) * 80}px`);
    spark.style.setProperty("--dy", `${(Math.random() - 0.5) * 80}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 850);
  }

  function onMove(x, y) {
    mouseX = x;
    mouseY = y;
    if (core.style.visibility !== "visible") {
      core.style.visibility = "visible";
      glow.style.visibility = "visible";
      glowX = x;
      glowY = y;
      lastX = x;
      lastY = y;
    }
    const dx = x - lastX,
      dy = y - lastY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    core.style.left = `${x}px`;
    core.style.top = `${y}px`;
    createTrail(x, y, speed);
    if (speed > 25) {
      createSpark(x, y);
      createSpark(x, y);
    }
    lastX = x;
    lastY = y;
  }

  function hide() {
    mouseX = null;
    mouseY = null;
    core.style.visibility = "hidden";
    glow.style.visibility = "hidden";
  }

  window.addEventListener("mousemove", e => onMove(e.clientX, e.clientY));
  document.addEventListener("mouseleave", hide);
  window.addEventListener("mousedown", () => {
    core.style.transform = "translate(-50%, -50%) scale(1.8)";
    glow.style.transform = "translate(-50%, -50%) scale(1.2)";
  });
  window.addEventListener("mouseup", () => {
    core.style.transform = "translate(-50%, -50%) scale(1)";
    glow.style.transform = "translate(-50%, -50%) scale(1)";
  });
  setupIframeTracking(onMove, hide);

  (function animateGlow() {
    if (mouseX !== null) {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateGlow);
  })();
}

// Based on codepen.io/RoshitShrestha/pen/KwgVGwB
function initRedCircle() {
  if (document.getElementById("red-circle-cursor")) return;

  document.body.classList.add("red-circle-cursor");

  const cursorEl = document.createElement("div");
  cursorEl.id = "red-circle-cursor";
  cursorEl.innerHTML = `
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="rc-cursorDot" d="M48 32C48 40.8366 40.8366 48 32 48C23.1634 48 16 40.8366 16 32C16 23.1634 23.1634 16 32 16C40.8366 16 48 23.1634 48 32Z" fill="currentColor"/>
    </svg>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none">
      <path id="rc-iBeamPath" fill-rule="evenodd" clip-rule="evenodd" d="M23 54C22.4477 54 22 54.4477 22 55C22 55.5523 22.4477 56 23 56L28 56C30.2091 56 32 54.2092 32 52C32 54.2092 33.7909 56 36 56L41 56C41.5523 56 42 55.5523 42 55C42 54.4477 41.5523 54 41 54L37 54C34.7909 54 33 52.2092 33 50L33 14C33 11.7916 34.7896 10.0013 36.9975 10L41 10C41.5523 10 42 9.55229 42 9C42 8.44772 41.5523 8 41 8L36 8C33.7909 8 32 9.79077 32 12C32 9.79077 30.2091 8 28 8L23 8C22.4477 8 22 8.44771 22 9C22 9.55228 22.4477 10 23 10L27 10C29.2085 10.0007 31 11.7912 31 14L31 50C31 52.2092 29.2091 54 27 54L23 54Z" fill="currentColor"/>
    </svg>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none">
      <path id="rc-iBeamHold" fill-rule="evenodd" clip-rule="evenodd" d="M21 49C20.4477 49 20 49.4477 20 50C20 50.5523 20.4477 51 21 51L28 51C30.2091 51 32 49.2092 32 47C32 49.2092 33.7909 51 36 51L43 51C43.5523 51 44 50.5523 44 50C44 49.4477 43.5523 49 43 49L37 49C34.7909 49 33 47.2092 33 45L33 19C33 16.7916 34.7896 15.0013 36.9975 15L43 15C43.5523 15 44 14.5523 44 14C44 13.4477 43.5523 13 43 13L36 13C33.7909 13 32 14.7908 32 17C32 14.7908 30.2091 13 28 13L21 13C20.4477 13 20 13.4477 20 14C20 14.5523 20.4477 15 21 15L27 15C29.2085 15.0007 31 16.7912 31 19L31 45C31 47.2092 29.2091 49 27 49L21 49Z" fill="currentColor"/>
    </svg>
  `;
  document.body.appendChild(cursorEl);

  function loadScript(src, onload) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = onload;
    document.head.appendChild(s);
  }

  function setupRedCircle() {
    gsap.registerPlugin(MorphSVGPlugin);

    let rcTargetX = null,
      rcTargetY = null,
      rcCurX = 0,
      rcCurY = 0;

    function rcMoveTo(x, y) {
      if (rcTargetX === null) {
        rcCurX = x;
        rcCurY = y;
      }
      rcTargetX = x;
      rcTargetY = y;
      cursorEl.style.visibility = "visible";
    }

    function rcHide() {
      rcTargetX = null;
      rcTargetY = null;
      cursorEl.style.visibility = "hidden";
    }

    window.addEventListener("mousemove", e => rcMoveTo(e.clientX, e.clientY));
    document.addEventListener("mouseleave", rcHide);
    setupIframeTracking(rcMoveTo, rcHide);

    (function rcFollow() {
      if (rcTargetX !== null) {
        rcCurX += (rcTargetX - rcCurX) * 0.18;
        rcCurY += (rcTargetY - rcCurY) * 0.18;
        cursorEl.style.left = `${rcCurX}px`;
        cursorEl.style.top = `${rcCurY}px`;
      }
      requestAnimationFrame(rcFollow);
    })();

    const cursorTl = gsap.timeline({ paused: true });
    cursorTl.to("#rc-cursorDot", { morphSVG: "#rc-iBeamPath", duration: 0.3, ease: "power2.inOut" });

    document.querySelectorAll("[data-text-hover]").forEach(el => {
      el.addEventListener("mouseenter", () => cursorTl.play());
      el.addEventListener("mouseleave", () => cursorTl.reverse());
      el.addEventListener("mousedown", () => gsap.to("#rc-cursorDot", { morphSVG: "#rc-iBeamHold", duration: 0.4, ease: "back.out(3)" }));
      el.addEventListener("mouseup", () => gsap.to("#rc-cursorDot", { morphSVG: "#rc-iBeamPath", duration: 0.4, ease: "back.out(3)" }));
    });
  }

  if (typeof gsap === "undefined") {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", () => {
      loadScript("https://assets.codepen.io/16327/MorphSVGPlugin3.min.js", setupRedCircle);
    });
  } else if (typeof MorphSVGPlugin === "undefined") {
    loadScript("https://assets.codepen.io/16327/MorphSVGPlugin3.min.js", setupRedCircle);
  } else {
    setupRedCircle();
  }
}

// Based on codepen.io/Margarita-the-solid/pen/LERbOMR
function initTheSims() {
  if (document.getElementById("the-sims-cursor")) return;

  document.body.classList.add("the-sims-cursor");

  const NS = "http://www.w3.org/2000/svg";
  const cursorSvg = document.createElementNS(NS, "svg");
  cursorSvg.id = "the-sims-cursor";
  cursorSvg.setAttribute("viewBox", "-110 -160 220 310");
  cursorSvg.setAttribute("width", "44");
  cursorSvg.setAttribute("height", "62");
  cursorSvg.setAttribute("overflow", "visible");
  document.body.appendChild(cursorSvg);

  const halo1 = document.createElement("div");
  halo1.className = "sims-halo";
  halo1.style.cssText = "width:40px;height:40px;border:1.5px solid hsla(110,100%,60%,0.26);";
  document.body.appendChild(halo1);

  const halo2 = document.createElement("div");
  halo2.className = "sims-halo";
  halo2.style.cssText = "width:56px;height:56px;border:1px solid hsla(110,100%,60%,0.1);animation-delay:0.7s;";
  document.body.appendChild(halo2);

  const SCL = 98;
  const V = [
    [0, -1.85, 0],
    [0, 1.85, 0],
    [1, 0, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [0, 0, -1],
  ];
  const FACES = [
    [0, 2, 3, 0.68],
    [0, 3, 4, 0.9],
    [0, 4, 5, 0.28],
    [0, 5, 2, 0.14],
    [1, 3, 2, 0.82],
    [1, 4, 3, 0.34],
    [1, 5, 4, 0.16],
    [1, 2, 5, 0.1],
  ];

  const polys = FACES.map(() => {
    const p = document.createElementNS(NS, "polygon");
    p.setAttribute("stroke-linejoin", "round");
    cursorSvg.appendChild(p);
    return p;
  });

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross3 = ([ax, ay, az], [bx, by, bz]) => [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
  const norm3 = v => {
    const l = Math.hypot(...v) || 1;
    return v.map(x => x / l);
  };
  const rotY = ([x, y, z], c, s) => [x * c + z * s, y, -x * s + z * c];

  function projectV(v, c, s) {
    const [rx, ry, rz] = rotY(v, c, s);
    const fov = 7 / (7 - rz);
    return { x: rx * SCL * fov, y: ry * SCL * fov, z: rz };
  }

  const LIGHT = norm3([-0.3, -0.55, 1.0]);
  let glowHue = 110;

  function renderPlumbob(ts) {
    const t = ts * 0.001;
    const c = Math.cos(t * 0.5),
      s = Math.sin(t * 0.5);
    glowHue = 108 + Math.sin(t * 0.14) * 13;
    const gl = 54 + Math.sin(t * 2.7) * 9,
      gr = 15 + Math.sin(t * 2.7) * 6;
    cursorSvg.style.filter = `drop-shadow(0 0 ${gr}px hsl(${glowHue},100%,${gl}%)) ` + `drop-shadow(0 0 ${(gr * 2.8).toFixed(0)}px hsla(${glowHue},100%,${gl - 12}%,.38))`;

    const proj = V.map(v => projectV(v, c, s));

    const faceData = FACES.map((face, i) => {
      const [vi0, vi1, vi2, baseLum] = face;
      const rv0 = rotY(V[vi0], c, s),
        rv1 = rotY(V[vi1], c, s),
        rv2 = rotY(V[vi2], c, s);
      const normal = norm3(
        cross3(
          rv1.map((v, j) => v - rv0[j]),
          rv2.map((v, j) => v - rv0[j]),
        ),
      );
      const facing = normal[2] > 0.005;
      const L = clamp((baseLum * 0.65 + clamp(dot3(normal, LIGHT), 0, 1) * 0.25 + 0.1) * 82, 10, 91);
      const fh = glowHue + (vi0 === 1 ? -9 : 0);
      const p0 = proj[vi0],
        p1 = proj[vi1],
        p2 = proj[vi2];
      const fmt = n => n.toFixed(1);
      return {
        i,
        facing,
        pts: `${fmt(p0.x)},${fmt(p0.y)} ${fmt(p1.x)},${fmt(p1.y)} ${fmt(p2.x)},${fmt(p2.y)}`,
        fill: `hsl(${fh.toFixed(1)},65%,${L.toFixed(1)}%)`,
        strokeA: (0.08 + (1 - L / 91) * 0.14).toFixed(2),
        z: (p0.z + p1.z + p2.z) / 3,
      };
    });

    faceData
      .filter(f => !f.facing)
      .forEach(fd => {
        polys[fd.i].setAttribute("fill", "none");
        polys[fd.i].setAttribute("stroke", "none");
        cursorSvg.insertBefore(polys[fd.i], cursorSvg.firstChild);
      });
    faceData
      .filter(f => f.facing)
      .sort((a, b) => b.z - a.z)
      .forEach(fd => {
        const p = polys[fd.i];
        p.setAttribute("points", fd.pts);
        p.setAttribute("fill", fd.fill);
        p.setAttribute("stroke", `hsla(0,0%,0%,${fd.strokeA})`);
        p.setAttribute("stroke-width", "1.2");
        cursorSvg.appendChild(p);
      });

    [halo1, halo2].forEach((h, i) => {
      h.style.border = `${i === 0 ? 1.5 : 1}px solid hsla(${glowHue},100%,60%,${i === 0 ? 0.26 : 0.1})`;
    });

    requestAnimationFrame(renderPlumbob);
  }
  requestAnimationFrame(renderPlumbob);

  const COLS = ["#39FF14", "#a8ff78", "#00D4FF", "#FFE600", "#9B5DE5"];
  let simsMouseX = null,
    simsMouseY = null;

  function spawnSimsPt(x, y, size = 1) {
    const el = document.createElement("div");
    el.className = "sims-pt";
    el.textContent = Math.random() < 0.7 ? "§" : "✦";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = COLS[Math.floor(Math.random() * COLS.length)];
    el.style.fontSize = `${size}rem`;
    const d = 0.8 + Math.random() * 1.2;
    el.style.setProperty("--d", `${d}s`);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (d + 0.2) * 1000);
  }

  const simsInterval = setInterval(() => {
    if (store.get("pointer") !== "the-sims") {
      clearInterval(simsInterval);
      return;
    }
    if (simsMouseX === null) return;
    const spread = 60;
    spawnSimsPt(simsMouseX + (Math.random() - 0.5) * spread, simsMouseY + (Math.random() - 0.5) * spread, 0.6 + Math.random() * 0.5);
  }, 420);

  document.addEventListener("click", e => {
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2,
        r = 20 + Math.random() * 50;
      spawnSimsPt(e.clientX + Math.cos(ang) * r, e.clientY + Math.sin(ang) * r, 0.5 + Math.random() * 0.7);
    }
  });

  function showAt(x, y) {
    simsMouseX = x;
    simsMouseY = y;
    cursorSvg.style.left = `${x}px`;
    cursorSvg.style.top = `${y}px`;
    cursorSvg.style.visibility = "visible";
    halo1.style.left = `${x}px`;
    halo1.style.top = `${y}px`;
    halo1.style.visibility = "visible";
    halo2.style.left = `${x}px`;
    halo2.style.top = `${y}px`;
    halo2.style.visibility = "visible";
  }

  function hide() {
    simsMouseX = null;
    simsMouseY = null;
    cursorSvg.style.visibility = "hidden";
    halo1.style.visibility = "hidden";
    halo2.style.visibility = "hidden";
  }

  document.addEventListener("mousemove", e => showAt(e.clientX, e.clientY));
  document.addEventListener("mouseleave", hide);
  document.addEventListener("mouseenter", () => {
    halo1.style.visibility = "visible";
    halo2.style.visibility = "visible";
  });
  setupIframeTracking(showAt, hide);
}

// Based on codepen.io/Jiironimo/pen/vEXbVNP
function initBlueOrbsDom() {
  if (document.getElementById("blue-orbs-glow")) return;
  initBlueOrbs();
}

// Based on codepen.io/ksenia-k/pen/rNoBgbV
function initSnakeTrail() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");

  const pointer = { x: null, y: null };
  const params = {
    pointsNumber: 40,
    widthFactor: 0.3,
    spring: 0.4,
    friction: 0.5,
  };

  const trail = Array.from({ length: params.pointsNumber }, () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    dx: 0,
    dy: 0,
  }));

  function onMove(x, y) {
    pointer.x = x;
    pointer.y = y;
  }

  window.addEventListener("mousemove", e => onMove(e.clientX, e.clientY));
  window.addEventListener("touchmove", e => onMove(e.targetTouches[0].pageX, e.targetTouches[0].pageY));
  document.addEventListener("mouseleave", () => {
    pointer.x = null;
    pointer.y = null;
  });
  setupIframeTracking(onMove, () => {
    pointer.x = null;
    pointer.y = null;
  });

  function update(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (pointer.x === null) {
      requestAnimationFrame(update);
      return;
    }

    trail.forEach((p, i) => {
      const prev = i === 0 ? { x: pointer.x, y: pointer.y } : trail[i - 1];
      const spring = i === 0 ? 0.4 * params.spring : params.spring;
      p.dx += (prev.x - p.x) * spring;
      p.dy += (prev.y - p.y) * spring;
      p.dx *= params.friction;
      p.dy *= params.friction;
      p.x += p.dx;
      p.y += p.dy;
    });

    ctx.lineCap = "round";
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--text-primary").trim() || "#ffffff";
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
      const xc = 0.5 * (trail[i].x + trail[i + 1].x);
      const yc = 0.5 * (trail[i].y + trail[i + 1].y);
      ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
      ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
      ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCursorEffect() {
  const pointer = store.get("pointer");
  switch (pointer) {
    case "rainbow-stars":
      initRainbowStars();
      break;
    case "white-orbs":
      initWhiteOrbs();
      break;
    case "rainbow-trail":
      initRainbowTrail();
      break;
    case "blue-orbs":
      initBlueOrbs();
      break;
    case "red-circle":
      initRedCircle();
      break;
    case "the-sims":
      initTheSims();
      break;
    case "curly-cursor":
      initSnakeTrail();
      break;
  }
}
