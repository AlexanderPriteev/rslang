import { currentContent } from '../dictionary/filterLogic';
import { startAudioCall } from '../games/logicGames/logicAudioCall';
import { getWordsByCategory, startSprint } from '../games/logicGames/logicSprint';
import { setLocation } from '../routing/routing';
import requestMethods from '../services/requestMethods';
import { getStore } from '../storage';
import { User } from '../types/User';
import { UserWordInterface, WordInterface } from '../types/wordInterface';

//получение ID слов 'learned'
async function getIdLearnedWords(learnedOrHard: boolean) {
  const user: User | undefined = getStore();

  if (user) {
    const userWord = (await requestMethods().getAllUserWords(user.id, user.token)) as UserWordInterface[];

    const arr: string[] = [];
    const arrHard = [];
    for (let i = 0; i < userWord.length; i++) {
      if (userWord[i].difficulty === 'learned') arr.push(userWord[i].wordId);
      if (userWord[i].difficulty === 'complicated') arrHard.push(userWord[i].wordId);
    }

    return learnedOrHard ? arr : arrHard;
  }

  return;
}

async function getWordsForGame(level: number, page: number) {
  const words = await getWordsByCategory(level, page);

  const wordsUserId = await getIdLearnedWords(true);

  if (wordsUserId && wordsUserId.length > 0) {
    return words.filter((word: WordInterface) => {
      const indexWord = wordsUserId.indexOf(word.id);
      return indexWord === -1;
    });
  } else {
    return words;
  }
}

async function getHardWords() {
  const userWords = await getIdLearnedWords(false);

  const complicatedWords = userWords?.map((id) => {
    const complicatedWord = requestMethods().getWordById(id);
    return complicatedWord;
  });

  return complicatedWords ? Promise.all(complicatedWords) : undefined;
}

async function startGame(sprintOrAudioCall: boolean) {
  const levelStr = (document.querySelector('select.textbook__select') as HTMLSelectElement).value;
  let wordsFromEnd: WordInterface[];

  if (levelStr === 'Сложные слова') {
    const hardWords = await getHardWords();
    wordsFromEnd = hardWords as WordInterface[];
  } else {
    const level = levelStr.slice(-1);
    const page = (document.querySelector('span.textbook__current-page') as HTMLElement).innerText;

    const words = await getWordsForGame(+level, +page);
    wordsFromEnd = words.reverse();
  }

  setLocation(sprintOrAudioCall ? 'sprint' : 'audio-call');
  const container = document.querySelector('.game-container') as HTMLElement;
  if (!container.classList.contains('game-preloader')) container.classList.add('game-preloader');

  if (sprintOrAudioCall) {
    await startSprint(wordsFromEnd);
  } else {
    await startAudioCall(wordsFromEnd);
  }
}

export function addListenerForStartGame() {
  const btnGameBook = document.querySelectorAll('div.textbook__game-list > *');

  btnGameBook[0].addEventListener('click', () => {
    void startGame(false);
  });

  btnGameBook[1].addEventListener('click', () => {
    void startGame(true);
  });
}

export async function startGameFromDictionary(sprintOrAudioCall: boolean) {
  if (currentContent.length < 1) return;

  if (sprintOrAudioCall) {
    setLocation('sprint');
    await startSprint(currentContent);
  } else {
    setLocation('audio-call');
    await startAudioCall(currentContent);
  }
}
