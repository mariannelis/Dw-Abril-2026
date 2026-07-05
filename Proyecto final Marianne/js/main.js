/* ==========================================================================
   PROYECTO: Marianne Lucena
   ARCHIVO: main.js
   DESCRIPCIÓN: Interacciones principales del portfolio
   ========================================================================== */

(() => {
    "use strict";
    /* ==========================================================================
       1. Variables generales
       ========================================================================== */
    const menuButton = document.querySelector(".header__menu-button");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav__link");
    const sections = document.querySelectorAll(".section, .hero");
    const faqItems = document.querySelectorAll(".faq__item");
    const projectTrack = document.querySelector(".projects__track");
    const projectPrevButton = document.querySelector(".projects__button--prev");
    const projectNextButton = document.querySelector(".projects__button--next");
    const backTopButton = document.querySelector(".back-top");
    const form = document.querySelector(".form");
    const heroSection = document.querySelector("#inicio");
    const firstSection = document.querySelector("#proyectos");
    const scrollIndicator = document.querySelector("#scrollIndicator");

    let isIntroScrolling = false;
/* ==========================================================================
   Efecto 3D en tarjetas del hero
   ========================================================================== */

const heroCards = document.querySelectorAll(".hero-service-card");

heroCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-0.35rem)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    });
});
    /* ==========================================================================
       2. Indicador fijo: desplazarse para explorar
       ========================================================================== */
    const handleScrollIndicatorClick = () => {
        firstSection?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    const handleScrollIndicatorVisibility = () => {
        const shouldHideIndicator = window.scrollY > 120;

        scrollIndicator?.classList.toggle("is-hidden", shouldHideIndicator);
    };

    scrollIndicator?.addEventListener("click", handleScrollIndicatorClick);
    window.addEventListener("scroll", handleScrollIndicatorVisibility);
    /* ==========================================================================
       2. Menú responsive
       ========================================================================== */

    const handleMenuToggle = () => {
        nav?.classList.toggle("is-open");
    };

    const handleCloseMenu = () => {
        nav?.classList.remove("is-open");
    };

    menuButton?.addEventListener("click", handleMenuToggle);

    navLinks.forEach((link) => {
        link.addEventListener("click", handleCloseMenu);
    });

    /* ==========================================================================
       3. Scroll inicial con rueda del mouse
       ========================================================================== */

    const handleIntroWheel = (event) => {
        const isMobile = window.innerWidth <= 768;
        const isGoingDown = event.deltaY > 0;
        const isAtHero = window.scrollY < 120;

        if (isMobile || !isGoingDown || !isAtHero || isIntroScrolling) {
            return;
        }

        event.preventDefault();

        isIntroScrolling = true;

        firstSection?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        setTimeout(() => {
            isIntroScrolling = false;
        }, 900);
    };

    window.addEventListener("wheel", handleIntroWheel, {
        passive: false
    });

    /* ==========================================================================
       4. Animaciones al entrar en pantalla
       ========================================================================== */

    const observerOptions = {
        threshold: 0.2
    };

    const handleSectionVisibility = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    };

    const sectionObserver = new IntersectionObserver(handleSectionVisibility, observerOptions);

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

    /* ==========================================================================
       5. Carrusel de proyectos
       ========================================================================== */

    const handleCarouselNext = () => {
        if (!projectTrack) {
            return;
        }

        const cardWidth = projectTrack.querySelector(".project-card")?.offsetWidth || 0;
        projectTrack.scrollLeft += cardWidth + 24;
    };

    const handleCarouselPrev = () => {
        if (!projectTrack) {
            return;
        }

        const cardWidth = projectTrack.querySelector(".project-card")?.offsetWidth || 0;
        projectTrack.scrollLeft -= cardWidth + 24;
    };

    projectNextButton?.addEventListener("click", handleCarouselNext);
    projectPrevButton?.addEventListener("click", handleCarouselPrev);

    /* ==========================================================================
Carrusel 3D de proceso
========================================================================== */

    const processCards = document.querySelectorAll(".process-card");
    const processTrack = document.querySelector(".process-carousel__track");
    const processPrevButton = document.querySelector(".process-carousel__button--prev");
    const processNextButton = document.querySelector(".process-carousel__button--next");

    let processIndex = 0;
    let processAutoplay = null;
    let processStartX = 0;
    let processIsDragging = false;

    const updateProcessCarousel = () => {
        const total = processCards.length;

        processCards.forEach((card) => {
            card.classList.remove(
                "is-center",
                "is-left",
                "is-right",
                "is-hidden-left",
                "is-hidden-right"
            );
        });

        if (total === 0) {
            return;
        }

        const center = processIndex;
        const left = (processIndex - 1 + total) % total;
        const right = (processIndex + 1) % total;
        const hiddenLeft = (processIndex - 2 + total) % total;
        const hiddenRight = (processIndex + 2) % total;

        processCards[center]?.classList.add("is-center");
        processCards[left]?.classList.add("is-left");
        processCards[right]?.classList.add("is-right");
        processCards[hiddenLeft]?.classList.add("is-hidden-left");
        processCards[hiddenRight]?.classList.add("is-hidden-right");
    };

    const handleProcessNext = () => {
        processIndex = (processIndex + 1) % processCards.length;
        updateProcessCarousel();
    };

    const handleProcessPrev = () => {
        processIndex = (processIndex - 1 + processCards.length) % processCards.length;
        updateProcessCarousel();
    };

    const startProcessAutoplay = () => {
        processAutoplay = setInterval(handleProcessNext, 3000);
    };

    const stopProcessAutoplay = () => {
        clearInterval(processAutoplay);
    };

    const handleProcessDragStart = (event) => {
        processIsDragging = true;
        processStartX = event.clientX || event.touches?.[0].clientX || 0;
        stopProcessAutoplay();
    };

    const handleProcessDragEnd = (event) => {
        if (!processIsDragging) {
            return;
        }

        const endX = event.clientX || event.changedTouches?.[0].clientX || 0;
        const distance = endX - processStartX;

        if (distance > 40) {
            handleProcessPrev();
        }

        if (distance < -40) {
            handleProcessNext();
        }

        processIsDragging = false;
        startProcessAutoplay();
    };

    processNextButton?.addEventListener("click", () => {
        stopProcessAutoplay();
        handleProcessNext();
        startProcessAutoplay();
    });

    processPrevButton?.addEventListener("click", () => {
        stopProcessAutoplay();
        handleProcessPrev();
        startProcessAutoplay();
    });

    processTrack?.addEventListener("mousedown", handleProcessDragStart);
    processTrack?.addEventListener("mouseup", handleProcessDragEnd);
    processTrack?.addEventListener("mouseleave", () => {
        processIsDragging = false;
    });

    processTrack?.addEventListener("touchstart", handleProcessDragStart);
    processTrack?.addEventListener("touchend", handleProcessDragEnd);

    if (processCards.length > 0) {
        updateProcessCarousel();
        startProcessAutoplay();
    }

    /* ==========================================================================
       6. Preguntas frecuentes tipo acordeón
       ========================================================================== */

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq__button");

        button?.addEventListener("click", () => {
            item.classList.toggle("is-open");
        });
    });

    /* ==========================================================================
       7. Botón volver arriba
       ========================================================================== */

    const handleBackTopVisibility = () => {
        const shouldShowButton = window.scrollY > 600;
        backTopButton?.classList.toggle("is-visible", shouldShowButton);
    };

    const handleBackTopClick = () => {
        heroSection?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    window.addEventListener("scroll", handleBackTopVisibility);
    backTopButton?.addEventListener("click", handleBackTopClick);

    /* ==========================================================================
       8. Validación visual del formulario
       ========================================================================== */

    const validateInput = (input) => {
        const hasValue = input.value.trim().length > 0;

        input.classList.toggle("is-success", hasValue);
        input.classList.toggle("is-error", !hasValue);

        return hasValue;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const fields = form?.querySelectorAll(".form__input, .form__textarea");
        let isValid = true;

        fields?.forEach((field) => {
            const fieldIsValid = validateInput(field);

            if (!fieldIsValid) {
                isValid = false;
            }
        });

        if (isValid) {
            form.classList.add("is-sent");
            alert("Mensaje enviado correctamente. Este formulario es demostrativo.");
            form.reset();

            fields.forEach((field) => {
                field.classList.remove("is-success");
            });
        }
    };

    form?.addEventListener("submit", handleFormSubmit);
})();