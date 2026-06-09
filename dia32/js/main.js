// Nivel 1
const textoCam = document.getElementById("textoCambio");
const boton = document.getElementById("btnColor");

let oscuro = false;
boton.addEventListener("click", () => {
    if (oscuro) {
        textoCam.style.color = "black";
        textoCam.style.backgroundColor = "white";
    } else {
        textoCam.style.color = "white";
        textoCam.style.backgroundColor = "black";
    }

    oscuro = !oscuro;
});

const cajaAncha = document.getElementById("cajaAn");
const btnAncho = document.getElementById("btnAncho");

let anchoGrande = false;

btnAncho.addEventListener("click", () => {

    if (anchoGrande) {
        cajaAncha.style.width = "20vw";
    } else {
        cajaAncha.style.width = "80vw";
    }

    anchoGrande = !anchoGrande;
});
// Nivel 2
// Rotar y escalar un cuadrado al pulsar un botón
const cuadrado = document.getElementById("cuadrado");
const btnAnimar = document.getElementById("btnAnimar");

let animado = false;
btnAnimar.addEventListener("click", () => {

    if (animado) {
        cuadrado.style.transform = "rotate(0deg) scale(1)";
    } else {
        cuadrado.style.transform = "rotate(180deg) scale(1.5)";
    }

    animado = !animado;
});

// Mostrar y ocultar un div usando display: none y display: block.
const caja = document.getElementById("caja");
const btnMostrarOcultar = document.getElementById("btnMostrarOcultar");

let visibleMostrar = true;
btnMostrarOcultar.addEventListener("click", () => {
    if (visibleMostrar) {
        caja.style.display = "none";
    } else {
        caja.style.display = "block";
    }
    visibleMostrar = !visible;
});
// Alternar la opacidad del texto entre 0 y 1
const texto = document.getElementById("texto");
const btnOpacidad = document.getElementById("btnOpacidad");
let visible = true;
btnOpacidad.addEventListener("click", () => {
    if (visible) {
        texto.style.opacity = "0";
    } else {
        texto.style.opacity = "1";
    }
    visible = !visible;
});

// coloreando una celda aleatoria
const celdas = document.querySelectorAll("td");
const btnColor = document.getElementById("btnColor");
btnColor.addEventListener("click", () => {
    const numeroAleatorio = Math.floor(
        Math.random() * celdas.length
    );
    celdas[numeroAleatorio].style.backgroundColor = "yellow";
});
// Si ya existe una celda coloreada, devolverla a su color original antes de pintar otra
const celdasCo = document.querySelectorAll("td");
const btnColorCelda = document.getElementById("btnColors");
let celdaAnterior = null;
btnColorCelda.addEventListener("click", () => {

    if (celdaAnterior !== null) {
        celdaAnterior.style.backgroundColor = "white";
    }

    const numeroAleatorio = Math.floor(
        Math.random() * celdas.length
    );
    const nuevaCelda = celdasCo[numeroAleatorio];
    nuevaCelda.style.backgroundColor = "yellow";
    celdaAnterior = nuevaCelda;
});

// Mover un <div> a una posición aleatoria de la pantalla
const cajaMover = document.getElementById("cajaMover");
const btnMover = document.getElementById("btnMover");
btnMover.addEventListener("click", () => {
  console.log("me estoy moviendo");
  const x = Math.floor(Math.random() * 800);
  const y = Math.floor(Math.random() * 500);
  cajaMover.style.left = x + "px";
  cajaMover.style.top = y + "px";
});