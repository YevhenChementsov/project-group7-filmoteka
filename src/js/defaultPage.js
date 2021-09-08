import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import appendMoviesMarkUp from './markup';
import API from './api-instance';

const initial = API.initialPage;

export default async function showPopularMoviesByDefault(page) {
  const movies = await API.fetchTrendingMovies(page);

  const genres = await API.fetchGenres();
  const moviesWithGenres = movies.map(movie => {
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
  appendMoviesMarkUp(Refs.movieStorage, moviesWithGenres, movieCardTmpl);
  return movies;
}

showPopularMoviesByDefault(initial);
