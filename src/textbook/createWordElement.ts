import createElement from '../helpers/createElement';
import { UserWordInterface, WordInterface } from '../types/wordInterface';
import { getStore } from '../storage/index';
import requestMethods from '../services/requestMethods';
import constants from '../constants/index';

const request = requestMethods();
const { SERVER } = constants;

// добавление в список сложных слов
const addComplicatedWordListener = (element: HTMLButtonElement, wordId: string) => {
  element.addEventListener('click', (e) => {
    const user = getStore()!;
    const buttonState = (element.childNodes[1] as HTMLElement).innerHTML;
    if (!user.id) {
      console.log('Эта функция работает только для авторизированных пользователей');
      return;
    }
    if (buttonState === 'Удалить из сложное') {
      void request.deleteUserWord(user.id, wordId, user.token);
      element.innerHTML = '<span class="icon-pen"></span><span>Добавить в сложное</span>';
    } else {
      void request.createUserWord(user.id, wordId, 'complicated', user.token);
      element.innerHTML = '<span class="icon-pen"></span><span>Удалить из сложное</span>';
    }
  });
};
//

const wordExistInUserComplicatedList = (id: string, userWords: UserWordInterface[]): boolean => {
  return userWords.some((item: UserWordInterface) => item.wordId === id && item.difficulty === 'complicated');
};

const createComplicatedBtn = (word: WordInterface, existsInComplicated: boolean) => {
  let content: string;
  if (existsInComplicated) {
    content = '<span class="icon-pen"></span><span>Удалить из сложное</span>';
  } else {
    content = '<span class="icon-pen"></span><span>Добавить в сложное</span>';
  }

  const complicatedBtn = createElement('button', ['word__add-complicated'], content) as HTMLButtonElement;

  addComplicatedWordListener(complicatedBtn, word.id);
  return complicatedBtn;
};

const createLearnedBtn = (word: WordInterface, existsInLearned: boolean) => {
  const addToLearned = createElement(
    'button',
    ['word__add-learned'],
    '<span class="icon-box-with-check"></span><span>Изучено</span>'
  );
  return addToLearned;
};

const createWordElement = (word: WordInterface, userWords: UserWordInterface[]) => {
  const wordExistsInComplicatedList = wordExistInUserComplicatedList(word.id, userWords);
  const cardContainer = createElement('div', ['word']);
  cardContainer.dataset.id = word.id;
  const wordImage = createElement('img', ['word__image']) as HTMLImageElement;
  wordImage.src = `${SERVER}${word.image}`;
  const wordContentWrapper = createElement('div', ['word__content-wrapper']);
  const wordHeading = createElement('h3', ['word__heading'], word.word);
  const wordTranslateContainer = createElement('div', ['word__translate-container']);
  const wordTranslate = createElement('h4', ['word__translate'], `${word.wordTranslate} ${word.transcription}`);
  const wordAudio = createElement('button', ['icon-volume']);
  wordAudio.addEventListener('click', () => void new Audio(`${SERVER}${word.audio}`).play());
  const wordUsageContainerEn = createElement('div', ['word__usage-container-en']);
  const wordDefinitionEn = createElement('span', ['word__definition-en'], word.textMeaning);
  const wordExampleEn = createElement('div', ['word__example-en'], `<span>e.g.: ${word.textExample}</span>`);
  const wordUsageContainerRu = createElement('div', ['word__usage-container-ru']);
  const wordDefinitionRu = createElement('span', ['word__definition-ru'], word.textMeaningTranslate);
  const wordExampleRu = createElement('div', ['word__example-ru'], `<span>пр.: ${word.textExampleTranslate}</span>`);
  const buttonsContainer = createElement('div', ['word__buttons-container']);
  const complicatedBtn = createComplicatedBtn(word, wordExistsInComplicatedList);
  const learnedBtn = createLearnedBtn(word, wordExistsInComplicatedList); // поменять
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
