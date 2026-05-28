
let boton = document.getElementById("boton");
boton.addEventListener("click", function() { 
    let contenido = document.getElementById("texto").value;
    document.getElementById("resultado").textContent = contenido;
});

