import '../games.scss';
import { renderWindowGame } from '../renderGames/renderSprintGame';
import { SprintResult } from '../../types/index';
import { renderColumnWinner, renderWindowGameResult } from '../renderGames/renderGameResult';
import requestMethods from '../../services/requestMethods';
import constants from '../../constants/index';
import { getStoreGame, setStoreGame } from '../../storage/index';
import { WordInterface } from '../../types/wordInterface';
import { checkAudioCallAnswer, onSound } from './logicAudioCall';
const { SERVER } = constants;

export const resultsGameSprint: SprintResult[] = [];

let index = 0;

let wordsArray: WordInterface[] = [];

let seriesCorrectAnswers = 0;

let pointsForAnswer = 10;

//рандомно возвращает true or false - можно регулировать вероятность выпадания правильного слова если менять 0,5
function randomBoolean() {
  return Math.random() < 0.5;
}

//получить массив слов указанной категории со всех 30 страниц
export async function getWordsByCategory(level: number): Promise<WordInterface[]> {
  const promiseArray: Promise<WordInterface[]>[] = [];

  for (let i = 0; i < 30; i++) {
    promiseArray.push(requestMethods().getWords(level, i) as Promise<WordInterface[]>);
  }

  const words = (await Promise.all(promiseArray)).flat(1);

  return words;
}

export function checkSoundOff() {
  const btnImg = document.querySelector('div.sprint-sound > img') as HTMLImageElement;

  return btnImg.dataset.sound === 'on';
}

function endGame() {
  if (checkSoundOff()) void void new Audio(`../assets/sounds/sound-time-end.mp3`).play();
  const totalScore = (document.querySelector('div.quest-header__count-true') as HTMLElement).innerText;

  void renderWindowGameResult('body', resultsGameSprint, totalScore, 'spring-result-container', 'sprint');
  //document.querySelector('div.sprint-game-container')?.classList.add('hidden');
  document.querySelector('div.sprint-game-container')?.remove();
}

function createTimer() {
  //при закрытии окна остановить таймер
  let timer = 0;
  setTimeout(() => {
    endGame();
  }, 60000);

  const refreshId = setInterval(() => {
    timer = timer += 1;
    const timerElement = document.querySelector('#timer') as HTMLElement;
    if (timerElement) timerElement.innerText = timer < 10 ? '0' + timer.toString() : timer.toString();

    if (timer >= 60) {
      clearInterval(refreshId);
    }
  }, 1000);
}

function unActiveBtn(statusBtn: boolean) {
  const btnArray = document.querySelectorAll('div.sprint-quest__btn > *');
  (btnArray[0] as HTMLButtonElement).disabled = statusBtn ? false : true;
  (btnArray[1] as HTMLButtonElement).disabled = statusBtn ? false : true;
}

function writeQuest() {
  const wordEn: HTMLElement | null = document.querySelector('div.sprint-quest__en');
  const wordRu: HTMLElement | null = document.querySelector('div.sprint-quest__rus');

  if (!(wordEn && wordRu)) throw new Error('Do not HTML Element');

  unActiveBtn(true);

  if (randomBoolean()) {
    wordEn.innerText = wordsArray[index].word;
    wordRu.innerText = wordsArray[index].wordTranslate;
  } else {
    wordEn.innerText = wordsArray[index].word;
    const randomeIndex = Math.round(Math.random() * (wordsArray.length - 1));
    wordRu.innerText = wordsArray[randomeIndex].wordTranslate;
  }

  if (checkSoundOff()) void new Audio(`${SERVER}${wordsArray[index].audio}`).play();
}

//старт игры
export async function startSprint(levelOrWords: number | WordInterface[]) {
  wordsArray = typeof levelOrWords === 'number' ? await getWordsByCategory(levelOrWords) : levelOrWords;

  renderWindowGame('body');
  createTimer();

  writeQuest();

  const container = document.querySelector('div.game-container');
  container?.remove();
  //container?.classList.add('hidden');
}

function checkGameStorage(answer: boolean) {
  let gameStor = getStoreGame();
  if (!gameStor) gameStor = { trueAnswer: [0, 0], countNewWord: 0, seriesTrueAnswer: 0 };

  gameStor.trueAnswer = [gameStor.trueAnswer[0] + 1, gameStor.trueAnswer[1] + (answer ? 1 : 0)];

  if (answer) {
    seriesCorrectAnswers++;
    if (seriesCorrectAnswers > gameStor.seriesTrueAnswer) gameStor.seriesTrueAnswer = seriesCorrectAnswers;
  } else {
    seriesCorrectAnswers = 0;
  }

  if (index > gameStor.countNewWord) gameStor.countNewWord = index;

  setStoreGame(gameStor);
}

function calculateScore(answer: boolean) {
  const coefficient = document.querySelector('div.quest-header__coefficient') as HTMLElement;
  const status = document.querySelectorAll('div.quest-header__status > *');
  const score = document.querySelector('div.quest-header__count-true') as HTMLElement;

  if (!answer) {
    coefficient.innerText = 'X1';
    pointsForAnswer = 10;
    status.forEach((div) => {
      div.classList.remove('btn-status-active');
    });
  } else {
    score.innerText = (+score.innerText + pointsForAnswer).toString();

    for (let i = 0; i < 3; i++) {
      const div = status[i] as HTMLDivElement;

      if (!div.classList.contains('btn-status-active')) {
        div.classList.add('btn-status-active');
        break;
      }

      if (i === 2) {
        pointsForAnswer += 10;
        coefficient.innerText = `X${pointsForAnswer / 10}`;

        status.forEach((elem) => {
          elem.classList.remove('btn-status-active');
        });
      }
    }
  }
}

function checkAnswer(answer: boolean) {
  const word = wordsArray[index];
  const wordRu = (document.querySelector('div.sprint-quest__rus') as HTMLElement).innerText;

  if ((word.wordTranslate === wordRu && answer) || (word.wordTranslate !== wordRu && !answer)) {
    resultsGameSprint.push({
      wordEn: word.word,
      wordRu: word.wordTranslate,
      wordID: word.id,
      result: true,
      audio: word.audio,
    });
    calculateScore(true);
    if (checkSoundOff()) void new Audio(`../assets/sounds/sound-good.mp3`).play();
    checkGameStorage(true);
  } else {
    resultsGameSprint.push({
      wordEn: word.word,
      wordRu: word.wordTranslate,
      wordID: word.id,
      result: false,
      audio: word.audio,
    });
    calculateScore(false);
    if (checkSoundOff()) void new Audio(`../assets/sounds/sound-error.mp3`).play();
    checkGameStorage(false);
  }

  index++;
  setTimeout(() => writeQuest(), 1000);
}

export function completeTableWinners(target: HTMLElement, resultsSprint: SprintResult[]) {
  for (let i = 0; i < resultsSprint.length; i++) {
    renderColumnWinner(target, resultsSprint[i]);
  }
}

export function getResultString(resultPoints: string) {
  return `Ваш результат ${resultPoints} очков`;
}

function offSound() {
  const btnImg = document.querySelector('div.sprint-sound > img') as HTMLImageElement;

  btnImg.dataset.sound = btnImg.dataset.sound === 'on' ? 'off' : 'on';

  if (btnImg.dataset.sound === 'off') {
    btnImg.src = '../assets/images/sound-off.png';
  } else {
    btnImg.src = '../assets/images/sound.png';
  }
}

export function eventListener(classes: string) {
  const container = document.querySelector(classes);

  container?.addEventListener('click', (event) => {
    const classId = (event.target as HTMLElement).id;
    let timerOff = true;

    switch (classId) {
      case 'btn-sprint-false':
        checkAnswer(false);
        unActiveBtn(false);
        break;

      case 'btn-sprint-true':
        checkAnswer(true);
        unActiveBtn(false);
        break;

      case 'sprint-sound':
        offSound();
        break;

      case 'sprint-word-sound':
        void new Audio(`${SERVER}${wordsArray[index].audio}`).play();
        break;

      case 'call-sound':
        onSound();
        break;

      case 'btn-audio-call':
        if (timerOff) checkAudioCallAnswer(event.target as HTMLButtonElement);
        timerOff = false;
        setTimeout(() => {
          timerOff = true;
        }, 1000);
        break;

      default:
        break;
    }
  });
}

export function eventKeyUpSprint() {
  let timerOff = true;

  document.onkeyup = function (e) {
    switch (e.code) {
      case 'ArrowLeft':
        if (timerOff) {
          checkAnswer(false);
          unActiveBtn(false);
          timerOff = false;
          setTimeout(() => {
            timerOff = true;
          }, 1000);
        }
        break;

      case 'ArrowRight':
        if (timerOff) {
          checkAnswer(true);
          unActiveBtn(false);
          timerOff = false;
          setTimeout(() => {
            timerOff = true;
          }, 1000);
        }

        break;

      default:
        break;
    }
  };
}
