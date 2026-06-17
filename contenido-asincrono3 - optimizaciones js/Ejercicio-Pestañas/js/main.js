const tabsButtons = document.querySelectorAll('.tabs__button');
const tabsContents = document.querySelectorAll('.tabs__content');

tabsButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    tabsButtons.forEach(btn => btn.classList.remove('activo'));
    tabsContents.forEach(content => content.classList.remove('activo'));

    button.classList.add('activo');
    tabsContents[index].classList.add('activo');
  });
});