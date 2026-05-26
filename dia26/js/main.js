//Nivel 1- Ejemplo 1- If
let a = 3;
let result = 'Menor a 0';
if (a > 0) {
    result = 'Mayor a 0';
}
console.log(result);

//Ejemplo 2- Else
const mayorEdad = 18;
if (mayorEdad >= 18) {
    console.log("Es mayor de edad");
} else {
    console.log("Es menor de edad");
}

//Ejemplo 3- Else if
let x = 51;
if (x > 50) {
    console.log("Es mayor a 50");
} else if (x > 5) {
    console.log("Es menor a 5");
} else {
    console.log("Esta entre 5 y 50");
}

//NIVEL 2- Ejemplo 4 - Switch
const mascota = "perro";
switch (mascota) {
    case "perro":
        console.log("tengo un perro");
        break;
    case "gato":
        console.log("Tengo un gato");
        break;
    case "loro":
        console.log("Tengo un loro");
        break;
    default:
        console.log("No tengo mascota");
        break;
}

//Ejemplo 5- For
let str = '';
for (let i = 0; i < 9; i++) {
str = str + i;
}
console.log(str);

//Ejemplo 6- While
let n = 0;
while (n < 3) {
    n++;
}
console.log(n);

//NIVEL 3 - Ejemplo 7 - Do While
let result1 = '';
let i = 0;
do {
    i = i + 1;
    result1 = result1 + i;
} while (i < 5);
console.log(result1);

//Ejemplo 8 - ForEach
const array1 = ['a', 'b', 'c'];
array1.forEach((element) => console.log(element));

//Ejercicio Extra
const animals = [
    {
    name: 'perro',
    image: 'https://www.google.com/search?sca_esv=0716f69066676062&sxsrf=ANbL-n6ujeV9QfuCtUBcGpm8K4tqgKnXYg:1779813636687&udm=2&fbs=ADc_l-bpk8W4E-qsVlOvbGJcDwpn60DczFdcvPnuv8WQohHLTaMb_WtLz8zQ41bNqiqMK_0GCDA2eBSrpJajLJh54y7KhefI_dvRXyUnknSrVPAkUiebdeZMsnQIiDvY2RbGM467VORe-GZB7s0qVo2EbQCqu6z19XftDKvJxKS8mznUYmUGsXlAgy55KuDFeqKt0pkAy4uo&q=perro&sa=X&ved=2ahUKEwis3tK8steUAxVTh_0HHcRuFtgQtKgLegQIFBAB&biw=708&bih=708&dpr=1.25#sv=CAMSVhoyKhBlLVd1bVpSSlQ4azdiRjVNMg5XdW1aUkpUOGs3YkY1TToON3JGY3FwWGllYnhmUk0gBCocCgZtb3NhaWMSEGUtV3VtWlJKVDhrN2JGNU0YADABGAcg5u6qmApKCBABGAEgASgB'
},
];
const extra1 = document.getElementById('extra1');
animals.forEach(animal => {
    const animalDiv = document.createElement('div');
    animalDiv.classList.add('animal');
    const animalImage = document.createElement('img');
})
animalImage.src = 'images/$(animal.name.tolowerCase()).jpg';