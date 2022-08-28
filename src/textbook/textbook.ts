import renderTextbookTemplate from './renderTextbookTemplate';
import pageSwitcher from './pageSwitcher';
import './textbook.scss';
import './word.scss';
import requestMethods from '../services/requestMethods';
import { clearUserStore, getStore } from '../storage';

const textbook = async () => {
  const user = getStore();
  if (user) await requestMethods().getAllUserWords(user.id, user.token).catch(clearUserStore);
  renderTextbookTemplate('.content-wrapper');
  pageSwitcher();
};

export default textbook;
