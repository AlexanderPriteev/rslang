import createElement from '../helpers/createElement';
import './style.scss';
import { signInForm } from './forms/signIn';
import {optionsForm} from "./forms/options";

function createAuthorizationForm(classes: string[], id: string, isOptions?: boolean) {
  const container = createElement('div', classes);
  const form = createElement('form', ['auth-form'], undefined, id) as HTMLFormElement;
  form.action = '#';
  if(isOptions) optionsForm(form)
  else signInForm(form);
  container.appendChild(form);

  return [container, form];
}

export function renderAuthorization(target: string, isOptions?: boolean) {
  const containerThis = document.querySelector(target) as HTMLElement;
  const wrapper = createElement('div', ['auth-form-wrapper']);
  const sectionAuthorization = createElement('section', ['section-authorization']);

  const formSignIn = createAuthorizationForm(['container__form', 'container--signin'], 'form', !!isOptions);

  wrapper.append(formSignIn[1]);
  sectionAuthorization.append(wrapper);
  containerThis.append(sectionAuthorization);
  formSignIn[1].addEventListener('submit', (e) => e.preventDefault());
}
