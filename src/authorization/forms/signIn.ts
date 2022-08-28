import createElement from '../../helpers/createElement';
import { createInputAuth } from '../authInput';
import { emailValidator, emptyValidator, removeErrors } from '../clientValidators';
import { identityUser } from '../logic';
import { signUpForm } from './signUp';
import constants from '../../constants';

const { SIGN_IN, SIGN_UP } = constants;

export function signInForm(container: HTMLFormElement) {
  container.innerHTML = '';

  const h2 = createElement('h2', ['auth-form__title'], 'Войти');
  const inputEmail = createInputAuth('text', 'emailIn', 'Email', 'icon-email');
  const inputPass = createInputAuth('password', 'passIn', 'Пароль');
  const inputWrapper = createElement('div', ['auth-form__wrapper']);
  inputWrapper.append(inputEmail, inputPass);

  const btnPrimary = createElement('button', ['auth-btn'], SIGN_IN);
  const btnSecondary = createElement('button', ['auth-btn', 'auth-btn--outline'], SIGN_UP);
  const btnWrapper = createElement('div', ['auth-form__wrapper']);
  btnWrapper.append(btnPrimary, btnSecondary);

  const valueInput = inputEmail.querySelector('#emailIn') as HTMLFormElement;
  const passInput = inputPass.querySelector('#passIn') as HTMLFormElement;

  btnPrimary.onclick = () => {
    removeErrors(container);
    if (emptyValidator([valueInput, passInput])) {
      if (emailValidator(valueInput)) {
        void identityUser(valueInput, passInput);
      }
    }
  };
  btnSecondary.onclick = () => signUpForm(container);
  container.append(h2, inputWrapper, btnWrapper);
}
