export default async function lazyLoad() {
  const cardImages = document.querySelectorAll('.js-movie__image');
  const image = document.querySelector('.modal-card .js-movie__image');

  if (image) {
    image.addEventListener('load', () => {
      image.classList.add('is-modal-loaded');
      image.previousElementSibling.style.display = 'none';
    });
  }

  if (cardImages) {
    cardImages.forEach(image => {
      image.addEventListener('load', () => {
        image.classList.add('is-loaded');
        image.previousElementSibling.style.display = 'none';
      });
    });
  }
}
