import createElement from '../../helpers/createElement';
import { headerRender } from '../header/header';
import { footerRender } from '../footer/footer';
import { pageBaseMarkup } from '../page';

import './not-found.scss';

export function notFoundRender() {
  const page = pageBaseMarkup();
  const title = '<h1 class="not-found__title">ИЗВИНИТЕ, СТРАНИЦА НЕ НАЙДЕНА</h1>';
  const notFound = createElement('div', ['not-found'], title);
  const head = headerRender(true);
  page.append(head, notFound, footerRender());
}
