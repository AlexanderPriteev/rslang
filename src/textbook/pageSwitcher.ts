import requestMethods from '../services/requestMethods';
import { TextbookSessionInterface } from '../types/sessionStorage';
import { WordInterface } from '../types/wordInterface';
import renderWordCard from './createWordElement';
import renderWordList from './renderWordList';

const request = requestMethods();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const savedPageStorage: TextbookSessionInterface = JSON.parse(sessionStorage.getItem('lastPage') || '{}');
let chapter = ~~savedPageStorage.chapter;
let page = ~~savedPageStorage.page;

const getNewContent = async () => {
  const newContent = (await request.getWords(chapter, page)) as WordInterface[];
  renderWordList(newContent);
};

const updatePageContent = () => {
  const pageNumber = document.querySelector('.textbook__current-page') as NonNullable<HTMLElement>;
  const chapterNumber = document.querySelector('.textbook__chapter') as NonNullable<HTMLElement>;
  const chapterSelects = document.querySelectorAll('.textbook-select-option');
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
  const chapterSelection = document.querySelector('.textbook-select');

  updatePageContent(); // инициализация слов при открытии страницы

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
    page = 0;
    updatePageContent();
  });
};

const pageSwitcher = () => {
  addListeners();
};

export default pageSwitcher;
