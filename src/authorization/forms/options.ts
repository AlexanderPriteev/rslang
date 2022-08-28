import createElement from '../../helpers/createElement';
import { createInputAuth } from '../authInput';
import { addError, emailValidator, emptyValidator, removeErrors, twoPassValidation } from '../clientValidators';
import { getStore } from '../../storage';
import { setLocation } from '../../routing/routing';
import requestMethods from '../../services/requestMethods';
import { alertAuth } from '../../page/alert/alertCustom';
import { identityUser } from '../logic';

export function optionsForm(container: HTMLFormElement) {
  const user = getStore();
  if (user) {
    container.innerHTML = '';
    const h2 = createElement('h2', ['auth-form__title'], `Настройки профиля`);
    const inputName = createInputAuth('text', 'nameRes', 'Имя', 'icon-user-graduate', user.name);
    const inputEmail = createInputAuth('text', 'emailRes', 'Email', 'icon-email', user.email);
    const inputPass = createInputAuth('password', 'passRes', 'Новый Пароль');
    const inputRepeatPass = createInputAuth('password', 'repeatPass', 'Повторить Пароль');
    const inputWrapper = createElement('div', ['auth-form__wrapper', 'mb-5']);
    inputWrapper.append(inputEmail, inputPass, inputRepeatPass);

    const inputOldPass = createInputAuth('password', 'oldPass', 'Текущий Пароль');
    const inputWrapper2 = createElement('div', ['auth-form__wrapper']);
    inputWrapper2.append(inputOldPass);

    const btnPrimary = createElement('button', ['auth-btn'], 'ОБНОВИТЬ ПРОФИЛЬ');
    const btnSecondary = createElement('button', ['auth-btn', 'auth-btn--outline'], 'на главную');
    const btnWrapper = createElement('div', ['auth-form__wrapper']);
    btnWrapper.append(btnPrimary, btnSecondary);

    const valueInput = inputEmail.querySelector('#emailRes') as HTMLFormElement;
    const passInput = inputPass.querySelector('#passRes') as HTMLFormElement;
    const passRepeat = inputRepeatPass.querySelector('#repeatPass') as HTMLFormElement;
    const oldPassInput = inputOldPass.querySelector('#oldPass') as HTMLFormElement;
    const nameInput = inputName.querySelector('#nameRes') as HTMLFormElement;

    btnPrimary.onclick = () => {
      removeErrors(container);
      if (emptyValidator([nameInput, valueInput, oldPassInput])) {
        const emailVal = emailValidator(valueInput);
        const twoPassVal = () => twoPassValidation(passInput, passRepeat);
        if (emailVal) {
          void requestMethods()
            .userSignIn(user.email, oldPassInput.value as string)
            .then(() => {
              let thisPass = oldPassInput.value as string;
              const passValue = passInput.value as string;
              if (passValue.length) {
                if (twoPassVal()) thisPass = passValue;
                else return;
              }
              const valueEmail = valueInput.value as string;
              const valueName = valueInput.value as string;
              requestMethods()
                .updateUser(user.id, valueEmail, thisPass, user.token, valueName)
                .then(() => {
                  alertAuth('Профиль успешно обновлен', 2000);

                  void identityUser(valueInput, passValue ? passInput : oldPassInput);
                })
                .catch(() => addError(inputEmail, 'Email занят другим пользователем'));
            })
            .catch(() => {
              addError(oldPassInput, 'Пароль не верный');
            });
        }
      }
    };
    btnSecondary.onclick = () => setLocation();
    container.append(h2, inputName, inputWrapper, inputWrapper2, btnWrapper);
  }
}
