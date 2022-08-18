import createElement from './createElement';

function createInputElement(type: string, classes: string[], typeInput: string, placeholder: string, id?: string) {
  const element = createElement(type, classes) as HTMLInputElement;
  element.type = typeInput;
  element.placeholder = placeholder;
  if (id) element.id = id;

  return element;
}

export default createInputElement;
