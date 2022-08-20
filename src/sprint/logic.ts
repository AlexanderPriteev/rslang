import './style.scss';
import { renderWindowGame } from './renderGame';
import { SprintResult } from '../types/index';
import { renderColumnWinner } from './renderGameResult';

export const resultsGameSprint: SprintResult[] = [
  { wordEn: '111', wordRu: '222', result: true },
  { wordEn: '333', wordRu: '444', result: false },
  { wordEn: '555', wordRu: '666', result: true },
  { wordEn: '777', wordRu: '888', result: false },
  { wordEn: '999', wordRu: '000', result: true },
  { wordEn: '111', wordRu: '222', result: true },
  { wordEn: '333', wordRu: '444', result: false },
  { wordEn: '555', wordRu: '666', result: true },
  { wordEn: '777', wordRu: '888', result: false },
  { wordEn: '999', wordRu: '000', result: true },
  { wordEn: '111', wordRu: '222', result: true },
  { wordEn: '333', wordRu: '444', result: false },
  { wordEn: '555', wordRu: '666', result: true },
  { wordEn: '777', wordRu: '888', result: false },
  { wordEn: '999', wordRu: '000', result: true },
  { wordEn: '111', wordRu: '222', result: true },
  { wordEn: '333', wordRu: '444', result: false },
  { wordEn: '555', wordRu: '666', result: true },
  { wordEn: '777', wordRu: '888', result: false },
  { wordEn: '999', wordRu: '000', result: true },
];

export function startSprint() {
  const container = document.querySelector('div.sprint-container');

  renderWindowGame('body');
  container?.classList.add('hidden');
}

export function completeTableWinners(target: HTMLElement, resultsSprint: SprintResult[]) {
  for (let i = 0; i < resultsSprint.length; i++) {
    renderColumnWinner(target, resultsSprint[i]);
  }
}
