// Crear un array de 10 posiciones
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Mostrar el array completo
console.log("Array completo:", array);

// Mostrar los elementos de las posiciones 3 y 6
console.log("Elemento en posición 3:", array[3]);
console.log("Elemento en posición 6:", array[6]);

// Mostrar el tamaño del array
console.log("Tamaño del array:", array.length);

// Añadir un valor al principio
array.unshift(0);
console.log("Después de añadir al principio:", array);

// Añadir un valor al final
array.push(11);
console.log("Después de añadir al final:", array);

// Eliminar los elementos de la posición 5 y 6
array.splice(5, 2);
console.log("Después de eliminar posiciones 5 y 6:", array);


//Nivel 2
// Crear el array
let array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Buscar un elemento y mostrar su posición
let elemento = 5;
console.log("La posición del elemento es:", array2.indexOf(elemento));

// Darle la vuelta al array
array2.reverse();
console.log("Array invertido:", array2);

// Convertir el array a string separado por comas
let arrayString = array.join(",");
console.log("Array convertido en string:", arrayString);

// Separar el string y volver a convertirlo en array
let nuevoArray = arrayString.split(",");
console.log("String convertido nuevamente en array:", nuevoArray);

// Recorrer el array con forEach mostrando valor e índice
nuevoArray.forEach((valor, indice) => {
    console.log("Índice:", indice, "- Valor:", valor);
});

// Recorrer el array y añadir algo a cada valor antes de imprimirlo
nuevoArray.forEach((valor) => {
    console.log("Número:", valor);
});

//nivel 3
// Array de números
let numeros = [10, 20, 30, 40, 50];

// Buscar si existe un valor con includes
console.log("¿Existe el número 30?", numeros.includes(30));

// Buscar un valor con find
let encontrado = numeros.find(num => num > 25);
console.log("Primer número mayor que 25:", encontrado);

// Filtrar valores mayores que 25
let filtrados = numeros.filter(num => num > 25);
console.log("Números mayores que 25:", filtrados);

// Reducir el array y sumar todos los valores
let suma = numeros.reduce((acumulador, num) => acumulador + num, 0);
console.log("Suma total:", suma);

// Deconstrucción del array
const [a, b, c] = numeros;

console.log("Variable a:", a);
console.log("Variable b:", b);
console.log("Variable c:", c);

// Array de nombres
let nombres = ["Marianne", "Mirian", "Ana", "Carlos"];

// Crear lista HTML con map
document.getElementById("lista").innerHTML = listaHTML;
