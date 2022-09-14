import getFullListOfWords from './getFullListOfWords';
import renderWordList from '../textbook/renderWordList';
import requestMethods from '../services/requestMethods';
import { getStore } from '../storage';
import { UserWordInterface, WordInterface } from '../types/wordInterface';
import { blockPageLink, learnedPage } from '../textbook/pageSwitcher';
import { DictionarySessionInterface } from '../types/sessionStorage';
import {currentRout} from "../routing/routing";
import {audio} from "../textbook/createWordElement";

const dictionaryCategory = [
  'all',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

let totalCountOfPages: number;
export let currentContent: WordInterface[];

export const searchPathDictionary = (): DictionarySessionInterface => {
  const search = window.location.href.replace(/^.*\?|$/, '').split('&').map((e) => e.replace(/.*=/, ''));
  if (search.length) {
    if (dictionaryCategory.some((e) => e === search[0])) {
      if (search.length === 1) return { chapter: search[0], page: 0 };
      return { chapter: search[0], page: +search[1] - 1 };
    }
  }

  return { chapter: 'all', page: 0 };
};

const getNewContent = async (content: WordInterface[], chapter: string, currentPage: number) => {
  const pageNumber = document.querySelector('.dictionary__current-page') as NonNullable<HTMLElement>;
  const user = getStore();

  audio?.pause();
  let userWords: UserWordInterface[];
  if (!user) {
    userWords = [];
  } else {
    userWords = (await requestMethods().getAllUserWords(user.id, user.token)) as UserWordInterface[];
  }
  const searchPath = `?chapter=${chapter.toLowerCase()}&page=${currentPage + 1}`;
  const path = currentRout();
  window.history.pushState(null, '', `${path}${searchPath}`);

  pageNumber.innerHTML = `${currentPage + 1}`;
  renderWordList(content.slice(currentPage * 20, (currentPage + 1) * 20), userWords, '.dictionary__word-list');
  learnedPage();
};

const contentFilter = (listOfWords: WordInterface[], chapter: string, currentPage: number) => {
  const alphabetBtns = document.querySelectorAll('.dictionary__alphabet-btn');
  (document.querySelector('.dictionary__word-list') as NonNullable<HTMLElement>).innerHTML = '';
  let filteredWords = [...listOfWords];
  const currentChapter = chapter.toUpperCase();
  if (currentChapter !== 'ALL') {
    filteredWords = filteredWords.filter((e) => e.word[0].toUpperCase() === currentChapter);
  }
  alphabetBtns.forEach((btn) => {
    if (btn.innerHTML.toUpperCase() === currentChapter) {
      btn.classList.add('alphabet-active');
    } else {
      btn.classList.remove('alphabet-active');
    }
  });
  totalCountOfPages = Math.floor((filteredWords.length - 1) / 20);
  blockPageLink(currentPage, 'dictionary', totalCountOfPages);
  currentContent = filteredWords;
  void getNewContent(currentContent, chapter, currentPage).finally(learnedPage);
};

const addListeners = (listOfWords: WordInterface[]) => {
  const alphabetBtns = document.querySelectorAll('.dictionary__alphabet-btn');
  const searchBtn = document.querySelector('.dictionary__search-btn') as HTMLButtonElement;
  const searchInput = document.querySelector('.dictionary__search') as HTMLInputElement;

  alphabetBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
      searchInput.value = '';
      const target = e.target as HTMLButtonElement;
      const targetText = target.innerHTML;
      contentFilter(listOfWords, targetText, 0);
    });
  });

  searchBtn.addEventListener('click', () => {
    const filteredWords = listOfWords.filter(
        (item) => item.word.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1
    );
    alphabetBtns.forEach((btn) => btn.classList.remove('alphabet-active'));
    searchInput.value = '';
    totalCountOfPages = Math.floor(filteredWords.length / 20);
    blockPageLink(0, 'dictionary', totalCountOfPages);
    currentContent = filteredWords;
    void getNewContent(currentContent, 'all', 0);
  });

  const toFirstBtn = document.querySelector('.dictionary__to-first-page');
  const toPrevBtn = document.querySelector('.dictionary__to-prev-page');
  const toLastBtn = document.querySelector('.dictionary__to-last-page');
  const toNextBtn = document.querySelector('.dictionary__to-next-page');

  toFirstBtn?.addEventListener('click', () => {
    blockPageLink(0, 'dictionary');
    void getNewContent(currentContent, searchPathDictionary().chapter, 0);
  });

  toPrevBtn?.addEventListener('click', () => {
    let currentPage = searchPathDictionary().page;
    currentPage = currentPage > 0 ? currentPage - 1 : 0;
    blockPageLink(currentPage, 'dictionary');
    void getNewContent(currentContent, searchPathDictionary().chapter, currentPage);
  });

  toNextBtn?.addEventListener('click', () => {
    let currentPage = searchPathDictionary().page;
    currentPage = currentPage !== totalCountOfPages ? currentPage + 1 : totalCountOfPages;
    blockPageLink(currentPage, 'dictionary', totalCountOfPages);
    void getNewContent(currentContent, searchPathDictionary().chapter, currentPage);
  });

  toLastBtn?.addEventListener('click', () => {
    blockPageLink(totalCountOfPages, 'dictionary', totalCountOfPages);
    void getNewContent(currentContent, searchPathDictionary().chapter, totalCountOfPages);
  });
};

const filterLogic = async () => {
  const listOfWords = await getFullListOfWords().finally(() => {
    const page = document.querySelector('.dictionary') as HTMLFormElement;
    if (page.classList.contains('preloader')) page.classList.remove('preloader');
  });
  const category = searchPathDictionary().chapter;
  const page = searchPathDictionary().page;
  addListeners(listOfWords);
  contentFilter(listOfWords, category, page);
};

export default filterLogic;
