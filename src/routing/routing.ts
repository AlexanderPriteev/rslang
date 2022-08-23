import {pageRender} from "../page/page";
import {mainPage} from "../page/main/main-page";
import textbook from "../textbook/textbook";
import {statisticsRender} from "../staistics/statistics";
import {gamesPage} from "../games/games";
import {renderWindowStartGame} from "../sprint/renderStart";
import {openAuth} from "../page/header/header-auth";
import {notFoundRender} from "../page/page-not-found/not-found";

export function routing(rout: string){
    switch (rout){
        case '/': pageRender(mainPage, 'index');
            break;
        case '/index': pageRender(mainPage, 'index');
            break;

        case '/book': pageRender(textbook, 'book');
            break;
        case '/statistics': pageRender(statisticsRender, 'statistics');
            break;

        case '/games':  pageRender(gamesPage,'games');
            break;
        case '/sprint': renderWindowStartGame()
            break;

        case '/auth': openAuth()
            break;
        default: notFoundRender()
    }
}

export function setLocation(rout: string = ''){
    try {
        window.history.pushState(null, '', rout);
        routing(`/${rout}`);
    } catch(e) {}
}