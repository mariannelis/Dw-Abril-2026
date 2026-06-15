// Nivel 1
const slider = new Swiper(".miSlider", {
  loop: true,
  speed: 700,
  spaceBetween: 20,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  }
});
// Ejercicio 1.1
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("my-slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
// nivel 2
const cards = document.querySelectorAll(".card-3d");
const prev3D = document.querySelector(".prev-3d");
const next3D = document.querySelector(".next-3d");

let activeIndex = 2;

function updateCarousel3D() {
  cards.forEach((card, index) => {
    const offset = index - activeIndex;

    card.style.opacity = "1";
    card.style.zIndex = 10 - Math.abs(offset);

    card.style.transform = `
      translateX(${offset * 180}px)
      translateZ(${-Math.abs(offset) * 120}px)
      rotateY(${-offset * 35}deg)
      scale(${offset === 0 ? 1 : 0.8})
    `;

    if (Math.abs(offset) > 2) {
      card.style.opacity = "0";
    }
  });
}

next3D.addEventListener("click", () => {
  activeIndex++;

  if (activeIndex >= cards.length) {
    activeIndex = 0;
  }

  updateCarousel3D();
});

prev3D.addEventListener("click", () => {
  activeIndex--;

  if (activeIndex < 0) {
    activeIndex = cards.length - 1;
  }
  updateCarousel3D();
});

updateCarousel3D();

// nivel 2.2
// Nivel 2.2
let customContainer = document.getElementById("customContainer");
let customCarousel = document.getElementById("customCarousel");
let customItems = document.getElementsByClassName("custom-carousel-item");
let customDots = document.getElementsByClassName("custom-dot");

let customCurrentPosition = 0;
let customCurrentMargin = 0;
let customItemsPerPage = 3;
let customCarouselCount = customItems.length - customItemsPerPage;

if (customContainer && customCarousel && customItems.length > 0) {

  function customUpdateDots() {
    for (let i = 0; i < customDots.length; i++) {
      customDots[i].classList.remove("custom-dot-active");
    }

    if (customDots[customCurrentPosition]) {
      customDots[customCurrentPosition].classList.add("custom-dot-active");
    }
  }

  function customMoveCarousel() {
    customCurrentMargin = customCurrentPosition * (100 / customItemsPerPage);
    customCarousel.style.marginLeft = -customCurrentMargin + "%";
    customUpdateDots();
  }

  window.customCarouselRight = function () {
    customCurrentPosition++;

    if (customCurrentPosition > customCarouselCount) {
      customCurrentPosition = 0;
    }

    customMoveCarousel();
  }

  window.customCarouselLeft = function () {
    customCurrentPosition--;

    if (customCurrentPosition < 0) {
      customCurrentPosition = customCarouselCount;
    }

    customMoveCarousel();
  }
  customMoveCarousel();
}

// Nivel 3 - Carrusel 3D dinámico
const nivel3Carousel = document.querySelector(".nivel3-carousel");
const nivel3Items = document.querySelectorAll(".nivel3-item");

let nivel3Angle = 0;
let nivel3CurrentRotation = 0;
let nivel3Radius = 360;

if (nivel3Carousel && nivel3Items.length > 0) {
  nivel3Angle = 360 / nivel3Items.length;

  nivel3Items.forEach((item, index) => {
    const rotateY = nivel3Angle * index;

    item.style.transform = `
      rotateY(${rotateY}deg)
      translateZ(${nivel3Radius}px)
    `;
  });

  setInterval(() => {
    nivel3CurrentRotation -= 1;

    nivel3Carousel.style.transform = `
      rotateY(${nivel3CurrentRotation}deg)
    `;
  }, 40);
}