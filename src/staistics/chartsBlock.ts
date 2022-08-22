import {CustomChart} from "../types/customChartInterface";
import createElement from "../helpers/createElement";
import {chartDonut, chartLine} from "./customChart";

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

export function statisticsBlock(cards: HTMLElement[], title?: string) {
    const list = createElement('div', ['statistics__list']);
    list.append(...cards);
    if(title){
        const headline = `<h2 class="statistics__headline">${title}</h2>`;
        const container = createElement('div', ['statistics__block'], headline);
        container.append(list);
        return container;
    }
    return list
}