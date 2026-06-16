const contenido = document.getElementById("contenido");

function cargarPagina(archivo) {
    fetch(archivo)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo");
            }
            return response.text();
        })
        .then(data => {
            contenido.classList.remove("fade-in");

            // Reinicia la animación
            void contenido.offsetWidth;

            contenido.innerHTML = data;
            contenido.classList.add("fade-in");
        })
        .catch(error => {
            contenido.innerHTML = `<p>${error.message}</p>`;
        });
}

document.getElementById("btn1").addEventListener("click", () => {
    cargarPagina("contenido1.html");
});

document.getElementById("btn2").addEventListener("click", () => {
    cargarPagina("contenido2.html");
});