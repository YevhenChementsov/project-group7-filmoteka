import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import FetchMovieApi from './apiMoviesService';
import appendMoviesMarkUp from './markup';

const movieSearch = new FetchMovieApi();

async function showPopularMoviesByDefault() {
  const movies = await movieSearch.fetchTrendingMovies();
  appendMoviesMarkUp(Refs.movieStorage, movies, movieCardTmpl);
  return movies;
}

showPopularMoviesByDefault();

export default showPopularMoviesByDefault;
