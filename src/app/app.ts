import '../styles.scss';

//должны быть последними
import '../assets/styles/atom.scss';
import { pageRender } from '../page/page';
import { renderWindowStartGame } from '../sprint/renderStart';

const app = () => {
  //pageRender();
  renderWindowStartGame('body', 'audio-call-start-window');
};

export default app;
