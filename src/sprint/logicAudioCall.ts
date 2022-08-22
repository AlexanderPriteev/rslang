import { WordInterface } from '../types/wordInterface';
import { getWordsByCategory } from './logicSprint';
import { renderAudioCallGame } from './renderAudioCallGame';

let wordsArrayCall: WordInterface[] = [];

//старт игры
export async function startAudioCall(levelOrWords: number | WordInterface[]) {
  wordsArrayCall = typeof levelOrWords === 'number' ? await getWordsByCategory(levelOrWords) : levelOrWords;

  renderAudioCallGame('body');
  // createTimer();

  // writeQuest();

  const container = document.querySelector('div.game-container');
  container?.classList.add('hidden');
}
