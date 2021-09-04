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

renderTeamModal(students);

function onOpenModal() {
  window.addEventListener('keydown', onCloseModal);
  refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
}

function onCloseModal(event) {
  window.onscroll = function () {
    return false;
  };
  refs.backdrop.classList.add('is-hidden');
  if (event.code === 'Escape') {
    window.removeEventListener('keydown', onCloseModal);
  }
}
function renderTeamModal(data) {
  const markup = studentsTemplate(data);
  refs.team.insertAdjacentHTML('beforeend', markup);
}
