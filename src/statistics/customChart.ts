import createElement from '../helpers/createElement';
import { CustomChart, StatisticsTab } from '../types/customChartInterface';

export function chartLine(data: CustomChart) {
  const color = data.color || '#A588E2';
  const inner = `<i class="statistics-line__bg" style="width: ${data.width}%; background-color:${color}"></i>
                   <span class="statistics-line__value">${data.value}</span>`;
  return createElement('div', ['statistics-line'], inner);
}

export function chartDonut(data: CustomChart) {
  const arc = 100 + 502 * data.width / 100;
  const inner = `<svg class="statistics-donut__svg"  viewBox="0 0 200 200">
                     <circle class="statistics-donut__bg"/>
                     <circle stroke-dasharray="${arc} 602" class="statistics-donut__value"/>
                     <text x="50%" y="50%" class="statistics-donut__text">${data.value}%</text>
                    </svg>`;
  return createElement('div', ['statistics-donut'], inner);
}

export function statisticsTabs(tabs: StatisticsTab[], title: string) {
  const titleText = `<span class="statistics__headline-text">${title}</span>`;
  const headline = createElement('div', ['statistics__headline'], titleText);
  const container = createElement('div', ['statistics__block']);
  container.append(headline, tabs[0].tabContent);

  const tabsHead = createElement('div', ['statistics__headline-tab-list']);
  tabs.forEach((e, i) => {
    const classes = i ? ['statistics__headline-tab'] : ['statistics__headline-tab', 'active'];
    const tab = createElement('span', classes, e.tabTitle);
    tab.onclick = () => {
      const activeTab = tabsHead.querySelector('.active') as HTMLElement;
      const tabsList = container.querySelector('.statistics__list') as HTMLElement;
      activeTab.classList.remove('active');
      tab.classList.add('active');
      tabsList.remove();
      container.append(e.tabContent);
    };
    tabsHead.append(tab);
  });
  headline.append(tabsHead);
  return container;
}
