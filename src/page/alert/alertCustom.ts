import createElement from '../../helpers/createElement';
import './alert.scss';

export const alertAuth = (inner: string, time: number) => {
    const timer = time;
    const alertInner = `<p class="alert__text">${inner}</p>`;
    const alertElement = createElement("div", ["alert"], alertInner);
    const alertClose = createElement("i", ["alert__close"], "✖");
    alertElement.append(alertClose);
    alertClose.onclick = () => alertElement.remove();
    document.body.append(alertElement);
    setTimeout(() => alertElement.remove(), timer);
};