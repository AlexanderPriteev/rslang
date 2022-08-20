import createElement from '../../helpers/createElement';
import {DevsLinks} from '../about/about-interface';
import {headerAuth} from "./header-auth";


export function header(user?: boolean, login?: boolean) {
    const logo: DevsLinks = {
        name: 'RS Lang',
        link: '/index.html',
        image: './assets/images/lang-logo.svg'
    }
    const header = createElement('header', ['header'])

    const logoText = `<img src="${logo.image}" alt="${logo.name}" class="img img--contain">`;
    const logoHeader = createElement('a', ['header__logo'], logoText)
    logoHeader.setAttribute('href', logo.link)
    header.append(logoHeader)

    if (user) {
        const headerUser = createElement('div', ['header__user'])
        headerUser.append(headerAuth(login || false))
        header.append(headerUser)
    }
    return header
}