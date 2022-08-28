import { pageRender } from '../page/page';
import { mainPage } from '../page/main/main-page';
import textbook from '../textbook/textbook';
import { statisticsRender } from '../statistics/statistics';
import { gamesPage } from '../games/games';
import { renderWindowStartGame } from '../games/renderGames/renderStart';
import { openAuth } from '../page/header/header-auth';
import { notFoundRender } from '../page/page-not-found/not-found';
import { getStore } from '../storage';

export function routing(rout: string) {

  switch (rout) {
    case '/':
      pageRender(mainPage, 'index');
      break;
    case '/index':
      pageRender(mainPage, 'index');
      break;

    case '/book':
      pageRender(textbook, 'book');
      break;
    case '/statistics':
      if (getStore()) pageRender(statisticsRender, 'statistics');
      else pageRender(mainPage, 'index');
      break;

    case '/games':
      pageRender(gamesPage, 'games');
      break;
    case '/sprint':
      renderWindowStartGame('body', 'sprint-start-window');
      break;
    case '/audio-call':
      renderWindowStartGame('body', 'audio-call-start-window');
      break;

    case '/auth':
      openAuth();
      break;
    case '/options':
      openAuth(true);
      break;

    default:
      notFoundRender();
  }
}

export function setLocation(rout = '', options?: string) {
  try {
    window.history.pushState(null, '', `${rout}${options || ''}`);
    if (options) routing(`/${rout}`);
    else routing(`/${rout}`);
  } catch (e) {
    console.log('Ваш браузер не поддерживает данный функционал');
  }
}

export function routPath() {
  const pathname = window.location.pathname;
  const search = window.location.search;
  return search ? [pathname, search] : [pathname];
}
