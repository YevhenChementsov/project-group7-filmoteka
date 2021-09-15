import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';
import { showFilmsInQueue, showWatchedFilms } from './library';
import lazyLoad from './spinner1';

Refs.movieStorage.addEventListener('click', openModal);
Refs.usersFilmsLibrary.addEventListener('click', openModal);

export let moviesCards = [];

function openModal(e) {
  const target = e.target;
  const movies = localStorage.getItem('watchedMovies');
  const films = JSON.parse(movies);
  const moviesQueue = localStorage.getItem('queueMovies');
  const filmsQueue = JSON.parse(moviesQueue);
  Refs.backdropModalCard.classList.remove('is-hidden');
  Refs.modalCardsCloseBtn.addEventListener('click', closeModalBeEscAndCloseBtn)
  Refs.backdropModalCard.addEventListener('click', closeModalByClickBackdrop);
  window.addEventListener('keydown', onModalPress);
  document.body.classList.add('open-modal');
  const fetchedMovies = moviesCards.slice(-20);

  const movieCardInfo = fetchedMovies.filter(movie => {
    if (movie.id.toString() === target.dataset.id) {
      return movie;
    }
    return;
  });

  if (movieCardInfo.length < 1) {
    const unitedMovies = [...films, ...filmsQueue];

    let contfilterdMovie = unitedMovies.filter(movie => {
      if (movie.id.toString() === target.dataset.id) {
        return movie;
      }
      return;
    });

    appendMoviesMarkUp(Refs.movieModal, ...contfilterdMovie, temp);
    const append = lazyLoad();
    const modalBtns = document.querySelector('.modal-card-button');
    modalBtns.addEventListener('click', addMovieToLibrary);
    if (films !== null) {
      films.forEach(film => {
        if (film.id === contfilterdMovie[0].id && film.activeWatched) {
          modalBtns.firstElementChild.textContent = 'DELETE FROM WATCHED';
          modalBtns.firstElementChild.style.backgroundColor = '#FF6B01';
          modalBtns.firstElementChild.style.color = '#FFFFFF';
          return;
        }
        return;
      });
    }

    if (filmsQueue !== null) {
      filmsQueue.forEach(film => {
        if (film.id === contfilterdMovie[0].id && film.activeQueue) {
          modalBtns.lastElementChild.textContent = 'DELETE FROM QUEUE';
          modalBtns.lastElementChild.style.backgroundColor = '#FF6B01';
          modalBtns.lastElementChild.style.color = '#FFFFFF';
          return;
        }
        return;
      });
    }

    return;

  }

  appendMoviesMarkUp(Refs.movieModal, ...movieCardInfo, temp);
  const append = lazyLoad();
  const modalBtns = document.querySelector('.modal-card-button');
  modalBtns.addEventListener('click', addMovieToLibrary);
  if (films !== null) {
    films.forEach(film => {
      if (film.id === movieCardInfo[0].id && film.activeWatched) {
        modalBtns.firstElementChild.textContent = 'DELETE FROM WATCHED';
        modalBtns.firstElementChild.style.backgroundColor = '#FF6B01';
        modalBtns.firstElementChild.style.color = '#FFFFFF';
        return;
      }
      return;
    });
  }

  if (filmsQueue !== null) {
    filmsQueue.forEach(film => {
      if (film.id === movieCardInfo[0].id && film.activeQueue) {
        modalBtns.lastElementChild.textContent = 'DELETE FROM QUEUE';
        modalBtns.lastElementChild.style.backgroundColor = '#FF6B01';
        modalBtns.lastElementChild.style.color = '#FFFFFF';
        return;
      }
      return;
    });
  }
}

function addMovieToLibrary(e) {
  const image = document.querySelector('.modal-card .js-movie__image');
  const fetchedMovies = [...moviesCards];
  const cardInfo = fetchedMovies.filter(movie => {
    if (movie.id.toString() === image.dataset.id) {
      return movie;
    }
    return;
  });
  const movieCardInfo = { ...cardInfo[0] };

  if (e.target.innerText === 'DELETE FROM WATCHED') {
    deleteMoviesFromWatchedLibrary(movieCardInfo, e);
    if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
      Refs.browseFilmsInQueueButton.classList.remove('active');
      Refs.browseWatchedFilmsButton.classList.add('active');
    }
    return;
  }

  if (e.target.innerText === 'ADD TO WATCHED') {
    addMoviesToWatchedLibrary(movieCardInfo, e);
    if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
      showWatchedFilms();
    }
    return;
  }

  if (e.target.innerText === 'DELETE FROM QUEUE') {
    deleteMoviesFromQueueLibrary(movieCardInfo, e);
    if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
      Refs.browseWatchedFilmsButton.classList.remove('active');
      Refs.browseFilmsInQueueButton.classList.add('active');
    }
    return;
  }

  if (e.target.innerText === 'ADD TO QUEUE') {
    addMoviesToQueueLibrary(movieCardInfo, e);
    if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
      showFilmsInQueue();
      Refs.browseWatchedFilmsButton.classList.remove('active');
      Refs.browseFilmsInQueueButton.classList.add('active');
    }
    return;
  }
}

function addMoviesToWatchedLibrary(movie, e) {
  e.target.textContent = 'DELETE FROM WATCHED';
  e.target.style.backgroundColor = '#FF6B01';
  e.target.style.color = '#FFFFFF';
  const films = JSON.parse(localStorage.getItem('watchedMovies'));

  if (films === null || films.length < 1) {
    localStorage.setItem('watchedMovies', JSON.stringify([{ ...movie, activeWatched: true }]));
    return;
  }

  const movies = JSON.stringify([...films, { ...movie, activeWatched: true }]);
  localStorage.setItem('watchedMovies', movies);

  if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
    showWatchedFilms();
    return
  }
  return;
}

function addMoviesToQueueLibrary(movie, e) {
  e.target.textContent = 'DELETE FROM QUEUE';
  e.target.style.backgroundColor = '#FF6B01';
  e.target.style.color = '#FFFFFF';
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

function deleteMoviesFromWatchedLibrary(movie, e) {
  e.target.textContent = 'ADD TO WATCHED';
  e.target.style.backgroundColor = '#FFFFFF';
  e.target.style.color = '#000000';
  const movies = localStorage.getItem('watchedMovies');
  const films = JSON.parse(movies);
  const index = films.findIndex(film => film.id === movie.id);
  const newFilms = films.splice(index, 1);
  localStorage.setItem('watchedMovies', JSON.stringify(films));

  if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
    return showWatchedFilms();
  }
  return;
}

function deleteMoviesFromQueueLibrary(movie, e) {
  e.target.textContent = 'ADD TO QUEUE';
  e.target.style.backgroundColor = '#FFFFFF';
  e.target.style.color = '#000000';
  const movies = localStorage.getItem('queueMovies');
  const films = JSON.parse(movies);
  const index = films.findIndex(film => film.id === movie.id);
  const newFilms = films.splice(index, 1);
  localStorage.setItem('queueMovies', JSON.stringify(films));

  if (Refs.usersFilmsLibrary.classList.contains('library-is-open')) {
    return showFilmsInQueue();
  }
  return;
}

function closeModalByClickBackdrop(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  document.body.classList.remove('open-modal');
  Refs.backdropModalCard.classList.add('is-hidden');
  Refs.backdropModalCard.removeEventListener('click', closeModalByClickBackdrop);
}

function closeModalBeEscAndCloseBtn() {
  document.body.classList.remove('open-modal');
  Refs.backdropModalCard.classList.add('is-hidden');
  Refs.modalCardsCloseBtn.removeEventListener('click', closeModalBeEscAndCloseBtn);
  window.removeEventListener('keydown', onModalPress);
}

function onModalPress(event) {
  if (event.key === 'Escape') {
    closeModalBeEscAndCloseBtn();
  }
}