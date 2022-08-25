import createElement from '../helpers/createElement';
import { UserWordInterface, WordInterface } from '../types/wordInterface';
import { getStore } from '../storage/index';
import requestMethods from '../services/requestMethods';
import constants from '../constants/index';
import {DataForStatistic} from "../types/Statistic";

const request = requestMethods();
const { SERVER } = constants;
let audio: HTMLAudioElement = new Audio();

// добавление в список сложных слов
const addComplicatedWordListener = (element: HTMLButtonElement, wordId: string) => {
  element.addEventListener('click', async (e) => {
    const user = getStore()!;
    if (!user) {
      console.log('не авторизирован');
      return;
    }
    const buttonState = (element.childNodes[1] as HTMLElement).innerHTML;
    if (buttonState === 'Удалить из сложное') {
      await request.deleteUserWord(user.id, wordId, user.token);
      element.innerHTML = '<span class="icon-pen"></span><span>Добавить в сложное</span>';
      element.parentNode?.parentNode?.childNodes[1].childNodes[0].removeChild(
        element.parentNode?.parentNode?.childNodes[1].childNodes[0].childNodes[1]
      );
    } else {
      await request.createUserWord(user.id, wordId, 'complicated', user.token);

      const userStatisticResponse = (await requestMethods().getUserStatistic(user.id,  user.token)) as DataForStatistic
      const userStatistic = userStatisticResponse.optional.statistics
      userStatistic.today.added = (userStatistic.today.added || 0)  + 1
      await requestMethods().updateUserStatistic(user.id, '1', user.token, {statistics: userStatistic});

      element.innerHTML = '<span class="icon-pen"></span><span>Удалить из сложное</span>';
      element.parentNode?.parentNode?.childNodes[1].childNodes[0].appendChild(
        createElement('span', ['word__difficult'], 'СЛОЖНОЕ')
      );
    }
  });
};

const addLearnedWordListener = (element: HTMLButtonElement, wordId: string) => {
  element.addEventListener('click', async (e) => {
    const user = getStore()!;
    if (!user) {
      console.log('не авторизирован');
      return;
    }
    void request.createUserWord(user.id, wordId, 'learned', user.token).catch(() => {
      void request.updateUserWord(user.id, wordId, 'learned', user.token);
      element.parentNode?.parentNode?.childNodes[1].childNodes[0].removeChild(
        element.parentNode?.parentNode?.childNodes[1].childNodes[0].childNodes[1]
      );
    });

    const userStatisticResponse = (await requestMethods().getUserStatistic(user.id,  user.token)) as DataForStatistic
    const userStatistic = userStatisticResponse.optional.statistics
    userStatistic.today.studied = (userStatistic.today.studied || 0)  + 1
    await requestMethods().updateUserStatistic(user.id, '1', user.token, {statistics: userStatistic});


    (element.parentNode as HTMLElement).classList.add('hide');
    element.parentNode?.parentNode?.childNodes[1].childNodes[0].appendChild(
      createElement('span', ['word__learned'], 'ИЗУЧЕНО')
    );
  });
};
//

const wordExistInUserComplicatedList = (id: string, userWords: UserWordInterface[]): boolean => {
  return userWords.some((item: UserWordInterface) => item.wordId === id && item.difficulty === 'complicated');
};

const wordExistInUserLearnedList = (id: string, userWords: UserWordInterface[]): boolean => {
  return userWords.some((item: UserWordInterface) => item.wordId === id && item.difficulty === 'learned');
};

const createComplicatedBtn = (word: WordInterface, existsInComplicated: boolean, containerHeading: HTMLElement) => {
  let content: string;
  if (existsInComplicated) {
    content = '<span class="icon-pen"></span><span>Удалить из сложное</span>';
    containerHeading.appendChild(createElement('span', ['word__difficult'], 'СЛОЖНОЕ'));
  } else {
    content = '<span class="icon-pen"></span><span>Добавить в сложное</span>';
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
    content = '<span class="icon-pen"></span><span>Изучено</span>';
    containerHeading.appendChild(createElement('span', ['word__learned'], 'ИЗУЧЕНО'));
    buttonsContainer.classList.add('hide');
  } else {
    content = '<span class="icon-box-with-check"></span><span>Изучено</span>';
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

const createWordElement = (word: WordInterface, userWords: UserWordInterface[]) => {
  const wordExistsInComplicatedList = wordExistInUserComplicatedList(word.id, userWords);
  const wordExistsInLearnedList = wordExistInUserLearnedList(word.id, userWords);
  const cardContainer = createElement('div', ['word']);
  cardContainer.dataset.id = word.id;
  const wordImage = createElement('img', ['word__image']) as HTMLImageElement;
  wordImage.src = `${SERVER}${word.image}`;
  const wordContentWrapper = createElement('div', ['word__content-wrapper']);
  const wordHeading = createElement('h3', ['word__heading'], word.word);
  const wordTranslateContainer = createElement('div', ['word__translate-container']);
  const wordTranslate = createElement('h4', ['word__translate'], `${word.wordTranslate} ${word.transcription}`);
  const wordAudio = createElement('button', ['icon-volume']) as HTMLButtonElement;
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
  cardContainer.appendChild(wordImage);
  cardContainer.appendChild(wordContentWrapper);
  cardContainer.appendChild(buttonsContainer);
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
