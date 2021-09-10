import Refs from './refs';
import showPopularMoviesByDefault from './defaultPage.js';
import showMoviesByKeyWord from './showMoviesByKeyWord';
import API from '../js/api-instance';

Refs.paginationList.addEventListener('click', setCurrentPage);
Refs.prevPageButton.addEventListener('click', setPrevPageAsCurrent);
Refs.nextPageButton.addEventListener('click', setNextPageAsCurrent);
Refs.totalPagesButton.addEventListener('click', setCurrentPage);

let currentPage = 1;

isPrevPageDisabled();
isNextPageDisabled();

function setCurrentPage(event) {
  const query = API.query;

  const active = document.querySelector('.pgn-active');

  if (active) {
    active.classList.remove('pgn-active');
  }

  currentPage = Number(event.target.innerHTML);
  event.target.classList.add('pgn-active');

  if (currentPage !== 1) {
    checkAvailablePaginationButtons();
  }

  if (query.length > 0) {
    showMoviesByKeyWord(query, currentPage);
  } else {
    showPopularMoviesByDefault(currentPage);
  }

  isPrevPageDisabled();
  isNextPageDisabled();
  findFirstFilm();
}

function setPrevPageAsCurrent() {
  const query = API.query;
  if (currentPage <= 1) {
    return;
  }

  if (currentPage === Number(Refs.totalPagesButton.innerHTML)) {
    return;
  }

  if (currentPage !== 1) {
    checkAvailablePaginationButtons();
  }

  const active = document.querySelector('.pgn-active');
  if (active) {
    active.classList.remove('pgn-active');
    active.parentNode.previousElementSibling?.firstElementChild.classList.add('pgn-active');
  }

  currentPage -= 1;

  if (query.length) {
    showMoviesByKeyWord(query, currentPage);
  } else {
    showPopularMoviesByDefault(currentPage);
  }
  isPrevPageDisabled();
  isNextPageDisabled();
  findFirstFilm();
}

function setNextPageAsCurrent() {
  const query = API.query;
  if (currentPage === Number(Refs.totalPagesButton.innerHTML)) {
    Refs.prevPageButton.disabled = true;
    return;
  }

  const active = document.querySelector('.pgn-active');
  if (active) {
    active.classList.remove('pgn-active');
    active.parentNode.nextElementSibling?.firstElementChild.classList.add('pgn-active');
  }

  currentPage += 1;

  checkAvailablePaginationButtons();

  if (query.length > 0) {
    showMoviesByKeyWord(query, currentPage);
  } else {
    showPopularMoviesByDefault(currentPage);
  }
  isPrevPageDisabled();
  isNextPageDisabled();
  findFirstFilm();
}

function checkAvailablePaginationButtons() {
  const paginationButtons = document.querySelectorAll('.pagination-button');

  let paginationButtonsArray = [...paginationButtons];

  if (currentPage !== Number(Refs.totalPagesButton.innerHTML)) {
    let availableNextButtons = paginationButtonsArray.filter(
      paginationButton => Number(paginationButton.innerHTML) >= currentPage,
    );
    if (availableNextButtons.length === 1) {
      const nextPaginationButtonsMarkup = createNextPaginationButtons();
      Refs.paginationList.innerHTML = nextPaginationButtonsMarkup;
      Refs.paginationList.firstElementChild.firstElementChild.classList.add('pgn-active');
    }
  }

  let availablePrevButtons = paginationButtonsArray.filter(
    paginationButton => Number(paginationButton.innerHTML) <= currentPage,
  );
  if (availablePrevButtons.length === 1) {
    const prevPaginationButtonsMarkup = createPrevPaginationButtons();
    Refs.paginationList.innerHTML = prevPaginationButtonsMarkup;
    Refs.paginationList.lastElementChild.firstElementChild.classList.add('pgn-active');
  }
}

function createNextPaginationButtons() {
  let nextPaginationButtons = [];
  for (let i = currentPage, size = currentPage + 5; i < size; i += 1) {
    nextPaginationButtons.push(`<li><button class="pagination-button pgn-btn">${i}</button></li>`);
  }
  return nextPaginationButtons.join(' ');
}

function createPrevPaginationButtons() {
  let prevPaginationButtons = [];
  for (let i = currentPage, size = currentPage - 5; i > size; i -= 1) {
    prevPaginationButtons.push(`<li><button class="pagination-button pgn-btn">${i}</button></li>`);
  }
  return prevPaginationButtons.reverse().join(' ');
}

function findFirstFilm() {
  const firstFilm = Refs.movieStorage.firstElementChild;
  if (firstFilm) {
    firstFilm.scrollIntoView({
      block: 'end',
    });
  }
  return;
}

function isPrevPageDisabled() {
  return currentPage === 1 || currentPage === Number(Refs.totalPagesButton.innerHTML)
    ? (Refs.prevPageButton.disabled = true)
    : (Refs.prevPageButton.disabled = false);
}
function isNextPageDisabled() {
  return currentPage === Number(Refs.totalPagesButton.innerHTML)
    ? (Refs.nextPageButton.disabled = true)
    : (Refs.nextPageButton.disabled = false);
}
