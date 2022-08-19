import createElement from '../helpers/createElement';
import { WordInterface } from '../types/wordInterface';

const createWordElement = (word: WordInterface) => {
  console.log(word);
  const cardContainer = createElement('div', ['word']);
  cardContainer.dataset.id = word.id;
  const wordImage = createElement('img', ['word__image']) as HTMLImageElement;
  wordImage.src = `http://localhost:8001/${word.image}`; // заменить на сервер.
  const wordContentWrapper = createElement('div', ['word__content-wrapper']);
  const wordHeading = createElement('h3', ['word__heading'], word.word);
  const wordTranslateContainer = createElement('div', ['word__translate-container']);
  const wordTranslate = createElement('h4', ['word__translate'], `${word.wordTranslate} ${word.transcription}`);
  const wordAudio = createElement('button', ['icon-volume']);
  const wordUsageContainerEn = createElement('div', ['word__usage-container-en']);
  const wordDefinitionEn = createElement('span', ['word__definition-en'], word.textMeaning);
  const wordExampleEn = createElement('span', ['word__example-en'], word.textExample);
  const wordUsageContainerRu = createElement('div', ['word__usage-container-ru']);
  const wordDefinitionRu = createElement('span', ['word__definition-ru'], word.textMeaningTranslate);
  const wordExampleRu = createElement('span', ['word__example-ru'], word.textExampleTranslate);
  cardContainer.appendChild(wordImage);
  cardContainer.appendChild(wordContentWrapper);
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
  return cardContainer;
};

export default createWordElement;
