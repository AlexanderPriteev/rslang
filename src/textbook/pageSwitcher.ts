import requestMethods from '../services/requestMethods';
import { getStore } from '../storage/index';
import { TextbookSessionInterface } from '../types/sessionStorage';
import { UserWordInterface, WordInterface } from '../types/wordInterface';
import renderWordCard from './createWordElement';
import renderWordList from './renderWordList';
import * as chapter1BG from '../assets/images/chapter-1.png';
import * as chapter2BG from '../assets/images/chapter-2.png';
import * as chapter3BG from '../assets/images/chapter-3.png';
import * as chapter4BG from '../assets/images/chapter-4.png';
import * as chapter5BG from '../assets/images/chapter-5.png';
import * as chapter6BG from '../assets/images/chapter-6.png';
import * as chapterComplicatedBG from '../assets/images/chapter-complicated.png';

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
const savedPageStorage: TextbookSessionInterface = JSON.parse(sessionStorage.getItem('lastPage') || '{}');
let chapter = ~~savedPageStorage.chapter;
let page = ~~savedPageStorage.page;

const getNewContent = async () => {
  const user = getStore()!; // ???
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
  renderWordList(newContent, userWords, '.textbook__word-list');
};

const updatePageContent = () => {
  const pageNumber = document.querySelector('.textbook__current-page') as NonNullable<HTMLElement>;
  const chapterNumber = document.querySelector('.textbook__chapter') as NonNullable<HTMLElement>;
  const chapterSelects = document.querySelectorAll('.textbook__select-option');
  (chapterSelects[chapter] as HTMLOptionElement).selected = true;
  sessionStorage.setItem('lastPage', JSON.stringify({ chapter, page }));
  pageNumber.innerHTML = `${page + 1}`;
  chapterNumber.innerHTML = `${chapterNumber.innerHTML.slice(0, -1)}${chapter + 1}`;
  void getNewContent();
};

const addListeners = () => {
  const toFirstBtn = document.querySelector('.textbook__to-first-page');
  const toPrevBtn = document.querySelector('.textbook__to-prev-page');
  const toLastBtn = document.querySelector('.textbook__to-last-page');
  const toNextBtn = document.querySelector('.textbook__to-next-page');
  const chapterSelection = document.querySelector('.textbook__select');
  const chapterBg = document.querySelector('.textbook__img-bg') as HTMLImageElement;

  updatePageContent(); // инициализация слов при открытии страницы
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  chapterBg.src = chapterBackground[chapter].default; // инициализация картинки раздела

  toFirstBtn?.addEventListener('click', () => {
    page = 0;
    updatePageContent();
  });

  toPrevBtn?.addEventListener('click', () => {
    page = page > 0 ? page - 1 : 0;
    updatePageContent();
  });

  toNextBtn?.addEventListener('click', () => {
    page = page !== 29 ? page + 1 : 29;
    updatePageContent();
  });

  toLastBtn?.addEventListener('click', () => {
    page = 29;
    updatePageContent();
  });

  chapterSelection?.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    chapter = target.value === 'Сложные слова' ? 6 : +target.value.slice(-1) - 1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chapterBg.src = chapterBackground[chapter].default;
    page = 0;
    updatePageContent();
  });
};

const pageSwitcher = () => {
  addListeners();
};

export default pageSwitcher;
