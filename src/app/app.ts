import '../styles.scss';
import { routing } from '../routing/routing';

//должны быть последними
import '../assets/styles/preloader.scss';
import '../assets/styles/atom.scss';

const app = () => {
  if (localStorage.getItem('isDarkTheme')) document.body.classList.add('dark-theme');
  const pathname = window.location.pathname;
  routing(pathname);
};

export default app;
