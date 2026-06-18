// MENÚ MÓVIL
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


// LIGHTBOX PARA AMPLIAR IMÁGENES
const posterImages = document.querySelectorAll(".poster-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

posterImages.forEach((image) => {
    image.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImage.src = image.src;
    });
});

closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});


// VALIDACIÓN DEL FORMULARIO
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Por favor, completa todos los campos obligatorios.";
        formMessage.style.color = "red";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        formMessage.textContent = "Por favor, escribe un correo electrónico válido.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent = "Mensaje enviado correctamente. Laura responderá pronto.";
    formMessage.style.color = "green";

    contactForm.reset();
});