import Refs from './refs';
import showPopularMoviesByDefault from './defaultPage.js'

Refs.paginationList.addEventListener('click', setCurrentPage);
Refs.prevPageButton.addEventListener('click', setPrevPageAsCurrent);
Refs.nextPageButton.addEventListener('click', setNextPageAsCurrent);
Refs.totalPagesButton.addEventListener('click', setCurrentPage);


let currentPage = 1;

function setCurrentPage(event) {
    const active = document.querySelector('.pgn-active');

    if (active) {
        active.classList.remove('pgn-active');
    }
  
    currentPage = Number(event.target.innerHTML);
    event.target.classList.add('pgn-active');
    
    if (currentPage !== 1) {
        checkAvailablePaginationButtons()    
    }
    
    showPopularMoviesByDefault(currentPage);
    findFirstFilm();
}

function setPrevPageAsCurrent() {
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
  
    showPopularMoviesByDefault(currentPage);
    findFirstFilm();
}

function setNextPageAsCurrent() {
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
    showPopularMoviesByDefault(currentPage);
    findFirstFilm();
}

function checkAvailablePaginationButtons() {
    const paginationButtons = document.querySelectorAll('.pagination-button');
    let paginationButtonsArray = [...paginationButtons];
    
    if (currentPage !== Number(Refs.totalPagesButton.innerHTML)) {
        let availableNextButtons = paginationButtonsArray.filter(paginationButton => Number(paginationButton.innerHTML) >= currentPage);
        if (availableNextButtons.length === 1) {
            const nextPaginationButtonsMarkup = createNextPaginationButtons();
            Refs.paginationList.innerHTML = nextPaginationButtonsMarkup;
            Refs.paginationList.firstElementChild.firstElementChild.classList.add('pgn-active');
        }
    }    
    
    let availablePrevButtons = paginationButtonsArray.filter(paginationButton => Number(paginationButton.innerHTML) <= currentPage);
    if (availablePrevButtons.length === 1) {
        const prevPaginationButtonsMarkup = createPrevPaginationButtons();
        Refs.paginationList.innerHTML = prevPaginationButtonsMarkup;
        Refs.paginationList.lastElementChild.firstElementChild.classList.add('pgn-active');
    }
}


function createNextPaginationButtons() {
    let nextPaginationButtons = [];
    for (let i = currentPage, size = currentPage + 5; i < size; i += 1) {
        nextPaginationButtons.push(`<li><button class="pagination-button pgn-btn">${i}</button></li>`)
    }
    return nextPaginationButtons.join(' ');
}

function createPrevPaginationButtons() {
    let prevPaginationButtons = [];
    for (let i = currentPage, size = currentPage - 5; i > size; i -= 1) {
        prevPaginationButtons.push(`<li><button class="pagination-button pgn-btn">${i}</button></li>`)
    }
    return prevPaginationButtons.reverse().join(' ');
}

function findFirstFilm() {
    const firstFilm = Refs.movieList.firstElementChild;
    if (firstFilm) {
        firstFilm.scrollIntoView({
            block: 'end',
            });
    }
    return;
}



