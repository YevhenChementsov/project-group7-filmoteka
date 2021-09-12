import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';
import { showFilmsInQueue, showWatchedFilms } from './library';

export default class ShowModal {
  constructor(movieList) {
    this.movies = movieList;
  }

  setListener() {
    Refs.movieStorage.addEventListener('click', this.showModal.bind(this));
    Refs.usersFilmsLibrary.addEventListener('click', this.showModal.bind(this));
  }

  removeListener() {
    Refs.movieStorage.removeEventListener('click', this.showModal.bind(this));
  }

  showModal(event) {
    this.openModal(event);
  }

  setMovies(movies) {
    this.movies = movies;
  }

  openModal(e) {
    const target = e.target;
    const movies = localStorage.getItem('watchedMovies');
    const films = JSON.parse(movies);
    const moviesQueue = localStorage.getItem('queueMovies');
    const filmsQueue = JSON.parse(moviesQueue);
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
    if (films !== null) {
      films.forEach(film => {
        if (film.id === movieCardInfo[0].id && film.activeWatched) {
          modalBtns.firstElementChild.textContent = 'DELETE FROM WATCHED';
          modalBtns.firstElementChild.style.backgroundColor = 'yellow';
          return;
        }
        return;
      });
    }

    if (filmsQueue !== null) {
      filmsQueue.forEach(film => {
        if (film.id === movieCardInfo[0].id && film.activeQueue) {
          modalBtns.lastElementChild.textContent = 'DELETE FROM QUEUE';
          modalBtns.lastElementChild.style.backgroundColor = 'yellow';
          return;
        }
        return;
      });
    }
  }

  addMovieToLibrary(e) {
    const image = document.querySelector('.modal-card .js-movie__image');
    const fetchedMovies = this.movies;
    const cardInfo = fetchedMovies.filter(movie => {
      if (movie.id.toString() === image.dataset.id) {
        return movie;
      }
      return;
    });
    const movieCardInfo = { ...cardInfo[0] };

    if (e.target.innerText === 'DELETE FROM WATCHED') {
      this.deleteMoviesFromWatchedLibrary(movieCardInfo, e);
      return;
    }

    if (e.target.innerText === 'ADD TO WATCHED') {
      this.addMoviesToWatchedLibrary(movieCardInfo, e);
      if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
        showWatchedFilms();
      }
      return;
    }

    if (e.target.innerText === 'DELETE FROM QUEUE') {
      this.deleteMoviesFromQueueLibrary(movieCardInfo, e);
      return;
    }

    if (e.target.innerText === 'ADD TO QUEUE') {
      this.addMoviesToQueueLibrary(movieCardInfo, e);
      if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
        showFilmsInQueue();
      }
      return;
    }
  }

  addMoviesToWatchedLibrary(movie, e) {
    e.target.textContent = 'DELETE FROM WATCHED';
    e.target.style.backgroundColor = 'yellow';
    const films = JSON.parse(localStorage.getItem('watchedMovies'));

    if (films === null || films.length < 1) {
      localStorage.setItem('watchedMovies', JSON.stringify([{ ...movie, activeWatched: true }]));
      return;
    }

    const movies = JSON.stringify([...films, { ...movie, activeWatched: true }]);
    localStorage.setItem('watchedMovies', movies);

    if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
      return showWatchedFilms();
    }
    return;
  }

  addMoviesToQueueLibrary(movie, e) {
    e.target.textContent = 'DELETE FROM QUEUE';
    e.target.style.backgroundColor = 'yellow';
    const films = JSON.parse(localStorage.getItem('queueMovies'));

    if (films === null || films.length < 1) {
      localStorage.setItem('queueMovies', JSON.stringify([{ ...movie, activeQueue: true }]));
      return;
    }

    const movies = JSON.stringify([...films, { ...movie, activeQueue: true }]);
    localStorage.setItem('queueMovies', movies);

    if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
      return showFilmsInQueue();
    }
    return;
  }

  deleteMoviesFromWatchedLibrary(movie, e) {
    e.target.textContent = 'ADD TO WATCHED';
    e.target.style.backgroundColor = 'white';
    const movies = localStorage.getItem('watchedMovies');
    const films = JSON.parse(movies);
    const index = films.findIndex(film => film.id === movie.id);
    const newFilms = films.splice(index, 1);
    localStorage.setItem('watchedMovies', JSON.stringify(films));
    return showWatchedFilms();
  }

  deleteMoviesFromQueueLibrary(movie, e) {
    e.target.textContent = 'ADD TO QUEUE';
    e.target.style.backgroundColor = 'white';
    const movies = localStorage.getItem('queueMovies');
    const films = JSON.parse(movies);
    const index = films.findIndex(film => film.id === movie.id);
    const newFilms = films.splice(index, 1);
    localStorage.setItem('queueMovies', JSON.stringify(films));
    return showFilmsInQueue();
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
