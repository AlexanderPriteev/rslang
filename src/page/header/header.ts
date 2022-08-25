import createElement from '../../helpers/createElement';
import { DevsLinks } from '../about/about-interface';
import { headerAuth } from './header-auth';

export function headerRender(userHead?: boolean) {
  const logo: DevsLinks = {
    name: 'RS Lang',
    link: '/index',
    image: './assets/images/lang-logo.svg',
  };
  const header = createElement('header', ['header']);

  const logoText = `<img src="${logo.image}" alt="${logo.name}" class="img img--contain">`;
  const logoHeader = createElement('a', ['header__logo'], logoText);
  logoHeader.setAttribute('href', logo.link);
  header.append(logoHeader);

  if (userHead) {
    const headerUser = createElement('div', ['header__user']);
    headerUser.append(headerAuth());
    header.append(headerUser);
  }
  return header;
}
