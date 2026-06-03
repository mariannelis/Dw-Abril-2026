// Nivel 1
let nuevaVentana;
// BOTON OPEN
document.getElementById("btnOpen").onclick = function () {
    nuevaVentana = open(
        "",
        "",
        "width=400,height=300"
    );
    nuevaVentana.document.write(
        "<h2>Nueva ventana abierta</h2>"
    );
};
// BOTON CLOSE
document.getElementById("btnClose").onclick = function () {
    if (nuevaVentana) {
        nuevaVentana.close();
    }
};
// BOTON MOVETO
document.getElementById("btnMove").onclick = function () {
    nuevaVentana.moveTo(200, 200);
};
// BOTON RESIZETO
document.getElementById("btnResize").onclick = function () {
    nuevaVentana.resizeTo(800, 600);
};
// BOTON LOCATION
document.getElementById("btnLocation").onclick = function () {
    nuevaVentana.location.href = "https://www.google.com";
};
// Nivel 2
const cajas = document.querySelectorAll(".box");
document.getElementById("btnRandom").onclick = function () {
    cajas.forEach(function (caja) {
        let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
        caja.innerHTML = numeroAleatorio;
    });
};

// Nivel 3- Formulario interactivo y selección múltiple 
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");
const operador = document.getElementById("operador");
const btnCalcular = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");

btnCalcular.addEventListener("click", function () {
    const num1 = parseFloat(input1.value);
    const num2 = parseFloat(input2.value);
    const op = operador.value;

    let res;
    switch (op) {
        case "+":
            res = num1 + num2;
            break;
        case "-":
            res = num1 - num2;
            break;
        case "*":
            res = num1 * num2;
            break;
        case "/":
            res = num1 / num2;
            break;
    }
   resultado.innerHTML = `Resultado: ${res}`;
});

// ejercicios con querySelectorAll
 // 1. Cambiar color de todos los DIV
const divs = document.querySelectorAll(".divResultado");
divs.forEach(div => {
    div.style.backgroundColor = "#f0a500";
});
const parrafos = document.querySelectorAll(".containerfinal p");
parrafos.forEach(function(p){
    p.innerHTML += " Texto agregado.";
});
const botonesExtra = document.querySelectorAll(".btnNivel4");
botonesExtra.forEach(function(botoncito){
    botoncito.addEventListener("click", function(){
        botoncito.innerHTML = "¡Hiciste click!";
    });
});
