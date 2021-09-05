import students from './studentData.json';
import studentsTemplate from '../templates/students-modal.hbs';

const refs = {
  studentGoit: document.querySelector('.text-company-link'),
  backdrop: document.querySelector('.backdrop-team'),
  team: document.querySelector('.team-modal'),
  btnClose: document.querySelector('.modal-close-btn'),
};

refs.studentGoit.addEventListener('click', onOpenModal);
refs.btnClose.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseModalBackdrop);


renderTeamModal(students);

function onOpenModal() {
  
  window.addEventListener('keydown', onCloseModal);
  refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
}

function onCloseModal(event) {
  document.body.classList.remove('modal-open');
  refs.backdrop.classList.add('is-hidden');
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
  refs.team.insertAdjacentHTML('beforeend', markup);
}
