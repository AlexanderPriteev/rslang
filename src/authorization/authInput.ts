import createElement from "../helpers/createElement";
import createInputElement from "../helpers/createInputElement";

function inputPasswordShow(icon: HTMLElement, input: HTMLInputElement){
    input.type = input.type === 'password' ? 'text' : 'password'
    if(icon.classList.contains('icon-lock')){
        icon.classList.remove('icon-lock')
        icon.classList.add('icon-unlock')
    }
    else{
        icon.classList.remove('icon-unlock')
        icon.classList.add('icon-lock')
    }
}

export function createInputAuth(type:string, id: string, labelText: string, iconClass?:string){
    const wrapper = createElement('div', ['auth-input']);
    const input = createInputElement('input', ['auth-input__field'], type, ' ', id);

    const label = createElement('span', ['auth-input__label'], labelText);
    wrapper.append(input, label)
    if(type === 'password'){
        input.autocomplete = 'new-password'
        const icon = createElement('i', ['auth-input__icon', 'icon-lock', 'active'])
        icon.onclick = () => inputPasswordShow(icon, input)
        wrapper.append(icon)
    }
    else if(iconClass){
        const icon = createElement('i', ['auth-input__icon', iconClass])
        wrapper.append(icon)
    }
    return wrapper
}