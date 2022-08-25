import constants from '../constants/index';
const { ERROR_INPUT_EMAIL, ERROR_INPUT_PASSWORD } = constants;

export class User {
  name: string;

  email: string;

  password: string;

  id: string;

  token: string;

  refreshToken: string;

  constructor(name: string, email: string, password: string, id = '', token = '', refreshToken = '') {
    this.name = name;
    this.email = this.#validationEmail(email);
    this.password = this.#validationPassword(password);
    this.id = id;
    this.token = token;
    this.refreshToken = refreshToken;
  }

  #validationEmail(email: string) {
    if (/.+@.+\..+/i.test(email)) {
      return email;
    } else {
      throw new Error(ERROR_INPUT_EMAIL);
    }
  }

  #validationPassword(pass: string) {
    if (pass.length > 8) {
      return pass;
    } else {
      throw new Error(ERROR_INPUT_PASSWORD);
    }
  }
}
