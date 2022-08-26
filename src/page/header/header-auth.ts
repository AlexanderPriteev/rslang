import createElement from '../../helpers/createElement';
import { renderAuthorization } from '../../authorization/index';
import { headerRender } from './header';
import { setLocation } from '../../routing/routing';
import { clearUserStore, getStore } from '../../storage';

export function openAuth() {
  const body = document.body;
  body.innerHTML = '';
  body.append(headerRender());
  renderAuthorization('body'); // вызов окна авторизации
}

export function headerAuth() {
  const user = createElement('div', ['user']);
  const userName = getStore()?.name;
  if (userName) {
    const logoutMenu = createElement('div', ['user__menu']);
    const logoutText = '<i class="user__icon icon-logout-outlined"></i><div class="user__data">ВЫЙТИ</div>';
    const logoutBtn = createElement('div', ['user__item'], logoutText);
    logoutBtn.onclick = () => clearUserStore();
    logoutMenu.append(logoutBtn);

    user.innerHTML = `<i class="user__icon icon-student"></i><div class="user__data">${userName}</div>`;
    user.append(logoutMenu);
  } else {
    user.innerHTML = '<i class="user__icon icon-login-outlined"></i><div class="user__data">ВОЙТИ</div>';
    user.onclick = () => setLocation('auth');
  }
  return user;
}
