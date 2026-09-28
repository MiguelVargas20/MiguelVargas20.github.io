/* =========================================
   Miguel Vargas — Portafolio
   Menú móvil, sección activa y formulario de contacto.
   ========================================= */

"use strict";

const CONTACT_EMAIL = "andresvarg150@gmail.com";
// FormSubmit reenvía el formulario al correo. La primera vez envía un
// correo de activación a esa dirección que hay que confirmar.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;


// ===== MENÚ MÓVIL =====
const navToggle = document.getElementById("navToggle");
const mainNav   = document.getElementById("mainNav");

function setMenu(open) {
  mainNav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

navToggle.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

document.addEventListener("click", (e) => {
  if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
});


// ===== SECCIÓN ACTIVA EN EL MENÚ =====
const navLinks = [...mainNav.querySelectorAll('a[href^="#"]')];
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(section => observer.observe(section));
}


// ===== AÑO DEL PIE DE PÁGINA =====
document.getElementById("year").textContent = new Date().getFullYear();


// ===== FORMULARIO DE CONTACTO =====
const form      = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const statusEl  = document.getElementById("formStatus");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const rules = {
  nombre:  (v) => v.length >= 2  ? "" : "Escribe tu nombre.",
  email:   (v) => EMAIL_RE.test(v) ? "" : "Escribe un correo válido, por ejemplo nombre@correo.com.",
  mensaje: (v) => v.length >= 10 ? "" : "El mensaje debe tener al menos 10 caracteres.",
};

function validateField(name) {
  const input = form.elements[name];
  const error = rules[name](input.value.trim());
  const field = input.closest(".form-field");
  field.classList.toggle("invalid", Boolean(error));
  input.setAttribute("aria-invalid", String(Boolean(error)));
  document.getElementById(`${name}-error`).textContent = error;
  return !error;
}

Object.keys(rules).forEach(name => {
  form.elements[name].addEventListener("blur", () => validateField(name));
  form.elements[name].addEventListener("input", () => {
    if (form.elements[name].closest(".form-field").classList.contains("invalid")) validateField(name);
  });
});

function setStatus(message, type) {
  statusEl.className = `form-status ${type || ""}`.trim();
  statusEl.innerHTML = message;
}

function mailtoLink() {
  const subject = form.elements.asunto.value.trim() || "Contacto desde el portafolio";
  const body = `${form.elements.mensaje.value.trim()}\n\n— ${form.elements.nombre.value.trim()} (${form.elements.email.value.trim()})`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const valid = Object.keys(rules).map(validateField).every(Boolean);
  if (!valid) {
    setStatus("Revisa los campos marcados.", "error");
    form.querySelector(".invalid input, .invalid textarea")?.focus();
    return;
  }

  // Si el campo trampa tiene contenido, es un bot: no se envía nada.
  if (form.elements._honey.value) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando…";
  setStatus("", "");

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        nombre:   form.elements.nombre.value.trim(),
        email:    form.elements.email.value.trim(),
        asunto:   form.elements.asunto.value.trim() || "(sin asunto)",
        mensaje:  form.elements.mensaje.value.trim(),
        _subject: form.elements._subject.value,
        _replyto: form.elements.email.value.trim(),
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || String(data.success) === "false") throw new Error(data.message || "Error de envío");

    form.reset();
    setStatus("¡Gracias! Tu mensaje fue enviado. Te responderé pronto.", "ok");
  } catch (err) {
    setStatus(
      `No se pudo enviar el mensaje. Puedes escribirme directamente a ` +
      `<a href="${mailtoLink()}">${CONTACT_EMAIL}</a>.`,
      "error"
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar mensaje";
  }
});
