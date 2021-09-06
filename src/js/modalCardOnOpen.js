import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';
console.log(Refs.movieStorage);

Refs.movieStorage.addEventListener('click', event => {
  event.preventDefault();
  event.stopPropagation();
  const target = event.target;
  console.dir(event.target);
  if (event.target === 'LI') {
    console.log('');
    return;
  }

  openModal(target);
});

function openModal() {
  Refs.backdropModalCard.classList.remove('.is-hidden');
  //   markupTempModal();
}
// async function markupTempModal() {
//   const movieSearch = new FetchMovieApi();
//   const movies = await movieSearch;
//   appendMoviesMarkUp(Refs.movieModal, movies, temp);
// }

// table.onclick = function (event) {
//   let td = event.target.closest('td'); // (1)

//   if (!td) return; // (2)

//   if (!table.contains(td)) return; // (3)

//   highlight(td); // (4)
// };

// if ($(e.target).parents().filter(menuelement).length){
//   ...
// }
