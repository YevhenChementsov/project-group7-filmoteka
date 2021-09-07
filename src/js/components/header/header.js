import Refs from '../../refs';
import FetchMovieApi from '../../apiMoviesService';
import { debounce } from 'lodash';
import cardTemplate from '../../../templates/card';
import appendMoviesMarkUp from '../../markup';
import { visible } from 'basiclightbox';

const api = new FetchMovieApi();

const searchHandler = async event => {
  const currentPage = api.currentPage;
  const query = event.target.value;
  api.query = query;

  const fetchRequest = !query.length ? api.fetchTrendingMovies : api.fetchMoviesByKeyWord;

  const movies = await fetchRequest(query, currentPage);
  const genres = await api.fetchGenres();
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
  if (!moviesWithGenres.length) {
    Refs.searchError.classList.add('visible');
  } else {
    Refs.searchError.classList.remove('visible');
  }
  appendMoviesMarkUp(Refs.movieStorage, moviesWithGenres, cardTemplate);
};

Refs.inputSearch.addEventListener('input', debounce(searchHandler, 300));
