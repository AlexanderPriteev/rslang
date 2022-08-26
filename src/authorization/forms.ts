import createElement from "../helpers/createElement";
import {createInputAuth} from "./authInput";
import {createUser, identityUser, replacePassword} from "./logic";
import constants from "../constants";
import {emailValidator, emptyValidator, removeErrors, twoPassValidation} from "./clientValidators";

const { SIGN_IN, SIGN_UP} = constants;

export function signInForm(container: HTMLFormElement){
    container.innerHTML = '';

    const h2 = createElement('h2', ['auth-form__title'], 'Войти');
    const inputEmail = createInputAuth('text', 'emailIn', 'Email', 'icon-email')
    const inputPass = createInputAuth('password', 'passIn', 'Пароль')
    const inputWrapper = createElement('div', ['auth-form__wrapper']);
    inputWrapper.append(inputEmail, inputPass)

    const btnPrimary = createElement('button', ['auth-btn'], SIGN_IN);
    const btnSecondary = createElement('button', ['auth-btn', 'auth-btn--outline'], SIGN_UP);
    const btnWrapper = createElement('div', ['auth-form__wrapper']);
    btnWrapper.append(btnPrimary, btnSecondary)

    const valueInput = inputEmail.querySelector('#emailIn') as HTMLFormElement
    const passInput = inputPass.querySelector('#passIn') as HTMLFormElement

    // const linkWrapper = createElement('div', ['auth-link-wrapper']);
    // const link = createElement('span', ['auth-link'], FORGOT_PASS);
    //linkWrapper.append(link)
    btnPrimary.onclick = () => {
        removeErrors(container)
        if(emptyValidator([valueInput, passInput])){
            if(emailValidator(valueInput)){
                void identityUser(valueInput, passInput)
            }
        }
    };
    btnSecondary.onclick = () => signUpForm(container);
    //link.onclick = () => resetPassForm(container);
    container.append(h2, inputWrapper, btnWrapper/*, linkWrapper*/)
}

export function signUpForm(container: HTMLFormElement){
    container.innerHTML = '';

    const h2 = createElement('h2', ['auth-form__title'], 'Создать Аккаунт');
    const inputName = createInputAuth('text', 'name', 'Имя', 'icon-user-graduate')
    const inputEmail = createInputAuth('text', 'emailUp', 'Email', 'icon-email')
    const inputPass = createInputAuth('password', 'passUp', 'Пароль')
    const inputRepeatPass = createInputAuth('password', 'repeatPass', 'Повторить Пароль')
    const inputWrapper = createElement('div', ['auth-form__wrapper']);
    inputWrapper.append(inputName, inputEmail, inputPass, inputRepeatPass)

    const btnPrimary = createElement('button', ['auth-btn'], SIGN_UP);
    const btnSecondary = createElement('button', ['auth-btn', 'auth-btn--outline'], SIGN_IN);
    const btnWrapper = createElement('div', ['auth-form__wrapper']);
    btnWrapper.append(btnPrimary, btnSecondary)


    const valueName = inputName.querySelector('#name') as HTMLFormElement
    const valueInput = inputEmail.querySelector('#emailUp') as HTMLFormElement
    const passInput = inputPass.querySelector('#passUp') as HTMLFormElement
    const passRepeat = inputRepeatPass.querySelector('#repeatPass') as HTMLFormElement

    btnPrimary.onclick = () => {
        removeErrors(container)
        if(emptyValidator([valueName, valueInput, passInput, passRepeat])){
            const emailVal = emailValidator(valueInput)
            const twoPassVal = twoPassValidation(passInput, passRepeat)
            if(emailVal && twoPassVal){
                    void createUser();
            }
        }

    }
    btnSecondary.onclick = () => signInForm(container);
    container.append(h2, inputWrapper, btnWrapper)
}

export function resetPassForm(container: HTMLFormElement){
    container.innerHTML = '';
    const h2 = createElement('h2', ['auth-form__title'], 'Сбросить Пароль');
    const inputEmail = createInputAuth('text', 'emailRes', 'Email', 'icon-email');


    const inputPass = createInputAuth('password', 'passRes', 'Пароль');
    const inputRepeatPass = createInputAuth('password', 'repeatPass', 'Повторить Пароль');
    const inputWrapper = createElement('div', ['auth-form__wrapper']);
    inputWrapper.append(inputEmail, inputPass, inputRepeatPass)

    const btnPrimary = createElement('button', ['auth-btn'], 'Сбросить пароль');
    const btnWrapper = createElement('div', ['auth-form__wrapper']);
    btnWrapper.append(btnPrimary)

    const linkWrapper = createElement('div', ['auth-link-wrapper']);
    const link = createElement('span', ['auth-link'], 'Вернуться ко входу');

    const valueInput = inputEmail.querySelector('#emailRes') as HTMLFormElement
    const passInput = inputPass.querySelector('#passRes') as HTMLFormElement
    const passRepeat = inputRepeatPass.querySelector('#repeatPass') as HTMLFormElement

    linkWrapper.append(link)
    btnPrimary.onclick = () => {
        removeErrors(container)
        if(emptyValidator([valueInput, passInput, passRepeat])){
            const emailVal = emailValidator(valueInput)
            const twoPassVal = twoPassValidation(passInput, passRepeat)
            if(emailVal && twoPassVal){
                replacePassword(valueInput.value, passInput.value);
            }
        }
    }
    link.onclick = () => signInForm(container);
    container.append(h2, inputWrapper, btnWrapper, linkWrapper)
}

