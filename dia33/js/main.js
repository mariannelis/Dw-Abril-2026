let contador = 1;

function animarDiv() {
  const div = document.getElementById("divAnimado");

  div.classList.remove("animada");

  setTimeout(() => {
    div.classList.add("animada");
  }, 10);
}

function eliminarClase() {
  const parrafo = document.getElementById("parrafo");

  parrafo.classList.remove("texto-activo");
  parrafo.classList.add("desvanecer");
}

function cambiarTamano() {
  const div = document.getElementById("divBorde");

  div.classList.toggle("grande");
}

function crearDiv() {
  const contenedor = document.getElementById("contenedorDivs");

  const nuevoDiv = document.createElement("div");
  nuevoDiv.classList.add("nuevo-div");

  nuevoDiv.textContent = contador;
  contador++;

  nuevoDiv.style.backgroundColor = generarColorAleatorio();

  nuevoDiv.addEventListener("click", function () {
    nuevoDiv.classList.add("eliminando");

    setTimeout(() => {
      nuevoDiv.remove();
    }, 400);
  });

  contenedor.appendChild(nuevoDiv);
}

function generarColorAleatorio() {
  const letras = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }

  return color;
}