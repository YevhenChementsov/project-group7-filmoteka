const refs = {
  movieStorage: document.querySelector('.js-movie__list'),
};
const API_KEY = '74b3d185775f996114b8f83bcbb83c33';
import movieCardTmpl from '../templates/card.hbs';

function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      const markup = movieCardTmpl(results);
      refs.movieStorage.insertAdjacentHTML('beforeend', markup);
    })
    .catch(console.log);
}

getPopularMovies();
