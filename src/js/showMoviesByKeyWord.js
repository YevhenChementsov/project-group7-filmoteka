import API from './api-instance';
import Refs from './refs';
import cardTemplate from '../templates/card';
import appendMoviesMarkUp from './markup';

const initial = API.initialPage;
const query = API.query;

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
  if (page === API.initialPage) {
    renewPaginationMarkup();
  }
  appendMoviesMarkUp(Refs.movieStorage, moviesWithGenres, cardTemplate);
  return moviesWithGenres;
}

if (query.length > 0) {
  showMoviesByKeyWord(query, initial);
}

function renewPaginationMarkup() {
  return Refs.paginationList.innerHTML = `<li class="pagination-list-item">
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
        </li>`;
}