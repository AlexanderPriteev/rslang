import requestMethods from '../services/requestMethods';
import { getStore, setStore } from '../storage/index';
import { SignIn, UserCreateRes } from '../types/index';
import { User } from '../types/User';
import {defaultStatistics} from "../statistics/defaultValue";
import {setLocation} from "../routing/routing";
import { closeWindow } from '../helpers/closeWindow';
import {DataForStatistic, Statistic} from "../types/Statistic";





const statistics = {
  today:{
    date: '2022-08-15',
    studied: 80,
    added: 120,
    errors: 40,
    correct: 100,
  },
  wordsHistory: [
    { date: '2022-08-10',
      studied: 100,
      added: 150,
      errors: 30,
      correct: 110,},
    { date: '2022-08-11',
      studied: 180,
      added: 150,
      errors: 60,
      correct: 130,},
    { date: '2022-08-12',
      studied: 90,
      added: 110,
      errors: 50,
      correct: 90,},
    { date: '2022-08-13',
      studied: 70,
      added: 80,
      errors: 30,
      correct: 100,},
    { date: '2022-08-14',
      studied: 90,
      added: 125,
      errors: 44,
      correct: 77},

  ],
  sprint:{
    date: '2022-08-15',
    studied: 100,
    errors: 30,
    correct: 90,
    longSeries: 15
  },
  sprintHistory: [
    {
      date: '2022-08-10',
      studied: 110,
      errors: 35,
      correct: 95,
      longSeries: 15
    },
    {
      date: '2022-08-11',
      studied: 130,
      errors: 30,
      correct: 110,
      longSeries: 5
    },
    {
      date: '2022-08-12',
      studied: 80,
      errors: 30,
      correct: 99,
      longSeries: 25
    },
    {
      date: '2022-08-13',
      studied: 120,
      errors: 40,
      correct: 100,
      longSeries: 18
    },
    {
      date: '2022-08-14',
      studied: 70,
      errors: 10,
      correct: 70,
      longSeries: 20
    },
  ],
  audioCall:{
    date: '2022-08-15',
    studied: 120,
    errors: 32,
    correct: 99,
    longSeries: 27
  },
  audioCallHistory: [
    {
      date: '2022-08-10',
      studied: 110,
      errors: 35,
      correct: 95,
      longSeries: 15
    },
    {
      date: '2022-08-11',
      studied: 130,
      errors: 30,
      correct: 110,
      longSeries: 5
    },
    {
      date: '2022-08-12',
      studied: 80,
      errors: 30,
      correct: 99,
      longSeries: 25
    },
    {
      date: '2022-08-13',
      studied: 120,
      errors: 40,
      correct: 100,
      longSeries: 18
    },
    {
      date: '2022-08-14',
      studied: 70,
      errors: 10,
      correct: 70,
      longSeries: 20
    },
  ]
}



async function setCurrentDateStatistic(userId: string, token: string){
  const userStatisticResponse = (await requestMethods().getUserStatistic(userId,  token)) as DataForStatistic
  const userStatistic = userStatisticResponse.optional.statistics
  const lastEntry = userStatistic.today.date
  const today = new Date().toLocaleDateString().split('.').reverse().join('-')
  if(lastEntry !== today){
    let dateEmpty = lastEntry
    if(!userStatistic.wordsHistory)  userStatistic.wordsHistory = []
    if(!userStatistic.sprintHistory)  userStatistic.sprintHistory = []
    if(!userStatistic.audioCallHistory)  userStatistic.audioCallHistory = []
    while (dateEmpty !== today){
      const newDate = new Date(dateEmpty)
      newDate.setDate(newDate.getDate() + 1)
      userStatistic.wordsHistory.push(userStatistic.today)
      userStatistic.sprintHistory.push(userStatistic.sprint)
      userStatistic.audioCallHistory.push(userStatistic.audioCall)
      const defaultValue = defaultStatistics(newDate)
      dateEmpty = newDate.toLocaleDateString().split('.').reverse().join('-')
      userStatistic.today = defaultValue.today
      userStatistic.sprint = defaultValue.sprint
      userStatistic.audioCall = defaultValue.audioCall
    }
  }
  await requestMethods().updateUserStatistic(userId, '1', token, {statistics: userStatistic});
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
    const { id } = (await requestMethods().createUser(user)) as UserCreateRes;
    user.id = id;
    const { token, refreshToken } = (await requestMethods().userSignIn(user.email, user.password)) as SignIn;
    user.token = token;
    user.refreshToken = refreshToken;
    await requestMethods().updateUserStatistic(id, '1', token, {statistics: defaultStatistics()} );
    const test1 = await requestMethods().getUserStatistic(id,  token);
    console.log(test1)


    setStore(user);
    console.log(getStore());
    closeWindow('.section-authorization');
    setLocation('index');

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

    closeWindow('.section-authorization');
    setLocation('index');
    console.log(getStore());

    await setCurrentDateStatistic(userId, token)
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
