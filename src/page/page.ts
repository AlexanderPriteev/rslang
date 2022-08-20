import createElement from "../helpers/createElement";
import {header} from "./header/header";
import {sidebar} from "./sidebar/sidebar";
import {footer} from "./footer/footer";
import {mainPage} from "./main/main-page";

export function page() {
    const body = document.body
    const page = createElement('div', ['page-wrapper'])
    const main = createElement('main', ['main-section'])
    const content = createElement('div', ['content-wrapper'])
    const head = header(true)
    const aside = sidebar(head)
    main.append(aside, content)
    page.append(head, main, footer())
    body.append(page)
    mainPage()
}
