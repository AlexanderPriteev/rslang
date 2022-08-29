import renderTextbookTemplate from './renderTextbookTemplate';
import pageSwitcher from './pageSwitcher';
import './textbook.scss';
import './word.scss';
import requestMethods from '../services/requestMethods';
import { clearUserStore, getStore } from '../storage';

const textbook = () => {
  const user = getStore();
  if (user)
    void requestMethods()
      .getAllUserWords(user.id, user.token)
      .then(() => {
        renderTextbookTemplate('.content-wrapper');
        pageSwitcher();
      })
      .catch(clearUserStore);
  else {
    renderTextbookTemplate('.content-wrapper');
    pageSwitcher();
  }
};

export default textbook;
