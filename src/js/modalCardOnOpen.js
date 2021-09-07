import showPopularMoviesByDefault from './defaultPage';
import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';

Refs.movieStorage.addEventListener('click', event => {
  event.preventDefault();

  openModal(event.target);
});
Refs.modalCardsCloseBtn.addEventListener('click', event => {
  event.preventDefault();
  closeModal(event.target);
});

function closeModal(event) {
  Refs.backdropModalCard.classList.add('is-hidden');
  Refs.movieModal.innerHTML = '';
  if (event.code === 'Escape') {
    window.removeEventListener('keydown', closeModal());
  }
}
async function openModal(target) {
  Refs.backdropModalCard.classList.remove('is-hidden');
  const fetchedMovies = await showPopularMoviesByDefault();

  const movieCardInfo = fetchedMovies.filter(movie => {
    if (movie.id.toString() === target.dataset.id) {
      return movie;
    }
    return;
  });

  appendMoviesMarkUp(Refs.movieModal, ...movieCardInfo, temp);

  Refs.movieModal.addEventListener('click', e => {
    if (e.target.dataset.value === 'watched') {
      addMoviesToWatchedLibrary(movieCardInfo);
    } else if (e.target.dataset.value === 'queue') {
      addMoviesToQueueLibrary(movieCardInfo);
    }
  });
}

async function addMoviesToWatchedLibrary(movie) {
  let watchedMovies = [];
  watchedMovies.push(movie);
  const movies = JSON.stringify(watchedMovies);
  localStorage.setItem('watchedMovies', movies);
}
async function addMoviesToQueueLibrary(movie) {
  let queueMovies = [];
  queueMovies.push(movie);
  const movies = JSON.stringify(queueMovies);
  localStorage.setItem('queueMovies', movies);
}
