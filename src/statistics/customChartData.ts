import { CustomChart } from '../types/customChartInterface';

export const wordsLines: CustomChart[] = [
  {
    title: 'Изучено новых слов сегодня:',
    width: 0,
    color: '#70FF8F',
    value: 0,
    type: 'line',
  },
  {
    title: 'Добавлено новых слов сегодня:',
    width: 0,
    color: '#70FFFF',
    value: 0,
    type: 'line',
  },
];

export const wordsDonut: CustomChart = {
  title: 'Правильных ответов за сегодня:',
  width: 0,
  value: 0,
  type: 'donut',
};

export const gamesSprintLines: CustomChart[] = [
  {
    title: 'Изучено новых слов сегодня:',
    width: 0,
    color: '#70FF8F',
    value: 0,
    type: 'line',
  },
  {
    title: 'Самая длинная серия правильных ответов за сегодня:',
    width: 0,
    color: '#70FFFF',
    value: 0,
    type: 'line',
  },
];

export const gamesSprintDonut: CustomChart = {
  title: 'Правильных ответов за сегодня:',
  width: 0,
  value: 0,
  type: 'donut',
};

export const gamesAudioLines: CustomChart[] = [
  {
    title: 'Изучено новых слов сегодня:',
    width: 0,
    color: '#70FF8F',
    value: 0,
    type: 'line',
  },
  {
    title: 'Самая длинная серия правильных ответов за сегодня:',
    width: 0,
    color: '#70FFFF',
    value: 0,
    type: 'line',
  },
];

export const gamesAudioDonut: CustomChart = {
  title: 'Правильных ответов за сегодня:',
  width: 0,
  value: 0,
  type: 'donut',
};
