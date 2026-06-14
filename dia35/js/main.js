import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

new Splide('.splide', {
  type    : 'loop',
  perPage : 3,
  autoplay: true,
}).mount();