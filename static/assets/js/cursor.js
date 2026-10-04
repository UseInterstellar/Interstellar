// Loaded dynamically by main.js only when a cursor effect is active.

let cursorGeneration = 0;
const cursorCleanups = [];
const CURSOR_TRANSIENT_SELECTOR = ".orb-trail, .orb-spark, .sims-pt";

function cursorOn(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  cursorCleanups.push(() => target.removeEventListener(type, handler, options));
}

function cursorFrame(callback) {
  const generation = cursorGeneration;
  return requestAnimationFrame(timestamp => {
    if (generation !== cursorGeneration) return;
    callback(timestamp);
  });
}

function cursorInterval(callback, delay) {
  const id = setInterval(callback, delay);
  cursorCleanups.push(() => clearInterval(id));
  return id;
}

function cursorNode(element) {
  cursorCleanups.push(() => element.remove());
  return element;
}

function cursorBodyClass(name) {
  document.body.classList.add(name);
  cursorCleanups.push(() => document.body.classList.remove(name));
}

function destroyCursorEffects() {
  cursorGeneration++;
  while (cursorCleanups.length) {
    try {
      cursorCleanups.pop()();
    } catch (_) {}
  }
  document.querySelectorAll(CURSOR_TRANSIENT_SELECTOR).forEach(node => {
    node.remove();
  });
}

function setupIframeTracking(moveCallback, hideCallback) {
  const tracked = new WeakSet();

  function attachToIframe(iframe) {
    if (tracked.has(iframe)) return;
    tracked.add(iframe);

    function tryAttach() {
      try {
        const iwin = iframe.contentWindow;
        if (!iwin) return;
        cursorOn(iwin, "mousemove", e => {
          const rect = iframe.getBoundingClientRect();
          moveCallback(rect.left + e.clientX, rect.top + e.clientY);
        });
        cursorOn(iwin, "mouseleave", () => hideCallback());
      } catch (_) {}
    }

    if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
      tryAttach();
    } else {
      cursorOn(iframe, "load", tryAttach);
    }
  }

  document.querySelectorAll("iframe").forEach(attachToIframe);
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(n => {
        if (n.tagName === "IFRAME") attachToIframe(n);
        else if (n.querySelectorAll) n.querySelectorAll("iframe").forEach(attachToIframe);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  cursorCleanups.push(() => observer.disconnect());
}

function createFullscreenCanvas(id) {
  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  cursorNode(canvas);
  cursorOn(window, "resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  return canvas;
}

function cursorClickEffectIs(effect) {
  return store.get("pointerClickEffect") === effect;
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

  cursorOn(window, "mousemove", e => onMove(e.clientX, e.clientY));
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
    cursorFrame(animate);
  })();
}

// Based on codepen.io/gabezink17-cmd/pen/WbGmeyR
function initWhiteOrbs(clickOnly = false) {
  const canvasId = clickOnly ? "pointer-click-canvas" : "pointer-canvas";
  if (document.getElementById(canvasId)) return;

  const canvas = createFullscreenCanvas(canvasId);
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
    if (clickOnly) return;
    spawn(x, y, 1);
  }

  cursorOn(window, "mousemove", e => onMove(e.clientX, e.clientY));
  cursorOn(window, "click", e => {
    if (cursorClickEffectIs("white-orbs")) spawn(e.clientX, e.clientY, 40);
  });
  cursorOn(window, "mousedown", () => {
    if (!cursorClickEffectIs("white-orbs")) return;
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
    cursorFrame(animate);
  })();
}

// Based on codepen.io/Jiironimo/pen/vEXbVNP
function initRainbowTrail(clickOnly = false) {
  const canvasId = clickOnly ? "pointer-click-canvas" : "pointer-canvas";
  if (document.getElementById(canvasId)) return;

  const cursorDot = document.createElement("div");
  cursorDot.id = "rainbow-trail-cursor";
  cursorDot.style.visibility = "hidden";
  document.body.appendChild(cursorDot);
  cursorNode(cursorDot);
  if (!clickOnly) cursorBodyClass("rainbow-trail-cursor");

  const canvas = createFullscreenCanvas(canvasId);
  const ctx = canvas.getContext("2d");
  let W = canvas.width,
    H = canvas.height;
  let mx = null,
    my = null,
    clicking = false,
    hue = 0;
  const particles = [];

  cursorOn(window, "resize", () => {
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
    if (clickOnly) return;
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;
    cursorDot.style.visibility = "visible";
  }

  function hide() {
    mx = null;
    my = null;
    cursorDot.style.visibility = "hidden";
  }

  cursorOn(window, "mousemove", e => showAt(e.clientX, e.clientY));
  cursorOn(document, "mouseleave", hide);
  cursorOn(window, "mousedown", () => {
    clicking = cursorClickEffectIs("rainbow-trail");
  });
  cursorOn(window, "mouseup", () => {
    clicking = false;
  });
  if (clickOnly) {
    cursorOn(window, "click", e => {
      mx = e.clientX;
      my = e.clientY;
      clicking = true;
      setTimeout(() => {
        clicking = false;
      }, 160);
    });
  }
  setupIframeTracking(showAt, hide);

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, W, H);
    hue = (hue + 0.8) % 360;
    if (mx !== null && my !== null && (!clickOnly || clicking)) {
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
function initBlueOrbsTrail() {
  if (document.body.classList.contains("blue-orbs-trail")) return;
  cursorBodyClass("blue-orbs-trail");
  let lastX = 0,
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
    const dx = x - lastX;
    const dy = y - lastY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    createTrail(x, y, speed);
    if (speed > 25) {
      createSpark(x, y);
      createSpark(x, y);
    }
    lastX = x;
    lastY = y;
  }

  cursorOn(window, "mousemove", e => onMove(e.clientX, e.clientY));
  setupIframeTracking(onMove, () => {});
}

function initBlueOrbsCursor(clickOnly = false) {
  if (document.getElementById("blue-orbs-glow")) return;
  cursorBodyClass(clickOnly ? "blue-orbs-click-effect" : "blue-orbs-cursor");

  const glow = document.createElement("div");
  glow.id = "blue-orbs-glow";
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  cursorNode(glow);

  const core = document.createElement("div");
  core.id = "blue-orbs-core";
  core.className = "cursor-core";
  document.body.appendChild(core);
  cursorNode(core);

  let mouseX = null,
    mouseY = null;
  let glowX = 0,
    glowY = 0;

  function onMove(x, y) {
    mouseX = x;
    mouseY = y;
    if (clickOnly) return;
    if (core.style.visibility !== "visible") {
      core.style.visibility = "visible";
      glow.style.visibility = "visible";
      glowX = x;
      glowY = y;
    }
    core.style.left = `${x}px`;
    core.style.top = `${y}px`;
  }

  function hide() {
    mouseX = null;
    mouseY = null;
    core.style.visibility = "hidden";
    glow.style.visibility = "hidden";
  }

  cursorOn(window, "mousemove", e => onMove(e.clientX, e.clientY));
  cursorOn(document, "mouseleave", hide);
  cursorOn(window, "mousedown", () => {
    if (!cursorClickEffectIs("blue-orbs-cursor")) return;
    core.style.transform = "translate(-50%, -50%) scale(1.8)";
    glow.style.transform = "translate(-50%, -50%) scale(1.2)";
  });
  cursorOn(window, "mouseup", () => {
    if (!cursorClickEffectIs("blue-orbs-cursor")) return;
    core.style.transform = "translate(-50%, -50%) scale(1)";
    glow.style.transform = "translate(-50%, -50%) scale(1)";
  });
  if (clickOnly) {
    cursorOn(window, "click", e => {
      onMove(e.clientX, e.clientY);
      core.style.left = `${e.clientX}px`;
      core.style.top = `${e.clientY}px`;
      glowX = e.clientX;
      glowY = e.clientY;
      core.style.visibility = "visible";
      glow.style.visibility = "visible";
      core.style.transform = "translate(-50%, -50%) scale(1.8)";
      glow.style.transform = "translate(-50%, -50%) scale(1.2)";
      setTimeout(() => {
        core.style.transform = "translate(-50%, -50%) scale(1)";
        glow.style.transform = "translate(-50%, -50%) scale(1)";
        core.style.visibility = "hidden";
        glow.style.visibility = "hidden";
      }, 180);
    });
  }
  setupIframeTracking(onMove, hide);

  (function animateGlow() {
    if (mouseX !== null) {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
    }
    cursorFrame(animateGlow);
  })();
}

// Based on codepen.io/RoshitShrestha/pen/KwgVGwB
function initRedCircle() {
  if (document.getElementById("red-circle-cursor")) return;

  cursorBodyClass("red-circle-cursor");

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
  cursorNode(cursorEl);
  const generation = cursorGeneration;

  function loadScript(src, onload) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = onload;
    document.head.appendChild(s);
  }

  function setupRedCircle() {
    if (generation !== cursorGeneration) return;
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

    cursorOn(window, "mousemove", e => rcMoveTo(e.clientX, e.clientY));
    cursorOn(document, "mouseleave", rcHide);
    setupIframeTracking(rcMoveTo, rcHide);

    (function rcFollow() {
      if (rcTargetX !== null) {
        rcCurX += (rcTargetX - rcCurX) * 0.18;
        rcCurY += (rcTargetY - rcCurY) * 0.18;
        cursorEl.style.left = `${rcCurX}px`;
        cursorEl.style.top = `${rcCurY}px`;
      }
      cursorFrame(rcFollow);
    })();

    const cursorTl = gsap.timeline({ paused: true });
    cursorTl.to("#rc-cursorDot", { morphSVG: "#rc-iBeamPath", duration: 0.3, ease: "power2.inOut" });
    cursorCleanups.push(() => cursorTl.kill());

    document.querySelectorAll("[data-text-hover]").forEach(el => {
      cursorOn(el, "mouseenter", () => cursorTl.play());
      cursorOn(el, "mouseleave", () => cursorTl.reverse());
      cursorOn(el, "mousedown", () => gsap.to("#rc-cursorDot", { morphSVG: "#rc-iBeamHold", duration: 0.4, ease: "back.out(3)" }));
      cursorOn(el, "mouseup", () => gsap.to("#rc-cursorDot", { morphSVG: "#rc-iBeamPath", duration: 0.4, ease: "back.out(3)" }));
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
function initTheSims(clickOnly = false) {
  if (document.getElementById("the-sims-cursor")) return;

  if (!clickOnly) cursorBodyClass("the-sims-cursor");

  const NS = "http://www.w3.org/2000/svg";
  const cursorSvg = document.createElementNS(NS, "svg");
  cursorSvg.id = "the-sims-cursor";
  cursorSvg.setAttribute("viewBox", "-110 -160 220 310");
  cursorSvg.setAttribute("width", "44");
  cursorSvg.setAttribute("height", "62");
  cursorSvg.setAttribute("overflow", "visible");
  document.body.appendChild(cursorSvg);
  cursorNode(cursorSvg);

  const halo1 = document.createElement("div");
  halo1.className = "sims-halo";
  halo1.style.cssText = "width:40px;height:40px;border:1.5px solid hsla(110,100%,60%,0.26);";
  document.body.appendChild(halo1);
  cursorNode(halo1);

  const halo2 = document.createElement("div");
  halo2.className = "sims-halo";
  halo2.style.cssText = "width:56px;height:56px;border:1px solid hsla(110,100%,60%,0.1);animation-delay:0.7s;";
  document.body.appendChild(halo2);
  cursorNode(halo2);

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

    cursorFrame(renderPlumbob);
  }
  cursorFrame(renderPlumbob);

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

  const simsInterval = cursorInterval(() => {
    if (clickOnly || store.get("pointerCustom") !== "the-sims") {
      clearInterval(simsInterval);
      return;
    }
    if (simsMouseX === null) return;
    const spread = 60;
    spawnSimsPt(simsMouseX + (Math.random() - 0.5) * spread, simsMouseY + (Math.random() - 0.5) * spread, 0.6 + Math.random() * 0.5);
  }, 420);

  cursorOn(document, "click", e => {
    if (!cursorClickEffectIs("the-sims")) return;
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2,
        r = 20 + Math.random() * 50;
      spawnSimsPt(e.clientX + Math.cos(ang) * r, e.clientY + Math.sin(ang) * r, 0.5 + Math.random() * 0.7);
    }
  });

  function showAt(x, y) {
    simsMouseX = x;
    simsMouseY = y;
    if (clickOnly) return;
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
    if (clickOnly) return;
    cursorSvg.style.visibility = "hidden";
    halo1.style.visibility = "hidden";
    halo2.style.visibility = "hidden";
  }

  cursorOn(document, "mousemove", e => showAt(e.clientX, e.clientY));
  cursorOn(document, "mouseleave", hide);
  cursorOn(document, "mouseenter", () => {
    halo1.style.visibility = "visible";
    halo2.style.visibility = "visible";
  });
  setupIframeTracking(showAt, hide);
}

// Based on codepen.io/Jiironimo/pen/vEXbVNP
function initBlueOrbsDom() {
  if (document.getElementById("blue-orbs-glow")) return;
  initBlueOrbsCursor();
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

  cursorOn(window, "mousemove", e => onMove(e.clientX, e.clientY));
  cursorOn(window, "touchmove", e => onMove(e.targetTouches[0].pageX, e.targetTouches[0].pageY));
  cursorOn(document, "mouseleave", () => {
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
      cursorFrame(update);
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

    cursorFrame(update);
  }

  cursorFrame(update);
}

function trackCursorPosition(onMove, onLeave = () => {}) {
  cursorOn(window, "mousemove", e => onMove(e.clientX, e.clientY));
  cursorOn(window, "touchmove", e => {
    const touch = e.targetTouches[0];
    if (touch) onMove(touch.clientX, touch.clientY);
  });
  cursorOn(document, "mouseleave", onLeave);
  setupIframeTracking(onMove, onLeave);
}

function themeCursorColor() {
  return getComputedStyle(document.body).getPropertyValue("--text-primary").trim() || "#ffffff";
}

function spawnOnMovement(minDistance, spawn) {
  let lastX = null;
  let lastY = null;
  return (x, y) => {
    if (lastX !== null && Math.hypot(x - lastX, y - lastY) < minDistance) return;
    lastX = x;
    lastY = y;
    spawn(x, y);
  };
}

function drawPointerArrow(ctx, x, y, scale, alpha, color) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 17);
  ctx.lineTo(4.2, 13.2);
  ctx.lineTo(7.2, 19.6);
  ctx.lineTo(10.4, 18);
  ctx.lineTo(7.4, 11.9);
  ctx.lineTo(12.6, 11.6);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
  ctx.stroke();
  ctx.restore();
}

function initRainbowRibbon() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");

  const STRIPES = ["#fb3b3b", "#fb8b24", "#f9d423", "#2ecc71", "#2ec4f1", "#4f6cf5", "#9b5de5"];
  const STRIPE_WIDTH = 3.4;
  const MAX_POINTS = 34;
  const points = [];
  let x = null;
  let y = null;

  trackCursorPosition(
    (nextX, nextY) => {
      x = nextX;
      y = nextY;
    },
    () => {
      x = null;
      y = null;
    },
  );

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (x === null) {
      points.length = 0;
      return;
    }

    points.unshift({ x, y });
    if (points.length > MAX_POINTS) points.pop();
    if (points.length < 3) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = STRIPE_WIDTH;

    STRIPES.forEach((color, index) => {
      const offset = (index - (STRIPES.length - 1) / 2) * STRIPE_WIDTH;
      ctx.beginPath();
      ctx.strokeStyle = color;
      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const length = Math.hypot(next.x - current.x, next.y - current.y) || 1;

        const nx = (-(next.y - current.y) / length) * offset;
        const ny = ((next.x - current.x) / length) * offset;
        if (i === 0) ctx.moveTo(current.x + nx, current.y + ny);
        ctx.lineTo(next.x + nx, next.y + ny);
      }
      ctx.stroke();
    });
  })();
}

function initFairyDustTrail() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");

  const COLORS = ["#ff7eb9", "#ff65a3", "#7afcff", "#feff9c", "#fff27a", "#c5a3ff"];
  const GLYPHS = ["✦", "✧", "✶", "·"];
  const specks = [];

  trackCursorPosition(
    spawnOnMovement(7, (x, y) => {
      specks.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -0.3 - Math.random() * 0.5,
        life: 1,
        decay: 0.012 + Math.random() * 0.012,
        size: 10 + Math.random() * 11,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }),
  );

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = specks.length - 1; i >= 0; i--) {
      const speck = specks[i];
      speck.vy += 0.055;
      speck.x += speck.vx;
      speck.y += speck.vy;
      speck.life -= speck.decay;
      if (speck.life <= 0) {
        specks.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = Math.max(0, speck.life);
      ctx.fillStyle = speck.color;
      ctx.shadowColor = speck.color;
      ctx.shadowBlur = speck.size * 0.7;
      ctx.font = `${speck.size}px sans-serif`;
      ctx.fillText(speck.glyph, speck.x, speck.y);
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  })();
}

function initEchoTrail() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");
  const MAX_ECHOES = 26;
  const echoes = [];

  trackCursorPosition(
    spawnOnMovement(9, (x, y) => {
      echoes.push({ x, y, life: 1 });
      if (echoes.length > MAX_ECHOES) echoes.shift();
    }),
  );

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = themeCursorColor();

    for (let i = echoes.length - 1; i >= 0; i--) {
      const echo = echoes[i];
      echo.life -= 0.016;
      if (echo.life <= 0) {
        echoes.splice(i, 1);
        continue;
      }
      drawPointerArrow(ctx, echo.x, echo.y, 0.6 + echo.life * 0.4, echo.life * 0.65, color);
    }
  })();
}

function initChasingCursors() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");
  const COUNT = 8;
  const followers = Array.from({ length: COUNT }, () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
  let x = null;
  let y = null;

  trackCursorPosition(
    (nextX, nextY) => {
      x = nextX;
      y = nextY;
    },
    () => {
      x = null;
      y = null;
    },
  );

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (x === null) return;

    const color = themeCursorColor();
    followers.forEach((follower, index) => {
      const target = index === 0 ? { x, y } : followers[index - 1];
      follower.x += (target.x - follower.x) * 0.32;
      follower.y += (target.y - follower.y) * 0.32;
      drawPointerArrow(ctx, follower.x, follower.y, 1 - index * 0.07, 1 - index * 0.1, color);
    });
  })();
}

function initDotTrail() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");
  let x = null;
  let y = null;
  let dotX = window.innerWidth / 2;
  let dotY = window.innerHeight / 2;
  let settled = false;

  trackCursorPosition(
    (nextX, nextY) => {
      if (!settled) {
        dotX = nextX;
        dotY = nextY;
        settled = true;
      }
      x = nextX;
      y = nextY;
    },
    () => {
      x = null;
      y = null;
    },
  );

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (x === null) return;

    dotX += (x - dotX) * 0.18;
    dotY += (y - dotY) * 0.18;

    ctx.fillStyle = themeCursorColor();
    ctx.beginPath();
    ctx.arc(dotX, dotY, 9, 0, Math.PI * 2);
    ctx.fill();
  })();
}

function initBubbleTrail() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");
  const bubbles = [];

  trackCursorPosition(
    spawnOnMovement(14, (x, y) => {
      bubbles.push({
        x,
        y,
        radius: 5 + Math.random() * 13,
        vy: -(0.4 + Math.random() * 0.9),
        drift: (Math.random() - 0.5) * 0.6,
        phase: Math.random() * Math.PI * 2,
        life: 1,
        decay: 0.006 + Math.random() * 0.007,
      });
    }),
  );

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const bubble = bubbles[i];
      bubble.phase += 0.07;
      bubble.y += bubble.vy;
      bubble.x += bubble.drift + Math.sin(bubble.phase) * 0.6;
      bubble.life -= bubble.decay;
      if (bubble.life <= 0 || bubble.y + bubble.radius < 0) {
        bubbles.splice(i, 1);
        continue;
      }

      const alpha = Math.min(1, bubble.life * 1.4);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(190, 230, 255, 0.12)";
      ctx.fill();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = "rgba(225, 245, 255, 0.75)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bubble.x - bubble.radius * 0.32, bubble.y - bubble.radius * 0.34, bubble.radius * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  })();
}

function initSnowflakeTrail() {
  if (document.getElementById("pointer-canvas")) return;

  const canvas = createFullscreenCanvas("pointer-canvas");
  const ctx = canvas.getContext("2d");
  const flakes = [];

  trackCursorPosition(
    spawnOnMovement(11, (x, y) => {
      flakes.push({
        x,
        y,
        size: 11 + Math.random() * 13,
        vy: 0.4 + Math.random() * 0.9,
        drift: (Math.random() - 0.5) * 0.8,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.06,
        life: 1,
        decay: 0.005 + Math.random() * 0.006,
      });
    }),
  );

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = flakes.length - 1; i >= 0; i--) {
      const flake = flakes[i];
      flake.phase += 0.04;
      flake.y += flake.vy;
      flake.x += flake.drift + Math.sin(flake.phase) * 0.7;
      flake.rotation += flake.spin;
      flake.life -= flake.decay;
      if (flake.life <= 0 || flake.y - flake.size > canvas.height) {
        flakes.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.min(1, flake.life * 1.3);
      ctx.translate(flake.x, flake.y);
      ctx.rotate(flake.rotation);
      ctx.fillStyle = "#eaf6ff";
      ctx.shadowColor = "rgba(180, 220, 255, 0.9)";
      ctx.shadowBlur = flake.size * 0.5;
      ctx.font = `${flake.size}px sans-serif`;
      ctx.fillText("❄", 0, 0);
      ctx.restore();
    }
  })();
}


function initSmoothFollower() {
  if (document.getElementById("smooth-follower-dot")) return;

  cursorBodyClass("smooth-follower-cursor");

  const INTERACTIVE = "a, button, img, input, textarea, select, summary, [role='button'], [contenteditable='true']";
  const DOT_EASE = 0.2;
  const RING_EASE = 0.1;

  const dot = document.createElement("div");
  dot.id = "smooth-follower-dot";
  document.body.appendChild(dot);
  cursorNode(dot);

  const ring = document.createElement("div");
  ring.id = "smooth-follower-ring";
  document.body.appendChild(ring);
  cursorNode(ring);

  let pointerX = null;
  let pointerY = null;
  let dotX = 0;
  let dotY = 0;
  let ringX = 0;
  let ringY = 0;
  let placed = false;

  function place(element, x, y) {
    element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }

  function show(x, y) {
    if (!placed) {
      dotX = x;
      dotY = y;
      ringX = x;
      ringY = y;
      placed = true;
    }
    pointerX = x;
    pointerY = y;
    dot.style.visibility = "visible";
    ring.style.visibility = "visible";
  }

  function hide() {
    pointerX = null;
    pointerY = null;
    dot.style.visibility = "hidden";
    ring.style.visibility = "hidden";
    ring.classList.remove("hovering");
  }

  cursorOn(window, "mousemove", event => {
    show(event.clientX, event.clientY);
    const target = event.target;
    ring.classList.toggle("hovering", target instanceof Element && target.closest(INTERACTIVE) !== null);
  });
  cursorOn(document, "mouseleave", hide);
  setupIframeTracking(show, hide);

  (function follow() {
    cursorFrame(follow);
    if (pointerX === null) return;
    dotX += (pointerX - dotX) * DOT_EASE;
    dotY += (pointerY - dotY) * DOT_EASE;
    ringX += (pointerX - ringX) * RING_EASE;
    ringY += (pointerY - ringY) * RING_EASE;
    place(dot, dotX, dotY);
    place(ring, ringX, ringY);
  })();
}

function initAfterglow(clickOnly = false) {
  const canvasId = clickOnly ? "pointer-click-canvas" : "pointer-canvas";
  if (document.getElementById(canvasId)) return;

  const canvas = createFullscreenCanvas(canvasId);
  const ctx = canvas.getContext("2d");

  const MAX_PARTICLES = 1300;
  const particles = [];
  let hue = 196;
  let time = 0;
  let lastFrame = 0;
  let lastX = null;
  let lastY = null;


  function potential(x, y) {
    return Math.sin(x * 0.005 + time * 1.1) + Math.cos(y * 0.0045 - time * 0.9) + Math.sin((x - y) * 0.0026 + time * 0.6) * 0.7;
  }

  function flowAt(x, y) {
    const step = 1;
    const gradientX = (potential(x + step, y) - potential(x - step, y)) / (2 * step);
    const gradientY = (potential(x, y + step) - potential(x, y - step)) / (2 * step);
    return { vx: gradientY, vy: -gradientX };
  }

  function emit(x, y, vx, vy, speed) {
    if (particles.length >= MAX_PARTICLES) return;
    particles.push({
      x,
      y,
      prevX: x,
      prevY: y,
      vx: vx * 0.08 + (Math.random() - 0.5) * 0.7,
      vy: vy * 0.08 + (Math.random() - 0.5) * 0.7,
      hue: hue + (Math.random() - 0.5) * 34,
      width: 1.3 + Math.random() * 2.2,
      life: 1,
      decay: 0.008 + Math.random() * 0.008,
      glow: speed,
    });
  }

  function streak(fromX, fromY, toX, toY) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const count = Math.min(6, Math.max(1, Math.round(Math.hypot(dx, dy) / 4)));
    for (let i = 0; i < count; i++) {
      const along = i / count;
      emit(fromX + dx * along, fromY + dy * along, dx, dy, 1);
    }
  }

  function burst(x, y) {
    for (let i = 0; i < 46; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.6 + Math.random() * 3.6;
      emit(x, y, Math.cos(angle) * speed * 12, Math.sin(angle) * speed * 12, 1.4);
    }
  }

  function move(x, y) {
    if (!clickOnly && lastX !== null) streak(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }

  trackCursorPosition(move, () => {
    lastX = null;
    lastY = null;
  });
  cursorOn(window, "mousedown", event => burst(event.clientX, event.clientY));

  (function loop(timestamp) {
    cursorFrame(loop);
    const elapsed = lastFrame ? Math.min(0.05, (timestamp - lastFrame) / 1000) : 0;
    lastFrame = timestamp;
    time += elapsed * 0.24;
    hue = (hue + elapsed * 4) % 360;

  
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      const flow = flowAt(particle.x, particle.y);
      particle.vx = (particle.vx + flow.vx * 1.5) * 0.96;
      particle.vy = (particle.vy + flow.vy * 1.5) * 0.96;
      particle.prevX = particle.x;
      particle.prevY = particle.y;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= particle.decay;
      if (particle.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = Math.max(0, particle.life * particle.life) * 0.85;
      ctx.strokeStyle = `hsl(${particle.hue}, 92%, ${58 + particle.glow * 8}%)`;
      ctx.lineWidth = particle.width * particle.life;
      ctx.beginPath();
      ctx.moveTo(particle.prevX, particle.prevY);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  })(0);
}

// Based on codepen.io/Deva-Kumar-the-bold/pen/RNWJKWZ
function initMagneticTrail(clickOnly = false) {
  const canvasId = clickOnly ? "pointer-click-canvas" : "pointer-canvas";
  if (document.getElementById(canvasId)) return;

  const canvas = createFullscreenCanvas(canvasId);
  const ctx = canvas.getContext("2d");

  const NODES = 16;
  // Each link reels itself in at its own rate, which is what makes the
  // chain lag into a tail instead of moving as one rigid line.
  const chain = Array.from({ length: NODES }, () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    size: 4 + Math.random() * 4,
    ease: 0.11 + Math.random() * 0.1,
  }));
  const sparks = [];
  let pointerX = null;
  let pointerY = null;
  let placed = false;

  trackCursorPosition(
    (x, y) => {
      if (!placed) {
        chain.forEach(node => {
          node.x = x;
          node.y = y;
        });
        placed = true;
      }
      pointerX = x;
      pointerY = y;
    },
    () => {
      pointerX = null;
      pointerY = null;
    },
  );

  cursorOn(window, "mousedown", event => {
    if (!cursorClickEffectIs("magnetic-trail")) return;
    for (let i = 0; i < 26; i++) {
      const angle = (i / 26) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 2 + Math.random() * 4;
      sparks.push({
        x: event.clientX,
        y: event.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        life: 1,
        decay: 0.018 + Math.random() * 0.016,
      });
    }
  });

  function glowDot(x, y, size, alpha, color) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 2.6;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = themeCursorColor();

    if (!clickOnly && pointerX !== null) {
      chain.forEach((node, index) => {
        const target = index === 0 ? { x: pointerX, y: pointerY } : chain[index - 1];
        node.x += (target.x - node.x) * node.ease;
        node.y += (target.y - node.y) * node.ease;
        glowDot(node.x, node.y, node.size * (1 - index / (NODES * 1.6)), 1 - index / NODES, color);
      });
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i];
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vx *= 0.94;
      spark.vy *= 0.94;
      spark.life -= spark.decay;
      if (spark.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      glowDot(spark.x, spark.y, spark.size * spark.life, spark.life, color);
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  })();
}

// The cursor head from the same pen, as a standalone pointer.
function initMagneticCursor(clickOnly = false) {
  if (document.getElementById("magnetic-cursor-dot")) return;

  cursorBodyClass(clickOnly ? "magnetic-click-effect" : "magnetic-cursor");

  const dot = document.createElement("div");
  dot.id = "magnetic-cursor-dot";
  document.body.appendChild(dot);
  cursorNode(dot);

  let pointerX = null;
  let pointerY = null;
  let dotX = window.innerWidth / 2;
  let dotY = window.innerHeight / 2;
  let placed = false;
  let releaseTimer = 0;

  function show(x, y) {
    if (!placed) {
      dotX = x;
      dotY = y;
      placed = true;
    }
    pointerX = x;
    pointerY = y;
    if (!clickOnly) dot.style.visibility = "visible";
  }

  function hide() {
    pointerX = null;
    pointerY = null;
    dot.style.visibility = "hidden";
    dot.classList.remove("expand");
  }

  trackCursorPosition(show, hide);

  cursorOn(window, "mousedown", event => {
    if (clickOnly && !cursorClickEffectIs("magnetic-cursor")) return;
    show(event.clientX, event.clientY);
    if (clickOnly) {
      dotX = event.clientX;
      dotY = event.clientY;
      dot.style.visibility = "visible";
    }
    dot.classList.add("expand");
  });
  cursorOn(window, "mouseup", () => {
    dot.classList.remove("expand");
    if (!clickOnly) return;
    clearTimeout(releaseTimer);
    releaseTimer = setTimeout(() => {
      dot.style.visibility = "hidden";
    }, 220);
  });
  cursorCleanups.push(() => clearTimeout(releaseTimer));

  (function follow() {
    cursorFrame(follow);
    if (pointerX === null) return;
    dotX += (pointerX - dotX) * 0.2;
    dotY += (pointerY - dotY) * 0.2;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
  })();
}

// Based on codepen.io/jieajjhf-the-bashful/pen/pvoxXdW
function initColorTrail(clickOnly = false) {
  const canvasId = clickOnly ? "pointer-click-canvas" : "pointer-canvas";
  if (document.getElementById(canvasId)) return;

  const canvas = createFullscreenCanvas(canvasId);
  const ctx = canvas.getContext("2d");
  const blooms = [];

  function bloom(x, y, size) {
    blooms.push({
      x,
      y,
      radius: 5,
      maxRadius: size,
      hue: Math.random() * 360,
      life: 1,
      decay: 0.009 + Math.random() * 0.005,
    });
  }

  if (!clickOnly) {
    trackCursorPosition(spawnOnMovement(6, (x, y) => bloom(x, y, 22 + Math.random() * 10)));
  }
  cursorOn(window, "click", event => {
    if (!cursorClickEffectIs("color-trail")) return;
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 40;
      bloom(event.clientX + Math.cos(angle) * distance, event.clientY + Math.sin(angle) * distance, 26 + Math.random() * 16);
    }
  });

  (function loop() {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = blooms.length - 1; i >= 0; i--) {
      const spot = blooms[i];
      spot.radius += (spot.maxRadius - spot.radius) * 0.045;
      spot.life -= spot.decay;
      if (spot.life <= 0) {
        blooms.splice(i, 1);
        continue;
      }
      ctx.fillStyle = `hsla(${spot.hue}, 100%, 75%, ${Math.max(0, spot.life)})`;
      ctx.beginPath();
      ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  })();
}

// Based on codepen.io/Kuutti-Siitonen/pen/KKJeOoQ
function initFallingStars(clickOnly = false) {
  const canvasId = clickOnly ? "pointer-click-canvas" : "pointer-canvas";
  if (document.getElementById(canvasId)) return;

  const canvas = createFullscreenCanvas(canvasId);
  const ctx = canvas.getContext("2d");
  const stars = [];
  let lastX = null;
  let lastY = null;

  function drop(x, y, pushX, pushY) {
    const finalSize = 0.6 + Math.random() * 2;
    stars.push({
      x,
      y,
      size: finalSize * 2.2,
      finalSize,
      vx: pushX * 0.05 + (Math.random() - 0.5) * 2.4,
      vy: 1 + Math.random() + pushY * 0.04,
      alpha: 1,
      age: 0,
    });
  }

  function move(x, y) {
    // The flick of the pointer is thrown into the stars, so fast movement
    // scatters them sideways before gravity takes over.
    const pushX = lastX === null ? 0 : x - lastX;
    const pushY = lastY === null ? 0 : y - lastY;
    lastX = x;
    lastY = y;
    if (!clickOnly) drop(x, y, pushX, pushY);
  }

  trackCursorPosition(move, () => {
    lastX = null;
    lastY = null;
  });

  cursorOn(window, "click", event => {
    if (!cursorClickEffectIs("falling-stars")) return;
    for (let i = 0; i < 30; i++) drop(event.clientX, event.clientY, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 60);
  });

  (function loop(timestamp) {
    cursorFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = stars.length - 1; i >= 0; i--) {
      const star = stars[i];
      star.age += 16;
      star.x += star.vx + (Math.random() - 0.5) * 0.5;
      star.vx *= 0.96;
      star.y += star.vy;
      star.vy += 0.03;
      star.alpha -= 0.006;
      // Stars settle to their real size over the first stretch of the fall.
      const settle = Math.min(1, star.age / 1600);
      star.size = star.finalSize * (2.2 - 1.2 * settle);

      if (star.alpha <= 0 || star.y - star.size > canvas.height) {
        stars.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = Math.max(0, star.alpha);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(190, 220, 255, 0.9)";
      ctx.shadowBlur = star.size * 3;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  })(0);
}

function setupIdleCursorMotion() {
  if (store.get("pointerIdleMotion") !== "true") return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let visualX = x;
  let visualY = y;
  let idle = false;
  let idleStarted = performance.now();
  let snapFrame = 0;
  let synthetic = false;

  function emit(clientX, clientY) {
    synthetic = true;
    window.dispatchEvent(new MouseEvent("mousemove", { clientX, clientY }));
    document.dispatchEvent(new MouseEvent("mousemove", { clientX, clientY }));
    synthetic = false;
  }

  function stopIdle() {
    idle = false;
  }

  cursorOn(
    window,
    "mousemove",
    event => {
      if (synthetic) return;
      const nextX = event.clientX;
      const nextY = event.clientY;
      const wasIdle = idle;
      stopIdle();

      if (!wasIdle) {
        x = nextX;
        y = nextY;
        visualX = nextX;
        visualY = nextY;
        return;
      }

      event.stopImmediatePropagation();
      cancelAnimationFrame(snapFrame);
      const startX = visualX;
      const startY = visualY;
      const started = performance.now();
      const duration = 180;

      function snap(now) {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        visualX = startX + (nextX - startX) * eased;
        visualY = startY + (nextY - startY) * eased;
        emit(visualX, visualY);
        if (progress < 1) snapFrame = cursorFrame(snap);
      }
      snapFrame = cursorFrame(snap);
    },
    true,
  );

  cursorOn(document, "mouseleave", () => {
    idle = true;
    idleStarted = performance.now();
  });
  cursorOn(document, "mouseenter", event => {
    stopIdle();
    x = event.clientX;
    y = event.clientY;
    visualX = x;
    visualY = y;
    emit(x, y);
  });

  cursorOn(window, "blur", () => {
    idle = true;
    idleStarted = performance.now();
  });
  cursorCleanups.push(() => cancelAnimationFrame(snapFrame));

  function animateIdle(now) {
    if (idle) {
      const elapsed = (now - idleStarted) * 0.001;
      const orbitX = x + Math.cos(elapsed * 1.4) * 18;
      const orbitY = y + Math.sin(elapsed * 1.1) * 14;
      visualX = orbitX;
      visualY = orbitY;
      emit(orbitX, orbitY);
    }
    cursorFrame(animateIdle);
  }

  cursorFrame(animateIdle);
}

function initCursorEffect() {
  const legacyPointer = store.get("pointer");
  const trailPointers = ["rainbow-stars", "white-orbs", "rainbow-trail", "blue-orbs-trail", "curly-cursor", "rainbow-ribbon", "fairy-dust", "echo-trail", "chasing-cursors", "dot-trail", "bubble-trail", "snowflake-trail", "afterglow", "magnetic-trail", "color-trail", "falling-stars"];
  const customPointers = ["blue-orbs-cursor", "the-sims", "smooth-follower", "magnetic-cursor"];
  const legacyBlueOrbs = legacyPointer === "blue-orbs";
  const trail = store.get("pointerTrail") || (legacyBlueOrbs || store.get("pointerCustom") === "blue-orbs" ? "blue-orbs-trail" : trailPointers.includes(legacyPointer) ? legacyPointer : "default");
  const custom = store.get("pointerCustom") || (legacyBlueOrbs ? "blue-orbs-cursor" : customPointers.includes(legacyPointer) ? legacyPointer : "default");
  const clickEffect = store.get("pointerClickEffect") || "none";

  switch (trail) {
    case "rainbow-stars":
      initRainbowStars();
      break;
    case "white-orbs":
      initWhiteOrbs();
      break;
    case "rainbow-trail":
      initRainbowTrail();
      break;
    case "blue-orbs-trail":
      initBlueOrbsTrail();
      break;
    case "curly-cursor":
      initSnakeTrail();
      break;
    case "rainbow-ribbon":
      initRainbowRibbon();
      break;
    case "fairy-dust":
      initFairyDustTrail();
      break;
    case "echo-trail":
      initEchoTrail();
      break;
    case "chasing-cursors":
      initChasingCursors();
      break;
    case "dot-trail":
      initDotTrail();
      break;
    case "bubble-trail":
      initBubbleTrail();
      break;
    case "snowflake-trail":
      initSnowflakeTrail();
      break;
    case "afterglow":
      initAfterglow();
      break;
    case "magnetic-trail":
      initMagneticTrail();
      break;
    case "color-trail":
      initColorTrail();
      break;
    case "falling-stars":
      initFallingStars();
      break;
  }

  switch (custom) {
    case "blue-orbs-cursor":
      initBlueOrbsCursor();
      break;
    case "the-sims":
      initTheSims();
      break;
    case "smooth-follower":
      initSmoothFollower();
      break;
    case "magnetic-cursor":
      initMagneticCursor();
      break;
  }

  if (clickEffect === "rainbow-trail" && trail !== "rainbow-trail") initRainbowTrail(true);
  if (clickEffect === "white-orbs" && trail !== "white-orbs") initWhiteOrbs(true);
  if (clickEffect === "blue-orbs-cursor" && custom !== "blue-orbs-cursor") initBlueOrbsCursor(true);
  if (clickEffect === "afterglow" && trail !== "afterglow") initAfterglow(true);
  if (clickEffect === "magnetic-trail" && trail !== "magnetic-trail") initMagneticTrail(true);
  if (clickEffect === "magnetic-cursor" && custom !== "magnetic-cursor") initMagneticCursor(true);
  if (clickEffect === "color-trail" && trail !== "color-trail") initColorTrail(true);
  if (clickEffect === "falling-stars" && trail !== "falling-stars") initFallingStars(true);

  if (clickEffect === "the-sims" && custom !== "the-sims") {
    initTheSims(true);
  }

  setupIdleCursorMotion();
}

window.refreshCursorEffects = () => {
  destroyCursorEffects();
  initCursorEffect();
};
window.destroyCursorEffects = destroyCursorEffects;
