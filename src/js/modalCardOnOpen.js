import showPopularMoviesByDefault from './defaultPage';
import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';

let watchedMovies = [];
let queueMovies = [];

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
  Refs.movieModal.removeEventListener('click', never);
  Refs.movieModal.innerHTML = '';
  if (event.code === 'Escape') {
    window.removeEventListener('keydown', closeModal());
  }
}

async function openModal(target) {
  Refs.backdropModalCard.classList.remove('is-hidden');
  const fetchedMovies = await showPopularMoviesByDefault();
  /************************** */
  console.log(fetchedMovies);
  const movieCardInfo = fetchedMovies.filter(movie => {
    if (movie.id.toString() === target.dataset.id) {
      return movie;
    }
    return;
  });

  appendMoviesMarkUp(Refs.movieModal, ...movieCardInfo, temp);
  Refs.movieModal.addEventListener('click', never);
}

async function never(e) {
  const image = document.querySelector('.modal-card .js-movie__image');
  const fetchedMovies = await showPopularMoviesByDefault();
  const movieCardInfo = fetchedMovies.filter(movie => {
    if (movie.id.toString() === image.dataset.id) {
      return movie;
    }
    return;
  });

  if (e.target.dataset.value === 'watched') {
    e.target.textContent = 'Added to Watched!';
    e.target.style.backgroundColor = 'yellow';
    addMoviesToWatchedLibrary(...movieCardInfo);
  } else if (e.target.dataset.value === 'queue') {
    e.target.textContent = 'Added to Watched!';
    e.target.style.backgroundColor = 'yellow';
    addMoviesToQueueLibrary(...movieCardInfo);
  }
}

async function addMoviesToWatchedLibrary(movie) {
  watchedMovies.push(movie);
  watchedMovies.filter(elem => {
    if (elem.id === movie.id) {
      return elem;
    }
    return;
  });
  const movies = JSON.stringify(watchedMovies);
  localStorage.setItem('watchedMovies', movies);
}

async function addMoviesToQueueLibrary(movie) {
  queueMovies.push(movie);
  const movies = JSON.stringify(queueMovies);
  localStorage.setItem('queueMovies', movies);
}
