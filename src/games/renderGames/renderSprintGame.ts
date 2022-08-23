import '../games.scss';

import createElement from '../../helpers/createElement';
import appendChildArray from '../../helpers/appendChildArray';
import constants from '../../constants/index';
import { eventKeyUp, eventListener } from '../logicGames/logicSprint';
import { setLocation } from '../../routing/routing';

const { BTN_TITLE_FALSE, BTN_TITLE_TRUE } = constants;

function renderButtonGroup() {
  const questBtn = createElement('div', ['sprint-quest__btn']);
  const questBtnFalse = createElement('button', undefined, BTN_TITLE_FALSE, 'btn-sprint-false');
  const questBtnTrue = createElement('button', undefined, BTN_TITLE_TRUE, 'btn-sprint-true');

  appendChildArray(questBtn, [questBtnFalse, questBtnTrue]);

  return questBtn;
}

function renderMainGroup() {
  const questMain = createElement('div', ['sprint-quest-main']);
  const englishWord = createElement('div', ['sprint-quest__en'], '');
  const btnSoundWord = createElement('div', ['sprint-quest__sound'], undefined, 'sprint-word-sound');

  appendChildArray(questMain, [englishWord, btnSoundWord]);

  return questMain;
}

function renderQuestGroup() {
  const quest = createElement('div', ['sprint-quest']);

  const questHeader = createElement('div', ['sprint-quest-header']);
  const coefficient = createElement('div', ['quest-header__coefficient'], 'X1');
  const status = createElement('div', ['quest-header__status']);
  appendChildArray(status, [createElement('div'), createElement('div'), createElement('div')]);
  const countTrueAnswer = createElement('div', ['quest-header__count-true'], '00');

  appendChildArray(questHeader, [coefficient, status, countTrueAnswer]);

  const questMain = renderMainGroup();
  const rusWord = createElement('div', ['sprint-quest__rus'], '');
  const questBtn = renderButtonGroup();

  appendChildArray(quest, [questHeader, questMain, rusWord, questBtn]);

  return quest;
}

function renderQuestContainer() {
  const questContainer = createElement('div', ['sprint-quest-container']);

  const timeCounter = createElement('div', ['sprint-time-counter']);
  timeCounter.appendChild(createElement('p', undefined, '00', 'timer'));
  const quest = renderQuestGroup();

  appendChildArray(questContainer, [timeCounter, quest]);

  return questContainer;
}

export function renderWindowGame(target: HTMLElement | string) {
  const container = createElement('div', ['game-container', 'sprint-game-container']);

  const btnSound = createElement('div', ['sprint-sound']);
  const soundIcon = createElement('img', undefined, undefined, 'sprint-sound') as HTMLImageElement;
  soundIcon.src = '../assets/images/sound.png';
  soundIcon.dataset.sound = 'on';
  btnSound.appendChild(soundIcon);

  const btnClose = createElement('div', ['btn-close']);
  //btnClose.addEventListener('click', () => closeWindow(container));
  btnClose.onclick = () => {
    setLocation('games');
    container.remove();
  };

  const questContainer = renderQuestContainer();

  appendChildArray(container, [btnSound, btnClose, questContainer]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(container);
  } else {
    target.appendChild(container);
  }

  eventListener('div.sprint-game-container');
  eventKeyUp();
}
