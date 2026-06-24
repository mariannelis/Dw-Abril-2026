/**
 * Arte en Pared - JavaScript Principal
 * Funcionalidades: Navegación móvil, Lightbox, Validación de formulario, Scroll suave
 */

(function() {
    'use strict';

    // ==========================================================================
    // ELEMENTOS DEL DOM
    // ==========================================================================

    const elements = {
        // Navegación
        navToggle: document.getElementById('navToggle'),
        nav: document.getElementById('nav'),
        navLinks: document.querySelectorAll('.nav__link'),
        header: document.getElementById('header'),
        
        // Lightbox
        lightbox: document.getElementById('lightbox'),
        lightboxImage: document.getElementById('lightboxImage'),
        lightboxCaption: document.getElementById('lightboxCaption'),
        lightboxClose: document.getElementById('lightboxClose'),
        lightboxPrev: document.getElementById('lightboxPrev'),
        lightboxNext: document.getElementById('lightboxNext'),
        galleryImages: document.querySelectorAll('[data-lightbox="true"]'),
        
        // Formulario
        contactForm: document.getElementById('contactForm'),
        formSuccess: document.getElementById('formSuccess'),
        resetFormBtn: document.getElementById('resetForm'),
        
        // Inputs del formulario
        nombreInput: document.getElementById('nombre'),
        emailInput: document.getElementById('email'),
        mensajeInput: document.getElementById('mensaje'),
        archivoInput: document.getElementById('archivo'),
        archivoLabel: document.getElementById('archivoLabel')
    };

    // Estado de la galería
    let currentImageIndex = 0;
    let galleryImagesArray = [];

    // ==========================================================================
    // NAVEGACIÓN MÓVIL
    // ==========================================================================

    function initNavigation() {
        if (!elements.navToggle || !elements.nav) return;

        // Toggle del menú hamburguesa
        elements.navToggle.addEventListener('click', toggleMenu);

        // Cerrar menú al hacer clic en un enlace
        elements.navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!elements.nav.contains(e.target) && !elements.navToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }

    function toggleMenu() {
        elements.navToggle.classList.toggle('active');
        elements.nav.classList.toggle('active');
        
        // Accesibilidad
        const isOpen = elements.nav.classList.contains('active');
        elements.navToggle.setAttribute('aria-expanded', isOpen);
        elements.navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        elements.navToggle.classList.remove('active');
        elements.nav.classList.remove('active');
        elements.navToggle.setAttribute('aria-expanded', 'false');
        elements.navToggle.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
    }

    // ==========================================================================
    // LIGHTBOX / GALERÍA
    // ==========================================================================

    function initLightbox() {
        if (!elements.lightbox || elements.galleryImages.length === 0) return;

        // Convertir NodeList a array
        galleryImagesArray = Array.from(elements.galleryImages);

        // Añadir evento click a cada imagen
        galleryImagesArray.forEach((img, index) => {
            img.addEventListener('click', () => openLightbox(index));
            
            // También al botón de zoom si existe
            const card = img.closest('.product-card');
            if (card) {
                const zoomBtn = card.querySelector('.product-card__zoom');
                if (zoomBtn) {
                    zoomBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openLightbox(index);
                    });
                }
            }
        });

        // Controles del lightbox
        elements.lightboxClose.addEventListener('click', closeLightbox);
        elements.lightboxPrev.addEventListener('click', showPrevImage);
        elements.lightboxNext.addEventListener('click', showNextImage);

        // Cerrar con click en el fondo
        elements.lightbox.addEventListener('click', function(e) {
            if (e.target === elements.lightbox) {
                closeLightbox();
            }
        });

        // Navegación con teclado
        document.addEventListener('keydown', handleLightboxKeyboard);

        // Soporte para gestos táctiles
        initTouchSupport();
    }

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        elements.lightbox.classList.add('active');
        elements.lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        elements.lightbox.classList.remove('active');
        elements.lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        const img = galleryImagesArray[currentImageIndex];
        elements.lightboxImage.src = img.src;
        elements.lightboxImage.alt = img.alt;
        elements.lightboxCaption.textContent = img.alt;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImagesArray.length) % galleryImagesArray.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImagesArray.length;
        updateLightboxImage();
    }

    function handleLightboxKeyboard(e) {
        if (!elements.lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }

    // Soporte táctil para swipe
    function initTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        elements.lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        elements.lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    showNextImage();
                } else {
                    showPrevImage();
                }
            }
        }
    }

    // ==========================================================================
    // VALIDACIÓN DE FORMULARIO
    // ==========================================================================

    function initFormValidation() {
        if (!elements.contactForm) return;

        // Validación en tiempo real
        elements.nombreInput.addEventListener('blur', validateNombre);
        elements.nombreInput.addEventListener('input', clearError);
        
        elements.emailInput.addEventListener('blur', validateEmail);
        elements.emailInput.addEventListener('input', clearError);
        
        elements.mensajeInput.addEventListener('blur', validateMensaje);
        elements.mensajeInput.addEventListener('input', clearError);
        
        elements.archivoInput.addEventListener('change', handleFileSelect);

        // Envío del formulario
        elements.contactForm.addEventListener('submit', handleFormSubmit);

        // Botón para enviar otro mensaje
        if (elements.resetFormBtn) {
            elements.resetFormBtn.addEventListener('click', resetForm);
        }
    }

    function validateNombre() {
        const value = elements.nombreInput.value.trim();
        const errorElement = document.getElementById('nombreError');
        
        if (!value) {
            showError(elements.nombreInput, errorElement, 'El nombre es obligatorio');
            return false;
        }
        
        if (value.length < 2) {
            showError(elements.nombreInput, errorElement, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        
        showValid(elements.nombreInput, errorElement);
        return true;
    }

    function validateEmail() {
        const value = elements.emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            showError(elements.emailInput, errorElement, 'El correo electrónico es obligatorio');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showError(elements.emailInput, errorElement, 'Introduce un correo electrónico válido');
            return false;
        }
        
        showValid(elements.emailInput, errorElement);
        return true;
    }

    function validateMensaje() {
        const value = elements.mensajeInput.value.trim();
        const errorElement = document.getElementById('mensajeError');
        
        if (!value) {
            showError(elements.mensajeInput, errorElement, 'El mensaje es obligatorio');
            return false;
        }
        
        if (value.length < 10) {
            showError(elements.mensajeInput, errorElement, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        
        showValid(elements.mensajeInput, errorElement);
        return true;
    }

    function handleFileSelect(e) {
        const file = e.target.files[0];
        const errorElement = document.getElementById('archivoError');
        const maxSize = 900 * 1024; // 900KB en bytes
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        
        if (!file) {
            elements.archivoLabel.textContent = 'Seleccionar archivo...';
            errorElement.textContent = '';
            return;
        }
        
        // Validar tipo de archivo
        if (!allowedTypes.includes(file.type)) {
            elements.archivoInput.value = '';
            elements.archivoLabel.textContent = 'Seleccionar archivo...';
            errorElement.textContent = 'Solo se permiten imágenes JPG, PNG o WebP';
            return;
        }
        
        // Validar tamaño
        if (file.size > maxSize) {
            elements.archivoInput.value = '';
            elements.archivoLabel.textContent = 'Seleccionar archivo...';
            errorElement.textContent = 'El archivo no puede superar los 900KB';
            return;
        }
        
        // Archivo válido
        elements.archivoLabel.textContent = file.name;
        errorElement.textContent = '';
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('valid');
        errorElement.textContent = message;
    }

    function showValid(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.textContent = '';
    }

    function clearError(e) {
        const input = e.target;
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        
        if (input.classList.contains('error')) {
            input.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validar todos los campos
        const isNombreValid = validateNombre();
        const isEmailValid = validateEmail();
        const isMensajeValid = validateMensaje();
        
        if (isNombreValid && isEmailValid && isMensajeValid) {
            // Simular envío
            showSuccessMessage();
        }
    }

    function showSuccessMessage() {
        elements.contactForm.hidden = true;
        elements.formSuccess.hidden = false;
        
        // Scroll al mensaje de éxito
        elements.formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function resetForm() {
        elements.contactForm.reset();
        elements.formSuccess.hidden = true;
        elements.contactForm.hidden = false;
        elements.archivoLabel.textContent = 'Seleccionar archivo...';
        
        // Limpiar estados de validación
        const inputs = elements.contactForm.querySelectorAll('.form__input');
        inputs.forEach(input => {
            input.classList.remove('error', 'valid');
        });
        
        const errors = elements.contactForm.querySelectorAll('.form__error');
        errors.forEach(error => {
            error.textContent = '';
        });
    }

    // ==========================================================================
    // SCROLL SUAVE Y HEADER FIJO
    // ==========================================================================

    function initScrollEffects() {
        // Header con sombra al hacer scroll
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                elements.header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            } else {
                elements.header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });

        // Resaltar enlace activo según la sección visible
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    elements.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { passive: true });
    }

    // ==========================================================================
    // INICIALIZACIÓN
    // ==========================================================================

    function init() {
        initNavigation();
        initLightbox();
        initFormValidation();
        initScrollEffects();
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
