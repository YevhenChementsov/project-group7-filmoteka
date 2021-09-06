import Refs from '../../refs';
import FetchMovieApi from '../../apiMoviesService';
import { debounce } from 'lodash';
import cardTemplate from '../../../templates/card';
import appendMoviesMarkUp from '../../markup';

const api = new FetchMovieApi();

const searchHandler = event => {
  const currentPage = api.currentPage;
  const query = event.target.value;
  api.query = query;
  api
    .fetchMoviesByKeyWord(query, currentPage)
    .then(movies => appendMoviesMarkUp(Refs.movieStorage, movies, cardTemplate));
};

Refs.inputSearch.addEventListener('input', debounce(searchHandler, 300));
