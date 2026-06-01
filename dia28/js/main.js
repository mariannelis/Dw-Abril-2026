const buttons = document.querySelectorAll('.color');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function changeColor(event) {
    const button = event.target;
    button.style.backgroundColor = getRandomColor();
    button.style.color = getRandomColor();
}

buttons.forEach((button) => {
    button.addEventListener('click', changeColor);
});

// Nivel 2: divs que cambian de color
const cajas = document.querySelectorAll(".caja");
const botonDivs = document.getElementById("cambiarDivs");

botonDivs.addEventListener("click", function () {
    cajas.forEach(function (caja) {
        caja.style.backgroundColor = getRandomColor();
    });
});

// Nivel 2: capturar movimiento del ratón
document.addEventListener("mousemove", function (e) {
    console.log("Posición X:", e.clientX, "Posición Y:", e.clientY);
});

// Nivel 2: mouse entra y sale del div
const zonaMouse = document.getElementById("zonaMouse");

zonaMouse.addEventListener("mouseover", function () {
    zonaMouse.style.backgroundColor = getRandomColor();
});

zonaMouse.addEventListener("mouseout", function () {
    zonaMouse.style.backgroundColor = getRandomColor();
});


// Nivel 3: Eventos
document.getElementById("eventoClick").addEventListener("click", function () {
    alert("Usaste el evento click");
});

document.getElementById("eventoInput").addEventListener("input", function (e) {
    console.log("Texto escrito:", e.target.value);
});

document.getElementById("eventoChange").addEventListener("change", function (e) {
    alert("Seleccionaste: " + e.target.value);
});


// preventDefault
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("El formulario no se envió gracias a preventDefault()");
});

// stopPropagation
const padre = document.getElementById("padre");
const hijo = document.getElementById("hijo");

padre.addEventListener("click", function () {
    alert("Click en el div padre");
});

hijo.addEventListener("click", function (e) {
    e.stopPropagation();
    alert("Click en el div hijo. No se propaga al padre.");
});

// once
const soloUnaVez = document.getElementById("soloUnaVez");

soloUnaVez.addEventListener("click", function () {
    alert("Este botón solo funciona una vez");
}, { once: true });

// Uso correcto de this
const botonesThis = document.querySelectorAll(".botonThis");

botonesThis.forEach(function (boton) {

    boton.addEventListener("click", function () {
        this.style.backgroundColor = getRandomColor();
        if (this.textContent === "Ya cambié") {
            this.textContent = "No cambié";
        } 
        else {
            this.textContent = "Ya cambié";
        }
    });
});

// Eventos extra
window.addEventListener("load", function () {
    console.log("La página cargó correctamente");
});

window.addEventListener("resize", function () {
    console.log("La ventana cambió de tamaño");
});