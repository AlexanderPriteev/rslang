import renderDictionaryTemplate from './renderDictionaryTemplate';
// import pageSwitcher from './pageSwitcher';

const dictionary = (root?: string) => {
  renderDictionaryTemplate(root || '.content-wrapper');
};

export default dictionary;
