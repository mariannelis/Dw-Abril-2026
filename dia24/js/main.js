//Nivel 2
let boton = document.getElementById("botonMostrar");
boton.addEventListener("click", function() { 
    let contenido = document.getElementById("texto").value;
    document.getElementById("resultado").textContent = contenido;
});

//nivel 3 -Calculadora
let boton2 = document.getElementById("botonSumar");
boton2.addEventListener("click", function() {

    let numero1 = Number(document.getElementById("num1").value);

    let numero2 = Number(document.getElementById("num2").value);

    let suma = numero1 + numero2;

    document.getElementById("resultado2").textContent =
        "Resultado: " + suma;

});

