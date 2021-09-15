import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../templates/card-films-slider.hbs';
import trailer from './trailers';
import Refs from './refs';
import API from './api-instance';

// renderTrendy();

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 4000,
  hoverpause: true,
  bound: true,
});

glide.mount();

API.fetchTrendingMovies()
  .then(renderSliderFilms)
  .catch(err => {
    sliderContainer.innerHTML = `${errorUrl}`;
  });

function renderSliderFilms(articles) {
  Refs.sliderContainer.innerHTML = filmsCardSliderTpl(articles);
  trailer.createTrailerLink(document.querySelectorAll('.btn-youtube-slider'));
}

function clearSlider() {
  Refs.sliderWrapper.innerHTML = '';
}

export { clearSlider };
