import createElement from '../helpers/createElement';
import { NavItem } from '../page/sidebar/sidebar';
import './games.scss';
import { setLocation } from '../routing/routing';

const gamesItems: NavItem[] = [
  {
    name: 'audio-call',
    icon: 'icon-music-box',
    title: 'Аудиовызов',
  },
  {
    name: 'sprint',
    icon: 'icon-run-fast',
    title: 'Спринт',
  },
];

export function gamesPage(root = '.content-wrapper') {
  const thisRoot: HTMLElement | null = document.querySelector(root);
  if (thisRoot) {
    thisRoot.innerHTML = '';
    const container = createElement('div', ['games-container']);
    const list = createElement('div', ['games-list']);

    gamesItems.forEach((e) => {
      const navText = `<i class="card-link__icon ${e.icon}"></i>
                              <h3 class="card-link__title">${e.title}</h3>`;
      const nav = createElement('div', ['card-link', 'card-link--lg'], navText);
      nav.onclick = () => setLocation(e.name);
      list.append(nav);
      switch (e.name) {
        //  добавить остальные страницы
        default:
          return;
      }
    });
    container.append(list);
    thisRoot.append(container);
  }
}
