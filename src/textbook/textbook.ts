import renderTextbookTemplate from './renderTextbookTemplate';
import pageSwitcher from './pageSwitcher';
import './textbook.scss';
import './word.scss';

const textbook = () => {
  renderTextbookTemplate('.content-wrapper');
  pageSwitcher();
};

export default textbook;
