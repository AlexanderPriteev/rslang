import requestMethods from '../services/requestMethods';
import { setStore } from '../storage/index';
import { SignIn, UserCreateRes } from '../types/index';
import { NewUser, User } from '../types/User';
import { defaultStatistics } from '../statistics/defaultValue';
import { setLocation } from '../routing/routing';
import { DataForStatistic } from '../types/Statistic';
import { addError } from './clientValidators';

async function setCurrentDateStatistic(userId: string, token: string) {
  const userStatisticResponse = (await requestMethods().getUserStatistic(userId, token)) as DataForStatistic;
  const userStatistic = userStatisticResponse.optional.statistics;
  const lastEntry = userStatistic.today.date;
  const today = new Date().toLocaleDateString().split('.').reverse().join('-');
  if (lastEntry !== today) {
    let dateEmpty = lastEntry;
    if (!userStatistic.wordsHistory) userStatistic.wordsHistory = [];
    if (!userStatistic.sprintHistory) userStatistic.sprintHistory = [];
    if (!userStatistic.audioCallHistory) userStatistic.audioCallHistory = [];
    while (dateEmpty !== today) {
      const newDate = new Date(dateEmpty);
      newDate.setDate(newDate.getDate() + 1);
      userStatistic.wordsHistory.push(userStatistic.today);
      userStatistic.sprintHistory.push(userStatistic.sprint);
      userStatistic.audioCallHistory.push(userStatistic.audioCall);
      const defaultValue = defaultStatistics(newDate);
      dateEmpty = newDate.toLocaleDateString().split('.').reverse().join('-');
      userStatistic.today = defaultValue.today;
      userStatistic.sprint = defaultValue.sprint;
      userStatistic.audioCall = defaultValue.audioCall;
    }
  }
  await requestMethods().updateUserStatistic(userId, '1', token, { statistics: userStatistic });
}

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
    const data: NewUser = {
      name: name,
      email: email,
      password: password,
    };
    const { id } = (await requestMethods().createUser(data)) as UserCreateRes;
    user.id = id;
    const { token, refreshToken } = (await requestMethods().userSignIn(user.email, user.password)) as SignIn;
    user.token = token;
    user.refreshToken = refreshToken;
    await requestMethods().updateUserStatistic(id, '1', token, { statistics: defaultStatistics() });
    setStore(user);
    setLocation('index');
  } catch (error) {
    console.log(error); //TODO: сделать вывод сообщения в форме об неверном пароле/email
  }
}

//вход для ранее зарегистрированного пользователя
export async function identityUser(mail: HTMLFormElement, pass: HTMLFormElement) {
  try {
    const email = mail.value as string;
    const password = pass.value as string;
    const { token, refreshToken, userId, name } = (await requestMethods().userSignIn(email, password)) as SignIn;
    const user = new User(name, email, password, userId, token, refreshToken);
    setStore(user);
    setLocation('index');
    await setCurrentDateStatistic(userId, token);
  } catch {
    addError(mail, 'Логин или/и пароль не корректны');
    addError(pass, 'Логин или/и пароль не корректны');
  }
}

//сбросить пароль
export function replacePassword(mail: string, pass: string) {
  console.log(mail + ' ' + pass);
  const { email, password } = getEmailAndPassFromForm(true);

  const { inputInEmail, inputInPass } = getEmailAndPassFromForm(false);
  inputInEmail.value = email;
  inputInPass.value = password;
}
