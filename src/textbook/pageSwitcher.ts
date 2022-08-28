import requestMethods from '../services/requestMethods';
import { getStore } from '../storage/index';
import { TextbookSessionInterface } from '../types/sessionStorage';
import { UserWordInterface, WordInterface } from '../types/wordInterface';
import renderWordList from './renderWordList';
import * as chapter1BG from '../assets/images/chapter-1.png';
import * as chapter2BG from '../assets/images/chapter-2.png';
import * as chapter3BG from '../assets/images/chapter-3.png';
import * as chapter4BG from '../assets/images/chapter-4.png';
import * as chapter5BG from '../assets/images/chapter-5.png';
import * as chapter6BG from '../assets/images/chapter-6.png';
import * as chapterComplicatedBG from '../assets/images/chapter-complicated.png';
import createElement from '../helpers/createElement';

const request = requestMethods();
const chapterBackground = [
  chapter1BG,
  chapter2BG,
  chapter3BG,
  chapter4BG,
  chapter5BG,
  chapter6BG,
  chapterComplicatedBG,
];
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

export const searchPathBook = (): TextbookSessionInterface => {
  const search = window.location.search.split('&').map((e) => +e.replace(/.*=/, ''));
  if (!search[0] || (search[0] === 7 && !getStore())) {
    return { chapter: 0, page: 0 };
  } else if (search.length === 1) {
    return { chapter: search[0] - 1, page: 0 };
  } else {
    return { chapter: search[0] - 1, page: search[1] - 1 };
  }
};

const blockPageLink = (value: number) => {
  const toFirstBtn = document.querySelector('.textbook__to-first-page') as HTMLElement;
  const toPrevBtn = document.querySelector('.textbook__to-prev-page') as HTMLElement;
  const toLastBtn = document.querySelector('.textbook__to-last-page') as HTMLElement;
  const toNextBtn = document.querySelector('.textbook__to-next-page') as HTMLElement;
  [toFirstBtn, toPrevBtn, toLastBtn, toNextBtn].forEach((e) => {
    if (e.classList.contains('block')) e.classList.remove('block');
  });
  if (!value) {
    toFirstBtn.classList.add('block');
    toPrevBtn.classList.add('block');
  }
  if (value === 29) {
    toLastBtn.classList.add('block');
    toNextBtn.classList.add('block');
  }
};

export const learnedPage = () => {
  const count = document.querySelectorAll('.word__learned, .word__difficult');
  if (count.length === 20) {
    const page = searchPathBook().page;
    const container = document.querySelector('.textbook__text-container') as HTMLElement;
    const text = `СТРАНИЦА ${page} - Все слова изучены`;
    const subtitle = createElement('p', ['textbook__subtitle'], text);
    container.prepend(subtitle);
  } else {
    const subtitle = document.querySelector('.textbook__subtitle');
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
};

const updatePageContent = (chapter: number, page: number) => {
  const pageNumber = document.querySelector('.textbook__current-page') as NonNullable<HTMLElement>;
  const chapterNumber = document.querySelector('.textbook__chapter') as NonNullable<HTMLElement>;
  const chapterSelects = document.querySelectorAll('.textbook__select-option');
  (chapterSelects[chapter] as HTMLOptionElement).selected = true;

  const searchPath = `?chapter=${chapter + 1}&page=${page + 1}`;
  const path = window.location.pathname;
  window.history.pushState(null, '', `${path}${searchPath}`);

  pageNumber.innerHTML = `${page + 1}`;

  chapterNumber.innerHTML = chapter < 6 ? `Раздел ${chapter + 1}` : `Сложные слова`;
  void getNewContent();
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  chapterBg.src = chapterBackground[chapter].default; // инициализация картинки раздела

  toFirstBtn?.addEventListener('click', () => {
    page = 0;
    blockPageLink(page);
    updatePageContent(chapter, page);
  });

  toPrevBtn?.addEventListener('click', () => {
    page = page > 0 ? page - 1 : 0;
    blockPageLink(page);
    updatePageContent(chapter, page);
  });

  toNextBtn?.addEventListener('click', () => {
    page = page !== 29 ? page + 1 : 29;
    blockPageLink(page);
    updatePageContent(chapter, page);
  });

  toLastBtn?.addEventListener('click', () => {
    page = 29;
    blockPageLink(page);
    updatePageContent(chapter, page);
  });

  chapterSelection?.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    chapter = target.value === 'Сложные слова' ? 6 : +target.value.slice(-1) - 1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chapterBg.src = chapterBackground[chapter].default;
    page = 0;
    updatePageContent(chapter, page);
  });
};

const pageSwitcher = () => {
  addListeners();
};

export default pageSwitcher;
