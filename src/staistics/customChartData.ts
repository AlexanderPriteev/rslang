import { CustomChart } from '../types/customChartInterface';

export const wordsLines: CustomChart[] = [
  {
    title: 'Изучено новых слов сегодня:',
    width: 70,
    color: '#70FF8F',
    value: 124,
    type: 'line',
  },
  {
    title: 'Добавлено новых слов сегодня:',
    width: 100,
    color: '#70FFFF',
    value: 156,
    type: 'line',
  },
];

export const wordsDonut: CustomChart = {
  title: 'Правильных ответов за сегодня:',
  width: 70,
  value: 70,
  type: 'donut',
};

export const gamesLines: CustomChart[] = [
  {
    title: 'Изучено новых слов сегодня:',
    width: 100,
    color: '#70FF8F',
    value: 86,
    type: 'line',
  },
  {
    title: 'Самая длинная серия правильных ответов за сегодня:',
    width: 30,
    color: '#70FFFF',
    value: 26,
    type: 'line',
  },
];

export const gamesDonut: CustomChart = {
  title: 'Правильных ответов за сегодня:',
  width: 68,
  value: 68,
  type: 'donut',
};
