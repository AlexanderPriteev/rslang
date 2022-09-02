import renderTextbookTemplate from './renderTextbookTemplate';
import pageSwitcher from './pageSwitcher';
import './textbook.scss';
import './word.scss';
import requestMethods from '../services/requestMethods';
import { clearUserStore, getStore } from '../storage';

const textbook = () => {
  const user = getStore();
    renderTextbookTemplate('.content-wrapper');
  if (user)
    void requestMethods()
      .getAllUserWords(user.id, user.token)
      .then(pageSwitcher)
      .catch(clearUserStore);
  else pageSwitcher();
};

export default textbook;
