import students from './studentData.json';
import studentsTemplate from '../templates/students-modal.hbs';
import Refs from './refs';

Refs.studentGoit.addEventListener('click', onOpenModal);
Refs.btnClose.addEventListener('click', onCloseModal);
Refs.backdrop.addEventListener('click', onCloseModalBackdrop);

renderTeamModal(students);

function onOpenModal() {
  window.addEventListener('keydown', onCloseModal);
  Refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
}

function onCloseModal() {
  document.body.classList.remove('modal-open');
  Refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressEscape);
}
function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
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
