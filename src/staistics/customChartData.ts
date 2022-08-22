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

export const gamesSprintLines: CustomChart[] = [
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

export const gamesSprintDonut: CustomChart = {
  title: 'Правильных ответов за сегодня:',
  width: 68,
  value: 68,
  type: 'donut',
};

export const gamesAudioLines: CustomChart[] = [
  {
    title: 'Изучено новых слов сегодня:',
    width: 100,
    color: '#70FF8F',
    value: 99,
    type: 'line',
  },
  {
    title: 'Самая длинная серия правильных ответов за сегодня:',
    width: 55,
    color: '#70FFFF',
    value: 60,
    type: 'line',
  },
];

export const gamesAudioDonut: CustomChart = {
  title: 'Правильных ответов за сегодня:',
  width: 90,
  value: 90,
  type: 'donut',
};