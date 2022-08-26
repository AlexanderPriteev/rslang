import createElement from '../helpers/createElement';

export function addError(input: HTMLElement, error: string) {
  const errorText = error;
  const parent = input.parentNode as HTMLElement;
  const errorMessage = createElement('span', ['auth-input__error'], errorText);
  parent.classList.add('error');
  parent.append(errorMessage);
}

export function removeErrors(container: HTMLFormElement) {
  const errorClass = container.querySelectorAll('.error');
  const errorMessage = container.querySelectorAll('.auth-input__error');
  errorClass.forEach((e) => e.classList.remove('error'));
  errorMessage.forEach((e) => e.remove());
}

export function passValidation(pass: HTMLFormElement) {
  const val = pass.value as string;
  if (val.length < 7) {
    addError(pass, 'Необходимо более 6 символов');
    return false;
  }
  return true;
}
export function twoPassValidation(pass: HTMLFormElement, passRepeat: HTMLFormElement) {
  if (passValidation(pass)) {
    if (pass.value !== passRepeat.value) {
      addError(pass, 'Пароли должны совпадать');
      addError(passRepeat, 'Пароли должны совпадать');
      return false;
    }
    return true;
  }
  return false;
}

export function emailValidator(mail: HTMLFormElement) {
  const validator = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const val = mail.value as string;
  if (!validator.test(val)) {
    addError(mail, 'Не корректный email');
    return false;
  }
  return true;
}

export function emptyValidator(inputList: HTMLFormElement[]) {
  let bool = true;
  inputList.forEach((e) => {
    const val = e.value as string;
    if (!val.length) {
      bool = false;
      addError(e, 'Заполните поле');
    }
  });
  return bool;
}
