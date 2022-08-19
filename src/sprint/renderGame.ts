import './style.scss';

import createElement from '../helpers/createElement';
import appendChildArray from '../helpers/appendChildArray';
import { closeWindow } from '../helpers/closeWindow';

export function renderWindowGame(target: HTMLElement | string) {
  const container = createElement('div', ['sprint-container', 'sprint-game-container']);
  const btnSound = createElement('div', ['sprint-sound']);
  const btnClose = createElement('div', ['btn-close']);
  btnClose.addEventListener('click', () => closeWindow(container));

  const questContainer = createElement('div', ['sprint-quest-container']);
  const timeCounter = createElement('div', ['sprint-time-counter']);
  const quest = createElement('div', ['sprint-quest']);

  appendChildArray(questContainer, [timeCounter, quest]);
  appendChildArray(container, [btnSound, btnClose, questContainer]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(container);
  } else {
    target.appendChild(container);
  }
}
