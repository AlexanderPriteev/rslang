import { WordInterface } from '../../types/wordInterface';
import { getWordsByCategory } from './logicSprint';
import { renderAudioCallGame } from '../renderGames/renderAudioCallGame';
import constants from '../../constants/index';
const { SERVER } = constants;

let wordsArrayCall: WordInterface[] = [];

const ind = 0;

export function onSound() {
  void new Audio(`${SERVER}${wordsArrayCall[ind].audio}`).play();
}

function getRandomeArr(lenghtArr = 6) {
  const arr: number[] = [];

  while (arr.length < lenghtArr) {
    const randomeNumber = Math.round(Math.random() * (wordsArrayCall.length - 1));

    if (arr.indexOf(randomeNumber) === -1) {
      arr.push(randomeNumber);
    }
  }

  return arr;
}

function renderQuest() {
  onSound();

  const numberTrueAnswer = Math.round(Math.random() * 6);

  const randomeArray = getRandomeArr();

  const buttons = document.querySelectorAll('div.audio-call-quest__btn > button');

  for (let i = 0; i < buttons.length; i++) {
    if (numberTrueAnswer === i) {
      (buttons[i] as HTMLButtonElement).innerText = `${i + 1}. ${wordsArrayCall[ind].wordTranslate}`;
    } else {
      (buttons[i] as HTMLButtonElement).innerText = `${i + 1}. ${wordsArrayCall[randomeArray[i]].wordTranslate}`;
    }
  }
}

//старт игры
export async function startAudioCall(levelOrWords: number | WordInterface[]) {
  wordsArrayCall = typeof levelOrWords === 'number' ? await getWordsByCategory(levelOrWords) : levelOrWords;

  renderAudioCallGame('body');
  renderQuest();

  const container = document.querySelector('div.game-container');
  container?.classList.add('hidden');
}

export function checkAudioAnswer(btn: HTMLButtonElement) {
  const title = btn.innerText.slice(3).toLowerCase();

  if (wordsArrayCall[ind].wordTranslate === title) alert('Верный ответ');
}
