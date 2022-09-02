import createElement from '../../helpers/createElement';
import { createInputAuth } from '../authInput';
import { emailValidator, emptyValidator, removeErrors, twoPassValidation } from '../clientValidators';
import { createUser } from '../logic';
import { signInForm } from './signIn';
import constants from '../../constants';

const { SIGN_IN, SIGN_UP } = constants;

export function signUpForm(container: HTMLFormElement) {
  container.innerHTML = '';

  const h2 = createElement('h2', ['auth-form__title'], 'Создать Аккаунт');
  const inputName = createInputAuth('text', 'name', 'Имя', 'icon-user-graduate');
  const inputEmail = createInputAuth('text', 'emailUp', 'Email', 'icon-email');
  const inputPass = createInputAuth('password', 'passUp', 'Пароль');
  const inputRepeatPass = createInputAuth('password', 'repeatPass', 'Повторить Пароль');
  const inputWrapper = createElement('div', ['auth-form__wrapper']);
  inputWrapper.append(inputName, inputEmail, inputPass, inputRepeatPass);

  const btnPrimary = createElement('button', ['auth-btn'], SIGN_UP, 'sign-up-btn');
  const btnSecondary = createElement('button', ['auth-btn', 'auth-btn--outline'], SIGN_IN);
  const btnWrapper = createElement('div', ['auth-form__wrapper']);
  btnWrapper.append(btnPrimary, btnSecondary);

  const valueName = inputName.querySelector('#name') as HTMLFormElement;
  const valueInput = inputEmail.querySelector('#emailUp') as HTMLFormElement;
  const passInput = inputPass.querySelector('#passUp') as HTMLFormElement;
  const passRepeat = inputRepeatPass.querySelector('#repeatPass') as HTMLFormElement;

  btnPrimary.onclick = () => {
    removeErrors(container);
    if (emptyValidator([valueName, valueInput, passInput, passRepeat])) {
      const emailVal = emailValidator(valueInput);
      const twoPassVal = twoPassValidation(passInput, passRepeat);
      if (emailVal && twoPassVal) {
        void createUser();
      }
    }
  };
  btnSecondary.onclick = () => signInForm(container);
  container.append(h2, inputWrapper, btnWrapper);
}
