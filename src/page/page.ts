import createElement from '../helpers/createElement';
import { headerRender } from './header/header';
import { sidebarRender } from './sidebar/sidebar';
import { footerRender } from './footer/footer';
import { mainPage } from './main/main-page';

export function pageRender() {
  const body = document.body;
  const page = createElement('div', ['page-wrapper']);
  const main = createElement('main', ['main-section']);
  const content = createElement('div', ['content-wrapper']);
  const head = headerRender(true);
  const aside = sidebarRender(head);
  main.append(aside, content);
  page.append(head, main, footerRender());
  body.append(page);
  mainPage();
}
