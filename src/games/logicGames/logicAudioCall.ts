import { WordInterface } from '../../types/wordInterface';
import { checkSoundOff, getWordsByCategory } from './logicSprint';
import { renderAudioCallGame } from '../renderGames/renderAudioCallGame';
import constants from '../../constants/index';
import { SprintResult } from '../../types';
import { renderWindowGameResult } from '../renderGames/renderGameResult';
const { SERVER, STATIC_WORDS } = constants;

let wordsArrayCall: WordInterface[] = [];

export const resultsGameAudioCall: SprintResult[] = [];

let ind = 0;

let numberErrorAnswer = 0;

export function onSound() {
  void new Audio(`${SERVER}${wordsArrayCall[ind].audio}`).play();
}

function unActiveBtn(statusBtn: boolean) {
  const btnArray = document.querySelectorAll('.btn-audio-call');
  btnArray.forEach((el) => {
    (el as HTMLButtonElement).disabled = statusBtn ? false : true;
  });
}

function getRandomeArr(numberTrueAnswer: number, lenghtArr = 6) {
  const arr: number[] = [];

  const randomeLimit = wordsArrayCall.length < 6 ? STATIC_WORDS.length - 1 : wordsArrayCall.length - 1;

  while (arr.length < lenghtArr) {
    const randomeNumber = Math.round(Math.random() * randomeLimit);

    if (wordsArrayCall.length === 6 && arr.length === 5) {
      arr.push(0);
    } else if (randomeNumber !== numberTrueAnswer && arr.indexOf(randomeNumber) === -1) {
      arr.push(randomeNumber);
    }
  }

  return arr;
}

function renderQuest() {
  onSound();

  const numberTrueAnswer = Math.round(Math.random() * 5);

  const randomeArray = getRandomeArr(ind);

  const buttons = document.querySelectorAll('div.audio-call-quest__btn > button');

  for (let i = 0; i < buttons.length; i++) {
    if (numberTrueAnswer === i) {
      (buttons[i] as HTMLButtonElement).innerHTML = `<span class="audio-call-quest__number"> ${i + 1}</span>
       <span class="audio-call-quest__value">${wordsArrayCall[ind].wordTranslate}</span>`;
    } else if (wordsArrayCall.length < 6) {
      const wordRu =
        wordsArrayCall[randomeArray[i]] === undefined
          ? STATIC_WORDS[randomeArray[i]]
          : wordsArrayCall[randomeArray[i]].wordTranslate;

      (buttons[i] as HTMLButtonElement).innerHTML = `<span class="audio-call-quest__number">${i + 1}</span>
      <span class="audio-call-quest__value">${wordRu}</span>`;
    } else {
      (buttons[i] as HTMLButtonElement).innerHTML = `<span class="audio-call-quest__number">${i + 1}</span>
      <span class="audio-call-quest__value">${wordsArrayCall[randomeArray[i]].wordTranslate}</span>`;
    }
  }

  unActiveBtn(true);
}

function resetSettings() {
  wordsArrayCall = [];
  resultsGameAudioCall.length = 0;
  ind = 0;
  numberErrorAnswer = 0;
}

//старт игры
export async function startAudioCall(levelOrWords: number | WordInterface[]) {
  const container = document.querySelector('.game-container') as HTMLElement;
  if (!container.classList.contains('game-preloader')) container.classList.add('game-preloader');

  resetSettings();

  wordsArrayCall = typeof levelOrWords === 'number' ? await getWordsByCategory(levelOrWords) : levelOrWords;

  renderAudioCallGame('body');
  renderQuest();

  container.classList.add('hidden');
  container.classList.remove('game-preloader');
}

function redrawNumberLives() {
  const lives = document.querySelectorAll('div.audio-call-quest__status > *');

  for (let i = 0; i < lives.length; i++) {
    if (!(numberErrorAnswer <= i)) {
      const heart = lives[i] as HTMLDivElement;
      if (!heart.classList.contains('outline')) heart.classList.add('outline');
    }
  }
}

function endGame() {
  const totalScore = resultsGameAudioCall.filter((el) => el.result).length * 10;
  void renderWindowGameResult(
    'body',
    resultsGameAudioCall,
    totalScore.toString(),
    'audio-call-result-container',
    'audio-call'
  );

  document.querySelector('div.audio-call-game-container')?.remove();
}

export function checkAudioCallAnswer(btn: HTMLButtonElement | string) {
  const button =
    typeof btn === 'string'
      ? document.querySelectorAll('.audio-call-quest__value')[+btn - 1]
      : (btn.querySelector('.audio-call-quest__value') as HTMLElement);

  const title = (button as HTMLElement).innerText.toLowerCase();
  const word = wordsArrayCall[ind];

  if (wordsArrayCall[ind].wordTranslate === title) {
    if (checkSoundOff()) void new Audio(`../assets/sounds/sound-good.mp3`).play();
    resultsGameAudioCall.push({
      wordEn: word.word,
      wordRu: word.wordTranslate,
      wordID: word.id,
      result: true,
      audio: word.audio,
    });
  } else {
    if (checkSoundOff()) void new Audio(`../assets/sounds/sound-error.mp3`).play();
    resultsGameAudioCall.push({
      wordEn: word.word,
      wordRu: word.wordTranslate,
      wordID: word.id,
      result: false,
      audio: word.audio,
    });
    numberErrorAnswer += 1;
    redrawNumberLives();
    if (numberErrorAnswer === 5) endGame();
  }

  setTimeout(() => {
    ind++;
    if (ind >= wordsArrayCall.length) {
      endGame();
    } else {
      renderQuest();
    }
  }, 1000);
}

export function eventKeyUpAudioCall() {
  let timerOff = true;

  document.onkeyup = function (e) {
    const numberBtn = e.code.slice(-1);

    switch (e.code) {
      case 'Digit1':
      case 'Numpad1':
      case 'Digit2':
      case 'Numpad2':
      case 'Digit3':
      case 'Numpad3':
      case 'Digit4':
      case 'Numpad4':
      case 'Digit5':
      case 'Numpad5':
      case 'Digit6':
      case 'Numpad6':
        if (timerOff) {
          checkAudioCallAnswer(numberBtn);
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
