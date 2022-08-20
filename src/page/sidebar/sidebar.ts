import createElement from '../../helpers/createElement';
import textbook from "../../textbook/textbook";
import {mainPage} from "../main/main-page";
import {gamesPage} from "../../games/games";

export interface NavItem {
    name: string;
    icon: string;
    title: string;
    isActive?: boolean;
    link?: string;
}

export const navs: NavItem[] = [
    {
        name: 'main',
        icon: 'icon-building-home',
        title: 'Домой',
        isActive: true
    },
    {
        name: 'book',
        icon: 'icon-book-close',
        title: 'Учебник',
    },
    {
        name: 'dictionary',
        icon: 'icon-dictionary',
        title: 'Словарь',
    },
    {
        name: 'games',
        icon: 'icon-game-handle',
        title: 'Игры',
    },
    {
        name: 'statistics',
        icon: 'icon-chart-column',
        title: 'Статистика',
    }

]
const about: NavItem = {
    name: 'statistics',
    icon: 'icon-info-square',
    title: 'О Нас',
    link: '#about'
}

function navLink(item: NavItem) {
    const text = `<i class="nav-link__icon ${item.icon}"></i><span class="nav-link__title">${item.title}</span>`
    const aboutLink = createElement('a', item.isActive ? ['nav-link', 'active'] : ['nav-link'], text)
    aboutLink.setAttribute('data-target', item.name)
    if (item.link) {
        aboutLink.setAttribute('href', item.link)
        aboutLink.onclick = () => mainPage()
    }
    return aboutLink
}

function openSidebar() {
    const main = document.querySelector('main') as HTMLElement
    main.classList.toggle('open')
}

function navListActiveBtn(parentList: HTMLElement) {
    parentList.onclick = (event) => {
        const target = event.target as HTMLElement
        const targetParent = target.parentNode as HTMLElement

        if(!(target.classList.contains('sidebar__nav'))){
            const list = parentList.querySelectorAll('.nav-link')
            list.forEach((e) => {
                if (e.classList.contains('active')) e.classList.remove('active')
            })
            if(target.classList.contains('nav-link')) target.classList.add('active')
            if(targetParent.classList.contains('nav-link')) targetParent.classList.add('active')
        }
    }
}

export function sidebar(header?: HTMLElement) {
    if (header) {
        const controlElement = createElement('i', ['header__collapse', 'icon-navigation'])
        controlElement.onclick = openSidebar
        header.prepend(controlElement)
    }

    const sidebar = createElement('aside', ['sidebar'])
    const navList = createElement('nav', ['sidebar__nav'])
    navListActiveBtn(navList)
    navs.forEach((e) => {
        const nav = navLink(e)
        navList.append(nav)
        switch (e.name) {
            case 'book': nav.onclick = () => textbook()
                break
            case 'games': nav.onclick = () => gamesPage()
                break;
            //  добавить остальные страницы
            default: nav.onclick = () => mainPage()
        }
    })

    const aboutLink = createElement('div', ['sidebar__link'])
    aboutLink.append(navLink(about))
    sidebar.append(navList, aboutLink)
    return sidebar
}

