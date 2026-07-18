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
    Cambio de idioma ES / EN
    ========================================================================== */

    document.addEventListener("DOMContentLoaded", () => {
        const languageToggle = document.querySelector("#languageToggle");

        if (!languageToggle) {
            console.warn("No se encontró el botón #languageToggle");
            return;
        }

        const applyLanguage = (language) => {
            const selectedLanguage = language === "en" ? "en" : "es";

            document.querySelectorAll("[data-es][data-en]").forEach((element) => {
                element.textContent = element.dataset[selectedLanguage];
            });

            document
                .querySelectorAll("[data-placeholder-es][data-placeholder-en]")
                .forEach((element) => {
                    element.placeholder =
                        element.dataset[
                        selectedLanguage === "es"
                            ? "placeholderEs"
                            : "placeholderEn"
                        ];
                });

            document.documentElement.lang = selectedLanguage;

            const pageIsSpanish = selectedLanguage === "es";

            languageToggle.textContent = pageIsSpanish ? "EN" : "ES";

            languageToggle.setAttribute(
                "aria-label",
                pageIsSpanish
                    ? "Cambiar el sitio al idioma inglés"
                    : "Cambiar el sitio al idioma español"
            );

            localStorage.setItem("portfolioLanguage", selectedLanguage);
        };

        const savedLanguage =
            localStorage.getItem("portfolioLanguage") || "es";

        applyLanguage(savedLanguage);

        languageToggle.addEventListener("click", () => {
            const currentLanguage = document.documentElement.lang;
            const nextLanguage = currentLanguage === "es" ? "en" : "es";

            applyLanguage(nextLanguage);
        });
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
   Slider editorial de proyectos
   ========================================================================== */

    const portfolioSlider = document.querySelector("#portfolioSlider");

    if (portfolioSlider) {
        const track = portfolioSlider.querySelector(
            ".portfolio-slider__track"
        );

        const slides = portfolioSlider.querySelectorAll(
            ".portfolio-slide"
        );

        const previousButton = portfolioSlider.querySelector(
            ".portfolio-slider__button--prev"
        );

        const nextButton = portfolioSlider.querySelector(
            ".portfolio-slider__button--next"
        );

        const currentElement = portfolioSlider.querySelector(
            "#portfolioCurrent"
        );

        const totalElement = portfolioSlider.querySelector(
            "#portfolioTotal"
        );

        let currentIndex = 0;
        let autoplay = null;
        let touchStartX = 0;

        const formatNumber = (number) => {
            return String(number).padStart(2, "0");
        };

        const updateSlider = () => {
            track.style.transform =
                `translateX(-${currentIndex * 100}%)`;

            if (currentElement) {
                currentElement.textContent =
                    formatNumber(currentIndex + 1);
            }
        };

        const showNextSlide = () => {
            currentIndex =
                (currentIndex + 1) % slides.length;

            updateSlider();
        };

        const showPreviousSlide = () => {
            currentIndex =
                (currentIndex - 1 + slides.length) %
                slides.length;

            updateSlider();
        };

        const stopAutoplay = () => {
            clearInterval(autoplay);
        };

        const startAutoplay = () => {
            stopAutoplay();

            autoplay = setInterval(
                showNextSlide,
                5500
            );
        };

        if (totalElement) {
            totalElement.textContent =
                formatNumber(slides.length);
        }

        previousButton?.addEventListener("click", () => {
            showPreviousSlide();
            startAutoplay();
        });

        nextButton?.addEventListener("click", () => {
            showNextSlide();
            startAutoplay();
        });

        portfolioSlider.addEventListener(
            "mouseenter",
            stopAutoplay
        );

        portfolioSlider.addEventListener(
            "mouseleave",
            startAutoplay
        );

        portfolioSlider.addEventListener(
            "touchstart",
            (event) => {
                touchStartX =
                    event.touches[0].clientX;
            },
            { passive: true }
        );

        portfolioSlider.addEventListener(
            "touchend",
            (event) => {
                const touchEndX =
                    event.changedTouches[0].clientX;

                const distance =
                    touchEndX - touchStartX;

                if (distance > 50) {
                    showPreviousSlide();
                } else if (distance < -50) {
                    showNextSlide();
                }

                startAutoplay();
            }
        );

        updateSlider();
        startAutoplay();
    }

    /* ==========================================================================
   Lightbox de proyectos
   ========================================================================== */

    document.addEventListener("DOMContentLoaded", () => {
        const modal = document.querySelector("#projectModal");
        const openButtons = document.querySelectorAll(".project-open");

        const closeButton = document.querySelector("#projectModalClose");
        const secondaryCloseButton = document.querySelector(
            "#projectModalSecondaryClose"
        );

        const modalSource = document.querySelector("#projectModalSource");
        const modalImage = document.querySelector("#projectModalImage");
        const modalCategory = document.querySelector("#projectModalCategory");
        const modalTitle = document.querySelector("#projectModalTitle");
        const modalDescription = document.querySelector(
            "#projectModalDescription"
        );

        const modalChallenge = document.querySelector(
            "#projectModalChallenge"
        );

        const modalSolution = document.querySelector(
            "#projectModalSolution"
        );

        const modalRole = document.querySelector("#projectModalRole");
        const modalTechnologies = document.querySelector(
            "#projectModalTechnologies"
        );

        const modalStatus = document.querySelector("#projectModalStatus");
        const modalLink = document.querySelector("#projectModalLink");

        if (!modal || openButtons.length === 0) {
            return;
        }

        const projects = {
            saray: {
                title: {
                    es: "Saray App",
                    en: "Saray App"
                },

                category: {
                    es: "Aplicación móvil",
                    en: "Mobile application"
                },

                description: {
                    es: "Saray es una aplicación móvil orientada a acercar la cultura, la gastronomía, el cine, el deporte y las noticias de Turquía a usuarios hispanohablantes.",
                    en: "Saray is a mobile application created to bring Turkish culture, gastronomy, cinema, sports and news closer to Spanish-speaking users."
                },

                challenge: {
                    es: "Crear una experiencia accesible en español que organizara diferentes contenidos culturales de Turquía dentro de una sola plataforma móvil.",
                    en: "Create an accessible Spanish-language experience that organizes different types of Turkish cultural content within one mobile platform."
                },

                solution: {
                    es: "Se diseñó una aplicación con navegación clara, categorías temáticas y una identidad visual inspirada en la unión cultural entre Turquía y Latinoamérica.",
                    en: "A mobile application was designed with clear navigation, thematic categories and a visual identity inspired by the cultural connection between Turkey and Latin America."
                },

                role: {
                    es: "Investigación, definición del concepto, arquitectura de contenido, diseño de interfaces y desarrollo de la aplicación con React Native y Python.",
                    en: "Research, concept definition, content architecture, interface design and application development using React Native and Python."
                },

                technologies: [
                    "React Native",
                    "Python",
                    "MongoDB"
                ],

                status: {
                    es: "Proyecto académico y MVP en evolución",
                    en: "Academic project and evolving MVP"
                },

                imageWebp: "images/proyecto-saray-nuevo.webp",
                imagePng: "images/proyecto-saray-nuevo.png",
                imageAlt: {
                    es: "Presentación de la aplicación móvil Saray",
                    en: "Presentation of the Saray mobile application"
                },

                link: "https://saray-app-native.vercel.app/welcome"
            },

            pasha: {
                title: {
                    es: "Pasha Delight",
                    en: "Pasha Delight"
                },

                category: {
                    es: "Comercio digital",
                    en: "Digital commerce"
                },

                description: {
                    es: "Pasha Delight es una propuesta de comercio digital orientada a presentar y exportar dulces tradicionales turcos al mercado latinoamericano.",
                    en: "Pasha Delight is a digital commerce concept created to introduce and export traditional Turkish sweets to the Latin American market."
                },

                challenge: {
                    es: "Comunicar la autenticidad y calidad de los dulces turcos mientras se presentaba una propuesta comercial comprensible para compradores latinoamericanos.",
                    en: "Communicate the authenticity and quality of Turkish sweets while presenting a clear commercial proposal for Latin American buyers."
                },

                solution: {
                    es: "Se creó una plataforma visualmente cálida y elegante, con información de productos, enfoque mayorista y una identidad inspirada en la tradición turca.",
                    en: "A warm and elegant platform was created with product information, a wholesale focus and a visual identity inspired by Turkish tradition."
                },

                role: {
                    es: "Desarrollo del concepto de negocio, identidad visual, estructura de contenidos, diseño de experiencia y construcción de la plataforma web.",
                    en: "Business concept development, visual identity, content structure, experience design and web platform construction."
                },

                technologies: [
                    "Next.js",
                    "Diseño web",
                    "Comercio exterior"
                ],

                status: {
                    es: "Prototipo web y propuesta comercial",
                    en: "Web prototype and commercial proposal"
                },

                imageWebp: "images/proyecto-pasha-nuevo.webp",
                imagePng: "images/proyecto-pasha-nuevo.png",
                imageAlt: {
                    es: "Presentación del proyecto Pasha Delight",
                    en: "Presentation of the Pasha Delight project"
                },

                link: "https://pasha-delights.vercel.app/"
            },

            venezuela: {
                title: {
                    es: "Venezuela Levántate",
                    en: "Venezuela Levántate"
                },

                category: {
                    es: "Plataforma social",
                    en: "Social platform"
                },

                description: {
                    es: "Venezuela Levántate es una propuesta digital destinada a ofrecer información, orientación y recursos de apoyo para familias venezolanas.",
                    en: "Venezuela Levántate is a digital concept designed to provide information, guidance and support resources for Venezuelan families."
                },

                challenge: {
                    es: "Diseñar una plataforma capaz de transmitir confianza, solidaridad y esperanza sin perder claridad ni facilidad de navegación.",
                    en: "Design a platform capable of communicating trust, solidarity and hope while maintaining clarity and ease of navigation."
                },

                solution: {
                    es: "Se desarrolló una experiencia visual accesible con áreas de ayuda humanitaria, orientación, comunidad y noticias relevantes.",
                    en: "An accessible visual experience was developed with sections for humanitarian aid, guidance, community and relevant news."
                },

                role: {
                    es: "Definición conceptual, organización de contenidos, diseño visual, experiencia de usuario y desarrollo de la interfaz.",
                    en: "Concept definition, content organization, visual design, user experience and interface development."
                },

                technologies: [
                    "HTML5",
                    "CSS3",
                    "JavaScript"
                ],

                status: {
                    es: "Concepto digital y prototipo visual",
                    en: "Digital concept and visual prototype"
                },

                imageWebp: "images/proyecto-venezuela-nuevo.webp",
                imagePng: "images/proyecto-venezuela-nuevo.png",
                imageAlt: {
                    es: "Presentación del proyecto Venezuela Levántate",
                    en: "Presentation of the Venezuela Levántate project"
                },

                link: ""
            }
        };

        let activeProject = null;

        const getCurrentLanguage = () => {
            return document.documentElement.lang === "en"
                ? "en"
                : "es";
        };

        const renderTechnologies = (technologies) => {
            modalTechnologies.innerHTML = "";

            technologies.forEach((technology) => {
                const technologyElement = document.createElement("span");

                technologyElement.classList.add(
                    "project-modal__technology"
                );

                technologyElement.textContent = technology;

                modalTechnologies.appendChild(technologyElement);
            });
        };

        const renderProject = (projectName) => {
            const project = projects[projectName];

            if (!project) {
                return;
            }

            const language = getCurrentLanguage();

            activeProject = projectName;

            modalSource.srcset = project.imageWebp;
            modalImage.src = project.imagePng;
            modalImage.alt = project.imageAlt[language];

            modalCategory.textContent = project.category[language];
            modalTitle.textContent = project.title[language];
            modalDescription.textContent =
                project.description[language];

            modalChallenge.textContent = project.challenge[language];
            modalSolution.textContent = project.solution[language];
            modalRole.textContent = project.role[language];
            modalStatus.textContent = project.status[language];

            renderTechnologies(project.technologies);

            if (project.link) {
                modalLink.hidden = false;
                modalLink.href = project.link;
                modalLink.classList.remove("is-disabled");

                modalLink.innerHTML = `
        <span>
            ${language === "en"
                        ? "Visit project"
                        : "Visitar proyecto"}
        </span>
    `;
            } else {
                modalLink.hidden = false;
                modalLink.removeAttribute("href");
                modalLink.classList.add("is-disabled");

                modalLink.innerHTML = `
        <span>
            ${language === "en"
                        ? "Coming soon"
                        : "Próximamente"}
        </span>
    `;
            }
        };

        const openProject = (projectName) => {
            renderProject(projectName);

            modal.showModal();
            document.body.classList.add("modal-open");
        };

        const closeProject = () => {
            modal.close();
            document.body.classList.remove("modal-open");
        };

        openButtons.forEach((button) => {
            button.addEventListener("click", () => {
                openProject(button.dataset.project);
            });
        });

        closeButton?.addEventListener("click", closeProject);

        secondaryCloseButton?.addEventListener(
            "click",
            closeProject
        );

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeProject();
            }
        });

        modal.addEventListener("close", () => {
            document.body.classList.remove("modal-open");
        });

        const languageObserver = new MutationObserver(() => {
            if (modal.open && activeProject) {
                renderProject(activeProject);
            }
        });

        languageObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["lang"]
        });
    });

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
    const processCarousel = document.querySelector("#processCarousel");

    if (processCarousel) {
        const track = processCarousel.querySelector(".process-carousel__track");
        const cards = [
            ...processCarousel.querySelectorAll(".process-card")
        ];

        const dots = [
            ...processCarousel.querySelectorAll(".process-carousel__dot")
        ];

        const previousButton = processCarousel.querySelector(
            ".process-carousel__button--previous"
        );

        const nextButton = processCarousel.querySelector(
            ".process-carousel__button--next"
        );

        const totalCards = cards.length;
        const stepAngle = 360 / totalCards;

        let currentRotation = 0;
        let targetRotation = 0;
        let velocity = 0;
        let selectedIndex = 0;

        let isDragging = false;
        let dragStartX = 0;
        let previousPointerX = 0;
        let dragDistance = 0;
        let lastInteractionTime = Date.now();

        const dragSensitivity = 0.32;
        const friction = 0.92;
        const autoRotateSpeed = 0.018;
        const autoRotateDelay = 2600;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        function normalizeIndex(index) {
            return ((index % totalCards) + totalCards) % totalCards;
        }

        function getClosestIndex() {
            const normalizedRotation =
                ((-targetRotation % 360) + 360) % 360;

            return normalizeIndex(Math.round(normalizedRotation / stepAngle));
        }

        function updateDots() {
            selectedIndex = getClosestIndex();

            dots.forEach((dot, index) => {
                const isActive = index === selectedIndex;

                dot.classList.toggle("is-active", isActive);
                dot.setAttribute("aria-current", isActive ? "true" : "false");
            });
        }

        function rotateToIndex(index) {
            const safeIndex = normalizeIndex(index);

            targetRotation = -(safeIndex * stepAngle);
            velocity = 0;
            selectedIndex = safeIndex;
            lastInteractionTime = Date.now();

            updateDots();
        }

        function moveToNextCard() {
            rotateToIndex(selectedIndex + 1);
        }

        function moveToPreviousCard() {
            rotateToIndex(selectedIndex - 1);
        }

        function beginDrag(event) {
            isDragging = true;
            dragStartX = event.clientX;
            previousPointerX = event.clientX;
            dragDistance = 0;
            velocity = 0;
            lastInteractionTime = Date.now();

            processCarousel.classList.add("is-dragging");

            if (event.pointerId !== undefined) {
                processCarousel.setPointerCapture(event.pointerId);
            }
        }

        function dragCarousel(event) {
            if (!isDragging) {
                return;
            }

            const movementX = event.clientX - previousPointerX;

            previousPointerX = event.clientX;
            dragDistance = event.clientX - dragStartX;

            const rotationMovement = movementX * dragSensitivity;

            targetRotation += rotationMovement;
            currentRotation += rotationMovement;
            velocity = rotationMovement;

            lastInteractionTime = Date.now();
        }

        function finishDrag(event) {
            if (!isDragging) {
                return;
            }

            isDragging = false;
            processCarousel.classList.remove("is-dragging");

            if (
                event.pointerId !== undefined &&
                processCarousel.hasPointerCapture(event.pointerId)
            ) {
                processCarousel.releasePointerCapture(event.pointerId);
            }

            if (Math.abs(dragDistance) < 6) {
                targetRotation =
                    Math.round(targetRotation / stepAngle) * stepAngle;

                updateDots();
            }

            lastInteractionTime = Date.now();
        }

        function updateCarousel() {
            if (!isDragging) {
                targetRotation += velocity;
                velocity *= friction;

                if (Math.abs(velocity) < 0.001) {
                    velocity = 0;
                }

                const timeWithoutInteraction =
                    Date.now() - lastInteractionTime;

                if (
                    !prefersReducedMotion &&
                    timeWithoutInteraction > autoRotateDelay
                ) {
                    targetRotation -= autoRotateSpeed;
                }
            }

            currentRotation +=
                (targetRotation - currentRotation) * 0.09;

            track.style.transform = `rotateY(${currentRotation}deg)`;

            updateDots();
            requestAnimationFrame(updateCarousel);
        }

        processCarousel.addEventListener("pointerdown", beginDrag);
        processCarousel.addEventListener("pointermove", dragCarousel);
        processCarousel.addEventListener("pointerup", finishDrag);
        processCarousel.addEventListener("pointercancel", finishDrag);
        processCarousel.addEventListener("pointerleave", finishDrag);

        previousButton.addEventListener("click", moveToPreviousCard);
        nextButton.addEventListener("click", moveToNextCard);

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                rotateToIndex(index);
            });
        });

        processCarousel.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                moveToPreviousCard();
            }

            if (event.key === "ArrowRight") {
                moveToNextCard();
            }
        });

        processCarousel.setAttribute("tabindex", "0");

        updateDots();
        updateCarousel();
    }

    /* ==========================================================================
       Preguntas frecuentes tipo acordeón
       ========================================================================== */

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq__button");

        button?.addEventListener("click", () => {
            item.classList.toggle("is-open");
        });
    });

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
       Botón volver arriba
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