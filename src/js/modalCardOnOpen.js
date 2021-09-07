import showPopularMoviesByDefault from './defaultPage';
import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';

Refs.movieStorage.addEventListener('click', event => {
  event.preventDefault();

  openModal(event.target);
});

async function openModal(target) {
  console.dir(target);
  Refs.backdropModalCard.classList.remove('is-hidden');
  const fetchedMovies = await showPopularMoviesByDefault();
  const movieCardInfo = fetchedMovies.filter(movie => {
    if (movie.id.toString() === target.dataset.id) {
      return movie;
    }
    return;
  });

  appendMoviesMarkUp(Refs.movieModal, movieCardInfo, temp);
}
