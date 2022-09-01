import '../games.scss';

import createElement from '../../helpers/createElement';
import constants from '../../constants/index';
import appendChildArray from '../../helpers/appendChildArray';
import { startSprint } from '../logicGames/logicSprint';
import { startAudioCall } from '../logicGames/logicAudioCall';
import { setLocation } from '../../routing/routing';
const { COUNT_GAME_SECTIONS, CLASS_CONTAINER_SPRINT } = constants;

const tooltipGame = () => {
  const text = `<ul class="tooltip__list">
      <li class="tooltip__item">В игре участвую все слова.</li>
      <li class="tooltip__item">В случае запустите игры со страниц "Учебник" и "Словарь" будут убраны выученные слова.</li>
      <li class="tooltip__item">Слово будет отправлено в изученное при серии из 3 (для сложных 5) правильных ответов.</li>
      <li class="tooltip__item">При ошибке серия правильных ответов обнуляется, а изученные слова переходят в обычные.</li>
    </ul>`;
  const icon = createElement('i', ['tooltip__icon', 'icon-info']);
  const tooltip = createElement('div', ['tooltip'], text);
  tooltip.prepend(icon);
  return tooltip;
};

export function renderWindowStartGame(target: HTMLElement | string, classes = 'body') {
  let withoutDuplication = true;

  const container = createElement('div', ['game-container', classes]);
  const btnClose = createElement('div', ['btn-close']);
  btnClose.onclick = () => {
    setLocation('games');
    container.remove();
  };

  const categoryContainer = createElement('div', ['game-category']);
  const text = createElement('span', ['game-category__text'], 'Выберите категорию:');
  categoryContainer.append(tooltipGame());
  const arraySections: HTMLElement[] = [];
  for (let i = 0; i < COUNT_GAME_SECTIONS; i++) {
    const sectionText = `<span class="game-category__section-text">Раздел ${i + 1}</span>`;
    const section = createElement('div', ['game-category__section', `section${i + 1}`], sectionText);
    section.addEventListener(
      'click',
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      (e) => {
        if (!withoutDuplication) return;

        withoutDuplication = !withoutDuplication;

        const level = +(e.target as HTMLElement).innerText.slice(-1);

        if (classes === CLASS_CONTAINER_SPRINT) {
          void startSprint(+level);
        } else {
          void startAudioCall(+level);
        }
      },
      { once: true }
    );
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
