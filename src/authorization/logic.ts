import requestMethods from '../services/requestMethods';
import { getStore, setStore } from '../storage/index';
import { SignIn, UserCreateRes } from '../types/index';
import { User } from '../types/User';

function getEmailAndPassFromForm(InOrUp: boolean) {
  const str = InOrUp ? 'In' : 'Up';

  const inputInEmail = document.querySelector('#email' + str) as HTMLInputElement;
  const inputInPass = document.querySelector('#pass' + str) as HTMLInputElement;
  const email = inputInEmail.value;
  const password = inputInPass.value;

  return { email, password, inputInEmail, inputInPass };
}

//создать нового пользователя
export async function createUser() {
  try {
    const { email, password } = getEmailAndPassFromForm(false);
    const inputName = document.querySelector('input[type="text"]') as HTMLInputElement;
    const name = inputName.value;

    const user = new User(name, email, password);
    const { id } = (await requestMethods().createUser(user)) as UserCreateRes;
    user.id = id;
    const { token, refreshToken } = (await requestMethods().userSignIn(user.email, user.password)) as SignIn;
    user.token = token;
    user.refreshToken = refreshToken;
    setStore(user);
    console.log(getStore());

    //TODO: при окончании регистрации надо поменять вид кнопки авторизации на "выйти"
  } catch (error) {
    console.log(error); //TODO: сделать вывод сообщения в форме об неверном пароле/email
  }
}

//вход для ранее зарегистрированного пользователя
export async function identityUser() {
  try {
    const { email, password } = getEmailAndPassFromForm(true);
    const { token, refreshToken, userId, name } = (await requestMethods().userSignIn(email, password)) as SignIn;
    const user = new User(name, email, password, userId, token, refreshToken);
    setStore(user);
    console.log(getStore());
  } catch (error) {
    console.log(error); //TODO: сделать вывод сообщения в форме об неверном пароле/email
  }
}

//сбросить пароль
export function replacePassword() {
  const { email, password } = getEmailAndPassFromForm(true);
  document.querySelector('div.container')?.classList.add('right-panel-active');

  const { inputInEmail, inputInPass } = getEmailAndPassFromForm(false);
  inputInEmail.value = email;
  inputInPass.value = password;
}
