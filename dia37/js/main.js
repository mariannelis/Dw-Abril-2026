// Nivel 2
var square = document.getElementById("square");
var iris = document.getElementById("iris");
var eyeball = document.getElementById("eyeball");
var pupil = document.getElementById("pupil");

document.addEventListener("mousemove", (event) => {

    const posX = event.clientX - window.innerWidth / 2;
    const posY = event.clientY - window.innerHeight / 2;

    square.style.transform = `translate(${posX * 0.01}px, ${posY * 0.01}px)`;
    eyeball.style.transform = `translate(${posX * 0.02}px, ${posY * 0.02}px)`;
    iris.style.transform = `translate(${posX * 0.05}px, ${posY * 0.05}px)`;

    const moveX = posX * 0.03;
    const moveY = posY * 0.03;
    pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;

});

// Nivel 3 - Librería simpleParallax.js
const imageOne = document.querySelector(".parallax-one");
const imageTwo = document.querySelector(".parallax-two");

if (imageOne) {
    new simpleParallax(imageOne, {
        scale: 1.3,
        orientation: "up",
        delay: 0.2
    });
}

if (imageTwo) {
    new simpleParallax(imageTwo, {
        scale: 1.8,
        orientation: "down",
        delay: 0.6
    });
}

// Extra - Atropos
class AtroposComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.atropos = new Atropos({
            el: this.querySelector('.atropos'),
            onEnter() {
                console.log('Atropos Component: Enter');
            },
            onLeave() {
                console.log('Atropos Component: Leave');
            },
            onRotate(x, y) {
                console.log('Atropos Component: Rotate', x, y);
            }
        });

        console.log('Atropos Component: Connected!', this);
    }

    disconnectedCallback() {
        this.atropos.destroy();

        console.log('Atropos Component: Disconnected!', this);
    }
}

customElements.define('atropos-component', AtroposComponent);