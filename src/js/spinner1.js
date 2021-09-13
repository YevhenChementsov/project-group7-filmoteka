export default async function lazyLoad() {
  const cardImages = document.querySelectorAll('.js-movie__image');

  cardImages.forEach(image => {
    image.addEventListener('load', () => {
      console.dir(image);
      image.classList.add('is-loaded');
      image.previousElementSibling.style.display = 'none';
    });
  });
}
