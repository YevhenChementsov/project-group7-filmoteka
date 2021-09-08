// function shortYear (arr) {
//   return arr.release_date ? arr.release_date.split('-')[0] : arr.first_air_date.split('-')[0];
// }

// function createGenresArray(array, genres) {
//   return array
//     .map(id => genres.filter(element => element.id === id))
//     .slice(0, 3)
//     .flat();
// }

// function createGenresFromId(array) {
//   return array.genres
//     .map(genre => genre.name)
//     .slice(0, 3)
//     .flat();
// }

// function fullData(films, allGenres) {
//   return films.map(film => {
//     ({
//     ...film,
//     year: shortYear(film),
//     genres: createGenresArray(film.genre_ids, allGenres),
//     })
//   });
// }

// import API from './api-instance';

// const initial = API.initialPage;

// async function getAllGenres() {
//   let allGenres = [];
//   const genres = await API.fetchGenres();
//   const genresId = genres.map(genre => genre.id).flat();
//   const genresName = genres.map(genre => genre.name).flat();
//   console.log(genresId)
//   console.log(genresName)
//   allGenres.push(genres);
//   console.log(allGenres)
// }

// getAllGenres(initial);