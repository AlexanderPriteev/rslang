import { pageRender } from '../page/page';
import { mainPage } from '../page/main/main-page';
import textbook from '../textbook/textbook';
import { statisticsRender } from '../statistics/statistics';
import { gamesPage } from '../games/games';
import { renderWindowStartGame } from '../games/renderGames/renderStart';
import { openAuth } from '../page/header/header-auth';
import { notFoundRender } from '../page/page-not-found/not-found';
import { getStore } from '../storage';
import dictionary from '../dictionary/dictionary';
import { audio } from '../textbook/createWordElement';

export const currentRout = () => window.location.href.replace(/^.*[\/#\/]|$/, '/#/').replace(/\?.*/, '');

export function routing(rout: string) {
  const indexPage = ['', '/#/about', '/', 'index', '/index', '/#/', '/#/index', '/#/index.html'];
  const currentRout = rout.replace('/#/', '');
  switch (currentRout) {
    case 'book':
      pageRender(textbook, 'book');
      break;
    case 'dictionary':
      pageRender(dictionary, 'dictionary');
      break;

    case 'statistics':
      if (getStore()) pageRender(statisticsRender, 'statistics');
      else pageRender(mainPage, 'index');
      break;

    case 'games':
      pageRender(gamesPage, 'games');
      break;
    case 'sprint':
      renderWindowStartGame('body', 'sprint-start-window');
      break;
    case 'audio-call':
      renderWindowStartGame('body', 'audio-call-start-window');
      break;

    case 'auth':
      openAuth();
      break;
    case 'options':
      openAuth(true);
      break;

    default:
      if (indexPage.some((e) => e === rout)) pageRender(mainPage, 'index');
      else notFoundRender();
  }
}

export function setLocation(rout = '', options?: string) {
  try {
    window.history.pushState(null, '', `/#/${rout}${options || ''}`);
    audio?.pause();

    routing(`${rout}`);
  } catch (e) {
    console.log('Ваш браузер не поддерживает данный функционал');
  }
}
