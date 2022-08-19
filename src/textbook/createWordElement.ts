import createElement from '../helpers/createElement';
import { WordInterface } from '../types/wordInterface';

const createWordElement = (word: WordInterface) => {
  const server = 'http://localhost:8001/'; // заменить потом на актуальный сервер.
  console.log(word);
  const cardContainer = createElement('div', ['word']);
  cardContainer.dataset.id = word.id;
  const wordImage = createElement('img', ['word__image']) as HTMLImageElement;
  wordImage.src = `${server}${word.image}`;
  const wordContentWrapper = createElement('div', ['word__content-wrapper']);
  const wordHeading = createElement('h3', ['word__heading'], word.word);
  const wordTranslateContainer = createElement('div', ['word__translate-container']);
  const wordTranslate = createElement('h4', ['word__translate'], `${word.wordTranslate} ${word.transcription}`);
  const wordAudio = createElement('button', ['icon-volume']);
  wordAudio.addEventListener('click', () => {
    const audio = new Audio(`${server}${word.audio}`);
    void audio.play();
  });
  const wordUsageContainerEn = createElement('div', ['word__usage-container-en']);
  const wordDefinitionEn = createElement('span', ['word__definition-en'], word.textMeaning);
  const wordExampleEn = createElement('div', ['word__example-en'], `<span>e.g.: ${word.textExample}</span>`);
  const wordUsageContainerRu = createElement('div', ['word__usage-container-ru']);
  const wordDefinitionRu = createElement('span', ['word__definition-ru'], word.textMeaningTranslate);
  const wordExampleRu = createElement('div', ['word__example-ru'], `<span>пр.: ${word.textExampleTranslate}</span>`);
  const buttonsContainer = createElement('div', ['word__buttons-container']);
  const addToComplicated = createElement(
    'button',
    ['word__add-complicated'],
    '<span class="icon-pen"></span> <span>Добавить в сложное</span>'
  );
  const addToLearned = createElement(
    'button',
    ['word__add-learned'],
    '<span class="icon-box-with-check"></span> <span>Изучено</span>'
  );
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
  buttonsContainer.appendChild(addToLearned);
  buttonsContainer.appendChild(addToComplicated);
  return cardContainer;
};

export default createWordElement;
