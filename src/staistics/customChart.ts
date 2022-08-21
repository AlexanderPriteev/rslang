import createElement from '../helpers/createElement';
import { CustomChart } from '../types/customChartInterface';

function chartLine(data: CustomChart) {
  const color = data.color || '#A588E2';
  const inner = `<i class="statistics-line__bg" style="width: ${data.width}%; background-color:${color}"></i>
                   <span class="statistics-line__value">${data.value}</span>`;
  return createElement('div', ['statistics-line'], inner);
}

function chartDonut(data: CustomChart) {
  const arc = 2 * Math.PI * data.width;
  const inner = `<svg class="statistics-donut__svg"  viewBox="0 0 200 200">
                     <circle class="statistics-donut__bg"/>
                     <circle stroke-dasharray="${arc}" class="statistics-donut__value"/>
                     <text x="50%" y="50%" class="statistics-donut__text">${data.value}%</text>
                    </svg>`;
  return createElement('div', ['statistics-donut'], inner);
}

export function statisticsCard(blocks: CustomChart[], modSelector?: string) {
  const containerClasses: string[] = modSelector ? ['statistics-card', modSelector] : ['statistics-card'];
  const container = createElement('div', containerClasses);
  blocks.forEach((e) => {
    const center = e.type === 'donut' ? 'center' : '';
    const title = `<p class="statistics-card__title ${center}">${e.title}</p>`;
    const block = createElement('div', ['statistics-card__block'], title);
    const chart = e.type === 'donut' ? chartDonut(e) : chartLine(e);
    block.append(chart);
    container.append(block);
  });
  return container;
}

export function statisticsBlock(title: string, cards: HTMLElement[]) {
  const headline = `<h2 class="statistics__headline">${title}</h2>`;
  const container = createElement('div', ['statistics__block'], headline);
  const list = createElement('div', ['statistics__list']);
  list.append(...cards);
  container.append(list);
  return container;
}
