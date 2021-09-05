import students from './studentData.json';
import studentsTemplate from '../templates/students-modal.hbs';
import Refs from './refs';

<<<<<<< HEAD
const refs = {
  studentGoit: document.querySelector('.text-company-link'),
  backdrop: document.querySelector('.backdrop-team'),
  team: document.querySelector('.team-modal'),
  btnClose: document.querySelector('.modal-close-btn'),
};

refs.studentGoit.addEventListener('click', onOpenModal);
refs.btnClose.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseModalBackdrop);

=======
Refs.studentGoit.addEventListener('click', onOpenModal);
Refs.btnClose.addEventListener('click', onCloseModal);
>>>>>>> dev

renderTeamModal(students);

function onOpenModal() {
  
  window.addEventListener('keydown', onCloseModal);
  Refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
}

function onCloseModal(event) {
<<<<<<< HEAD
  document.body.classList.remove('modal-open');
  refs.backdrop.classList.add('is-hidden');
=======
  window.onscroll = function () {
    return false;
  };
  Refs.backdrop.classList.add('is-hidden');
>>>>>>> dev
  if (event.code === 'Escape') {
    window.removeEventListener('keydown', onCloseModal);
  }
}
function onCloseModalBackdrop(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}
function renderTeamModal(data) {
  const markup = studentsTemplate(data);
  Refs.team.insertAdjacentHTML('beforeend', markup);
}
