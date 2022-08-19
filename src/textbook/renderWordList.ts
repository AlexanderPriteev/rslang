import requestMethods from '../services/requestMethods';
import { WordInterface } from '../types/wordInterface';
import createWordElement from './createWordElement';

const renderWordList = (wordList: WordInterface[]) => {
  const wordContainer = document.querySelector('.textbook__word-list') as NonNullable<HTMLElement>;
  wordContainer.innerHTML = '';
  for (let i = 0; i < wordList.length; i++) {
    const wordElem = createWordElement(wordList[i]);
    wordContainer?.appendChild(wordElem);
  }
};

export default renderWordList;
