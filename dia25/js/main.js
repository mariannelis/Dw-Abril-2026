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










