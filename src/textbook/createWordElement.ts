import createElement from '../helpers/createElement';
import { UserWordInterface, WordInterface } from '../types/wordInterface';
import { clearUserStore, getStore } from '../storage/index';
import requestMethods from '../services/requestMethods';
import constants from '../constants/index';
import { DataForStatistic } from '../types/Statistic';
import { learnedPage, searchPathBook } from './pageSwitcher';
import { UserWordOptions } from '../types/UserWordOptions';

const request = requestMethods();
const { SERVER } = constants;
export let audio: HTMLAudioElement = new Audio();

export const newWordEmpty: UserWordOptions = {
  count: 0,
  longSeries: 0,
  audioCorrect: 0,
  audioError: 0,
  sprintCorrect: 0,
  sprintError: 0,
};

async function asyncComplicatedWord(element: HTMLButtonElement, wordId: string) {
  const parent = document.querySelector(`[data-id='${wordId}']`) as HTMLElement;
  const user = getStore();
  if (!user) return;

  const buttonState = (element.childNodes[1] as HTMLElement).innerHTML;
  if (buttonState === 'Удалить из сложное') {
    const addedWord = await request.getUserWordById(user.id, wordId, user.token);
    await request.updateUserWord(user.id, wordId, 'added', user.token, addedWord.optional || newWordEmpty);
    element.innerHTML = '<span class="icon-pen"></span><span>В сложное</span>';
    element.parentNode?.parentNode?.childNodes[1].childNodes[0].removeChild(
      element.parentNode?.parentNode?.childNodes[1].childNodes[0].childNodes[1]
    );

    if (searchPathBook().chapter === 6) {
      parent.remove();
    }
  } else {
    await request
      .getUserWordById(user.id, wordId, user.token)
      .then((e) => {
        void request.updateUserWord(user.id, wordId, 'complicated', user.token, e.optional);
      })
      .catch(() => {
        void request.createUserWord(user.id, wordId, 'complicated', user.token, newWordEmpty);
      });
    const userStatisticResponse = (await requestMethods()
      .getUserStatistic(user.id, user.token)
      .catch(clearUserStore)) as DataForStatistic;
    const userStatistic = userStatisticResponse.optional.statistics;
    userStatistic.today.added = (userStatistic.today.added || 0) + 1;
    await requestMethods().updateUserStatistic(user.id, '1', user.token, { statistics: userStatistic });
    const hasOtherBadge = parent.querySelector('.word__heading span');
    if (hasOtherBadge) hasOtherBadge.remove();
    element.innerHTML = '<span class="icon-pen"></span><span>Удалить из сложное</span>';
    element.parentNode?.parentNode?.childNodes[1].childNodes[0].appendChild(
      createElement('span', ['word__difficult'], 'СЛОЖНОЕ')
    );
  }
  learnedPage();
}
const addComplicatedWordListener = (element: HTMLButtonElement, wordId: string) => {
  element.addEventListener('click', () => {
    const parent = element.parentElement as HTMLElement;
    parent.classList.add('blocked');
    void asyncComplicatedWord(element, wordId).finally(() => parent.classList.remove('blocked'));
  });
};

async function asyncListenerWord(element: HTMLButtonElement, wordId: string) {
  const parent = document.querySelector(`[data-id='${wordId}']`) as HTMLElement;
  const user = getStore();
  if (!user) return;
  const userStatisticResponse = (await requestMethods().getUserStatistic(user.id, user.token)) as DataForStatistic;
  const userStatistic = userStatisticResponse.optional.statistics;
  if (searchPathBook().chapter === 6) {
    parent.remove();
    const addedWord = await request.getUserWordById(user.id, wordId, user.token);
    await request.updateUserWord(user.id, wordId, 'learned', user.token, addedWord);
  } else {
    await request
      .getUserWordById(user.id, wordId, user.token)
      .then((e) => {
        void request.updateUserWord(user.id, wordId, 'learned', user.token, e.optional);
      })
      .catch(() => {
        userStatistic.today.added = (userStatistic.today.added || 0) + 1;
        void request.createUserWord(user.id, wordId, 'learned', user.token, newWordEmpty);
      });
  }

  userStatistic.today.studied = (userStatistic.today.studied || 0) + 1;
  await requestMethods().updateUserStatistic(user.id, '1', user.token, { statistics: userStatistic });

  (element.parentNode as HTMLElement).classList.add('hide');
  const hasOtherBadge = parent.querySelector('.word__heading span');
  if (hasOtherBadge) hasOtherBadge.remove();
  element.parentNode?.parentNode?.childNodes[1].childNodes[0].appendChild(
    createElement('span', ['word__learned'], 'ИЗУЧЕНО')
  );
  learnedPage();
}
const addLearnedWordListener = (element: HTMLButtonElement, wordId: string) => {
  element.addEventListener('click', () => {
    const parent = element.parentElement as HTMLElement;
    parent.classList.add('blocked');
    void asyncListenerWord(element, wordId).finally(() => parent.classList.remove('blocked'));
  });
};

const wordExistInUserComplicatedList = (id: string, userWords: UserWordInterface[]): boolean => {
  return userWords.some((item: UserWordInterface) => item.wordId === id && item.difficulty === 'complicated');
};

const wordExistInUserLearnedList = (id: string, userWords: UserWordInterface[]): boolean => {
  return userWords.some((item: UserWordInterface) => item.wordId === id && item.difficulty === 'learned');
};

const wordExistInUserAddedList = (id: string, userWords: UserWordInterface[]): boolean => {
  return userWords.some((item: UserWordInterface) => item.wordId === id && item.difficulty === 'added');
};

const createComplicatedBtn = (word: WordInterface, existsInComplicated: boolean, containerHeading: HTMLElement) => {
  let content: string;
  if (existsInComplicated) {
    content = '<span class="icon-pen"></span><span>Удалить из сложное</span>';
    containerHeading.appendChild(createElement('span', ['word__difficult'], 'СЛОЖНОЕ'));
  } else {
    content = '<span class="icon-pen"></span><span>В сложное</span>';
  }

  const complicatedBtn = createElement('button', ['word__add-complicated'], content) as HTMLButtonElement;

  addComplicatedWordListener(complicatedBtn, word.id);
  return complicatedBtn;
};

const createLearnedBtn = (
  word: WordInterface,
  existsInLearned: boolean,
  containerHeading: HTMLElement,
  buttonsContainer: HTMLElement
) => {
  let content: string;
  if (existsInLearned) {
    content = '<span class="icon-pen"></span><span>В изученное</span>';
    containerHeading.appendChild(createElement('span', ['word__learned'], 'ИЗУЧЕНО'));
    buttonsContainer.classList.add('hide');
  } else {
    content = '<span class="icon-box-with-check"></span><span>В изученное</span>';
  }
  const learnedBtn = createElement('button', ['word__add-learned'], content) as HTMLButtonElement;

  addLearnedWordListener(learnedBtn, word.id);
  return learnedBtn;
};

const addAudioListener = (audioContainer: HTMLButtonElement, word: WordInterface) => {
  audioContainer.addEventListener('click', () => {
    let audioIndex = 0;
    audio.pause();
    const audioPathes = [word.audio, word.audioMeaning, word.audioExample];
    audio = new Audio(`${SERVER}${audioPathes[audioIndex]}`);
    audio.onended = function () {
      audioIndex += 1;
      if (audioIndex < 3) {
        audio.src = `${SERVER}${audioPathes[audioIndex]}`;
        void audio.play();
        return;
      }
    };
    void audio.play();
  });
};

const learnProgressItem = (correct: number, error: number, icon: string, id: string) => {
  const item = createElement('div', ['learn__item'], '', id);
  const name = createElement('i', ['learn__icon', icon]);
  const correctText = `<i class="learn__icon icon-check"></i>${correct}`;
  const errorText = `<i class="learn__icon icon-close"></i>${error}`;
  const correctData = createElement('div', ['learn__data', 'learn__data--correct'], correctText);
  const errorData = createElement('div', ['learn__data', 'learn__data--error'], errorText);
  item.append(name, correctData, errorData);
  return item;
};

export const learnProgress = (wordProgress: UserWordOptions) => {
  const container = createElement('div', ['learn']);
  const sprint = learnProgressItem(wordProgress.sprintCorrect, wordProgress.sprintError, 'icon-run-fast', 'sprint');
  const audioCall = learnProgressItem(
    wordProgress.audioCorrect,
    wordProgress.audioError,
    'icon-music-box',
    'audioCall'
  );
  container.append(sprint, audioCall);
  return container;
};

const wordOptions = async (word: WordInterface, head: HTMLElement, col: HTMLElement) => {
  const user = getStore();
  if (user) {
    const data = await request.getUserWordById(user.id, word.id, user.token);
    const optional = data.optional || newWordEmpty;
    if (optional.count) {
      if (optional.count === 1 && data.difficulty === 'added') {
        const newBadge = createElement('span', ['word__added'], 'NEW');
        head.append(newBadge);
      }
      col.append(learnProgress(optional));
    }
  }
};

const createWordElement = (word: WordInterface, userWords: UserWordInterface[]) => {
  const wordExistsInComplicatedList = wordExistInUserComplicatedList(word.id, userWords);
  const wordExistsInLearnedList = wordExistInUserLearnedList(word.id, userWords);
  const wordExistsInUserAddedList = wordExistInUserAddedList(word.id, userWords);

  const cardContainer = createElement('div', ['word']);
  cardContainer.dataset.id = word.id;

  const wordImageCol = createElement('div', ['word__image-column']);
  const wordImageWrapper = createElement('div', ['word__image-wrapper']);
  const wordImage = createElement('img', ['word__image']) as HTMLImageElement;
  wordImage.src = `${SERVER}${word.image}`;
  wordImageWrapper.append(wordImage);
  wordImageCol.append(wordImageWrapper);

  const wordContentWrapper = createElement('div', ['word__content-wrapper']);
  const wordHeading = createElement('h3', ['word__heading'], word.word);
  const wordTranslateContainer = createElement('div', ['word__translate-container']);
  const wordTranslate = createElement('h4', ['word__translate'], `${word.wordTranslate} ${word.transcription}`);
  const wordAudio = createElement('button', ['icon-volume', 'word__volume']) as HTMLButtonElement;
  addAudioListener(wordAudio, word);
  const wordUsageContainerEn = createElement('div', ['word__usage-container-en']);
  const wordDefinitionEn = createElement('span', ['word__definition-en'], word.textMeaning);
  const wordExampleEn = createElement('div', ['word__example-en'], `<span><b>e.g</b>.: ${word.textExample}</span>`);
  const wordUsageContainerRu = createElement('div', ['word__usage-container-ru']);
  const wordDefinitionRu = createElement('span', ['word__definition-ru'], word.textMeaningTranslate);
  const wordExampleRu = createElement(
    'div',
    ['word__example-ru'],
    `<span><b>пр.:</b> ${word.textExampleTranslate}</span>`
  );
  const buttonsContainer = createElement('div', ['word__buttons-container']);
  const complicatedBtn = createComplicatedBtn(word, wordExistsInComplicatedList, wordHeading);
  const learnedBtn = createLearnedBtn(word, wordExistsInLearnedList, wordHeading, buttonsContainer); // поменять

  if (wordExistsInUserAddedList || wordExistsInLearnedList || wordExistsInComplicatedList) {
    void wordOptions(word, wordHeading, wordImageCol);
  }

  cardContainer.appendChild(wordImageCol);
  cardContainer.appendChild(wordContentWrapper);
  if (getStore()) cardContainer.appendChild(buttonsContainer);
  wordContentWrapper.appendChild(wordHeading);
  wordContentWrapper.appendChild(wordTranslateContainer);
  wordTranslateContainer.appendChild(wordTranslate);
  wordTranslateContainer.appendChild(wordAudio);
  wordContentWrapper.appendChild(wordUsageContainerEn);
  wordUsageContainerEn.appendChild(wordDefinitionEn);
  wordUsageContainerEn.appendChild(wordExampleEn);
  wordContentWrapper.appendChild(wordUsageContainerRu);
  wordUsageContainerRu.appendChild(wordDefinitionRu);
  wordUsageContainerRu.appendChild(wordExampleRu);
  buttonsContainer.appendChild(learnedBtn);
  buttonsContainer.appendChild(complicatedBtn);
  return cardContainer;
};

export default createWordElement;
