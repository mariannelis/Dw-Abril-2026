const img = document.querySelector('.galeria__img');
const lightbox = document.querySelector('.lightbox');
const cerrar = document.querySelector('.cerrar');

img.addEventListener('click', () => {
  lightbox.classList.add('activo');
});

cerrar.addEventListener('click', () => {
  lightbox.classList.remove('activo');
});