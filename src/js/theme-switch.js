import Refs from './refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
  GRAY: 'grey-background-theme',
};

// console.log(refs.modalContent);

const delClassElem = () => {
  Refs.sliderWrapper.classList.remove(Theme.LIGHT, Theme.DARK);
  Refs.sliderWrappeBtnLeft.classList.remove(Theme.LIGHT, Theme.GRAY);
  Refs.sliderWrappeBtnRight.classList.remove(Theme.LIGHT, Theme.GRAY);
  Refs.body.classList.remove(Theme.LIGHT, Theme.DARK);
  Refs.footer.classList.remove(Theme.LIGHT, Theme.GRAY);
  Refs.copyrightLogo.classList.remove(Theme.LIGHT, Theme.DARK);
};

Refs.themeSwitcher.addEventListener('change', () => {
  delClassElem();
  if (Refs.themeSwitcher.checked) {
    localStorage.setItem('Theme', 'darkTheme');

    Refs.sliderWrapper.classList.add(Theme.DARK);
    Refs.sliderWrappeBtnLeft.classList.add(Theme.GRAY);
    Refs.sliderWrappeBtnRight.classList.add(Theme.GRAY);
    Refs.body.classList.add(Theme.DARK);
    Refs.footer.classList.add(Theme.GRAY);
    Refs.copyrightLogo.classList.add(Theme.DARK);
  } else {
    localStorage.setItem('Theme', 'lightTheme');
    Refs.body.classList.add(Theme.LIGHT);
  }
});
if (localStorage.getItem('Theme') === 'darkTheme') {
  Refs.sliderWrapper.classList.add(Theme.DARK);
  Refs.sliderWrappeBtnLeft.classList.add(Theme.GRAY);
  Refs.sliderWrappeBtnRight.classList.add(Theme.GRAY);
  Refs.themeSwitcher.setAttribute('checked', true);
  Refs.body.classList.add(Theme.DARK);
  Refs.footer.classList.add(Theme.GRAY);
  Refs.copyrightLogo.classList.add(Theme.DARK);
}
