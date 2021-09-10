import Refs from './refs';
import movieCardTmpl from '../templates/card.hbs';
import appendMoviesMarkUp from './markup';
import API from './api-instance';

Refs.openLibraryButton.addEventListener('click', makeLibraryVisible);
Refs.browseLibraryButtons.addEventListener('click', toggleActiveClass);
Refs.browseWatchedFilmsButton.addEventListener('click', showWatchedFilms);
Refs.browseFilmsInQueueButton.addEventListener('click', showFilmsInQueue);

const fetchGenres = API.fetchGenres();

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
    Refs.movieStorage.style.display = 'none';
    Refs.usersFilmsLibrary.style.display = 'grid';
    await showWatchedFilms();
}

async function showWatchedFilms() {
    const savedWatchedMovies = localStorage.getItem('watchedMovies');
    
    if (savedWatchedMovies.length === 0) {
        return;
    }

    const parsedWatchedMovies = JSON.parse(savedWatchedMovies);
    
    const watchedMoviesMarkup = await makeMoviesCardsMarkup(parsedWatchedMovies);
    appendMoviesMarkUp(Refs.usersFilmsLibrary, watchedMoviesMarkup, movieCardTmpl);
}

async function showFilmsInQueue() {
    const savedFilmsInQueue = localStorage.getItem('queueMovies');

    if (savedFilmsInQueue.length === 0) {
        return;
    }

    const parsedFilmsInQueue = JSON.parse(savedFilmsInQueue);

    const filmsInQueueMarkup = await makeMoviesCardsMarkup(parsedFilmsInQueue);
    appendMoviesMarkUp(Refs.usersFilmsLibrary, filmsInQueueMarkup, movieCardTmpl);
}

async function makeMoviesCardsMarkup(movies) {
    if (movies.length === 0) {
        return;
    }

    const genres = await fetchGenres;
    const moviesCardsMarkup = movies.map(movie => {
        if (!movie) {
            return;
        }
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