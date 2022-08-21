import '../styles.scss';
import { pageRender } from '../page/page';

//должны быть последними
import '../assets/styles/atom.scss';

const app = () => {
  pageRender();
};

export default app;
