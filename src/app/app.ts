import { renderAuthorization } from '../../src/authorization/index';
import textbook from '../textbook/textbook';
import '../assets/styles/font-icons.scss';
import '../global.scss';
import { renderWindowStartGame } from '../sprint/index';

const app = () => {
  //void renderAuthorization('main'); // вызов окна авторизации
  //textbook();
  renderWindowStartGame('body');
};

export default app;
