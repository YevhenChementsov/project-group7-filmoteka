import Refs from './refs';
import showPopularMoviesByDefault from './defaultPage.js';
import showMoviesByKeyWord, { renewPaginationMarkup } from './showMoviesByKeyWord';
import API from '../js/api-instance';

Refs.paginationList.addEventListener('click', setCurrentPage);
Refs.prevPageButton.addEventListener('click', setPrevPageAsCurrent);
Refs.nextPageButton.addEventListener('click', setNextPageAsCurrent);
Refs.totalPagesButton.addEventListener('click', setCurrentPage);
Refs.moveToFirstPageButton.addEventListener('click', setFirstPage);
Refs.moveToLastPageButton.addEventListener('click', setLastPage);
Refs.firstAdditionalButton.addEventListener('click', setFirstPage);

export let page = {
  current: 1,
};

isPrevPageDisabled();
isNextPageDisabled();
isSetFirstPageDisabled();
isSetLastPageDisabled();

function setCurrentPage(event) {
  event.preventDefault();
  const query = API.query;

  const active = document.querySelector('.pgn-active');

  if (active) {
    active.classList.remove('pgn-active');
  }

  page.current = Number(event.target.innerHTML);
  event.target.classList.add('pgn-active');

  if (page.current === Number(Refs.totalPagesButton.innerHTML)) {
    setLastPage();
  }

  if (page.current !== 1) {
    checkAvailablePrevButtons();
  }
  if (page.current !== Number(Refs.totalPagesButton.innerHTML)) {
    checkAvailableNextButtons();
  }

  if (query.length > 0) {
    showMoviesByKeyWord(query, page.current);
  } else {
    showPopularMoviesByDefault(page.current);
  }
  isPrevPageDisabled();
  isNextPageDisabled();
  isSetFirstPageDisabled();
  findFirstFilm();
}

function setPrevPageAsCurrent(event) {
  event.preventDefault();
  const query = API.query;
  if (page.current <= 1) {
    return;
  }

  if (page.current !== 1) {
    checkAvailablePrevButtons();
  }

  const active = document.querySelector('.pgn-active');
  if (active) {
    active.classList.remove('pgn-active');
    active.parentNode.previousElementSibling?.firstElementChild.classList.add('pgn-active');
  }

  page.current -= 1;

  if (query.length > 0) {
    showMoviesByKeyWord(query, page.current);
  } else {
    showPopularMoviesByDefault(page.current);
  }
  isPrevPageDisabled();
  isNextPageDisabled();

  isSetFirstPageDisabled();
  isSetLastPageDisabled();

  findFirstFilm();
}

function setNextPageAsCurrent(event) {
  event.preventDefault();
  const query = API.query;
  if (page.current === Number(Refs.totalPagesButton.innerHTML)) {
    Refs.prevPageButton.disabled = true;
    return;
  }

  const active = document.querySelector('.pgn-active');
  if (active) {
    active.classList.remove('pgn-active');
    active.parentNode.nextElementSibling?.firstElementChild.classList.add('pgn-active');
  }

  page.current += 1;

  checkAvailableNextButtons();

  if (query.length > 0) {
    showMoviesByKeyWord(query, page.current);
  } else {
    showPopularMoviesByDefault(page.current);
  }
  isPrevPageDisabled();
  isNextPageDisabled();

  isSetFirstPageDisabled();
  isSetLastPageDisabled();

  findFirstFilm();
}

function checkAvailableNextButtons() {
  const paginationButtons = document.querySelectorAll('.pagination-button');

  let paginationButtonsArray = [...paginationButtons];

  if (page.current <= Number(Refs.totalPagesButton.innerHTML) - 4) {
    let availableNextButtons = paginationButtonsArray.filter(
      paginationButton => Number(paginationButton.innerHTML) >= page.current,
    );
    if (availableNextButtons.length === 1) {
      const nextPaginationButtonsMarkup = createNextPaginationButtons();
      Refs.paginationList.innerHTML = nextPaginationButtonsMarkup;
      Refs.paginationList.firstElementChild.firstElementChild.classList.add('pgn-active');
    }
  }
}
function checkAvailablePrevButtons() {
  const paginationButtons = document.querySelectorAll('.pagination-button');

  let paginationButtonsArray = [...paginationButtons];
  let availablePrevButtons = paginationButtonsArray.filter(
    paginationButton => Number(paginationButton.innerHTML) <= page.current,
  );

  if (availablePrevButtons.length === 1) {
    const prevPaginationButtonsMarkup = createPrevPaginationButtons();
    Refs.paginationList.innerHTML = prevPaginationButtonsMarkup;
    Refs.paginationList.lastElementChild.firstElementChild.classList.add('pgn-active');
  }
}

function createNextPaginationButtons() {
  let nextPaginationButtons = [];
  for (let i = page.current, size = page.current + 5; i < size; i += 1) {
    nextPaginationButtons.push(`<li><button class="pagination-button pgn-btn">${i}</button></li>`);
  }
  return nextPaginationButtons.join(' ');
}

function createPrevPaginationButtons() {
  let prevPaginationButtons = [];
  for (let i = page.current, size = page.current - 5; i > size; i -= 1) {
    prevPaginationButtons.push(`<li><button class="pagination-button pgn-btn">${i}</button></li>`);
  }
  return prevPaginationButtons.reverse().join(' ');
}
function createNewPaginationButtonsFromTheEnd() {
  let prevPaginationButtonsFromTheEnd = [];
  for (let i = page.current, size = page.current - 5; i > size; i -= 1) {
    prevPaginationButtonsFromTheEnd.push(
      `<li><button class="pagination-button pgn-btn">${i}</button></li>`,
    );
  }
  return prevPaginationButtonsFromTheEnd.reverse().join(' ');
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

export function isPrevPageDisabled() {
  return page.current === 1
    ? (Refs.prevPageButton.disabled = true)
    : (Refs.prevPageButton.disabled = false);
}
export function isNextPageDisabled() {
  return page.current === Number(Refs.totalPagesButton.innerHTML)
    ? (Refs.nextPageButton.disabled = true)
    : (Refs.nextPageButton.disabled = false);
}

export function isSetFirstPageDisabled() {
  return page.current === 1
    ? (Refs.moveToFirstPageButton.disabled = true)
    : (Refs.moveToFirstPageButton.disabled = false);
}

export function isSetLastPageDisabled() {
  return page.current === Number(Refs.totalPagesButton.innerHTML)
    ? (Refs.moveToLastPageButton.disabled = true)
    : (Refs.moveToLastPageButton.disabled = false);
}

export function setFirstPage() {
  const initialPage = API.initialPage;
  page.current = initialPage;
  const query = API.query;

  const active = document.querySelector('pgn-active');
  if (active) {
    active.classList.remove('pgn-active');
  }

  if (Refs.totalPagesButton.classList.contains('pgn-active')) {
    Refs.totalPagesButton.classList.remove('pgn-active');
  }

  Refs.additionalPaginationButtonsAfter.style.display = 'flex';
  Refs.additionalPaginationButtonsBefore.style.display = 'none';

  if (query.length > 0) {
    showMoviesByKeyWord(query, page.current);
  } else {
    showPopularMoviesByDefault(page.current);
  }

  renewPaginationMarkup();

  isSetFirstPageDisabled();
  isSetLastPageDisabled();

  isPrevPageDisabled();
  isNextPageDisabled();

  // findFirstFilm();
}
function setLastPage() {
  const lastPage = Number(Refs.totalPagesButton.innerHTML);
  page.current = lastPage;

  Refs.additionalPaginationButtonsAfter.style.display = 'none';
  Refs.additionalPaginationButtonsBefore.style.display = 'flex';

  showPopularMoviesByDefault(lastPage);

  isSetFirstPageDisabled();
  isSetLastPageDisabled();

  isPrevPageDisabled();
  isNextPageDisabled();

  const prevPaginationButtonsMarkup = createNewPaginationButtonsFromTheEnd();
  Refs.paginationList.innerHTML = prevPaginationButtonsMarkup;
  Refs.paginationList.lastElementChild.firstElementChild.classList.add('pgn-active');

  findFirstFilm();
}
