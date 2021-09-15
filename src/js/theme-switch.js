import Refs from './refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
  GRAY: 'grey-background-theme',
};

const delClassElem = () => {
  Refs.body.classList.remove(Theme.LIGHT, Theme.DARK);
};

Refs.themeSwitcher.addEventListener('change', () => {
  delClassElem();
  if (Refs.themeSwitcher.checked) {
    localStorage.setItem('Theme', 'darkTheme');
    Refs.body.classList.add(Theme.DARK);
  } else {
    localStorage.setItem('Theme', 'lightTheme');
    Refs.body.classList.add(Theme.LIGHT);
  }
});
if (localStorage.getItem('Theme') === 'darkTheme') {
  Refs.body.classList.add(Theme.DARK);
  Refs.themeSwitcher.checked = true;
}
