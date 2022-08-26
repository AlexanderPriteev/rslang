import createElement from '../../helpers/createElement';
import { createInputAuth } from '../authInput';
import { emailValidator, emptyValidator, removeErrors, twoPassValidation } from '../clientValidators';
import { replacePassword } from '../logic';
import { signInForm } from './signIn';

export function resetPassForm(container: HTMLFormElement) {
  container.innerHTML = '';
  const h2 = createElement('h2', ['auth-form__title'], 'Сбросить Пароль');
  const inputEmail = createInputAuth('text', 'emailRes', 'Email', 'icon-email');

  const inputPass = createInputAuth('password', 'passRes', 'Пароль');
  const inputRepeatPass = createInputAuth('password', 'repeatPass', 'Повторить Пароль');
  const inputWrapper = createElement('div', ['auth-form__wrapper']);
  inputWrapper.append(inputEmail, inputPass, inputRepeatPass);

  const btnPrimary = createElement('button', ['auth-btn'], 'Сбросить пароль');
  const btnWrapper = createElement('div', ['auth-form__wrapper']);
  btnWrapper.append(btnPrimary);

  const linkWrapper = createElement('div', ['auth-link-wrapper']);
  const link = createElement('span', ['auth-link'], 'Вернуться ко входу');

  const valueInput = inputEmail.querySelector('#emailRes') as HTMLFormElement;
  const passInput = inputPass.querySelector('#passRes') as HTMLFormElement;
  const passRepeat = inputRepeatPass.querySelector('#repeatPass') as HTMLFormElement;

  linkWrapper.append(link);
  btnPrimary.onclick = () => {
    removeErrors(container);
    if (emptyValidator([valueInput, passInput, passRepeat])) {
      const emailVal = emailValidator(valueInput);
      const twoPassVal = twoPassValidation(passInput, passRepeat);
      if (emailVal && twoPassVal) {
        replacePassword(valueInput.value as string, passInput.value as string);
      }
    }
  };
  link.onclick = () => signInForm(container);
  container.append(h2, inputWrapper, btnWrapper, linkWrapper);
}
