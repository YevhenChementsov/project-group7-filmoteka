import Refs from './refs';
import temp from '../templates/cardModal.hbs';
import appendMoviesMarkUp from './markup';
console.log(Refs.movieItems);
Refs.movieItems.addEventListener('click', examinationId);

function examinationId() {
  event => {
    event.preventDefault();
    const target = event.target;

    if (event.target.nodeName !== 'li') {
      return;
    }

    openModal(target);
  };
}

function openModal() {
  Refs.backdropModalCard.classList.remove('.is-hidden');
  markupTempModal();
}
async function markupTempModal() {
  const movieSearch = new FetchMovieApi();
  const movies = await movieSearch;
  appendMoviesMarkUp(Refs.movieModal, movies, temp);
}
