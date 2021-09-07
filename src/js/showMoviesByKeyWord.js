import API from './api-instance';
import Refs from './refs';
import cardTemplate from '../templates/card';
import appendMoviesMarkUp from './markup';

export default async function showMoviesByKeyWord(query, page) {
  const movies = (await API.fetchMoviesByKeyWord(query, page)) || [];
  const genres = await API.fetchGenres();
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
  appendMoviesMarkUp(Refs.movieStorage, moviesWithGenres, cardTemplate);
  return moviesWithGenres;
}
