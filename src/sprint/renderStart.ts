import './style.scss';

import createElement from '../helpers/createElement';
import constants from '../constants/index';
import appendChildArray from '../helpers/appendChildArray';
import { closeWindow } from '../helpers/closeWindow';
import { startSprint } from './logicSprint';
import { startAudioCall } from './logicAudioCall';
const { COUNT_GAME_SECTIONS, CLASS_CONTAINER_SPRINT } = constants;

export function renderWindowStartGame(target: HTMLElement | string, classes: string) {
  const container = createElement('div', ['game-container', classes]);
  const btnClose = createElement('div', ['btn-close']);
  btnClose.addEventListener('click', () => closeWindow(container));
  const categoryContainer = createElement('div', ['game-category']);
  const text = createElement('span', ['game-category__text'], 'Выберите категорию:');

  const arraySections: HTMLElement[] = [];
  for (let i = 0; i < COUNT_GAME_SECTIONS; i++) {
    const section = createElement('div', ['game-category__section', `section${i + 1}`]);
    section.addEventListener('click', (e) => {
      const level = +(e.target as HTMLElement).className.slice(-1);

      if (classes === CLASS_CONTAINER_SPRINT) {
        void startSprint(+level);
      } else {
        void startAudioCall(+level);
      }
    });
    arraySections.push(section);
  }

  appendChildArray(categoryContainer, [text, ...arraySections]);
  appendChildArray(container, [btnClose, categoryContainer]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(container);
  } else {
    target.appendChild(container);
  }
}
