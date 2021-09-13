import Refs from '../../refs';
import API from '../../api-instance';
import { debounce } from 'lodash';
import showMoviesByKeyWord from '../../showMoviesByKeyWord';
import showPopularMoviesByDefault from '../../defaultPage';
import * as Module from '../../pagination';
import { renewPaginationMarkup } from '../../showMoviesByKeyWord';
import {
  isSetFirstPageDisabled,
  isSetLastPageDisabled,
  isPrevPageDisabled,
  isNextPageDisabled,
} from '../../pagination';

const searchHandler = async event => {
  const page = API.initialPage;
  const query = event.target.value.trim();
  API.query = query;

  if (!query.length) {
    await showPopularMoviesByDefault(1);
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
    return;
  }

  const movies = await showMoviesByKeyWord(query, page);

  if (!movies) {
    Refs.searchError.classList.add('visible');
  } else {
    Refs.searchError.classList.remove('visible');
  }
};

Refs.inputSearch.addEventListener('input', debounce(searchHandler, 300));
