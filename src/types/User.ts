import constants from '../constants/index';
const { ERROR_INPUT_EMAIL, ERROR_INPUT_PASSWORD } = constants;

export class User {
    name: string;

    email: string;

    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = this.#validationEmail(email);
        this.password = this.#validationPassword(password);
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
