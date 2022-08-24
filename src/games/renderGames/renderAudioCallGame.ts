import '../games.scss';

import createElement from '../../helpers/createElement';
import appendChildArray from '../../helpers/appendChildArray';
import { eventKeyUp, eventListener } from '../logicGames/logicSprint';
import { closeWindow } from '../../helpers/closeWindow';

function renderButtonGroup() {
  const questBtn = createElement('div', ['audio-call-quest__btn']);
  const questBtn1 = createElement('button', undefined, undefined, 'btn-audio-call');
  const questBtn2 = createElement('button', undefined, undefined, 'btn-audio-call');
  const questBtn3 = createElement('button', undefined, undefined, 'btn-audio-call');
  const questBtn4 = createElement('button', undefined, undefined, 'btn-audio-call');
  const questBtn5 = createElement('button', undefined, undefined, 'btn-audio-call');
  const questBtn6 = createElement('button', undefined, undefined, 'btn-audio-call');

  appendChildArray(questBtn, [questBtn1, questBtn2, questBtn3, questBtn4, questBtn5, questBtn6]);

  return questBtn;
}

function renderQuestGroup() {
  const quest = createElement('div', ['audio-call-quest']);

  const status = createElement('div', ['audio-call-quest__status']);
  appendChildArray(status, [
    createElement('div'),
    createElement('div'),
    createElement('div'),
    createElement('div'),
    createElement('div'),
  ]);

  const btnSound = createElement('div', ['audio-call-quest__sound']);
  const soundIcon = createElement('img', undefined, undefined, 'call-sound') as HTMLImageElement;
  soundIcon.src = '../assets/images/sound.png';
  soundIcon.dataset.sound = 'on';
  btnSound.appendChild(soundIcon);

  const questBtn = renderButtonGroup();

  appendChildArray(quest, [status, btnSound, questBtn]);

  return quest;
}

export function renderAudioCallGame(target: HTMLElement | string) {
  const container = createElement('div', ['game-container', 'audio-call-game-container']);

  const btnSound = createElement('div', ['sprint-sound']);
  const soundIcon = createElement('img', undefined, undefined, 'sprint-sound') as HTMLImageElement;
  soundIcon.src = '../assets/images/sound.png';
  soundIcon.dataset.sound = 'on';
  btnSound.appendChild(soundIcon);

  const btnClose = createElement('div', ['btn-close']);
  btnClose.addEventListener('click', () => closeWindow(container));

  appendChildArray(container, [btnSound, btnClose, renderQuestGroup()]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(container);
  } else {
    target.appendChild(container);
  }

  eventListener('div.audio-call-game-container');
  eventKeyUp();
}
