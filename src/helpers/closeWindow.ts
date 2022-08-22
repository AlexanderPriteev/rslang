//принудительное закрытие окна
export function closeWindow(target: HTMLElement | string) {
  const section = typeof target === 'string' ? document.querySelector(target) : target;

  if (section) section.parentNode?.removeChild(section);
}
