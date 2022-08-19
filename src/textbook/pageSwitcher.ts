import requestMethods from '../services/requestMethods';
import { WordInterface } from '../types/wordInterface';
import renderWordCard from './createWordElement';
import renderWordList from './renderWordList';

const request = requestMethods();

let chapter = 0;
let page = 0;

const getNewContent = async () => {
  const newContent = (await request.getWords(chapter, page)) as WordInterface[];
  renderWordList(newContent);
};

void getNewContent(); // инициализация слов при открытии страницы

const addListeners = () => {
  const pageNumber = document.querySelector('.textbook__current-page') as NonNullable<HTMLElement>;
  const toFirstBtn = document.querySelector('.textbook__to-first-page');
  const toPrevBtn = document.querySelector('.textbook__to-prev-page');
  const toLastBtn = document.querySelector('.textbook__to-last-page');
  const toNextBtn = document.querySelector('.textbook__to-next-page');
  const chapterSelection = document.querySelector('.textbook-select');

  toFirstBtn?.addEventListener('click', () => {
    page = 0;
    pageNumber.innerHTML = `${page + 1}`;
    void getNewContent();
  });

  toPrevBtn?.addEventListener('click', () => {
    page = page > 0 ? page - 1 : 0;
    pageNumber.innerHTML = `${page + 1}`;
    void getNewContent();
  });

  toNextBtn?.addEventListener('click', () => {
    page = page !== 29 ? page + 1 : 29;
    pageNumber.innerHTML = `${page + 1}`;
    void getNewContent();
  });

  toLastBtn?.addEventListener('click', () => {
    page = 29;
    pageNumber.innerHTML = `${page + 1}`;
    void getNewContent();
  });

  chapterSelection?.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    chapter = +target.value.slice(-1) - 1;
    page = 0;
    pageNumber.innerHTML = `${page + 1}`;
    void getNewContent();
  });
};

const pageSwitcher = () => {
  addListeners();
};

export default pageSwitcher;
