function createElement(type: string, classes: string[], text?: string, id?: string) {
  const element = document.createElement(type);
  element.classList.add(...classes);
  if (text) element.innerText = text;
  if (id) element.id = id;

  return element;
}

export default createElement;
