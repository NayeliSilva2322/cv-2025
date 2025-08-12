/* scripts.js */
/* Minimal JS: menú responsivo, contraste automático, mejoras de accesibilidad */

(function () {
  // Mobile nav toggle
  const navToggleButtons = document.querySelectorAll("#navToggle");
  navToggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nav = document.getElementById("primaryNav");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      if (nav) {
        const newState = expanded ? "true" : "false";
        // if expanded currently true -> we want to collapse; set aria-hidden accordingly
        if (expanded) {
          nav.setAttribute("aria-hidden", "true");
        } else {
          nav.setAttribute("aria-hidden", "false");
        }
      }
    });
  });

  // Set current year in footers
  document
    .getElementById("year")
    ?.replaceWith(document.createTextNode(new Date().getFullYear()));
  document
    .getElementById("year-about")
    ?.replaceWith(document.createTextNode(new Date().getFullYear()));
  document
    .getElementById("year-exp")
    ?.replaceWith(document.createTextNode(new Date().getFullYear()));
  document
    .getElementById("year-proj")
    ?.replaceWith(document.createTextNode(new Date().getFullYear()));

  function getBackgroundColor(el) {
    const style = getComputedStyle(el);
    const bg = style.backgroundColor;
    if (!bg || bg === "transparent" || bg === "rgba(0, 0, 0, 0)") return null;
    const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
    return null;
  }

  window.addEventListener("load", applyAutoContrast);
  window.addEventListener("resize", applyAutoContrast);

  // Proyecto desplegable - solo uno abierto a la vez
  document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll(".project-toggle");

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        const contentId = toggle.getAttribute("aria-controls");
        const content = document.getElementById(contentId);

        // Cerrar todos los demás
        toggles.forEach((t) => {
          t.setAttribute("aria-expanded", "false");
          document.getElementById(
            t.getAttribute("aria-controls")
          ).hidden = true;
        });

        // Abrir solo el seleccionado si no estaba abierto
        if (!expanded) {
          toggle.setAttribute("aria-expanded", "true");
          content.hidden = false;
        }
      });
    });
  });

  // Improve keyboard focus for nav: close nav when focus leaves on mobile
  document.addEventListener("click", (e) => {
    const nav = document.getElementById("primaryNav");
    const toggle = document.querySelector("#navToggle");
    if (!nav || !toggle) return;
    const isOpen = nav.getAttribute("aria-hidden") === "false";
    if (!isOpen) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
