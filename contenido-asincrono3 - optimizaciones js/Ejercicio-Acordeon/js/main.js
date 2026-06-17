const acordeon = document.querySelector('.acordeon');

acordeon.addEventListener('click', (e) => {

  const titulo = e.target.closest('.h2');

  if (!titulo) return;

  const bloqueActual = titulo.parentElement;

  document.querySelectorAll('.bloque').forEach((bloque) => {
    bloque.classList.remove('activo');
  });

  bloqueActual.classList.add('activo');

});