import createElement from '../helpers/createElement';
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

const renderTextBookNavPanel = () => {
  const navContainer = createElement('div', ['textbook__nav']);
  navContainer.innerHTML = `
  <div class="textbook__nav-wrapper">
      <select class="textbook-select" size="1">
       <span class="icon-book-1"></span>
       <option class="textbook-select-option" selected>Раздел 1</option>
       <option class="textbook-select-option">Раздел 2</option>
       <option class="textbook-select-option">Раздел 3</option>
       <option class="textbook-select-option">Раздел 4</option>
       <option class="textbook-select-option">Раздел 5</option>
       <option class="textbook-select-option">Раздел 6</option>
       <option class="textbook-select-option">Раздел 7</option>
     </select>
    <div class="textbook__page-changer">
     <button class="textbook__to-first-page"><span class="icon-to-first"></span></button>
      <button class="textbook__to-prev-page"><span class="icon-prev"></span></button>
      <span class="textbook__current-page">1</span>
      <button class="textbook__to-next-page"><span class="icon-next"></span></button>
      <button class="textbook__to-last-page"><span class="icon-to-last"></span></button>
   </div>
  </div>
  <div class="textbook__nav-wrapper">
    <div class="textbook__game-list">
      <button class="textbook__game-btn">
        <span class="icon-music-box"></span>
        <span class="textbook__game-name">Аудиовызов</span>
      </button>
      <button class="textbook__game-btn">
        <span class="icon-run-fast"></span>
        <span class="textbook__game-name">Спринт</span>
      </button>
    </div>
  </div>
  `;
  return navContainer;
};

const renderTextbookTemplate = () => {
  const textbookPage = createElement('div', ['textbook']);
  textbookPage.appendChild(renderTextbookHeading());
  const mainContentWrapper = createElement('div', ['textbook__content-wrapper']);
  mainContentWrapper.appendChild(renderTextBookNavPanel());
  const wordList = createElement('div', ['textbook__word-list']);
  mainContentWrapper.appendChild(wordList);
  textbookPage.appendChild(mainContentWrapper);
  body?.appendChild(textbookPage);
};

export default renderTextbookTemplate;
