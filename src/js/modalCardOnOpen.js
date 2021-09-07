import showPopularMoviesByDefault from './defaultPage';
import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';

Refs.movieStorage.addEventListener(
  'click',
  event => {
    event.preventDefault();

    if (event.target.nodeName === 'IMG') {
      openModal(event.target);
    }
  },
  true,
);

async function openModal(target) {
  Refs.backdropModalCard.classList.remove('is-hidden');
  const movies = await showPopularMoviesByDefault();
  movies.filter(movie => {
    if (movie.id.toString() === target.dataset.id) {
      console.log(movie);
      appendMoviesMarkUp(Refs.movieModal, movie, temp);
    }
  });
}
