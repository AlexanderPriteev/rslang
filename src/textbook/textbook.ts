import requestMethods from '../services/requestMethods';
import renderTextbookTemplate from './renderTextbookTemplate';
import pageSwitcher from './pageSwitcher';
import './textbook.scss';
import './word.scss';

const textbook = () => {
  renderTextbookTemplate();
  pageSwitcher();
};

export default textbook;
