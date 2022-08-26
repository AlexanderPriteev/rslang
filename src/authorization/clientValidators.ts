import createElement from "../helpers/createElement";

export function addError(input: HTMLElement, error: string) {
    const errorText = error
    const parent = input.parentNode as HTMLElement
    const errorMessage = createElement('span', ['auth-input__error'], errorText)
    parent.classList.add('error')
    parent.append(errorMessage)
}

export function removeErrors(container: HTMLFormElement) {
    const errorClass = container.querySelectorAll('.error')
    const errorMessage = container.querySelectorAll('.auth-input__error')
    errorClass.forEach((e) => e.classList.remove('error'))
    errorMessage.forEach((e) => e.remove())
}

export function passValidation(pass: HTMLFormElement) {
    if(pass.value.length < 9){
        addError(pass, 'Необходимо более 8 символов')
        return false
    }
    return true
}
export function twoPassValidation(pass: HTMLFormElement, passRepeat: HTMLFormElement) {
    if(passValidation(pass)){
        if(pass.value !== passRepeat.value){
            addError(pass, 'Пароли должны совпадать')
            addError(passRepeat, 'Пароли должны совпадать')
            return false
        }
        return true
    }
    return false
}

export function emailValidator(mail: HTMLFormElement) {
    const validator = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if(!validator.test(mail.value)){
        addError(mail, 'Не корректный email')
        return false
    }
    return true
}

export function emptyValidator(inputList: HTMLFormElement[]) {
    let bool = true
    inputList.forEach((e) =>{
        if(!e.value.length){
            bool = false
            addError(e, 'Заполните поле')
        }
    })
    return bool
}