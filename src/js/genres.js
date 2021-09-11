import API from './api-instance';

const initial = API.initialPage;
// ===========================

async function getAllGenres() {
  const allGenres = await API.fetchGenres().catch(err => console.log(err));

  return allGenres;
}
getAllGenres();

// ===========================

async function getAllMovies() {
  const movies = await API.fetchTrendingMovies(initial).catch(err => console.log(err));

  return movies;
}

// ===========================

function shortYear(arr) {
  return arr.release_date ? arr.release_date.split('-')[0] : arr.first_air_date.split('-')[0];
}
// ===========================

function createGenresArray(array, genres) {
  return array
    .map(id => genres.filter(el => el.id === id))
    .slice(0, 2)
    .splice(2, 0, '...Others')
    .flat();
}

function fullData(movies, allGenres) {
  const moviesWithGenresAndData = movies.map(movie => {
    ({
      ...movie,
      year: shortYear(movie),
      genres: createGenresArray(movie.genre_ids, allGenres),
    });
  });
  return moviesWithGenresAndData;
}
