import createElement from '../../helpers/createElement';
import {renderAuthorization} from "../../authorization/index";
import {header} from "./header";

export function headerAuth(login?: boolean){
    const user = createElement('div', ['user'])
    if(!login){
        user.innerHTML = '<i class="user__icon"></i><div class="user__data">ВОЙТИ</div>'
        user.onclick = openAuth
    }
    else{
    //    сделать функционал для авторизованного пользователя
    }
    return user
}

export function openAuth() {
    const body = document.body
    body.innerHTML = ''
    body.append(header())
    void renderAuthorization('body'); // вызов окна авторизации
}