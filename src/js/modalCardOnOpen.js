import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';
let watchedMovies = [];
let queueMovies = [];
export default function showModal(movies) {
  Refs.movieStorage.addEventListener('click', event => {
    event.preventDefault();
    openModal(event.target);
  });
  function openModal(target) {
    Refs.backdropModalCard.classList.remove('is-hidden');
    Refs.modalCardsCloseBtn.addEventListener('click', closeModalBeEscAndCloseBtn);
    Refs.backdropModalCard.addEventListener('click', closeModalByClickBackdrop);
    window.addEventListener('keydown', onModalPress);
    Refs.movieModal.addEventListener('click', addMovieToLibrary);
    const fetchedMovies = movies;
    const movieCardInfo = fetchedMovies.filter(movie => {
      if (movie.id.toString() === target.dataset.id) {
        return movie;
      }
      return;
    });
    appendMoviesMarkUp(Refs.movieModal, ...movieCardInfo, temp);
  }
  function addMovieToLibrary(e) {
    const image = document.querySelector('.modal-card .js-movie__image');
    const fetchedMovies = movies;
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
  function addMoviesToWatchedLibrary(movie) {
    watchedMovies.push(movie);
    const movies = JSON.stringify(watchedMovies);
    localStorage.setItem('watchedMovies', movies);
  }
  function addMoviesToQueueLibrary(movie) {
    queueMovies.push(movie);
    const movies = JSON.stringify(queueMovies);
    localStorage.setItem('queueMovies', movies);
  }
  function closeModalByClickBackdrop(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    Refs.backdropModalCard.classList.add('is-hidden');
    Refs.backdropModalCard.removeEventListener('click', closeModalByClickBackdrop);
  }
  function closeModalBeEscAndCloseBtn() {
    Refs.backdropModalCard.classList.add('is-hidden');
    Refs.modalCardsCloseBtn.removeEventListener('click', closeModalBeEscAndCloseBtn);
    window.removeEventListener('keydown', onModalPress);
  }
  function onModalPress(event) {
    if (event.key === 'Escape') {
      closeModalBeEscAndCloseBtn();
    }
  }
}
