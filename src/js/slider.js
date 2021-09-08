import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../templates/card-films-slider.hbs';
import trailer from './trailers';
import Refs from './refs';
import FetchMovieApi from './apiMoviesService';

renderTrendy();

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 4000,
  hoverpause: true,
  bound: true,
});

glide.mount();

function renderTrendy() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=74b3d185775f996114b8f83bcbb83c33`;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(renderSliderFilms)
    .catch(err => {
      sliderContainer.innerHTML = `${errorUrl}`;
    });
}

function renderSliderFilms(articles) {
  Refs.sliderContainer.innerHTML = filmsCardSliderTpl(articles);
  trailer.createTrailerLink(document.querySelectorAll('.btn-youtube-slider'));
}

function clearSlider() {
  Refs.sliderWrapper.innerHTML = '';
}

export { clearSlider };
