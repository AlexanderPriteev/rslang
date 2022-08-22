import '../styles.scss';

//должны быть последними
import '../assets/styles/atom.scss';
import { renderWindowStartGame } from '../sprint/renderStart';

const app = () => {
  //pageRender();

  renderWindowStartGame('body');
  //renderWindowGame('body');
  //renderWindowGameResult('body', resultsGameSprint);
  //startTourSprint();
};

export default app;
