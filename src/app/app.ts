import '../styles.scss';
import {currentRout, routing} from '../routing/routing';

//должны быть последними
import '../assets/styles/preloader.scss';
import '../assets/styles/atom.scss';

const app = () => {
  window.onhashchange = () => window.location.reload();
  if (localStorage.getItem('isDarkTheme')) document.body.classList.add('dark-theme');
  routing(currentRout());
};

export default app;
