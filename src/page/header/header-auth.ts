import createElement from '../../helpers/createElement';
import { renderAuthorization } from '../../authorization/index';
import { headerRender } from './header';
import { setLocation } from '../../routing/routing';
import { clearUserStore, getStore } from '../../storage';
import { footerRender } from '../footer/footer';
import { pageBaseMarkup } from '../page';
import requestMethods from '../../services/requestMethods';

export function openAuth(isOptions?: boolean) {
  const page = pageBaseMarkup();
  page.append(headerRender());
  renderAuthorization('.page-wrapper', !!isOptions);
  page.append(footerRender());
}

export function headerAuth() {
  const user = createElement('div', ['user']);
  const userData = getStore();
  if (userData) {
    const userName = userData.name;
    const logoutMenu = createElement('div', ['user__menu']);
    const logoutText = '<i class="user__icon icon-logout-outlined"></i><div class="user__data">ВЫЙТИ</div>';
    const logoutBtn = createElement('div', ['user__item'], logoutText);
    logoutBtn.onclick = () => clearUserStore();

    const optionsText = '<i class="user__icon icon-options"></i><div class="user__data">НАСТРОЙКИ</div>';
    const optionsBtn = createElement('div', ['user__item'], optionsText);
    optionsBtn.onclick = () => {
      void requestMethods()
        .getUserById(userData.id, userData.token)
        .then(() => setLocation('options'))
        .catch(() => clearUserStore());
    };

    logoutMenu.append(optionsBtn, logoutBtn);

    user.innerHTML = `<i class="user__icon icon-student"></i><div class="user__data">${userName}</div>`;
    user.append(logoutMenu);
  } else {
    user.innerHTML = '<i class="user__icon icon-login-outlined"></i><div class="user__data">ВОЙТИ</div>';
    user.onclick = () => setLocation('auth');
  }
  return user;
}
