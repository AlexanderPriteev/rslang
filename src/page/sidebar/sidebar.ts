import createElement from '../../helpers/createElement';
import textbook from '../../textbook/textbook';
import { mainPage } from '../main/main-page';
import { gamesPage } from '../../games/games';
import { statisticsRender } from '../../staistics/statistics';
import {setLocation} from "../../routing/routing";

export interface NavItem {
  name: string;
  icon: string;
  title: string;
  link?: string;
}

export const navs: NavItem[] = [
  {
    name: 'index',
    icon: 'icon-building-home',
    title: 'Домой',
  },
  {
    name: 'book',
    icon: 'icon-book-close',
    title: 'Учебник',
  },
  {
    name: 'dictionary',
    icon: 'icon-dictionary',
    title: 'Словарь',
  },
  {
    name: 'games',
    icon: 'icon-game-handle',
    title: 'Игры',
  },
  {
    name: 'statistics',
    icon: 'icon-chart-column',
    title: 'Статистика',
  },
];
const about: NavItem = {
  name: 'statistics',
  icon: 'icon-info-square',
  title: 'О Нас',
  link: '#about',
};

function navLink(item: NavItem, isActive?: boolean) {
  const text = `<i class="nav-link__icon ${item.icon}"></i><span class="nav-link__title">${item.title}</span>`;
  const aboutLink = createElement('a', isActive ? ['nav-link', 'active'] : ['nav-link'], text);
  aboutLink.setAttribute('data-target', item.name);
  if (item.link) {
    aboutLink.setAttribute('href', item.link);
    aboutLink.onclick = () => mainPage();
  }
  return aboutLink;
}

function openSidebar() {
  const main = document.querySelector('main') as HTMLElement;
  main.classList.toggle('open');
}

export function sidebarRender(header?: HTMLElement, activeTabName?: string) {
  if (header) {
    const controlElement = createElement('i', ['header__collapse', 'icon-navigation']);
    controlElement.onclick = openSidebar;
    header.prepend(controlElement);
  }

  const sidebar = createElement('aside', ['sidebar']);
  const navList = createElement('nav', ['sidebar__nav']);
  navs.forEach((e) => {
    const nav = navLink(e, activeTabName === e.name);
    navList.append(nav);
    nav.onclick = () => setLocation(e.name);
  });

  const aboutLink = createElement('div', ['sidebar__link']);
  aboutLink.append(navLink(about));
  sidebar.append(navList, aboutLink);
  return sidebar;
}
