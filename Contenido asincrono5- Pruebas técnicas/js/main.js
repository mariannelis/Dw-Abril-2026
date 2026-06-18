const productImg = document.querySelector('.product-img');
const navButtons = document.querySelectorAll('.nav__btn');
const sections = document.querySelectorAll('.scroll-section');
const titulo = document.querySelector('.hero__title');
const descripcion = document.querySelector('.hero__description');

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuClose = document.querySelector('.menu__close');
const menuProduct = document.querySelector('.menu__product');

const products = {
    mesa: {
        src: 'images/mesa_negra.png',
        alt: 'Mesa negra',
        titulo: 'Mesa elegante',
        descripcion: 'Una mesa moderna ideal para espacios sofisticados y funcionales.'
    },
    silla: {
        src: 'images/silla_negra.png',
        alt: 'Silla negra',
        titulo: 'Silla clásica',
        descripcion: 'Una silla resistente y cómoda con diseño atemporal.'
    },
    sofa: {
        src: 'images/sofa_blanco.png',
        alt: 'Sofá blanco',
        titulo: 'Sofá confortable',
        descripcion: 'Un sofá amplio y cómodo pensado para crear ambientes acogedores.'
    }
};

const changeProduct = (product) => {
    const selectedProduct = products[product];

    if (!selectedProduct) return;

    productImg.classList.add('cambiando');

    setTimeout(() => {
        productImg.src = selectedProduct.src;
        productImg.alt = selectedProduct.alt;

        menuProduct.src = selectedProduct.src;
        menuProduct.alt = selectedProduct.alt;

        titulo.textContent = selectedProduct.titulo;
        descripcion.textContent = selectedProduct.descripcion;

        productImg.classList.remove('cambiando');
    }, 300);

    navButtons.forEach((button) => {
        button.classList.toggle('activo', button.dataset.product === product);
    });
};

navButtons.forEach((button) => {
    button.addEventListener('click', () => {
        changeProduct(button.dataset.product);
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            changeProduct(entry.target.dataset.product);
        }
    });
}, {
    threshold: 0.6
});

sections.forEach((section) => observer.observe(section));

menuBtn.addEventListener('click', () => {
    menu.classList.add('activo');
    document.body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', () => {
    menu.classList.remove('activo');
    document.body.style.overflow = '';
});