
// Nivel 1 / cambiando de colo los elementos de una lista
const items = document.querySelectorAll("li");
items.forEach(item => {
    item.style.backgroundColor = "lightblue";
    item.style.margin = "5px";
});
// añadiendo emojis a los parrafos
const emojis = ["📄", "🎨", "💻"];
const parrafos = document.querySelectorAll("p");

parrafos.forEach((parrafo, index) => {
    parrafo.textContent += " " + emojis[index % emojis.length];
});

// cambiamos texto de los botones
const botones = document.querySelectorAll("button");
botones.forEach((boton, index) => {
    boton.textContent = `Nuevo Botón ${index + 1}`;
});

// Nivel 2/Eventos y manipulación dinámica
// tachando tareas al hacer click
const tareas = document.querySelectorAll("#tareas li");
tareas.forEach(tarea => {
    tarea.addEventListener("click", () => {
        tarea.style.textDecoration = "line-through";
        tarea.style.color = "gray";
    });
});

// Tarjetas de productos con estilos condicionales
const productos = document.querySelectorAll(".producto");
productos.forEach(producto => {
    const precio = Number(producto.dataset.precio);

    if (precio > 1000) {
        producto.style.backgroundColor = "gold";
        producto.style.fontWeight = "bold";
    }
});
// const precio = parseFloat(producto.getAttribute("data-precio")); preguntar al profesor si es
//  mejor usar dataset o getAttribute para obtener el precio, ya que ambos funcionan pero
//  quiero saber cual es la mejor practica.

// boton eliminar para cada bloque
const bloques = document.querySelectorAll(".bloque");
bloques.forEach(bloque => {
    const boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.style.marginLeft = "10px";
    boton.addEventListener("click", () => {
        bloque.remove();
    });

    bloque.appendChild(boton);
});

// Nivel 3: Generación dinámica y estructuras más complejas
// Generar listado desde un array de objetos
const personas = [
    { nombre: "Ana", edad: 22 },
    { nombre: "Carlos", edad: 30 },
    { nombre: "María", edad: 27 }
];

const contenedor = document.querySelector("#personas");
personas.forEach(persona => {
    const p = document.createElement("p");
    p.textContent =
        `${persona.nombre} tiene ${persona.edad} años`;

    contenedor.appendChild(p);
});
// Galeria de Img desde un array de URLs
const imagenes = [
    "https://picsum.photos/300/200?1",
    "https://picsum.photos/300/200?2",
    "https://picsum.photos/300/200?3",
    "https://picsum.photos/300/200?4"
];

const galeria = document.querySelector("#galeria");
imagenes.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    galeria.appendChild(img);
});

// crear una tabla dinamicamente
const usuarios = [
    {
        nombre: "Ana",
        email: "ana@gmail.com",
        rol: "Admin"
    },
    {
        nombre: "Carlos",
        email: "carlos@gmail.com",
        rol: "Editor"
    },
    {
        nombre: "María",
        email: "maria@gmail.com",
        rol: "Usuario"
    }
];

const tbody = document.querySelector("#tablaUsuarios");

usuarios.forEach(usuario => {

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.rol}</td>
    `;

    tbody.appendChild(fila);
});