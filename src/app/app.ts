import '../styles.scss';
import { routing } from '../routing/routing';

//должны быть последними
import '../assets/styles/atom.scss';

const app = () => {
  const pathname = window.location.pathname;
  routing(pathname);
};

export default app;
