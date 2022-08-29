import '../games.scss';

import createElement from '../../helpers/createElement';
import constants from '../../constants/index';
import appendChildArray from '../../helpers/appendChildArray';
import { startSprint } from '../logicGames/logicSprint';
import { startAudioCall } from '../logicGames/logicAudioCall';
import { setLocation } from '../../routing/routing';
const { COUNT_GAME_SECTIONS, CLASS_CONTAINER_SPRINT } = constants;

export function renderWindowStartGame(target: HTMLElement | string, classes = 'body') {
  const container = createElement('div', ['game-container', classes]);
  const btnClose = createElement('div', ['btn-close']);
  //btnClose.addEventListener('click', () => closeWindow(container));
  btnClose.onclick = () => {
    setLocation('games');
    container.remove();
  };

  const categoryContainer = createElement('div', ['game-category']);
  const text = createElement('span', ['game-category__text'], 'Выберите категорию:');

  const arraySections: HTMLElement[] = [];
  for (let i = 0; i < COUNT_GAME_SECTIONS; i++) {
    const sectionText = `<span class="game-category__section-text">Раздел ${i + 1}</span>`
    const section = createElement('div', ['game-category__section', `section${i + 1}`], sectionText);
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
    const targetContainer = document.querySelector(target) as HTMLElement;
    targetContainer.innerHTML = '';
    targetContainer.appendChild(container);
  } else {
    target.innerHTML = '';
    target.appendChild(container);
  }
}
