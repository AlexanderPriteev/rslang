import './style.scss';

const signIn = 'ВОЙТИ';
const signUp = 'СОЗДАТЬ АККАУНТ';
const forgotPass = 'Сбросить пароль';

function createElement(type: string, classes: string[], text?: string, id?: string) {
    const element = document.createElement(type);
    element.classList.add(...classes);
    if (text) element.innerText = text;
    if (id) element.id = id;

    return element;
}

function createInputElement(type: string, classes: string[], typeInput: string, placeholder: string) {
    const element = createElement(type, classes) as HTMLInputElement;
    element.type = typeInput;
    element.placeholder = placeholder;

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
    const inputEmail = createInputElement('input', ['input'], 'email', 'Email');
    const inputPass = createInputElement('input', ['input'], 'password', 'Password');
    const btn = createElement('button', ['btn'], text);
    if (upOrIn) {
        const inputUser = createInputElement('input', ['input'], 'text', 'User');
        appendChildArray(form, [h2, inputUser, inputEmail, inputPass, btn]);
    } else {
        const link = createElement('a', ['link'], forgotPass) as HTMLAnchorElement;
        link.href = '#';
        appendChildArray(form, [h2, inputEmail, inputPass, link, btn]);
    }

    container.appendChild(form);

    return [container, form];
}

export function renderAuthorization() {
    const sectionAuthorization = createElement('section', ['section-avthorization']);
    const container = createElement('div', ['container', 'right-panel-active']);
    const formSignUp = createAuthorizationForm(['container__form', 'container--signup'], 'form1', signUp, true);
    const formSignIn = createAuthorizationForm(['container__form', 'container--signin'], 'form2', signIn, false);

    const containerOverlay = createElement('div', ['container__overlay']);
    const overlay = createElement('div', ['overlay']);
    const overlayLeft = createElement('div', ['overlay__panel', 'overlay--left']);
    const btnLeft = createElement('button', ['btn'], signIn, 'signIn');
    const overlayRight = createElement('div', ['overlay__panel', 'overlay--right']);
    const btnRight = createElement('button', ['btn'], signUp, 'signUp');

    overlayLeft.appendChild(btnLeft);
    overlayRight.appendChild(btnRight);
    appendChildArray(overlay, [overlayLeft, overlayRight]);
    containerOverlay.appendChild(overlay);

    appendChildArray(container, [formSignUp[0], formSignIn[0], containerOverlay]);
    sectionAuthorization.appendChild(container);
    document.querySelector('body')?.appendChild(sectionAuthorization); // тут поменять потом

    btnLeft.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    btnRight.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    formSignUp[1].addEventListener('submit', (e) => e.preventDefault());

    formSignIn[1].addEventListener('submit', (e) => e.preventDefault());
}
