import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import FetchMovieApi from './apiMoviesService';
// import appendMoviesMarkUp from './markup';

const movieSearch = new FetchMovieApi();
const initial = movieSearch.initialPage;

export default async function showPopularMoviesByDefault(page) {
  const movies = await movieSearch.fetchTrendingMovies(page);
  const moviesMarkup = movieCardTmpl(movies);
  Refs.movieStorage.innerHTML = moviesMarkup;
  // appendMoviesMarkUp(Refs.movieStorage, movies, movieCardTmpl);
}

showPopularMoviesByDefault(initial);
