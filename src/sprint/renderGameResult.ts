import './style.scss';

import createElement from '../helpers/createElement';
import appendChildArray from '../helpers/appendChildArray';
import { closeWindow } from '../helpers/closeWindow';

export function renderWindowGameResult(target: HTMLElement | string) {
  const container = createElement('div', ['sprint-container', 'spring-result-container']);
  const btnClose = createElement('div', ['btn-close']);
  btnClose.addEventListener('click', () => closeWindow(container));

  const results = createElement('div', ['spring-result']);
  const title = createElement('div', ['spring-result__title'], 'Ваш результат 230 очков');
  const column = createElement('div', ['spring-result__column']);
  const columnText = createElement('div', undefined, 'camera - камера');
  const columnResult = createElement('div');

  appendChildArray(column, [columnText, columnResult]);
  appendChildArray(results, [title, column]);
  appendChildArray(container, [btnClose, results]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(container);
  } else {
    target.appendChild(container);
  }
}
