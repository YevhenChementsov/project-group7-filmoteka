import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import FetchMovieApi from './apiMoviesService';
import appendMoviesMarkUp from './markup';

const movieSearch = new FetchMovieApi();

async function showPopularMoviesByDefault() {
  const movies = await movieSearch.fetchTrendingMovies();
  const genres = await movieSearch.fetchGenres();
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
  appendMoviesMarkUp(Refs.movieStorage, moviesWithGenres, movieCardTmpl);
}

showPopularMoviesByDefault();
