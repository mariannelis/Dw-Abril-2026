// ejercicio 1//
const empty = document.querySelector('#empty');
empty.textContent = '¡Hola Mundo!';

// ejercicio 1-2//    
const color = document.querySelector("#color");
color.style.color = "rgb(255, 255, 0)";
color.textContent = "Ahora soy amarillo!";

// ejercicio 1-3//
const changer = document.querySelector('#changer');
const redButton = document.querySelector('#red');
const blueButton = document.querySelector('#blue');

redButton.addEventListener("click", () => {
    changer.style.color = "rgb(255,0,0)";
    changer.textContent = "Ahora soy rojo!";
});

blueButton.addEventListener("click", () => {
    changer.style.color = "rgb(0,0,255)";
    changer.textContent = "Ahora soy azul!";
});

//ejercio 2//
const PI = 3.14; 
let radius = 5;
function areaCirculo(r) {
    return PI * r * r;
    } 
    console.log(areaCirculo(radius));
    //ejercicio 3//
    const button = document.querySelector ("#miBoton");

    button.addEventListener("click", () => {
        alert("¡Botón clikeado!");
    });

    //extra//
    const colorOutput = document.querySelector("#colorOutput");
    const colorPicker = document.querySelector("#colorPicker");
    const applyColorButton = document.querySelector("#applyColor");
    applyColorButton.addEventListener("click", () => {
        const selectedColor = colorPicker.value;
        colorOutput.style.color = selectedColor;
        colorOutput.textContent = `¡Ahora soy ${selectedColor}!`
    })
