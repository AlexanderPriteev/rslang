import createElement from '../../helpers/createElement';
import { navs } from '../sidebar/sidebar';
import textbook from '../../textbook/textbook';
import { devs } from '../about/about-const';
import { gamesPage } from '../../games/games';
import { statisticsRender } from '../../staistics/staistics';

//пока заглушка
const youtubeIframe = `<iframe class="img img--contain" 
                                    src="https://www.youtube.com/embed/3bPL6YNZGOQ" 
                                    title="YouTube video player" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; 
                                           encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen></iframe>`;

function mainResources() {
  const resources = createElement('section', ['main-resources']);
  navs.forEach((e) => {
    if (e.name !== 'main') {
      const navText = `<i class="card-link__icon ${e.icon}"></i>
                              <h3 class="card-link__title">${e.title}</h3>`;
      const nav = createElement('div', ['card-link'], navText);
      resources.append(nav);
      switch (e.name) {
        case 'book':
          nav.onclick = () => textbook();
          break;
        case 'games':
          nav.onclick = () => gamesPage();
          break;
        case 'statistics':
          nav.onclick = () => statisticsRender();
          break;
        //  добавить остальные страницы
      }
    }
  });
  return resources;
}

function mainVideo() {
  const title = '<h2 class="headline">о проекте</h2>';
  const text = `${title}<div class="main-iframe">${youtubeIframe}</div>`;
  return createElement('section', ['main-video'], text);
}

function mainAbout() {
  const title = createElement('h2', ['headline'], 'о нас', 'about');
  const resources = createElement('section', ['main-about']);
  const list = createElement('div', ['main-card-wrapper']);
  devs.forEach((e) => {
    const cardTemplate = `<div class="main-card__image">
                                <img src="${e.image}" alt="" class="img img--cover">
                              </div>
                              <div class="main-card__data">
                                <h3 class="main-card__title">${e.nameRu || e.name}</h3>
                                <p class="main-card__about">${e.about || 'Что-то сделал...'}</p>
                             </div>`;
    const card = createElement('div', ['main-card'], cardTemplate);
    list.append(card);
  });
  resources.append(title, list);
  return resources;
}

export function mainPage(root = '.content-wrapper') {
  const thisRoot: HTMLElement | null = document.querySelector(root);
  if (thisRoot) {
    thisRoot.innerHTML = '';
    thisRoot.append(mainResources(), mainVideo(), mainAbout());
  }
}
