/* =========================================
   MIGUEL VARGAS — PORTFOLIO JS
   ========================================= */

"use strict";

// ===== CURSOR PERSONALIZADO =====
const cursor    = document.getElementById("cursor");
const cursorDot = document.getElementById("cursor-dot");
let mouseX = 0, mouseY = 0;
let dotX = 0,   dotY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top  = mouseY + "px";
});

function animateDot() {
  dotX += (mouseX - dotX) * 0.12;
  dotY += (mouseY - dotY) * 0.12;
  cursorDot.style.left = dotX + "px";
  cursorDot.style.top  = dotY + "px";
  requestAnimationFrame(animateDot);
}
animateDot();

document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; cursorDot.style.opacity = "0"; });
document.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; cursorDot.style.opacity = "1"; });


// ===== CANVAS BACKGROUND =====
const canvas = document.getElementById("bg-canvas");
const ctx    = canvas.getContext("2d");

let particles = [];
let W, H;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initParticles();
}

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 16000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r:  Math.random() * 1.5 + 0.3,
      a:  Math.random() * 0.4 + 0.1,
    });
  }
}

function drawGrid() {
  ctx.strokeStyle = "rgba(139, 92, 246, 0.03)";
  ctx.lineWidth   = 0.5;
  const gs = 70;
  for (let x = 0; x <= W; x += gs) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += gs) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function drawParticles() {
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(139, 92, 246, ${p.a})`;
    ctx.fill();
  });
}

function connectParticles() {
  const maxDist = 100;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < maxDist) {
        const alpha = 0.08 * (1 - d / maxDist);
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, W, H);
  drawGrid();
  connectParticles();
  drawParticles();
  requestAnimationFrame(animateCanvas);
}

resizeCanvas();
animateCanvas();
window.addEventListener("resize", resizeCanvas);


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});


// ===== HAMBURGER / MOBILE MENU =====
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mob-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});


// ===== TYPING EFFECT HERO =====
const roles = [
  "Estudiante de Análisis y Desarrollo de Software",
  "Desarrollador Full Stack",
  "Apasionado por la tecnología",
  "Siempre aprendiendo...",
];

let roleIndex  = 0;
let charIndex  = 0;
let deleting   = false;
const roleEl   = document.getElementById("role-text");

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIndex];
  if (!deleting) {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 2200);
      return;
    }
    setTimeout(typeRole, 65);
  } else {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting   = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeRole, 35);
  }
}


// ===== TERMINAL TYPEWRITER (comandos del hero) =====
function terminalSequence() {
  const cmds = ["cmd1", "cmd2", "cmd3"];
  const outs = ["out1", "out2", "out3"];

  cmds.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ""; });
  outs.forEach(id => { const el = document.getElementById(id); if (el) el.style.opacity = "0"; });

  let delay = 400;

  cmds.forEach((id, i) => {
    const cmdEl  = document.getElementById(id);
    const outEl  = document.getElementById(outs[i]);
    const fullTxt = cmdEl ? cmdEl.dataset.full || (id === "cmd1" ? "Quien soy" : id === "cmd2" ? "Información" : "Habilidades") : "";

    // type command
    let c = 0;
    const textToType = id === "cmd1" ? "Quien soy" : id === "cmd2" ? "Información" : "Habilidades";

    setTimeout(() => {
      if (!cmdEl) return;
      cmdEl.textContent = "";
      const typeInterval = setInterval(() => {
        cmdEl.textContent += textToType[c];
        c++;
        if (c >= textToType.length) {
          clearInterval(typeInterval);
          // show output
          setTimeout(() => {
            if (outEl) outEl.style.opacity = "1";
            if (i === 0) typeRole(); // start role typing after first output
          }, 200);
        }
      }, 60);
    }, delay);

    delay += textToType.length * 60 + 700;
  });
}


// ===== INTERSECTION OBSERVER (reveal + skill bars + counters) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));


// Skill bar animation
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".sb-fill").forEach(bar => {
        const w = bar.getAttribute("data-w");
        setTimeout(() => { bar.style.width = w + "%"; }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".skill-card").forEach(card => barObserver.observe(card));


// Counter animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current  = 0;
      const step   = Math.ceil(target / 30);
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = current + "+";
      }, 50);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));


// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// ===== CONTACT FORM =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn      = contactForm.querySelector(".btn-submit");
    const textSpan = btn.querySelector(".btn-text");
    const iconSpan = btn.querySelector(".btn-icon");

    // feedback visual
    btn.style.background = "#10b981";
    btn.style.boxShadow  = "0 0 25px rgba(16,185,129,0.4)";
    textSpan.textContent = "Mensaje enviado";
    iconSpan.textContent = "✓";

    setTimeout(() => {
      btn.style.background = "";
      btn.style.boxShadow  = "";
      textSpan.textContent = "Enviar Mensaje";
      iconSpan.textContent = "→";
      contactForm.reset();
    }, 3000);
  });
}


// ===== SMOOTH SCROLL ACTIVE NAV =====
const sections  = document.querySelectorAll("section[id], .hero[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute("href") === `#${id}` ? "var(--text)" : "";
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));


// ===== SKILL TAGS HOVER GLOW =====
document.querySelectorAll(".stag, .s-pill, .ft-badge").forEach(tag => {
  tag.addEventListener("mouseenter", () => {
    tag.style.boxShadow = "0 0 12px rgba(139, 92, 246, 0.35)";
  });
  tag.addEventListener("mouseleave", () => {
    tag.style.boxShadow = "";
  });
});


// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll(".proj-card, .featured-project, .skill-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    const tilt  = 4;
    card.style.transform = `perspective(800px) rotateX(${-dy * tilt}deg) rotateY(${dx * tilt}deg) translateY(-3px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// ===== HERO PARALLAX ON SCROLL =====
const heroBgText = document.querySelector(".hero-bg-text");
window.addEventListener("scroll", () => {
  if (heroBgText) {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.15}px))`;
  }
});


// ===== INIT =====
(function init() {
  // make first two reveals visible immediately
  const immediateReveal = document.querySelectorAll(".hero .reveal");
  setTimeout(() => {
    immediateReveal.forEach(el => el.classList.add("visible"));
    terminalSequence();
  }, 100);

  // terminal output opacity
  ["out1","out2","out3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.opacity = "0"; el.style.transition = "opacity 0.4s ease"; }
  });
})();