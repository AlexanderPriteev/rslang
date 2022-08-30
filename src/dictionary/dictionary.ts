import renderDictionaryTemplate from './renderDictionaryTemplate';
import filterLogic from './filterLogic';
import {clearUserStore, getStore} from "../storage";
import requestMethods from "../services/requestMethods";

const dictionary = (root?: string) => {
  renderDictionaryTemplate(root || '.content-wrapper');
  const user = getStore();
  if (user)
    void requestMethods().getAllUserWords(user.id, user.token).then(filterLogic).catch(clearUserStore);
  else void filterLogic()
};

export default dictionary;
