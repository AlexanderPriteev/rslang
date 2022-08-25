import renderDictionaryTemplate from './renderDictionaryTemplate';
import filterLogic from './filterLogic';
// import pageSwitcher from './pageSwitcher';

const dictionary = (root?: string) => {
  renderDictionaryTemplate(root || '.content-wrapper');
  void filterLogic(); // void???
};

export default dictionary;
