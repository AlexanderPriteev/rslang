import './style.scss';

import createElement from '../helpers/createElement';
import appendChildArray from '../helpers/appendChildArray';
import { closeWindow } from '../helpers/closeWindow';
import constants from '../constants/index';

const { BTN_TITLE_FALSE, BTN_TITLE_TRUE } = constants;

export function renderWindowGame(target: HTMLElement | string) {
  const container = createElement('div', ['sprint-container', 'sprint-game-container']);
  const btnSound = createElement('div', ['sprint-sound']);
  const btnClose = createElement('div', ['btn-close']);
  btnClose.addEventListener('click', () => closeWindow(container));

  const questContainer = createElement('div', ['sprint-quest-container']);
  const timeCounter = createElement('div', ['sprint-time-counter']);
  timeCounter.appendChild(createElement('p', undefined, '00', 'timer'));

  const quest = createElement('div', ['sprint-quest']);

  const questHeader = createElement('div', ['sprint-quest-header']);
  const coefficient = createElement('div', ['quest-header__coefficient'], 'X1');
  const status = createElement('div', ['quest-header__status']);

  appendChildArray(status, [createElement('div'), createElement('div'), createElement('div')]);
  const countTrueAnswer = createElement('div', ['quest-header__count-true'], '00');
  appendChildArray(questHeader, [coefficient, status, countTrueAnswer]);

  const questMain = createElement('div', ['sprint-quest-main']);
  const englishWord = createElement('div', ['sprint-quest__en'], 'word');
  const btnSoundWord = createElement('div', ['sprint-quest__sound']);
  appendChildArray(questMain, [englishWord, btnSoundWord]);

  const rusWord = createElement('div', ['sprint-quest__rus'], 'слово');

  const questBtn = createElement('div', ['sprint-quest__btn']);
  const questBtnFalse = createElement('button', undefined, BTN_TITLE_FALSE);
  const questBtnTrue = createElement('button', undefined, BTN_TITLE_TRUE);
  appendChildArray(questBtn, [questBtnFalse, questBtnTrue]);

  appendChildArray(questContainer, [timeCounter, quest]);
  appendChildArray(container, [btnSound, btnClose, questContainer]);

  appendChildArray(quest, [questHeader, questMain, rusWord, questBtn]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(container);
  } else {
    target.appendChild(container);
  }
}
