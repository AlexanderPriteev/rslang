import { renderAuthorization } from '../../src/authorization/index';
import textbook from '../textbook/textbook';
import '../assets/styles/font-icons.scss';
import '../global.scss';

const app = () => {
  void renderAuthorization('body'); // вызов окна авторизации
  //textbook();
};

export default app;
