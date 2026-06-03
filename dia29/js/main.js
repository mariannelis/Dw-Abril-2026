// nivel 1 -Funciones básicas con consola
function mostrarPares() {
  for (let i = 2; i <= 100; i += 2) {
    console.log(i);
  }
}

mostrarPares();

function cuadrado(x) {
    for (let i = 0; i < x; i++) {
        let text = '';
        for (let j = 0; j < x; j++) {
            text += '* ';
        }
        console.log(text);
    }
}
cuadrado(5);
console.log('');
function cuadradoHueco(x) {
    for (let i = 0; i < x; i++) {
        let text = `linea ${i}`;
        for (let j = 0; j < x; j++) {
            text += '* ';

        }
        console.log(text);
    }
}
cuadradoHueco(5);

console.log('');
function cuadradoHueco2(x) {
    for (let i = 0; i < x; i++) {
        let text = `linea ${i}`;
        for (let j = 0; j < x; j++) {
            if (i === 0 || i === x - 1 || j === 0 || j === x - 1) {
                text += '** ';
            } else {
                text += '  ';
            }
        }
        console.log(text);
    }
}
cuadradoHueco2(5);

function triangulo(x) {
    for (let i = 0; i < x; i++) {
        let text = `linea ${i}`;
        for (let j = 0; j < x; j++) {
            if (j <= i) {
                text += '* ';
            } else {
                text += '  ';
            }
        }
        console.log(text);
    }
}
triangulo(5);

