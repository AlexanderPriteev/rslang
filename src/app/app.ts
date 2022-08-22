import '../styles.scss';

//должны быть последними
import '../assets/styles/atom.scss';
import { pageRender } from '../page/page';

const app = () => {
  pageRender();
};

export default app;
