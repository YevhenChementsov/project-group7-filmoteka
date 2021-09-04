const refs = {
  body: document.querySelector('body'),

  footer: document.querySelector('.footer'),

  themeSwitcher: document.querySelector('.theme__switch-toggle'),

  copyrightLogo: document.querySelector('.copyright-logo'),
};

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
  GRAY: 'grey-background-theme',
};

// console.log(refs.modalContent);

const delClassElem = () => {
  refs.body.classList.remove(Theme.LIGHT, Theme.DARK);

  refs.footer.classList.remove(Theme.LIGHT, Theme.GRAY);

  refs.copyrightLogo.classList.remove(Theme.LIGHT, Theme.DARK);
};

refs.themeSwitcher.addEventListener('change', () => {
  delClassElem();
  if (refs.themeSwitcher.checked) {
    localStorage.setItem('Theme', 'darkTheme');
    refs.body.classList.add(Theme.DARK);

    refs.footer.classList.add(Theme.GRAY);

    refs.copyrightLogo.classList.add(Theme.DARK);
  } else {
    localStorage.setItem('Theme', 'lightTheme');
    refs.body.classList.add(Theme.LIGHT);
  }
});
if (localStorage.getItem('Theme') === 'darkTheme') {
  refs.themeSwitcher.setAttribute('checked', true);

  refs.body.classList.add(Theme.DARK);

  refs.footer.classList.add(Theme.GRAY);

  refs.copyrightLogo.classList.add(Theme.DARK);
}
