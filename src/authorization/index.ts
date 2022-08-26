/* eslint-disable @typescript-eslint/no-misused-promises */
import { createUser, identityUser, replacePassword } from './logic';
import createElement from '../helpers/createElement';
import appendChildArray from '../helpers/appendChildArray';
import createInputElement from '../helpers/createInputElement';
import './style.scss';
import constants from '../constants/index';
import {createInputAuth} from "./authInput";
import {signInForm} from "./forms";





function createAuthorizationForm(classes: string[], id: string) {


  const container = createElement('div', classes);
  const form = createElement('form', ['auth-form'], undefined, id) as HTMLFormElement;
  form.action = '#';
  signInForm(form)

  container.appendChild(form);

  return [container, form];

}

// function addCloseForm() {
//   const container = document.querySelector('div.container');
//   const close = createElement('a', ['close']) as HTMLAnchorElement;
//   close.href = '#';
//   close.addEventListener('click', () => closeWindow('section.section-authorization'));
//
//   container?.appendChild(close);
// }

export function renderAuthorization(target: string) {
  const containerThis = document.querySelector(target) as HTMLElement
  const wrapper = createElement('div',['auth-form-wrapper'])
  const sectionAuthorization = createElement('section', ['section-authorization']);
  // const container = createElement('div', ['container', 'right-panel-active']);
  // const formSignUp = createAuthorizationForm(['container__form', 'container--signup'], 'form1', SIGN_UP, true);
  const formSignIn = createAuthorizationForm(['container__form', 'container--signin'], 'form2');

  wrapper.append(formSignIn[1])
  sectionAuthorization.append(wrapper)
  containerThis.append(sectionAuthorization)
  // const containerOverlay = createElement('div', ['container__overlay']);
  // const overlay = createElement('div', ['overlay']);
  // const overlayLeft = createElement('div', ['overlay__panel', 'overlay--left']);
  // const btnLeft = createElement('button', ['btn'], SIGN_IN, 'signIn');
  // const overlayRight = createElement('div', ['overlay__panel', 'overlay--right']);
  // const btnRight = createElement('button', ['btn'], SIGN_UP, 'signUp');
  //
  // overlayLeft.appendChild(btnLeft);
  // overlayRight.appendChild(btnRight);
  // appendChildArray(overlay, [overlayLeft, overlayRight]);
  // containerOverlay.appendChild(overlay);

 // appendChildArray(container, [formSignUp[0], formSignIn[0], containerOverlay]);
 //  appendChildArray(container, [formSignIn[0], containerOverlay]);
 //  sectionAuthorization.appendChild(container);
 //
 //  if (typeof target === 'string') {
 //    document.querySelector(target)?.appendChild(sectionAuthorization);
 //  } else {
 //    target.appendChild(sectionAuthorization);
 //  }

  // addCloseForm();

  // btnLeft.addEventListener('click', () => {
  //   container.classList.remove('right-panel-active');
  // });
  //
  // btnRight.addEventListener('click', () => {
  //   container.classList.add('right-panel-active');
  // });

 // formSignUp[1].addEventListener('submit', (e) => e.preventDefault());
  formSignIn[1].addEventListener('submit', (e) => e.preventDefault());
}
