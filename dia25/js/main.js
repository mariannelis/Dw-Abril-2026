// nivel 1
let alumno = {
    nombre: `Juan`,
    apellido: `Mendez`,
    edad: `33`,
    curso: `Sexto`,
    printInfo: () => {
        console.log(`alumno: ${alumno.nombre} ${alumno.apellido} ${alumno.edad}`);
    }
}

const { nombre, apellido, edad, curso } = alumno;
console.log(nombre);
console.log(apellido);
console.log(edad);
console.log(curso);

alumno.printInfo();

//nivel 2
const copiaAlumno = { ...alumno };
    console.log(copiaAlumno);

    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const array3 = [7, 8, 9];

    const arraysUnidos = [...array1, ...array2, ...array3];
    console.log(arraysUnidos);

    function sumar(...numeros) {
      return numeros.reduce((total, numero) => total + numero, 0);
    }

    console.log(sumar(1, 2, 3, 4, 5));

    const [primero, segundo, ...resto] = arraysUnidos;

    console.log(primero);
    console.log(segundo);
    console.log(resto);

    const { nombre: nombreAlumno, ...otrosDatos } = alumno;

    console.log(nombreAlumno);
    console.log(otrosDatos);

    //nivel 3

    const parrafo = document.getElementById("parrafo");
    parrafo.textContent = "Contenido cambiado con JavaScript";

    const lista = document.getElementById("lista");
    const nuevoLi = document.createElement("li");
    nuevoLi.textContent = "Elemento añadido con JavaScript";
    lista.appendChild(nuevoLi);

    const botonColor = document.getElementById("cambiarColor");

    botonColor.addEventListener("click", function() {
      parrafo.style.color = "red";
    });

    const botonEliminar = document.getElementById("eliminar");

    botonEliminar.addEventListener("click", function() {
      parrafo.remove();
    });

    let contador = 0;
    const textoContador = document.getElementById("contador");
    const botonSumar = document.getElementById("sumar");

    botonSumar.addEventListener("click", function() {
      contador++;
      textoContador.textContent = contador;
    });











