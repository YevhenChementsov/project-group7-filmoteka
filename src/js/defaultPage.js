import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import appendMoviesMarkUp from './markup';
import API from './api-instance';
import ShowModal from './modalCardOnOpen';
import lazyLoad from './spinner1';
import * as Module from './pagination';
import showMoviesByKeyWord, { renewPaginationMarkup } from './showMoviesByKeyWord';
import {
  isSetFirstPageDisabled,
  isSetLastPageDisabled,
  isPrevPageDisabled,
  isNextPageDisabled,
} from './pagination';
// import * as Pagination from './showMoviesByKeyWord';

Refs.searchPageBtn.addEventListener('click', onOpenPreviousSearchPage);
Refs.navigationButtons.addEventListener('click', isButtonActive);
Refs.headerLinkToHomepage.addEventListener('click', openHomepageDirectly);
Refs.openHomepageButton.addEventListener('click', openHomepageDirectly);

const modal = new ShowModal();

var options = {
  rootMargin: '-50px',
};
var callback = function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const image = lazyLoad();
    }
  });
};
var observer = new IntersectionObserver(callback, options);

function onOpenPreviousSearchPage() {
  // const query = API.query;

  // if (query.length === 0) {
  //   return;
  // }

  Refs.openLibraryButton.classList.remove('active-link');
  Refs.browseLibraryButtons.style.display = 'none';
  Refs.searchPageBtn.style.display = 'none';
  Refs.paginationContainer.style.display = 'flex';
  Refs.movieStorage.style.display = 'grid';
  Refs.usersFilmsLibrary.style.display = 'none';
  Refs.usersFilmsLibrary.classList.remove('library-is-open');
  Refs.header.classList.remove('library');
  // const current = Module.page.current;
  // Pagination.renewPaginationMarkup();
  // showMoviesByKeyWord(query, current);
}

function isButtonActive(event) {
  const active = document.querySelector('.active-link');

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
  await lazyLoad();
  const images = document.querySelectorAll('.js-movie__image');
  images.forEach(image => observer.observe(image));
  modal.setListener();
  modal.setMovies(moviesWithGenres);
  modal.removeListener();
}
showPopularMoviesByDefault(initial);

async function openHomepageDirectly() {
  Refs.searchPageBtn.removeEventListener('click', onOpenPreviousSearchPage);
  Refs.searchPageBtn.style.display = 'none';
  Refs.header.classList.remove('library');
  Refs.openLibraryButton.classList.remove('active-link');
  Refs.browseLibraryButtons.style.display = 'none';
  Refs.paginationContainer.style.display = 'flex';
  Refs.movieStorage.style.display = 'grid';
  Refs.usersFilmsLibrary.style.display = 'none';

  const activeLink =
    Refs.navigationButtons.lastElementChild.firstElementChild.classList.contains('active-link');

  API.query = '';
  Refs.inputSearch.value = '';

  if (activeLink) {
    Refs.navigationButtons.lastElementChild.firstElementChild.classList.remove('active-link');
    Refs.navigationButtons.firstElementChild.firstElementChild.classList.add('active-link');
  }

  await showPopularMoviesByDefault(initial);
  Module.page.current = 1;

  const active = document.querySelector('pgn-active');
  if (active) {
    active.classList.remove('pgn-active');
  }

  if (Refs.totalPagesButton.classList.contains('pgn-active')) {
    Refs.totalPagesButton.classList.remove('pgn-active');
  }

  Refs.additionalPaginationButtonsAfter.style.display = 'flex';
  Refs.additionalPaginationButtonsBefore.style.display = 'none';

  renewPaginationMarkup();
  isSetFirstPageDisabled();
  isSetLastPageDisabled();
  isPrevPageDisabled();
  isNextPageDisabled();
}
