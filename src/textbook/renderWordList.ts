import { UserWordInterface, WordInterface } from '../types/wordInterface';
import createWordElement from './createWordElement';

const renderWordList = (wordList: WordInterface[], userWords: UserWordInterface[], parentClassName: string) => {
  const wordContainer = document.querySelector(parentClassName) as NonNullable<HTMLElement>;
  wordContainer.innerHTML = '';
  for (let i = 0; i < wordList.length; i++) {
    const wordElem = createWordElement(wordList[i], userWords);
    wordContainer?.appendChild(wordElem);
  }
};

export default renderWordList;
