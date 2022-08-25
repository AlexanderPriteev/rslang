import '../styles.scss';
import { routing } from '../routing/routing';

//должны быть последними
import '../assets/styles/atom.scss';

const app = () => {
  const pathname = window.location.pathname;
  const search = window.location.search;
  if (search) routing(pathname, search);
  else routing(pathname);
};

export default app;