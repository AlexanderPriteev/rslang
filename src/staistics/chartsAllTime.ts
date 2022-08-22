import ApexCharts from 'apexcharts';
import createElement from '../helpers/createElement';
import { optionsCount, optionsDay } from './chartsAllTimeData';

function chartApex<T>(title: string, options: T) {
  const headline = `<p class="statistics-card__title">${title}</p>`;
  const container = createElement('div', ['statistics-card'], headline);
  const chartElement = createElement('div', ['apexchart']);
  const chart = new ApexCharts(chartElement, options);
  setTimeout(() => void chart.render());

  container.append(chartElement);
  return container;
}

export const chartCount = chartApex('Всего изучено слов', optionsCount);
export const chartDay = chartApex('Изучено слов в день', optionsDay);
