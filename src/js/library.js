import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import appendMoviesMarkUp from './markup';
import API from './api-instance';

Refs.openLibraryButton.addEventListener('click', makeLibraryVisible);
Refs.browseLibraryButtons.addEventListener('click', toggleActiveClass);
Refs.browseWatchedFilmsButton.addEventListener('click', showWatchedFilms);
Refs.browseFilmsInQueueButton.addEventListener('click', showFilmsInQueue);

function toggleActiveClass(event) {
    const active = document.querySelector('.active');
    console.log(active);

    if (active) {
        active.classList.remove('active');
    }
    event.target.classList.add('active');
}

async function makeLibraryVisible() {
    Refs.browseLibraryButtons.style.display = 'flex';
    Refs.paginationContainer.style.display = 'none';
    await showWatchedFilms();
}

async function showWatchedFilms() {
    const savedWatchedMovies = localStorage.getItem('watchedMovies');
    const parsedWatchedMovies = JSON.parse(savedWatchedMovies);
    
    const watchedMoviesMarkup = await makeMoviesCardsMarkup(parsedWatchedMovies);
    appendMoviesMarkUp(Refs.movieStorage, watchedMoviesMarkup, movieCardTmpl);
}

async function showFilmsInQueue() {
    const savedFilmsInQueue = localStorage.getItem('queueMovies');
    const parsedFilmsInQueue = JSON.parse(savedFilmsInQueue);

    const filmsInQueueMarkup = await makeMoviesCardsMarkup(parsedFilmsInQueue);
    appendMoviesMarkUp(Refs.movieStorage, filmsInQueueMarkup, movieCardTmpl);
}

async function makeMoviesCardsMarkup(movies) {
    const genres = await API.fetchGenres();
    const moviesCardsMarkup = movies.map(movie => {
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
    return moviesCardsMarkup;
}