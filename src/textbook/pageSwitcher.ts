import requestMethods from '../services/requestMethods';
import { getStore } from '../storage/index';
import { TextbookSessionInterface } from '../types/sessionStorage';
import { UserWordInterface, WordInterface } from '../types/wordInterface';
import renderWordList from './renderWordList';
import createElement from '../helpers/createElement';
import { addListenerForStartGame } from './startGame';
import {currentRout} from "../routing/routing";

const request = requestMethods();
const chapterBackground = [
  './assets/images/chapter-1.jpg',
  './assets/images/chapter-2.jpg',
  './assets/images/chapter-3.jpg',
  './assets/images/chapter-4.jpg',
  './assets/images/chapter-5.jpg',
  './assets/images/chapter-6.jpg',
  './assets/images/chapter-complicated.jpg',
];

export const searchPathBook = (): TextbookSessionInterface => {
  const search = window.location.href.replace(/^.*\?|$/, '').split('&').map((e) => +e.replace(/.*=/, ''));
  if (!search[0] || (search[0] === 7 && !getStore())) {
    return { chapter: 0, page: 0 };
  } else if (search.length === 1) {
    return { chapter: search[0] - 1, page: 0 };
  } else {
    return { chapter: search[0] - 1, page: search[1] - 1 };
  }
};

export const blockPageLink = (value: number, select = 'textbook', lastPage = 29) => {
  const toFirstBtn = document.querySelector(`.${select}__to-first-page`) as HTMLElement;
  const toPrevBtn = document.querySelector(`.${select}__to-prev-page`) as HTMLElement;
  const toLastBtn = document.querySelector(`.${select}__to-last-page`) as HTMLElement;
  const toNextBtn = document.querySelector(`.${select}__to-next-page`) as HTMLElement;
  [toFirstBtn, toPrevBtn, toLastBtn, toNextBtn].forEach((e) => {
    if (e.classList.contains('block')) e.classList.remove('block');
  });
  if (!value) {
    toFirstBtn.classList.add('block');
    toPrevBtn.classList.add('block');
  }
  if (value >= lastPage) {
    toLastBtn.classList.add('block');
    toNextBtn.classList.add('block');
  }
};

export const learnedPage = () => {
  const countLearned = document.querySelectorAll('.word__learned');
  const countDifficult = document.querySelectorAll('.word__difficult');
  const count = countLearned.length + countDifficult.length;
  const countPages = document.querySelectorAll('.word');
  const isDictionary = document.querySelector('.dictionary');
  const heroContent = isDictionary ? '.dictionary__text-container' : '.textbook__text-container';
  const gameListSelector = isDictionary ? '.dictionary__game-list' : '.textbook__game-list';
  const gameList = document.querySelector(gameListSelector) as HTMLElement;
  const subtitle = document.querySelector('.textbook__subtitle') as HTMLElement;
  if (countLearned.length === countPages.length) {
    if (!gameList.classList.contains('block')) gameList.classList.add('block');
  } else {
    if (gameList.classList.contains('block')) gameList.classList.remove('block');
  }

  if (count === countPages.length && countPages.length) {
    const pageNavContainer = isDictionary ? '.dictionary__current-page' : '.textbook__page-changer';
    const page = document.querySelector(pageNavContainer) as HTMLElement;
    const container = document.querySelector(heroContent) as HTMLElement;
    const text = `<span class="fs-md">СТРАНИЦА ${page.innerText}</span><br>
                  Все слова изучены или в сложном`;
    if (!subtitle) {
      const subtitleContainer = createElement('p', ['textbook__subtitle'], text);
      container.prepend(subtitleContainer);
    } else subtitle.innerHTML = text;
  } else {
    if (subtitle) subtitle.remove();
  }
};

const getNewContent = async () => {
  const { chapter, page } = searchPathBook();
  const user = getStore();
  const newContent = (await request.getWords(chapter, page)) as WordInterface[];
  let userWords: UserWordInterface[];
  if (!user) {
    userWords = [];
  } else {
    userWords = (await request.getAllUserWords(user.id, user.token)) as UserWordInterface[];
  }
  if (chapter === 6) {
    document.querySelector('.textbook__page-changer')?.classList.add('hide');
    const complicatedWords = userWords
        .filter((item) => item.difficulty === 'complicated')
        .map((item) => {
          const complicatedWord = request.getWordById(item.wordId);
          return complicatedWord;
        });
    const complicatedWordsDataAwait = Promise.all(complicatedWords);
    void complicatedWordsDataAwait.then((data) =>
        renderWordList(data as WordInterface[], userWords, '.textbook__word-list')
    );
    return;
  }
  document.querySelector('.textbook__page-changer')?.classList.remove('hide');
  blockPageLink(page);

  renderWordList(newContent, userWords, '.textbook__word-list');
  learnedPage();
  const preloader = document.querySelector('.preloader');
  if (preloader) preloader.classList.remove('preloader');
};

const updatePageContent = (chapter: number, page: number, blocked?: boolean) => {
  const pageNumber = document.querySelector('.textbook__current-page') as NonNullable<HTMLElement>;
  const chapterNumber = document.querySelector('.textbook__chapter') as NonNullable<HTMLElement>;
  const chapterSelects = document.querySelectorAll('.textbook__select-option');
  (chapterSelects[chapter] as HTMLOptionElement).selected = true;

  const searchPath = `?chapter=${chapter + 1}&page=${page + 1}`;
  const path = currentRout();
  window.history.pushState(null, '', `${path}${searchPath}`);

  pageNumber.innerHTML = `${page + 1}`;

  chapterNumber.innerHTML = chapter < 6 ? `Раздел ${chapter + 1}` : `Сложные слова`;

  if (blocked) {
    const pagination = document.querySelector('.textbook__page-changer') as HTMLElement;
    pagination.classList.add('locked');
    void getNewContent().finally(() => pagination.classList.remove('locked'));
  } else void getNewContent();
};

const addListeners = () => {
  let { chapter, page } = searchPathBook();
  const toFirstBtn = document.querySelector('.textbook__to-first-page') as HTMLElement;
  const toPrevBtn = document.querySelector('.textbook__to-prev-page') as HTMLElement;
  const toLastBtn = document.querySelector('.textbook__to-last-page') as HTMLElement;
  const toNextBtn = document.querySelector('.textbook__to-next-page') as HTMLElement;
  const chapterSelection = document.querySelector('.textbook__select') as HTMLElement;
  const chapterBg = document.querySelector('.textbook__img-bg') as HTMLImageElement;

  updatePageContent(chapter, page); // инициализация слов при открытии страницы
  chapterBg.src = chapterBackground[chapter]; // инициализация картинки раздела

  toFirstBtn?.addEventListener('click', () => {
    page = 0;
    blockPageLink(page);
    updatePageContent(chapter, page, true);
  });

  toPrevBtn?.addEventListener('click', () => {
    page = page > 0 ? page - 1 : 0;
    blockPageLink(page);
    updatePageContent(chapter, page, true);
  });

  toNextBtn?.addEventListener('click', () => {
    page = page !== 29 ? page + 1 : 29;
    blockPageLink(page);
    updatePageContent(chapter, page, true);
  });

  toLastBtn?.addEventListener('click', () => {
    page = 29;
    blockPageLink(page);
    updatePageContent(chapter, page, true);
  });

  chapterSelection?.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    chapter = target.value === 'Сложные слова' ? 6 : +target.value.slice(-1) - 1;
    chapterBg.src = chapterBackground[chapter];
    page = 0;
    updatePageContent(chapter, page);
  });

  addListenerForStartGame();
};

const pageSwitcher = () => {
  addListeners();
};

export default pageSwitcher;
