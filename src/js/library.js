import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import appendMoviesMarkUp from './markup';
import API from './api-instance';

import { error, notice, alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

Refs.openLibraryButton.addEventListener('click', makeLibraryVisible);
Refs.browseLibraryButtons.addEventListener('click', toggleActiveClass);
Refs.browseWatchedFilmsButton.addEventListener('click', showWatchedFilms);
Refs.browseFilmsInQueueButton.addEventListener('click', showFilmsInQueue);

const fetchGenres = API.fetchGenres();

function toggleActiveClass(event) {
  const active = document.querySelector('.active');

  if (active) {
    active.classList.remove('active');
  }
  event.target.classList.add('active');
}

async function makeLibraryVisible() {
  Refs.searchPageBtn.style.display = 'block';
  Refs.browseLibraryButtons.style.display = 'flex';
  Refs.paginationContainer.style.display = 'none';
  Refs.movieStorage.style.display = 'none';
  Refs.usersFilmsLibrary.style.display = 'grid';
  Refs.usersFilmsLibrary.classList.add('library-is-open');
  await showWatchedFilms();
}

export async function showWatchedFilms() {
  const savedWatchedMovies = localStorage.getItem('watchedMovies');

  if (!savedWatchedMovies || JSON.parse(savedWatchedMovies).length === 0) {
    notice({
      text: 'No films were added. Add a film.',
      delay: 2000,
      hide: true,
    });
    return showLibraryIsEmpty();
  }
  if (Refs.browseFilmsInQueueButton.classList.contains('active')) {
    Refs.browseFilmsInQueueButton.classList.remove('active');
    Refs.browseWatchedFilmsButton.classList.add('active');
  }

  Refs.usersFilmsLibrary.classList.add('grid-list');
  Refs.usersFilmsLibrary.style.display = 'grid';
  Refs.usersFilmsLibrary.style.height = 'auto';

  const parsedWatchedMovies = JSON.parse(savedWatchedMovies);

  const watchedMoviesMarkup = await makeMoviesCardsMarkup(parsedWatchedMovies);
  appendMoviesMarkUp(Refs.usersFilmsLibrary, watchedMoviesMarkup, movieCardTmpl);
}

export async function showFilmsInQueue() {
  const savedFilmsInQueue = localStorage.getItem('queueMovies');

  if (!savedFilmsInQueue || JSON.parse(savedFilmsInQueue).length === 0) {
    notice({
      text: 'No films were added. Add a film.',
      delay: 2000,
      hide: true,
    });
    return showLibraryIsEmpty();
  }
  Refs.usersFilmsLibrary.classList.add('grid-list');
  Refs.usersFilmsLibrary.style.display = 'grid';
  Refs.usersFilmsLibrary.style.height = 'auto';

  const parsedFilmsInQueue = JSON.parse(savedFilmsInQueue);

  const filmsInQueueMarkup = await makeMoviesCardsMarkup(parsedFilmsInQueue);
  appendMoviesMarkUp(Refs.usersFilmsLibrary, filmsInQueueMarkup, movieCardTmpl);
}

async function makeMoviesCardsMarkup(movies) {
  if (movies.length === 0) {
    return;
  }

  const genres = await fetchGenres;
  const moviesCardsMarkup = movies.map(movie => {
    if (!movie) {
      return;
    }
    const { genre_ids } = movie;
    return {
      ...movie,
      year: movie.release_date
        ? movie.release_date.split('-')[0]
        : movie.first_air_date.split('-')[0],
      genre_ids: [
        ...genres
          .filter(({ id }) => genre_ids.includes(id))
          .map(({ name }) => name)
          .slice(0, 3),
      ],
    };
  });
  return moviesCardsMarkup;
}

function showLibraryIsEmpty() {
  Refs.usersFilmsLibrary.classList.remove('grid-list');
  Refs.usersFilmsLibrary.style.display = 'block';
  Refs.usersFilmsLibrary.style.height = '280px';
  return (Refs.usersFilmsLibrary.innerHTML = `
    <li>
    <h1 class="empty-library-title">Nothing has been added yet<span class="dots">...</span></h1>
    </li>`);
}
