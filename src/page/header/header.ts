import createElement from '../../helpers/createElement';
import { DevsLinks } from '../about/about-interface';
import { headerAuth } from './header-auth';

function themeSwitch(){
  const logo = document.querySelector('.header__logo img') as HTMLImageElement;
  const body = document.body
  const isDark = document.body.classList.contains('dark-theme')
  if(isDark){
    body.classList.remove('dark-theme')
    localStorage.removeItem('isDarkTheme')
  }
  else{
    body.classList.add('dark-theme')
    localStorage.setItem('isDarkTheme', '1')
  }
  logo.src = `./assets/images/lang-logo${!isDark ? '-dark' : ''}.svg`
}

export function headerRender(userHead?: boolean) {
  const darkTheme = document.body.classList.contains('dark-theme')
  const logo: DevsLinks = {
    name: 'RS Lang',
    link: '/index',
    image: `./assets/images/lang-logo${darkTheme ? '-dark' : ''}.svg`,
  };
  const header = createElement('header', ['header']);

  const logoText = `<img src="${logo.image}" alt="${logo.name}" class="img img--contain">`;
  const logoHeader = createElement('a', ['header__logo'], logoText);
  logoHeader.setAttribute('href', logo.link);
  header.append(logoHeader);

  const themeSwitcherText = `<i class="theme-switch__night"></i><i class="theme-switch__day"></i>`
  const themeSwitcher = createElement('div', ['theme-switch'], themeSwitcherText)
  const headerUser = createElement('div', ['header__user']);
  themeSwitcher.onclick = () => themeSwitch();
  headerUser.append(themeSwitcher)
  if (userHead) {
    headerUser.append(headerAuth());
  }
  header.append(headerUser);
  return header;
}
