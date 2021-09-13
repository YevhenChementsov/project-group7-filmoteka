import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import appendMoviesMarkUp from './markup';
import API from './api-instance';
import ShowModal from './modalCardOnOpen';
import {renewPaginationMarkup} from './showMoviesByKeyWord'
// import * as Pagination from './showMoviesByKeyWord';

Refs.searchPageBtn.addEventListener('click', onOpenPreviousSearchPage);
Refs.navigationButtons.addEventListener('click', isButtonActive);
Refs.headerLinkToHomepage.addEventListener('click', openHomepageDirectly);
Refs.openHomepageButton.addEventListener('click', openHomepageDirectly);

const modal = new ShowModal();

function onOpenPreviousSearchPage() {
  Refs.openLibraryButton.classList.remove('active-link');
  Refs.browseLibraryButtons.style.display = 'none';
  Refs.searchPageBtn.style.display = 'none';
  Refs.paginationContainer.style.display = 'flex';
  Refs.movieStorage.style.display = 'grid';
  Refs.usersFilmsLibrary.style.display = 'none';
  Refs.usersFilmsLibrary.classList.remove('library-is-open');
  Refs.header.classList.remove('library');
  // Pagination.renewPaginationMarkup();
  // showPopularMoviesByDefault(initial);
}

function isButtonActive(event) {
  const active = document.querySelector('.active-link');

  if (active) {
    active.classList.remove('active-link');
  }
  event.target.classList.add('active-link');
}

function openHomepageDirectly() {
  const activeLink = Refs.navigationButtons.lastElementChild.firstElementChild.classList.contains('active-link');

  Refs.searchPageBtn.removeEventListener('click', onOpenPreviousSearchPage);
  Refs.searchPageBtn.style.display = 'none';
  Refs.header.classList.remove('library');
  Refs.openLibraryButton.classList.remove('active-link');
  Refs.browseLibraryButtons.style.display = 'none';
  Refs.paginationContainer.style.display = 'flex';
  Refs.movieStorage.style.display = 'grid';
  Refs.usersFilmsLibrary.style.display = 'none';

  API.query = '';
  Refs.inputSearch.value = "";
  renewPaginationMarkup();
  showPopularMoviesByDefault(initial);
  
  if (activeLink) {
    Refs.navigationButtons.lastElementChild.firstElementChild.classList.remove('active-link');
    Refs.navigationButtons.firstElementChild.firstElementChild.classList.add('active-link');
  }
  openHomepage();
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
      // year: movie.release_date
      //   ? movie.release_date.split('-')[0]
      //   : movie.first_air_date.split('-')[0],
      genres: [
        ...genres
          .filter(({ id }) => genre_ids.includes(id))
          .map(({ name }) => name)
          .slice(0, 2),
      ],
    };
  });

  appendMoviesMarkUp(Refs.movieStorage, moviesWithGenres, movieCardTmpl);
  modal.setListener();
  modal.setMovies(moviesWithGenres);
  modal.removeListener();
}
showPopularMoviesByDefault(initial);
