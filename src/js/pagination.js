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

let currentPage = 1;

isPrevPageDisabled();
isNextPageDisabled();
isSetFirstPageDisabled();
isSetLastPageDisabled();

function setCurrentPage(event) {
  const query = API.query;

  const active = document.querySelector('.pgn-active');

  if (active) {
    active.classList.remove('pgn-active');
  }

  currentPage = Number(event.target.innerHTML);
  event.target.classList.add('pgn-active');

  if (currentPage === Number(Refs.totalPagesButton.innerHTML)) {
    setLastPage();
  }
  
  if (currentPage !== 1) {
    checkAvailablePrevButtons();
  }
    if (currentPage !== Number(Refs.totalPagesButton.innerHTML)) {
    checkAvailableNextButtons();
  }

  if (query.length > 0) {
    showMoviesByKeyWord(query, currentPage);
  } else {
    showPopularMoviesByDefault(currentPage);
  }

  isPrevPageDisabled();
  isNextPageDisabled();
  isSetFirstPageDisabled();
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
    checkAvailablePrevButtons();
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
  
    isSetFirstPageDisabled();
    isSetLastPageDisabled();

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

  checkAvailableNextButtons();

  if (query.length > 0) {
    showMoviesByKeyWord(query, currentPage);
  } else {
    showPopularMoviesByDefault(currentPage);
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
  
  if (currentPage <= Number(Refs.totalPagesButton.innerHTML) - 4) {
    let availableNextButtons = paginationButtonsArray.filter(
      paginationButton => Number(paginationButton.innerHTML) >= currentPage,
    );
    console.log(availableNextButtons);
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
function createNewPaginationButtonsFromTheEnd() {
  let prevPaginationButtonsFromTheEnd = [];
  for (let i = currentPage, size = currentPage - 5; i > size; i -= 1) {
    prevPaginationButtonsFromTheEnd.push(`<li><button class="pagination-button pgn-btn">${i}</button></li>`);
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

function isPrevPageDisabled() {
  return currentPage === 1 
    ? Refs.prevPageButton.disabled = true : Refs.prevPageButton.disabled = false;
}
function isNextPageDisabled() {
  return currentPage === Number(Refs.totalPagesButton.innerHTML)
    ? Refs.nextPageButton.disabled = true : Refs.nextPageButton.disabled = false;
}

function isSetFirstPageDisabled() {
  return currentPage === 1
    ? Refs.moveToFirstPageButton.disabled = true : Refs.moveToFirstPageButton.disabled = false;
}

function isSetLastPageDisabled() {
  return currentPage === Number(Refs.totalPagesButton.innerHTML)
    ? Refs.moveToLastPageButton.disabled = true : Refs.moveToLastPageButton.disabled = false;
}

function setFirstPage() {
  const initialPage = API.initialPage;
  currentPage = initialPage;
  const query = API.query;

  const active = document.querySelector('pgn-active');
  if (active) {
    active.classList.remove('pgn-active');
  }
  
  Refs.additionalPaginationButtonsAfter.style.display = 'flex';
  Refs.additionalPaginationButtonsBefore.style.display = 'none';

  if (query.length > 0) {
    showMoviesByKeyWord(query, currentPage);
    if (Refs.totalPagesButton.classList.contains('pgn-active')) {
      Refs.totalPagesButton.classList.remove('pgn-active');
    }
  } else {
    showPopularMoviesByDefault(currentPage);
  }

  renewPaginationMarkup();

  isSetFirstPageDisabled();
  isSetLastPageDisabled();

  isPrevPageDisabled();
  isNextPageDisabled();
  
  findFirstFilm();
}
function setLastPage() {
  const lastPage = Number(Refs.totalPagesButton.innerHTML);
  currentPage = lastPage;

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