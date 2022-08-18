import { User } from '../types/User';

//создать нового пользователя
export function createUser() {
  try {
    const inputName = document.querySelector('input[type="text"]') as HTMLInputElement;
    const inputUpEmail = document.querySelector('#emailUp') as HTMLInputElement;
    const inputUpPass = document.querySelector('#passUp') as HTMLInputElement;

    const name = inputName.value;
    const email = inputUpEmail.value;
    const password = inputUpPass.value;
    const user = new User(name, email, password);
    //TODO: запись в БД юзера
  } catch (error) {
    console.log(error); //TODO: сделать вывод сообщения в форме об неверном пароле/email
  }
}

//вход для ранее зарегистрированного пользователя
export function identityUser() {
  try {
    const inputInEmail = document.querySelector('#emailIn') as HTMLInputElement;
    const inputInPass = document.querySelector('#passIn') as HTMLInputElement;
    const email = inputInEmail.value;
    const password = inputInPass.value;
    //TODO: проверка в БД наличия пользователя. Выбросить ошибку, если нет. Если есть - получить токен и тд...
  } catch (error) {
    console.log(error);
  }
}

export function closeWindowAuth() {
  alert('сделать закрытие окна');
}

export function replacePassword() {
  alert('сделать замену пароля');
}
