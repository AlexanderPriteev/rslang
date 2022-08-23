import requestMethods from '../services/requestMethods';
import { WordInterface } from '../types/wordInterface';

const getFullListOfWords = async () => {
  const promiseArr: Promise<WordInterface[]>[] = [];

  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 30; j++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      promiseArr.push(requestMethods().getWords(i, j) as Promise<WordInterface[]>);
    }
  }

  const listOfWords = (await Promise.all(promiseArr)).flat(1);
  return listOfWords;
};

export default getFullListOfWords;
