import { pageRender } from '../page/page';
import { mainPage } from '../page/main/main-page';
import textbook from '../textbook/textbook';
import { statisticsRender } from '../statistics/statistics';
import { gamesPage } from '../games/games';
import { renderWindowStartGame } from '../sprint/renderStart';
import { openAuth } from '../page/header/header-auth';
import { notFoundRender } from '../page/page-not-found/not-found';

export function routing(rout: string, options?: string) {
  const book = options ? pageRender(textbook, 'book', options) : pageRender(textbook, 'book');

  switch (rout) {
    case '/':
      pageRender(mainPage, 'index');
      break;
    case '/index':
      pageRender(mainPage, 'index');
      break;

    case '/book':
      void book;
      break;
    case '/statistics':
      pageRender(statisticsRender, 'statistics');
      break;

    case '/games':
      pageRender(gamesPage, 'games');
      break;
    case '/sprint':
      renderWindowStartGame();
      break;

    case '/auth':
      openAuth();
      break;
    default:
      notFoundRender();
  }
}

export function setLocation(rout = '', options?: string) {
  try {
    window.history.pushState(null, '', `${rout}${options || ''}`);
    if (options) routing(`/${rout}`, options);
    else routing(`/${rout}`);
  } catch (e) {
    console.log('Ваш браучер не поддерживает данный функционал');
  }
}

export function routPath() {
  const pathname = window.location.pathname;
  const search = window.location.search;
  return search ? [pathname, search] : [pathname];
}
