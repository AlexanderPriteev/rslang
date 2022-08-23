import renderTextbookTemplate from './renderTextbookTemplate';
import pageSwitcher from './pageSwitcher';
import './textbook.scss';
import './word.scss';

const textbook = (options?: string) => {
  if (options) console.log(options)
  renderTextbookTemplate('.content-wrapper');
  pageSwitcher();
};

export default textbook;
