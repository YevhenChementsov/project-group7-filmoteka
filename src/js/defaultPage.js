import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import appendMoviesMarkUp from './markup';
import API from './api-instance';
import showModal from './modalCardOnOpen';
// import * as Pagination from './showMoviesByKeyWord';

Refs.openHomepageButton.addEventListener('click', openHomepage);
Refs.navigationButtons.addEventListener('click', isButtonActive);

function openHomepage() {
  Refs.browseLibraryButtons.style.display = 'none';
  Refs.paginationContainer.style.display = 'flex';
  Refs.movieStorage.style.display = 'grid';
  Refs.usersFilmsLibrary.style.display = 'none';
  // Pagination.renewPaginationMarkup();
  // showPopularMoviesByDefault(initial);
}

function isButtonActive(event) {
  const active = document.querySelector('.active-link');
    console.log(active);

    if (active) {
        active.classList.remove('active-link');
    }
    event.target.classList.add('active-link');
}

const initial = API.initialPage;
export default async function showPopularMoviesByDefault(page) {
  const movies = await API.fetchTrendingMovies(page);
  const genres = await API.fetchGenres();
  const moviesWithGenres = movies.map(movie => {
    const { genre_ids } = movie;
    return {
      ...movie,
      vote: movie.vote_average,
      year: movie.release_date ? movie.release_date.split('-')[0] : movie.first_air_date.split('-')[0],
      genres: [
        ...genres
          .filter(({ id }) => genre_ids.includes(id))
          .map(({ name }) => name)
          .slice(0, 2),
      ],
    };
  });
  appendMoviesMarkUp(Refs.movieStorage, moviesWithGenres, movieCardTmpl);
  showModal(moviesWithGenres);
}
showPopularMoviesByDefault(initial);