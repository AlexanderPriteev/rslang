import createElement from '../helpers/createElement';
import * as dictionaryBg from '../assets/images/dictionary-bg.jpg';
import './dictionary.scss';
import {setLocation} from "../routing/routing";

const renderdictionaryHeading = () => {
  const dictionaryHeadingContainer = createElement('div', ['dictionary__heading-container']);
  const bgImageContainer = createElement('img', ['dictionary__img-bg']) as HTMLImageElement;
  bgImageContainer.src = dictionaryBg.default as string;
  const dictionaryTextContainer = createElement('div', ['dictionary__text-container']);
  const dictionaryHeading = createElement('span', ['dictionary__heading'], 'СЛОВАРЬ');
  dictionaryTextContainer.appendChild(dictionaryHeading);
  dictionaryHeadingContainer.appendChild(bgImageContainer);
  dictionaryHeadingContainer.appendChild(dictionaryTextContainer);
  return dictionaryHeadingContainer;
};

const renderdictionaryNavPanel = () => {
  const navContainer = createElement('div', ['dictionary__nav']);
  navContainer.innerHTML = `
<div class="dictionary__nav-wrapper">
  <div class="dictionary__search-wrapper">
    <input type="search" class="dictionary__search" placeholder="Поиск">
    <button class="dictionary__search-btn"><span class="icon-search"></span>Искать</button>
  </div>
  <div class="dictionary__game-list">
    <button class="dictionary__game-btn">
      <span class="icon-music-box dictionary__game-icon"></span>
      <span class="dictionary__game-name" id="audioCall">Аудиовызов</span>
    </button>
    <button class="dictionary__game-btn">
      <span class="icon-run-fast dictionary__game-icon"></span>
      <span class="dictionary__game-name" id="sprint">Спринт</span>
    </button>
  </div>
</div>
<div class="dictionary__nav-wrapper">
  <div class="dictionary__alphabet-search">
    <button class="dictionary__alphabet-btn normal alphabet-active">All</button>
    <button class="dictionary__alphabet-btn">A</button>
    <button class="dictionary__alphabet-btn">B</button>
    <button class="dictionary__alphabet-btn">C</button>
    <button class="dictionary__alphabet-btn">D</button>
    <button class="dictionary__alphabet-btn">E</button>
    <button class="dictionary__alphabet-btn">F</button>
    <button class="dictionary__alphabet-btn">G</button>
    <button class="dictionary__alphabet-btn">H</button>
    <button class="dictionary__alphabet-btn">I</button>
    <button class="dictionary__alphabet-btn">J</button>
    <button class="dictionary__alphabet-btn">K</button>
    <button class="dictionary__alphabet-btn">L</button>
    <button class="dictionary__alphabet-btn">M</button>
    <button class="dictionary__alphabet-btn">N</button>
    <button class="dictionary__alphabet-btn">O</button>
    <button class="dictionary__alphabet-btn">P</button>
    <button class="dictionary__alphabet-btn">Q</button>
    <button class="dictionary__alphabet-btn">R</button>
    <button class="dictionary__alphabet-btn">S</button>
    <button class="dictionary__alphabet-btn">T</button>
    <button class="dictionary__alphabet-btn">U</button>
    <button class="dictionary__alphabet-btn">V</button>
    <button class="dictionary__alphabet-btn">W</button>
    <button class="dictionary__alphabet-btn">X</button>
    <button class="dictionary__alphabet-btn">Y</button>
    <button class="dictionary__alphabet-btn">Z</button>
  </div>
  <div class="dictionary__page-changer">
    <button class="dictionary__to-first-page textbook__page"><span class="icon-to-first"></span></button>
    <button class="dictionary__to-prev-page textbook__page"><span class="icon-prev"></span></button>
    <span class="dictionary__current-page">1</span>
    <button class="dictionary__to-next-page textbook__page"><span class="icon-next"></span></button>
    <button class="dictionary__to-last-page textbook__page"><span class="icon-to-last"></span></button>
  </div>
</div>
  `;
  return navContainer;
};

const renderDictionaryTemplate = (root: string) => {
  const dictionaryPage = createElement('div', ['dictionary', 'preloader']);
  dictionaryPage.appendChild(renderdictionaryHeading());

  const mainContentWrapper = createElement('div', ['dictionary__content-wrapper']);
  mainContentWrapper.appendChild(renderdictionaryNavPanel());
  const sprint = mainContentWrapper.querySelector('#sprint') as HTMLFormElement
  const audioCall = mainContentWrapper.querySelector('#audioCall') as HTMLFormElement
  sprint.onclick = () => setLocation('sprint');
  audioCall.onclick = () => setLocation('audio-call');

  const wordList = createElement('div', ['dictionary__word-list']);
  mainContentWrapper.appendChild(wordList);
  dictionaryPage.appendChild(mainContentWrapper);



  const thisRoot: HTMLElement | null = document.querySelector(root);
  if (thisRoot) {
    thisRoot.innerHTML = '';
    thisRoot.appendChild(dictionaryPage);
  }
};

export default renderDictionaryTemplate;
