import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';

export default class ShowModal {
  watchedMovies = [];
  queueMovies = [];
  constructor(movieList) {
    this.movies = movieList;
    this.watchedMovies = this.watchedMovies;
    this.queueMovies = this.queueMovies;
  }

  setListener() {
    Refs.movieStorage.addEventListener('click', this.showModal.bind(this));
  }

  removeListener() {
    Refs.movieStorage.removeEventListener('click', this.showModal.bind(this));
  }

  showModal(event) {
    event.preventDefault();

    this.openModal(event);
  }

  setMovies(movies) {
    this.movies = movies;
  }

  openModal(e) {
    const target = e.target;

    Refs.backdropModalCard.classList.remove('is-hidden');
    Refs.modalCardsCloseBtn.addEventListener('click', this.closeModalBeEscAndCloseBtn.bind(this));
    Refs.backdropModalCard.addEventListener('click', this.closeModalByClickBackdrop.bind(this));
    window.addEventListener('keydown', this.onModalPress.bind(this));
    document.body.classList.add('open-modal');
    const fetchedMovies = this.movies;
    const movieCardInfo = fetchedMovies.filter(movie => {
      if (movie.id.toString() === target.dataset.id) {
        return movie;
      }
      return;
    });
    appendMoviesMarkUp(Refs.movieModal, ...movieCardInfo, temp);
    const modalBtns = document.querySelector('.modal-card-button');
    modalBtns.addEventListener('click', this.addMovieToLibrary.bind(this));
  }

  addMovieToLibrary(e) {
    const image = document.querySelector('.modal-card .js-movie__image');
    const fetchedMovies = this.movies;
    const movieCardInfo = fetchedMovies.filter(movie => {
      if (movie.id.toString() === image.dataset.id) {
        return movie;
      }
      return;
    });
    if (e.target.dataset.value === 'watched') {
      e.target.textContent = 'Delete from Watched';
      e.target.style.backgroundColor = 'yellow';
      this.addMoviesToWatchedLibrary(...movieCardInfo);
    } else if (e.target.dataset.value === 'queue') {
      e.target.textContent = 'Delete from queue';
      e.target.style.backgroundColor = 'yellow';
      this.addMoviesToQueueLibrary(...movieCardInfo);
    }
  }

  addMoviesToWatchedLibrary(movie) {
    this.watchedMovies.push(movie);
    const movies = JSON.stringify(this.watchedMovies);
    localStorage.setItem('watchedMovies', movies);
  }

  addMoviesToQueueLibrary(movie) {
    this.queueMovies.push(movie);
    const movies = JSON.stringify(this.queueMovies);
    localStorage.setItem('queueMovies', movies);
  }

  closeModalByClickBackdrop(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    document.body.classList.remove('open-modal');
    Refs.backdropModalCard.classList.add('is-hidden');
    Refs.backdropModalCard.removeEventListener('click', this.closeModalByClickBackdrop.bind(this));
  }

  closeModalBeEscAndCloseBtn() {
    document.body.classList.remove('open-modal');
    Refs.backdropModalCard.classList.add('is-hidden');
    Refs.modalCardsCloseBtn.removeEventListener(
      'click',
      this.closeModalBeEscAndCloseBtn.bind(this),
    );
    window.removeEventListener('keydown', this.onModalPress.bind(this));
  }

  onModalPress(event) {
    if (event.key === 'Escape') {
      this.closeModalBeEscAndCloseBtn();
    }
  }
}
