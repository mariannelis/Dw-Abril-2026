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
   Botón de idioma del header
   ========================================================================== */
    const languageToggle = document.querySelector("#languageToggle");
    languageToggle?.addEventListener("click", () => {
        languageToggle.textContent = languageToggle.textContent.trim() === "ES" ? "EN" : "ES";
    });
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
   Slider premium de servicios
   ========================================================================== */

    const servicesSlider = document.querySelector("#servicesSlider");

    if (servicesSlider) {
        const servicesTrack = servicesSlider.querySelector(".services-slider__track");
        const servicesSlides = servicesSlider.querySelectorAll(".services-slider__slide");
        const servicesPrev = servicesSlider.querySelector(".services-slider__button--prev");
        const servicesNext = servicesSlider.querySelector(".services-slider__button--next");
        const servicesDotsContainer = servicesSlider.querySelector("#servicesSliderDots");

        let currentServiceSlide = 0;

        servicesSlides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "services-slider__dot";
            dot.type = "button";
            dot.setAttribute("aria-label", `Ver servicio ${index + 1}`);

            dot.addEventListener("click", () => {
                currentServiceSlide = index;
                updateServicesSlider();
            });

            servicesDotsContainer.appendChild(dot);
        });

        const servicesDots = servicesSlider.querySelectorAll(".services-slider__dot");

        const updateServicesSlider = () => {
            servicesTrack.style.transform = `translateX(-${currentServiceSlide * 100}%)`;

            servicesDots.forEach((dot, index) => {
                dot.classList.toggle("is-active", index === currentServiceSlide);
            });
        };

        const showNextServiceSlide = () => {
            currentServiceSlide = (currentServiceSlide + 1) % servicesSlides.length;
            updateServicesSlider();
        };

        const showPrevServiceSlide = () => {
            currentServiceSlide =
                (currentServiceSlide - 1 + servicesSlides.length) % servicesSlides.length;
            updateServicesSlider();
        };

        servicesNext?.addEventListener("click", showNextServiceSlide);
        servicesPrev?.addEventListener("click", showPrevServiceSlide);

        updateServicesSlider();
    }
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

        if (total === 0) {
            return;
        }

        processCards.forEach((card, index) => {
            card.classList.remove("is-center", "is-left", "is-right", "is-hidden");

            const position = (index - processIndex + total) % total;

            if (position === 0) {
                card.classList.add("is-center");
            } else if (position === 1) {
                card.classList.add("is-right");
            } else if (position === total - 1) {
                card.classList.add("is-left");
            } else {
                card.classList.add("is-hidden");
            }
        });
    };

    const handleProcessNext = () => {
        if (processCards.length === 0) {
            return;
        }

        processIndex = (processIndex + 1) % processCards.length;
        updateProcessCarousel();
    };

    const handleProcessPrev = () => {
        if (processCards.length === 0) {
            return;
        }

        processIndex = (processIndex - 1 + processCards.length) % processCards.length;
        updateProcessCarousel();
    };

    const startProcessAutoplay = () => {
        stopProcessAutoplay();
        processAutoplay = setInterval(handleProcessNext, 3500);
    };

    const stopProcessAutoplay = () => {
        clearInterval(processAutoplay);
    };

    const handleProcessDragStart = (event) => {
        processIsDragging = true;
        processStartX = event.clientX || event.touches?.[0]?.clientX || 0;
        stopProcessAutoplay();
    };

    const handleProcessDragEnd = (event) => {
        if (!processIsDragging) {
            return;
        }

        const endX = event.clientX || event.changedTouches?.[0]?.clientX || 0;
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

    /* ==========================================================================
   Carrusel interno de páginas de proyecto
   ========================================================================== */

    const projectSlider = document.querySelector(".project-slider");

    if (projectSlider) {
        const sliderTrack = projectSlider.querySelector(".project-slider__track");
        const sliderItems = projectSlider.querySelectorAll(".project-slider__item");
        const sliderPrev = projectSlider.querySelector(".project-slider__button--prev");
        const sliderNext = projectSlider.querySelector(".project-slider__button--next");
        const sliderDotsContainer = projectSlider.querySelector(".project-slider__dots");

        let sliderIndex = 0;
        let sliderAutoplay = null;

        sliderItems.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "project-slider__dot";
            dot.type = "button";
            dot.setAttribute("aria-label", `Ver imagen ${index + 1}`);

            dot.addEventListener("click", () => {
                sliderIndex = index;
                updateProjectSlider();
                restartProjectSliderAutoplay();
            });

            sliderDotsContainer.appendChild(dot);
        });

        const sliderDots = projectSlider.querySelectorAll(".project-slider__dot");

        const updateProjectSlider = () => {
            sliderTrack.style.transform = `translateX(-${sliderIndex * 100}%)`;

            sliderDots.forEach((dot, index) => {
                dot.classList.toggle("is-active", index === sliderIndex);
            });
        };

        const showNextProjectSlide = () => {
            sliderIndex = (sliderIndex + 1) % sliderItems.length;
            updateProjectSlider();
        };

        const showPrevProjectSlide = () => {
            sliderIndex = (sliderIndex - 1 + sliderItems.length) % sliderItems.length;
            updateProjectSlider();
        };

        const startProjectSliderAutoplay = () => {
            sliderAutoplay = setInterval(showNextProjectSlide, 4500);
        };

        const stopProjectSliderAutoplay = () => {
            clearInterval(sliderAutoplay);
        };

        const restartProjectSliderAutoplay = () => {
            stopProjectSliderAutoplay();
            startProjectSliderAutoplay();
        };

        sliderNext?.addEventListener("click", () => {
            showNextProjectSlide();
            restartProjectSliderAutoplay();
        });

        sliderPrev?.addEventListener("click", () => {
            showPrevProjectSlide();
            restartProjectSliderAutoplay();
        });

        projectSlider.addEventListener("mouseenter", stopProjectSliderAutoplay);
        projectSlider.addEventListener("mouseleave", startProjectSliderAutoplay);

        updateProjectSlider();
        startProjectSliderAutoplay();
    }

    /* ==========================================================================
       Estado activo del menú según la sección visible
       ========================================================================== */

    const menuSectionLinks = document.querySelectorAll(".nav__link");

    const menuSections = document.querySelectorAll(
        "#inicio, #proyectos, #servicios, #sobre-mi, #proceso, #contacto"
    );

    const activateMenuLink = () => {
        let currentSection = "inicio";

        menuSections.forEach((section) => {
            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        menuSectionLinks.forEach((link) => {
            const linkTarget = link.getAttribute("href");
            link.classList.toggle("is-active", linkTarget === `#${currentSection}`);
        });
    };

    window.addEventListener("scroll", activateMenuLink);
    window.addEventListener("load", activateMenuLink);

    /* ==========================================================================
       Movimiento interactivo de la imagen del hero
       ========================================================================== */

    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero__image");

    if (hero && heroImage) {
        hero.addEventListener("mousemove", (event) => {
            const rect = hero.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = ((x - centerX) / centerX) * 1.2;
            const moveY = ((y - centerY) / centerY) * 1.2;

            heroImage.style.transform = `
            translate(${moveX}rem, ${moveY}rem)
            scale(1.01)
        `;
        });

        hero.addEventListener("mouseleave", () => {
            heroImage.style.transform = "translate(0, 0) scale(1)";
        });
    }
    /* ==========================================================================
   Validaciones del formulario de contacto
   ========================================================================== */

    const contactForm = document.querySelector("#contactForm");

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const messageInput = document.querySelector("#message");

    const nameError = document.querySelector("#nameError");
    const emailError = document.querySelector("#emailError");
    const phoneError = document.querySelector("#phoneError");
    const messageError = document.querySelector("#messageError");
    const formSuccess = document.querySelector("#formSuccess");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\s()-]{7,20}$/;

    const setFieldError = (input, errorElement, message) => {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        errorElement.textContent = message;
    };

    const setFieldSuccess = (input, errorElement) => {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        errorElement.textContent = "";
    };

    const validateName = () => {
        const value = nameInput.value.trim();

        if (value === "") {
            setFieldError(nameInput, nameError, "Por favor, escribe tu nombre.");
            return false;
        }

        if (value.length < 3) {
            setFieldError(nameInput, nameError, "El nombre debe tener al menos 3 caracteres.");
            return false;
        }

        setFieldSuccess(nameInput, nameError);
        return true;
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();

        if (value === "") {
            setFieldError(emailInput, emailError, "Por favor, escribe tu correo.");
            return false;
        }

        if (!emailPattern.test(value)) {
            setFieldError(emailInput, emailError, "Escribe un correo válido. Ejemplo: nombre@email.com");
            return false;
        }

        setFieldSuccess(emailInput, emailError);
        return true;
    };

    const validatePhone = () => {
        const value = phoneInput.value.trim();

        if (value === "") {
            setFieldError(phoneInput, phoneError, "Por favor, escribe tu teléfono.");
            return false;
        }

        if (!phonePattern.test(value)) {
            setFieldError(phoneInput, phoneError, "Escribe un teléfono válido.");
            return false;
        }

        setFieldSuccess(phoneInput, phoneError);
        return true;
    };

    const validateMessage = () => {
        const value = messageInput.value.trim();

        if (value === "") {
            setFieldError(messageInput, messageError, "Por favor, escribe tu mensaje.");
            return false;
        }

        if (value.length < 10) {
            setFieldError(messageInput, messageError, "El mensaje debe tener al menos 10 caracteres.");
            return false;
        }

        setFieldSuccess(messageInput, messageError);
        return true;
    };

    nameInput?.addEventListener("input", validateName);
    emailInput?.addEventListener("input", validateEmail);
    phoneInput?.addEventListener("input", validatePhone);
    messageInput?.addEventListener("input", validateMessage);

    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
            formSuccess.textContent = "";
            return;
        }

        formSuccess.textContent = "Mensaje validado correctamente. Gracias por contactar a Marianne.";

        contactForm.reset();

        nameInput.classList.remove("is-valid");
        emailInput.classList.remove("is-valid");
        phoneInput.classList.remove("is-valid");
        messageInput.classList.remove("is-valid");
    });

    /* ==========================================================================
       Chatbot Eva
       ========================================================================== */

    const chatbot = document.querySelector("#chatbot");
    const chatbotToggle = document.querySelector("#chatbotToggle");
    const chatbotClose = document.querySelector("#chatbotClose");
    const chatbotForm = document.querySelector("#chatbotForm");
    const chatbotInput = document.querySelector("#chatbotInput");
    const chatbotMessages = document.querySelector("#chatbotMessages");

    const chatbotResponses = [
        {
            keywords: ["hola", "buenas", "hello", "hi"],
            response: "Hola, soy Eva. Estoy aquí para ayudarte con información sobre Marianne, sus servicios y sus proyectos."
        },
        {
            keywords: ["servicio", "servicios", "ofreces", "haces", "trabajo"],
            response: "Marianne ofrece diseño web personalizado, landing pages, portafolios profesionales, sitios responsive y soluciones digitales modernas."
        },
        {
            keywords: ["proyecto", "proyectos", "portafolio", "trabajos"],
            response: "Puedes conocer proyectos como Saray App, Pasha Delight, Raíces Cruzadas, CodeVaml y Venezuela Levántate en la sección de proyectos."
        },
        {
            keywords: ["saray"],
            response: "Saray App es una aplicación móvil diseñada para acercar la cultura turca a usuarios hispanohablantes."
        },
        {
            keywords: ["contacto", "correo", "email", "gmail", "whatsapp", "teléfono", "telefono"],
            response: "Puedes contactar a Marianne desde el formulario de contacto o por correo electrónico."
        },
        {
            keywords: ["precio", "costo", "cuánto", "cuanto", "tarifa", "presupuesto"],
            response: "El costo depende del tipo de proyecto, número de secciones y funcionalidades. Lo mejor es enviar una solicitud para preparar una propuesta personalizada."
        },
        {
            keywords: ["responsive", "móvil", "movil", "tablet", "celular"],
            response: "Sí, los sitios se diseñan para verse bien en computadora, tablet y móvil."
        },
        {
            keywords: ["marianne", "quién", "quien", "perfil"],
            response: "Marianne Lucena es Ingeniera en Informática, enfocada en desarrollo web, aplicaciones móviles y soluciones digitales con propósito."
        }
    ];

    const addChatbotMessage = (message, type) => {
        const messageElement = document.createElement("div");

        messageElement.classList.add("chatbot__message");
        messageElement.classList.add(`chatbot__message--${type}`);
        messageElement.textContent = message;

        chatbotMessages?.appendChild(messageElement);

        if (chatbotMessages) {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    };

    const getChatbotResponse = (userMessage) => {
        const normalizedMessage = userMessage.toLowerCase();

        const matchedResponse = chatbotResponses.find((item) =>
            item.keywords.some((keyword) => normalizedMessage.includes(keyword))
        );

        if (matchedResponse) {
            return matchedResponse.response;
        }

        return "Gracias por escribirme. Soy Eva y puedo ayudarte con información sobre servicios, proyectos, contacto o el perfil profesional de Marianne.";
    };

    chatbotToggle?.addEventListener("click", () => {
        chatbot?.classList.toggle("is-open");
    });

    chatbotClose?.addEventListener("click", () => {
        chatbot?.classList.remove("is-open");
    });

    chatbotForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const userMessage = chatbotInput.value.trim();

        if (!userMessage) {
            return;
        }

        addChatbotMessage(userMessage, "user");
        chatbotInput.value = "";

        setTimeout(() => {
            const botResponse = getChatbotResponse(userMessage);
            addChatbotMessage(botResponse, "bot");
        }, 500);
    });


})();