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
        // Simplificado: usar display o clase para mostrar/ocultar
        if (expanded) {
          nav.setAttribute("aria-hidden", "true");
          nav.style.display = "none"; // o nav.classList.remove('open')
        } else {
          nav.setAttribute("aria-hidden", "false");
          nav.style.display = "block"; // o nav.classList.add('open')
        }
      }
    });
  });

  // Set current year in footers
  function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = [
      "year",
      "year-about", 
      "year-exp",
      "year-proj"
    ];
    
    yearElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = currentYear;
      }
    });
  }

  // Función para obtener color de fondo
  function getBackgroundColor(el) {
    const style = getComputedStyle(el);
    const bg = style.backgroundColor;
    if (!bg || bg === "transparent" || bg === "rgba(0, 0, 0, 0)") return null;
    const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
    return null;
  }

  // Función de contraste automático (ejemplo básico)
  function applyAutoContrast() {
    // Aquí puedes implementar tu lógica de contraste
    // Por ejemplo, detectar si el fondo es oscuro o claro y ajustar colores
    const body = document.body;
    const bgColor = getBackgroundColor(body);
    
    if (bgColor) {
      // Calcular luminosidad
      const luminance = (0.299 * bgColor[0] + 0.587 * bgColor[1] + 0.114 * bgColor[2]) / 255;
      
      // Si el fondo es oscuro, usar texto claro
      if (luminance < 0.5) {
        body.classList.add('dark-bg');
      } else {
        body.classList.remove('dark-bg');
      }
    }
  }

  // Proyecto desplegable - solo uno abierto a la vez
  function initProjectToggles() {
    const toggles = document.querySelectorAll(".project-toggle");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault(); // Prevenir comportamiento por defecto
        
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        const contentId = toggle.getAttribute("aria-controls");
        const content = document.getElementById(contentId);
        
        if (!content) {
          console.warn(`No se encontró elemento con ID: ${contentId}`);
          return;
        }

        // Cerrar todos los demás
        toggles.forEach((t) => {
          if (t !== toggle) {
            t.setAttribute("aria-expanded", "false");
            const otherContentId = t.getAttribute("aria-controls");
            const otherContent = document.getElementById(otherContentId);
            if (otherContent) {
              otherContent.hidden = true;
            }
          }
        });

        // Alternar el seleccionado
        if (expanded) {
          toggle.setAttribute("aria-expanded", "false");
          content.hidden = true;
        } else {
          toggle.setAttribute("aria-expanded", "true");
          content.hidden = false;
        }
      });
    });
  }

  // Cerrar navegación al hacer clic fuera
  function initOutsideClickHandler() {
    document.addEventListener("click", (e) => {
      const nav = document.getElementById("primaryNav");
      const toggle = document.querySelector("#navToggle");
      if (!nav || !toggle) return;

      const isOpen = nav.getAttribute("aria-hidden") === "false";
      if (!isOpen) return;

      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.setAttribute("aria-hidden", "true");
        nav.style.display = "none"; // o nav.classList.remove('open')
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Inicialización cuando el DOM esté listo
  function init() {
    setCurrentYear();
    applyAutoContrast();
    initProjectToggles();
    initOutsideClickHandler();
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Eventos adicionales
  window.addEventListener("load", applyAutoContrast);
  window.addEventListener("resize", applyAutoContrast);

})();
