import { createUser, identityUser } from './logic';
import './style.scss';
import constants from '../constants/index';

const { SIGN_IN, SIGN_UP, FORGOT_PASS } = constants;

function createElement(type: string, classes: string[], text?: string, id?: string) {
    const element = document.createElement(type);
    element.classList.add(...classes);
    if (text) element.innerText = text;
    if (id) element.id = id;

    return element;
}

function createInputElement(type: string, classes: string[], typeInput: string, placeholder: string, id?: string) {
    const element = createElement(type, classes) as HTMLInputElement;
    element.type = typeInput;
    element.placeholder = placeholder;
    if (id) element.id = id;

    return element;
}

function appendChildArray(target: HTMLElement, arr: HTMLElement[]) {
    for (let i = 0; i < arr.length; i++) {
        target.appendChild(arr[i]);
    }
}

function createAuthorizationForm(classes: string[], id: string, text: string, upOrIn: boolean) {
    const container = createElement('div', classes);
    const form = createElement('form', ['form'], undefined, id) as HTMLFormElement;
    form.action = '#';
    const h2 = createElement('h2', ['form__title'], text);
    const preficsId = upOrIn ? 'Up' : 'In';
    const inputEmail = createInputElement('input', ['input'], 'email', 'Email', 'email' + preficsId);
    const inputPass = createInputElement('input', ['input'], 'password', 'Password', 'pass' + preficsId);
    const btn = createElement('button', ['btn'], text, 'btn' + preficsId);

    if (upOrIn) {
        const inputUser = createInputElement('input', ['input'], 'text', 'User');
        appendChildArray(form, [h2, inputUser, inputEmail, inputPass, btn]);
        btn.addEventListener('click', () => createUser());
    } else {
        const link = createElement('a', ['link'], FORGOT_PASS) as HTMLAnchorElement;
        link.href = '#';
        appendChildArray(form, [h2, inputEmail, inputPass, link, btn]);
        btn.addEventListener('click', () => identityUser());
    }

    container.appendChild(form);

    return [container, form];
}

export function renderAuthorization() {
    const sectionAuthorization = createElement('section', ['section-avthorization']);
    const container = createElement('div', ['container', 'right-panel-active']);
    const formSignUp = createAuthorizationForm(['container__form', 'container--signup'], 'form1', SIGN_UP, true);
    const formSignIn = createAuthorizationForm(['container__form', 'container--signin'], 'form2', SIGN_IN, false);

    const containerOverlay = createElement('div', ['container__overlay']);
    const overlay = createElement('div', ['overlay']);
    const overlayLeft = createElement('div', ['overlay__panel', 'overlay--left']);
    const btnLeft = createElement('button', ['btn'], SIGN_IN, 'signIn');
    const overlayRight = createElement('div', ['overlay__panel', 'overlay--right']);
    const btnRight = createElement('button', ['btn'], SIGN_UP, 'signUp');

    overlayLeft.appendChild(btnLeft);
    overlayRight.appendChild(btnRight);
    appendChildArray(overlay, [overlayLeft, overlayRight]);
    containerOverlay.appendChild(overlay);

    appendChildArray(container, [formSignUp[0], formSignIn[0], containerOverlay]);
    sectionAuthorization.appendChild(container);
    document.querySelector('body')?.appendChild(sectionAuthorization); //TODO: тут поменять потом

    btnLeft.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    btnRight.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    formSignUp[1].addEventListener('submit', (e) => e.preventDefault());

    formSignIn[1].addEventListener('submit', (e) => e.preventDefault());
}
