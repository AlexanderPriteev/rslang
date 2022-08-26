/* eslint-disable @typescript-eslint/no-misused-promises */
import { createUser, identityUser, replacePassword } from './logic';
import createElement from '../helpers/createElement';
import appendChildArray from '../helpers/appendChildArray';
import createInputElement from '../helpers/createInputElement';
import './style.scss';
import constants from '../constants/index';
import {createInputAuth} from "./authInput";

const { SIGN_IN, SIGN_UP, FORGOT_PASS } = constants;

function signInForm(container: HTMLFormElement){
  container.innerHTML = '';

  const h2 = createElement('h2', ['auth-form__title'], 'Войти');
  const inputEmail = createInputAuth('email', 'emailIn', 'Email', 'icon-email')
  const inputPass = createInputAuth('password', 'passIn', 'Пароль')
  const inputWrapper = createElement('div', ['auth-form__wrapper']);
  inputWrapper.append(inputEmail, inputPass)

  const btnPrimary = createElement('button', ['auth-btn'], SIGN_IN);
  const btnSecondary = createElement('button', ['auth-btn', 'auth-btn--outline'], SIGN_UP);
  const btnWrapper = createElement('div', ['auth-form__wrapper']);
  btnWrapper.append(btnPrimary, btnSecondary)

  const linkWrapper = createElement('div', ['auth-link-wrapper']);
  const link = createElement('span', ['auth-link'], FORGOT_PASS);
  linkWrapper.append(link)
  btnPrimary.onclick = () => identityUser();
  btnSecondary.onclick = () => signUpForm(container);
  link.onclick = () => resetPassForm(container);
  container.append(h2, inputWrapper, btnWrapper, linkWrapper)
}

function signUpForm(container: HTMLFormElement){
  container.innerHTML = '';

  const h2 = createElement('h2', ['auth-form__title'], 'Создать Аккаунт');
  const inputName = createInputAuth('text', 'name', 'Имя', 'icon-user-graduate')
  const inputEmail = createInputAuth('email', 'emailUp', 'Email', 'icon-email')
  const inputPass = createInputAuth('password', 'passUp', 'Пароль')
  const inputRepeatPass = createInputAuth('password', 'repeatPass', 'Повторить Пароль')
  const inputWrapper = createElement('div', ['auth-form__wrapper']);
  inputWrapper.append(inputName, inputEmail, inputPass, inputRepeatPass)

  const btnPrimary = createElement('button', ['auth-btn'], SIGN_UP);
  const btnSecondary = createElement('button', ['auth-btn', 'auth-btn--outline'], SIGN_IN);
  const btnWrapper = createElement('div', ['auth-form__wrapper']);
  btnWrapper.append(btnPrimary, btnSecondary)

  btnPrimary.onclick = () => createUser();
  btnSecondary.onclick = () => signInForm(container);
  container.append(h2, inputWrapper, btnWrapper)
}

function resetPassForm(container: HTMLFormElement){
  container.innerHTML = '';
  const h2 = createElement('h2', ['auth-form__title'], 'Сбросить Пароль');
  const inputEmail = createInputAuth('email', 'emailRes', 'Email', 'icon-email')
  const inputPass = createInputAuth('password', 'passRes', 'Пароль')
  const inputRepeatPass = createInputAuth('password', 'repeatPass', 'Повторить Пароль')
  const inputWrapper = createElement('div', ['auth-form__wrapper']);
  inputWrapper.append(inputEmail, inputPass, inputRepeatPass)

  const btnPrimary = createElement('button', ['auth-btn'], 'Сбросить пароль');
  const btnWrapper = createElement('div', ['auth-form__wrapper']);
  btnWrapper.append(btnPrimary)

  const linkWrapper = createElement('div', ['auth-link-wrapper']);
  const link = createElement('span', ['auth-link'], 'Вернуться ко входу');
  linkWrapper.append(link)
  btnPrimary.onclick = () => replacePassword();
  link.onclick = () => signInForm(container);
  container.append(h2, inputWrapper, btnWrapper, linkWrapper)
}

function createAuthorizationForm(classes: string[], id: string) {


  const container = createElement('div', classes);
  const form = createElement('form', ['auth-form'], undefined, id) as HTMLFormElement;
  form.action = '#';
  signInForm(form)

  container.appendChild(form);

  return [container, form];

  // const preficsId = upOrIn ? 'Up' : 'In';
  // const inputEmail = createInputElement('input', ['input'], 'email', 'Email', 'email' + preficsId);
  // const inputPass = createInputElement('input', ['input'], 'password', 'Password', 'pass' + preficsId);


  // if (upOrIn) {
  //   const inputUser = createInputElement('input', ['input'], 'text', 'User');
  //   appendChildArray(form, [h2, inputUser, inputEmail, inputPass, btn]);
  //   btn.addEventListener('click', () => createUser());
  // } else {


   // link.addEventListener('click', () => replacePassword());


  // }
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
