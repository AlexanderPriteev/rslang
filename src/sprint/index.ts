import createElement from '../helpers/createElement';
import constants from '../constants/index';
import appendChildArray from '../helpers/appendChildArray';
const { COUNT_GAME_SECTIONS } = constants;

export function renderWindowStartGame(target: HTMLElement | string) {
  const container = createElement('div', ['sprint-container']);
  const btnClose = createElement('div', ['btn-close']);
  const categoryContainer = createElement('div', ['game-category']);
  const text = createElement('span', ['game-category__section'], 'Выберите категорию');
  //const container1 = createElement('div', ['sprint-container']);

  const arraySections: HTMLElement[] = [];
  for (let i = 0; i < COUNT_GAME_SECTIONS; i++) {
    arraySections.push(createElement('div', ['game-category__section'], `Раздел ${i + 1}`));
  }

  appendChildArray(categoryContainer, [text, ...arraySections]);
  appendChildArray(container, [btnClose, categoryContainer]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(container);
  } else {
    target.appendChild(container);
  }
}
