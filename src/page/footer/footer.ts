import createElement from '../../helpers/createElement';
import {DevsLinks} from '../about/about-interface';
import {devs} from '../about/about-const';

function footerAbout(devs: DevsLinks[]){
    const aboutBlock = createElement('div', ['about']);

    const aboutHeadText = '<i class="about__icon icon-team"></i><h3 class="about__title">Разработчики</h3>';
    const aboutHead = createElement('div', ['about__headline'], aboutHeadText);

    const aboutBody = createElement('div', ['about__body']);
    devs.forEach((e) => {
        const thisDev = createElement('a', ['about__link'], e.name);
        thisDev.setAttribute('href', e.link)
        thisDev.setAttribute('target', '_blank')
        aboutBody.append(thisDev)
    })
    aboutBlock.append(aboutHead, aboutBody)
    return aboutBlock
}

export function footer(){
    const RSS: DevsLinks = {
        name: 'RSS',
        link: 'https://rs.school/js/',
        image: './assets/images/rs_school.svg'
    }
    const createText = 'CREATED AT 2022'
    const logoText = `<img src="${RSS.image}" alt="${RSS.name}" class="img img--contain">`;

    const footer = createElement('footer', ['footer']);
    const logo = createElement('a', ['footer__logo'], logoText);
    const about = footerAbout(devs)
    const createData = createElement('p', ['footer__creat'], createText);

    logo.setAttribute('href', RSS.link)
    about.classList.add('footer__about')
    footer.append(logo, about, createData)
    return footer
}
