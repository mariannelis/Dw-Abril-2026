const lightboxLibreria = GLightbox({
  selector: ".glightbox"
});

// NIVEL 2 - Menú con JavaScript

const botonesMenu = document.querySelectorAll(".menu-btn");
const tituloMenu = document.getElementById("tituloMenu");

const opcionGuardada = localStorage.getItem("opcionMenu");

if (opcionGuardada) {
  tituloMenu.textContent = "Opción seleccionada: " + opcionGuardada;
}

botonesMenu.forEach((boton) => {
  boton.addEventListener("click", () => {
    const textoBoton = boton.textContent;

    tituloMenu.textContent = "Opción seleccionada: " + textoBoton;

    localStorage.setItem("opcionMenu", textoBoton);
  });
});

// NIVEL 2 - Lightbox propio

function open_img(url) {
  document.querySelector("#lightbox img").setAttribute("src", url);

  document.querySelector("#lightbox").classList.add("active");
}

function close_img() {
  document.querySelector("#lightbox").classList.remove("active");

  document.querySelector("#lightbox img").setAttribute("src", "");
}

// NIVEL 3 - IntersectionObserver

const imagenesLazy = document.querySelectorAll(".lazy img[data-src]");

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      const imagen = entrada.target;

      imagen.src = imagen.dataset.src;

      observador.unobserve(imagen);
    }
  });
});

imagenesLazy.forEach((imagen) => {
  observador.observe(imagen);
});

// NIVEL 3 - aria-expanded y aria-hidden

const botonInfo = document.getElementById("botonInfo");
const cajaInfo = document.getElementById("cajaInfo");

botonInfo.addEventListener("click", () => {
  const estaAbierto = botonInfo.getAttribute("aria-expanded") === "true";

  botonInfo.setAttribute("aria-expanded", String(!estaAbierto));
  cajaInfo.setAttribute("aria-hidden", String(estaAbierto));

  cajaInfo.style.display = estaAbierto ? "none" : "block";

  botonInfo.textContent = estaAbierto
    ? "Mostrar información"
    : "Ocultar información";
});