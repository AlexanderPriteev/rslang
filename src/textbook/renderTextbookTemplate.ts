import createElement from '../helpers/createElement';
import './textbook.scss';
import { getStore } from '../storage';

const chapter1BG = './assets/images/chapter-1.jpg';

const renderTextbookHeading = () => {
  const textbookHeadingContainer = createElement('div', ['textbook__heading-container']);
  const bgImageContainer = createElement('img', ['textbook__img-bg']) as HTMLImageElement;
  bgImageContainer.src = chapter1BG;
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
  const categoryDifficult = getStore() ? '<option class="textbook__select-option">Сложные слова</option>' : '';
  navContainer.innerHTML = `
  <div class="textbook__nav-wrapper">
      <select class="textbook__select" size="1">
       <option class="textbook__select-option" selected>Раздел 1</option>
       <option class="textbook__select-option">Раздел 2</option>
       <option class="textbook__select-option">Раздел 3</option>
       <option class="textbook__select-option">Раздел 4</option>
       <option class="textbook__select-option">Раздел 5</option>
       <option class="textbook__select-option">Раздел 6</option>
      ${categoryDifficult}
     </select>
    <div class="textbook__page-changer">
     <button class="textbook__to-first-page textbook__page"><span class="icon-to-first"></span></button>
      <button class="textbook__to-prev-page textbook__page"><span class="icon-prev"></span></button>
      <span class="textbook__current-page">1</span>
      <button class="textbook__to-next-page textbook__page"><span class="icon-next"></span></button>
      <button class="textbook__to-last-page textbook__page"><span class="icon-to-last"></span></button>
   </div>
  </div>
  <div class="textbook__nav-wrapper">
    <div class="textbook__game-list">
      <button class="textbook__game-btn">
        <span class="icon-music-box textbook__game-icon"></span>
        <span class="textbook__game-name">Аудиовызов</span>
      </button>
      <button class="textbook__game-btn">
        <span class="icon-run-fast textbook__game-icon"></span>
        <span class="textbook__game-name">Спринт</span>
      </button>
    </div>
  </div>
  `;
  return navContainer;
};

const renderTextbookTemplate = (root: string) => {
  const textbookPage = createElement('div', ['textbook']);
  textbookPage.appendChild(renderTextbookHeading());
  const mainContentWrapper = createElement('div', ['textbook__content-wrapper']);
  mainContentWrapper.appendChild(renderTextBookNavPanel());
  const wordList = createElement('div', ['textbook__word-list']);
  mainContentWrapper.appendChild(wordList);
  textbookPage.appendChild(mainContentWrapper);

  const thisRoot: HTMLElement | null = document.querySelector(root);
  if (thisRoot) {
    thisRoot.innerHTML = '';
    thisRoot.appendChild(textbookPage);
  }
};

export default renderTextbookTemplate;
