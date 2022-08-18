import createElement from '../helpers/createElement';
import requestMethods from '../services/requestMethods';
import * as textbookImage from '../assets/images/textbookHeadingBg.png';
import './textbook.scss';

const body = document.querySelector('body'); // заменить body на root элемент

const renderTextbookHeading = () => {
  const textbookHeadingContainer = createElement('div', ['textbook__heading-container']);
  const bgImageContainer = createElement('img', ['textbook__img-bg']) as HTMLImageElement;
  bgImageContainer.src = textbookImage.default as string;
  const textbookTextContainer = createElement('div', ['textbook__text-container']);
  const textbookHeading = createElement('span', ['textbook__heading'], 'УЧЕБНИК');
  const textbookChapter = createElement('span', ['textbook__chapter'], 'Раздел 1');
  textbookTextContainer.appendChild(textbookHeading);
  textbookTextContainer.appendChild(textbookChapter);
  textbookHeadingContainer.appendChild(bgImageContainer);
  textbookHeadingContainer.appendChild(textbookTextContainer);
  return textbookHeadingContainer;
};

const renderTextbookTemplate = () => {
  const textbookPage = createElement('div', ['textbook']);
  textbookPage.appendChild(renderTextbookHeading());
  body?.appendChild(textbookPage);
};

const textbook = () => {
  renderTextbookTemplate();
};

export default textbook;
