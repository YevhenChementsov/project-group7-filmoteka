import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';

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
    const cardInfo = fetchedMovies.filter(movie => {
      if (movie.id.toString() === image.dataset.id) {
        return movie;
      }
      return;
    });
    const movieCardInfo = { ...cardInfo[0] };

    if (e.target.innerText === 'DELETE FROM WATCHED') {
      e.target.textContent = 'ADD TO WATCHED';
      e.target.style.backgroundColor = 'white';
      this.deleteMoviesFromWatchedLibrary(movieCardInfo);
      return;
    }

    if (e.target.innerText === 'ADD TO WATCHED') {
      e.target.textContent = 'DELETE FROM WATCHED';
      e.target.style.backgroundColor = 'yellow';
      this.addMoviesToWatchedLibrary(movieCardInfo);
      return;
    }

    if (e.target.innerText === 'DELETE FROM QUEUE') {
      e.target.textContent = 'ADD TO QUEUE';
      e.target.style.backgroundColor = 'white';
      this.deleteMoviesFromQueueLibrary(movieCardInfo);
      return;
    }

    if (e.target.innerText === 'ADD TO QUEUE') {
      e.target.textContent = 'DELETE FROM QUEUE';
      e.target.style.backgroundColor = 'yellow';
      this.addMoviesToQueueLibrary(movieCardInfo);
      return;
    }
  }

  deleteMoviesFromWatchedLibrary(movie) {
    const movies = localStorage.getItem('watchedMovies');
    const films = JSON.parse(movies);
    const index = films.findIndex(film => film.id === movie.id);
    const newFilms = films.splice(index, 1);
    localStorage.setItem('watchedMovies', JSON.stringify(films));
    return;
  }

  deleteMoviesFromQueueLibrary(movie) {
    const movies = localStorage.getItem('queueMovies');
    const films = JSON.parse(movies);
    const index = films.findIndex(film => film.id === movie.id);
    const newFilms = films.splice(index, 1);
    localStorage.setItem('queueMovies', JSON.stringify(films));
    return;
  }

  addMoviesToWatchedLibrary(movie) {
    const films = JSON.parse(localStorage.getItem('watchedMovies'));
    console.log(films);

    if (films === null) {
      localStorage.setItem('watchedMovies', JSON.stringify([movie]));
      return;
    }

    const movies = JSON.stringify([...films, movie]);
    localStorage.setItem('watchedMovies', movies);
    return;
  }

  addMoviesToQueueLibrary(movie) {
    const films = JSON.parse(localStorage.getItem('queueMovies'));
    console.log(films);

    if (films === null) {
      localStorage.setItem('queueMovies', JSON.stringify([movie]));
      return;
    }

    const movies = JSON.stringify([...films, movie]);
    localStorage.setItem('queueMovies', movies);
    return;
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
