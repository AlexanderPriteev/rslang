import '../games.scss';
import constants from '../../constants/index';
import createElement from '../../helpers/createElement';
import appendChildArray from '../../helpers/appendChildArray';
import { SprintResult } from '../../types/index';
import { completeTableWinners, getResultString } from '../logicGames/logicSprint';
import { setLocation } from '../../routing/routing';
import { addStatisticGame } from '../logicGames/gameStatistic';

const { SERVER } = constants;

export function renderColumnWinner(target: HTMLElement | string, resultSprint: SprintResult) {
  const { wordEn, wordRu, result, audio } = resultSprint;

  const column = createElement('div', ['spring-result__column']);
  const sound = createElement('div', ['spring-result__sound']) as HTMLDivElement;
  sound.onclick = () => {
    void new Audio(`${SERVER}${audio}`).play();
  };
  const columnText = createElement('div', ['spring-result__text'], `${wordEn} - ${wordRu}`);
  const columnResult = createElement('div', ['spring-result__icon']) as HTMLDivElement;
  columnResult.classList.add(result ? 'correct': 'error');

  appendChildArray(column, [sound, columnText, columnResult]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(column);
  } else {
    target.appendChild(column);
  }
}

export async function renderWindowGameResult(
  target: HTMLElement | string,
  resultsSprint: SprintResult[],
  totalScore: string,
  classes: string,
  gameName: string
) {
  const container = createElement('div', ['game-container', classes]);
  const btnClose = createElement('div', ['btn-close']);
  btnClose.onclick = () => {
    setLocation('games');
    container.remove();
  };

  const results = createElement('div', ['spring-result']);

  const titleString = getResultString(totalScore);
  const title = createElement('div', ['spring-result__title'], titleString);
  const table = createElement('div');

  completeTableWinners(table, resultsSprint);

  appendChildArray(results, [title, table]);

  appendChildArray(container, [btnClose, results]);

  if (typeof target === 'string') {
    document.querySelector(target)?.appendChild(container);
  } else {
    target.appendChild(container);
  }
  await addStatisticGame(resultsSprint, gameName);
}
