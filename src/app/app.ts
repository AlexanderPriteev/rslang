import { renderAuthorization } from '../../src/authorization/index';
import textbook from '../textbook/textbook';

import '../global.scss';

const app = () => {
  void renderAuthorization('body'); // вызов окна авторизации
  //textbook();
};

export default app;
