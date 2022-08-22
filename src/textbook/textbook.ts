import renderTextbookTemplate from './renderTextbookTemplate';
import pageSwitcher from './pageSwitcher';
import './textbook.scss';
import './word.scss';

const textbook = (root?: string) => {
  renderTextbookTemplate(root || '.content-wrapper');
  pageSwitcher();
};

export default textbook;
