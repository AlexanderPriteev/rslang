import getFullListOfWords from './getFullListOfWords';
import renderWordList from '../textbook/renderWordList';
import requestMethods from '../services/requestMethods';
import { getStore } from '../storage';
import { UserWordInterface, WordInterface } from '../types/wordInterface';

// const initPage = async (listOfWords: WordInterface[]) => {
//   const sorted = listOfWords.filter((item) => item.word[0].toLowerCase() === 'a');
//   renderWordList(sorted, userWord, '.dictionary__word-list');
// };

let totalCountOfPages: number;
let currentPage = 0;
let currentContent: WordInterface[];

const getNewContent = async (content: WordInterface[]) => {
  const pageNumber = document.querySelector('.dictionary__current-page') as NonNullable<HTMLElement>;
  const user = getStore()!; // ???
  let userWords: UserWordInterface[];
  if (!user) {
    userWords = [];
  } else {
    userWords = (await requestMethods().getAllUserWords(user.id, user.token)) as UserWordInterface[];
  }
  pageNumber.innerHTML = `${currentPage + 1}`;
  renderWordList(content.slice(currentPage * 20, (currentPage + 1) * 20), userWords, '.dictionary__word-list');
};

const addListeners = (listOfWords: WordInterface[]) => {
  const alphabetBtns = document.querySelectorAll('.dictionary__alphabet-btn');
  const searchBtn = document.querySelector('.dictionary__search-btn') as HTMLButtonElement;
  const searchInput = document.querySelector('.dictionary__search') as HTMLInputElement;

  alphabetBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
      searchInput.value = '';
      (document.querySelector('.dictionary__word-list') as NonNullable<HTMLElement>).innerHTML = '';
      const target = e.target as HTMLButtonElement;
      const filteredWords = listOfWords.filter((wordItem) => wordItem.word[0].toUpperCase() === target.innerHTML);
      alphabetBtns.forEach((btn) => {
        if (btn.innerHTML === target.innerHTML) {
          btn.classList.add('alphabet-active');
        } else {
          btn.classList.remove('alphabet-active');
        }
      });
      totalCountOfPages = Math.floor(filteredWords.length / 20);
      currentPage = 0;
      currentContent = filteredWords;
      void getNewContent(currentContent);
    });
  });

  searchBtn.addEventListener('click', () => {
    const filteredWords = listOfWords.filter(
      (item) => item.word.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1
    );
    alphabetBtns.forEach((btn) => btn.classList.remove('alphabet-active'));
    searchInput.value = '';
    totalCountOfPages = Math.floor(filteredWords.length / 20);
    currentPage = 0;
    currentContent = filteredWords;
    void getNewContent(currentContent);
  });

  const toFirstBtn = document.querySelector('.dictionary__to-first-page');
  const toPrevBtn = document.querySelector('.dictionary__to-prev-page');
  const toLastBtn = document.querySelector('.dictionary__to-last-page');
  const toNextBtn = document.querySelector('.dictionary__to-next-page');

  toFirstBtn?.addEventListener('click', () => {
    currentPage = 0;
    void getNewContent(currentContent);
  });

  toPrevBtn?.addEventListener('click', () => {
    currentPage = currentPage > 0 ? currentPage - 1 : 0;
    void getNewContent(currentContent);
  });

  toNextBtn?.addEventListener('click', () => {
    currentPage = currentPage !== totalCountOfPages ? currentPage + 1 : totalCountOfPages;
    void getNewContent(currentContent);
  });

  toLastBtn?.addEventListener('click', () => {
    currentPage = totalCountOfPages;
    void getNewContent(currentContent);
  });
};

const filterLogic = async () => {
  const listOfWords = await getFullListOfWords();
  addListeners(listOfWords);
  (document.querySelector('.dictionary__alphabet-btn') as NonNullable<HTMLButtonElement>).click();
};

export default filterLogic;
