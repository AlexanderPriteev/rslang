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

const statistics = {
  today:{
    date: '24.08.2022',
    studied: 80,
    added: 120,
    errors: 40,
    correct: 100,
  },
  wordsHistory: [
    { date: '19.08.2022',
      studied: 100,
      added: 150,
      errors: 30,
      correct: 110,},
    { date: '20.08.2022',
      studied: 180,
      added: 150,
      errors: 60,
      correct: 130,},
    { date: '21.08.2022',
      studied: 90,
      added: 110,
      errors: 50,
      correct: 90,},
    { date: '22.08.2022',
      studied: 70,
      added: 80,
      errors: 30,
      correct: 100,},
    { date: '23.08.2022',
      studied: 90,
      added: 125,
      errors: 44,
      correct: 77},

  ],
  sprint:{
    date: '24.08.2022',
    studied: 100,
    errors: 30,
    correct: 90,
    longSeries: 15
  },
  sprintHistory: [
    {
      date: '19.08.2022',
      studied: 110,
      errors: 35,
      correct: 95,
      longSeries: 15
    },
    {
      date: '20.08.2022',
      studied: 130,
      errors: 30,
      correct: 110,
      longSeries: 5
    },
    {
      date: '21.08.2022',
      studied: 80,
      errors: 30,
      correct: 99,
      longSeries: 25
    },
    {
      date: '22.08.2022',
      studied: 120,
      errors: 40,
      correct: 100,
      longSeries: 18
    },
    {
      date: '23.08.2022',
      studied: 70,
      errors: 10,
      correct: 70,
      longSeries: 20
    },
  ],
  audioCall:{
    date: '24.08.2022',
    studied: 100,
    errors: 30,
    correct: 90,
    longSeries: 15
  },
  audioCallHistory: [
    {
      date: '19.08.2022',
      studied: 110,
      errors: 35,
      correct: 95,
      longSeries: 15
    },
    {
      date: '20.08.2022',
      studied: 130,
      errors: 30,
      correct: 110,
      longSeries: 5
    },
    {
      date: '21.08.2022',
      studied: 80,
      errors: 30,
      correct: 99,
      longSeries: 25
    },
    {
      date: '22.08.2022',
      studied: 120,
      errors: 40,
      correct: 100,
      longSeries: 18
    },
    {
      date: '23.08.2022',
      studied: 70,
      errors: 10,
      correct: 70,
      longSeries: 20
    },
  ]
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
