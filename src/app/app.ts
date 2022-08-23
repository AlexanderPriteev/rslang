import '../styles.scss';
import {routing} from "../routing/routing";

//должны быть последними
import '../assets/styles/atom.scss';

const app = () => {
  routing(window.location.pathname)
};

export default app;
