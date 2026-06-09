const lightbox = GLightbox({
  selector: ".glightbox"
});

// nivel 2
// Menú con JavaScript
const botones = document.querySelectorAll(".menu-btn");
const titulo = document.getElementById("titulo");

// Recupera el valor guardado en localStorage
const opcionGuardada = localStorage.getItem("opcionMenu");

if (opcionGuardada) {
  titulo.textContent = "Opción seleccionada: " + opcionGuardada;
}

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const texto = boton.textContent;

    titulo.textContent = "Opción seleccionada: " + texto;

    localStorage.setItem("opcionMenu", texto);
  });
});

// Lightbox propio
const imagenes = document.querySelectorAll(".galeria img");
const lightbox = document.getElementById("lightbox");
const imagenGrande = document.getElementById("imagenGrande");
const cerrar = document.getElementById("cerrar");

imagenes.forEach((imagen) => {
  imagen.addEventListener("click", () => {
    lightbox.classList.add("activo");
    imagenGrande.src = imagen.src;
    imagenGrande.alt = imagen.alt;
  });
});

cerrar.addEventListener("click", () => {
  lightbox.classList.remove("activo");
  imagenGrande.src = "";
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("activo");
    imagenGrande.src = "";
  }
});