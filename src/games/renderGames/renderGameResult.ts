import '../games.scss';

import createElement from '../../helpers/createElement';
import appendChildArray from '../../helpers/appendChildArray';
import { SprintResult } from '../../types/index';
import { completeTableWinners, getResultString } from '../logicGames/logicSprint';
import { setLocation } from '../../routing/routing';
import requestMethods from "../../services/requestMethods";
import {getStore} from "../../storage";
import {DataForStatistic} from "../../types/Statistic";
import {addStatisticGame} from "../logicGames/gameStatistic";

export function renderColumnWinner(target: HTMLElement | string, resultSprint: SprintResult) {
  const { wordEn, wordRu, result } = resultSprint;

  const column = createElement('div', ['spring-result__column']);
  const columnText = createElement('div', undefined, `${wordEn} - ${wordRu}`);
  const columnResult = createElement('div') as HTMLDivElement;
  columnResult.style.backgroundImage = result
    ? "url('../assets/images/icons_check.png')"
    : "url('../assets/images/icons_close.png')";

  appendChildArray(column, [columnText, columnResult]);

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
  gameName: string
) {
  const container = createElement('div', ['game-container', 'spring-result-container']);
  const btnClose = createElement('div', ['btn-close']);
  //btnClose.addEventListener('click', () => closeWindow(container));
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
  await addStatisticGame(resultsSprint, gameName)
}

