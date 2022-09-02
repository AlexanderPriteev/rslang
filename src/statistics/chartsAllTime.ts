import ApexCharts from 'apexcharts';
import createElement from '../helpers/createElement';

export function chartApex<T>(title: string, options: T) {
  const headline = `<p class="statistics-card__title">${title}</p>`;
  const container = createElement('div', ['statistics-card'], headline);
  const chartElement = createElement('div', ['apexchart']);
  const chart = new ApexCharts(chartElement, options);
  setTimeout(() => void chart.render());

  container.append(chartElement);
  return container;
}
