function appendChildArray(target: HTMLElement, arr: HTMLElement[]) {
  for (let i = 0; i < arr.length; i++) {
    target.appendChild(arr[i]);
  }
}

export default appendChildArray;
