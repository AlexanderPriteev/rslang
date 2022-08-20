import './style.scss';
import { renderWindowGame } from './renderGame';
import { SprintResult } from '../types/index';
import { renderColumnWinner, renderWindowGameResult } from './renderGameResult';
import { Word } from '../types/Word';
import requestMethods from '../services/requestMethods';

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

export const countPoints = 200;

//старт игры (начало) - выбор уровня
export function startSprint() {
  const container = document.querySelector('div.sprint-container');

  renderWindowGame('body');
  container?.classList.add('hidden');
}

//получить массив слов указанной категории со всех 30 страниц
async function getWordsByCategory(level: number): Promise<Word[]> {
  const promiseArray: Promise<Word[]>[] = [];

  for (let i = 0; i < 5; i++) {
    promiseArray.push(requestMethods().getWords(level, i) as Promise<Word[]>);
  }

  const words = (await Promise.all(promiseArray)).flat(1);

  return words;
}

function endGame() {
  //закрыть окно игры
  renderWindowGameResult('body', resultsGameSprint);
}

function createTimer() {
  let timer = 0;
  setTimeout(() => {
    endGame();
  }, 60000);

  const refreshId = setInterval(() => {
    timer = timer += 1;
    const timerElement = document.querySelector('#timer') as HTMLElement;
    timerElement.innerText = timer < 10 ? '0' + timer.toString() : timer.toString();

    if (timer >= 60) {
      clearInterval(refreshId);
    }
  }, 1000);
}

//старт тура игры (после выбора уровня, или при переходе с учебника)
export function startTourSprint(words?: Word[]) {
  renderWindowGame('body');
  createTimer();
}

function renderQuest() {}

function checkAnswer() {}

export function completeTableWinners(target: HTMLElement, resultsSprint: SprintResult[]) {
  for (let i = 0; i < resultsSprint.length; i++) {
    renderColumnWinner(target, resultsSprint[i]);
  }
}

export function getResultString(resultPoints: number) {
  return `Ваш результат ${resultPoints} очков`;
}
