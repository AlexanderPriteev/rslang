import '../styles.scss';
import { pageRender } from '../page/page';

import {statisticsRender} from "../staistics/staistics";

//должны быть последними
import '../assets/styles/atom.scss';

const app = () => {
 // pageRender();
    statisticsRender()
};

export default app;
