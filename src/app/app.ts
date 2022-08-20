import { renderAuthorization } from '../../src/authorization/index';
import textbook from '../textbook/textbook';
import '../assets/styles/font-icons.scss';
import '../global.scss';
import { renderWindowStartGame } from '../sprint/renderStart';
import { renderWindowGame } from '../sprint/renderGame';
import { renderWindowGameResult } from '../sprint/renderGameResult';
import { resultsGameSprint, startTourSprint } from '../sprint/logic';

const app = () => {
  //void renderAuthorization('main'); // вызов окна авторизации
  //textbook();
  //renderWindowStartGame('body');
  //renderWindowGame('body');
  //renderWindowGameResult('body', resultsGameSprint);
  startTourSprint();
};

export default app;
