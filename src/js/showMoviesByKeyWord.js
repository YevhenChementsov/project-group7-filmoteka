import API from './api-instance';
import Refs from './refs';
import cardTemplate from '../templates/card';
import appendMoviesMarkUp from './markup';
import ShowModal from './modalCardOnOpen';
import showPopularMoviesByDefault from './defaultPage';
import * as Module from './pagination';
import {
  isSetFirstPageDisabled,
  isSetLastPageDisabled,
  isPrevPageDisabled,
  isNextPageDisabled,
} from './pagination';

import { error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { showWatchedFilms } from './library';
defaultModules.set(PNotifyMobile, {});
import lazyLoad from './spinner1';

const initial = API.initialPage;
const query = API.query;
const modal = new ShowModal();

export default async function showMoviesByKeyWord(query, page) {
  const movies = (await API.fetchMoviesByKeyWord(query, page)) || [];
  const genres = await API.fetchGenres();

  if (movies.length === 0) {
    error({
      text: 'No films can be found. Try another query.',
      delay: 2000,
      hide: true,
    });
    return;
  }

  const moviesWithGenres = movies.map(movie => {
    const { genre_ids } = movie;
    return {
      ...movie,
      genre_ids: [
        ...genres
          .filter(({ id }) => genre_ids.includes(id))
          .map(({ name }) => name)
          .slice(0, 2),
      ],
    };
  });

  if (page === API.initialPage) {
    Module.page.current = 1;

    const active = document.querySelector('pgn-active');
    if (active) {
      active.classList.remove('pgn-active');
    }

    if (Refs.totalPagesButton.classList.contains('pgn-active')) {
      Refs.totalPagesButton.classList.remove('pgn-active');
    }

    Refs.additionalPaginationButtonsAfter.style.display = 'flex';
    Refs.additionalPaginationButtonsBefore.style.display = 'none';

    renewPaginationMarkup();
    isSetFirstPageDisabled();
    isSetLastPageDisabled();
    isPrevPageDisabled();
    isNextPageDisabled();
  }

  appendMoviesMarkUp(Refs.movieStorage, moviesWithGenres, cardTemplate);
  await lazyLoad();
  modal.setListener();
  modal.setMovies(moviesWithGenres);
  modal.removeListener();
  return moviesWithGenres;
}
if (query.length > 0) {
  showMoviesByKeyWord(query, initial);
}

export function renewPaginationMarkup() {
  return (Refs.paginationList.innerHTML = `<li class="pagination-list-item">

        <button class="pagination-button pgn-btn pgn-active first-pgn">1</button>
        </li>
        <li class="pagination-list-item">
            <button class="pagination-button pgn-btn">2</button>
        </li>
        <li class="pagination-list-item">
            <button class="pagination-button pgn-btn">3</button>
        </li>
        <li class="pagination-list-item">
            <button class="pagination-button pgn-btn">4</button>
        </li>
        <li class="pagination-list-item">
            <button class="pagination-button pgn-btn">5</button>
        </li>`);
}
