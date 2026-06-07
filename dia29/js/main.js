// nivel 1 -Funciones básicas con consola
function mostrarPares() {
    for (let i = 1; i <= 100; i += 1) {
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

function saludar(nombre) {
    alert(`Hola ${nombre}`);
    console.log(`Hola ${nombre}`);
}

function procesarEntradaUsuario(callback) {
    const nombre = prompt('Por favor ingresa tu nombre:');
    callback(nombre);
}
procesarEntradaUsuario(saludar);

// Nivel 3:  Temporizadores
// mostrar un mensaje después de 3 segundos
setTimeout(() => {
    console.log('¡Hola! Este mensaje se muestra después de 3 segundos.');
}, 3000);
// mostrar la hora actual cada segundo
setInterval(() => {
    const ahora = new Date();
    console.log(`La hora actual es: ${ahora.toLocaleTimeString()}`);
}, 1000);

// Contaddor con setInterval
let contador = 0;
const intervalo = setInterval(() => {
    const contadorDOM = document.getElementById('contador');
    const botonDisminuir = document.getElementById('disminuir');
    const botonReiniciar = document.getElementById('reiniciar');
    const botonAumentar = document.getElementById('aumentar');
    botonAumentar.addEventListener('click', () => {
    valorContador++; // Suma 1
    contadorDOM.textContent = valorContador;
});

botonDisminuir.addEventListener('click', () => {
    valorContador--; // Resta 1
    contadorDOM.textContent = valorContador;
});

botonReiniciar.addEventListener('click', () => {
    valorContador = 0; // Reinicia a 0
    contadorDOM.textContent = valorContador;
});