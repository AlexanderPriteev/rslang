import renderTextbookTemplate from './renderTextbookTemplate';
import pageSwitcher from './pageSwitcher';
import './textbook.scss';
import './word.scss';
import requestMethods from '../services/requestMethods';
import { clearUserStore, getStore } from '../storage';

<<<<<<< HEAD
const textbook = async () => {
  const user = getStore();
  if (user) await requestMethods().getAllUserWords(user.id, user.token).catch(clearUserStore);
  renderTextbookTemplate('.content-wrapper');
  pageSwitcher();
=======
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
>>>>>>> 50460971a0611c8cf0e7ae14d33809265aa1fba0
};

export default textbook;
