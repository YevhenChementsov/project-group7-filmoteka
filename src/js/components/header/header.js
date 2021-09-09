import Refs from '../../refs';
import API from '../../api-instance';
import { debounce } from 'lodash';
import showMoviesByKeyWord from '../../showMoviesByKeyWord';
import showPopularMoviesByDefault from '../../defaultPage';

const searchHandler = async event => {
  const page = API.initialPage;
  const query = event.target.value.trim();
  API.query = query;

  if (!query.length) {
    await showPopularMoviesByDefault(1);
    return;
  }

  const movies = await showMoviesByKeyWord(query, page);

  if (!movies.length) {
    Refs.searchError.classList.add('visible');
  } else {
    Refs.searchError.classList.remove('visible');
  }
};

Refs.inputSearch.addEventListener('input', debounce(searchHandler, 300));
