import { chartCount, chartDay } from './chartsAllTime';
import createElement from '../helpers/createElement';
import { statisticsBlock, statisticsCard } from './chartsBlock';
import {
  gamesSprintDonut,
  gamesSprintLines,
  gamesAudioDonut,
  gamesAudioLines,
  wordsDonut,
  wordsLines,
} from './customChartData';
import './statistics.scss';
import { StatisticsTab } from '../types/customChartInterface';
import { statisticsTabs } from './customChart';

const gamesTabs: StatisticsTab[] = [
  {
    tabTitle: '<i class="statistics__headline-tab-icon icon-music-box"></i>Аудиовызов',
    tabContent: statisticsBlock([
      statisticsCard([gamesSprintDonut], 'statistics-card--sm'),
      statisticsCard(gamesSprintLines, 'statistics-card--lg'),
    ]),
  },
  {
    tabTitle: '<i class="statistics__headline-tab-icon icon-run-fast"></i>Спринт',
    tabContent: statisticsBlock([
      statisticsCard([gamesAudioDonut], 'statistics-card--sm'),
      statisticsCard(gamesAudioLines, 'statistics-card--lg'),
    ]),
  },
];

export function statisticsRender(root = '.content-wrapper') {
  const thisRoot: HTMLElement | null = document.querySelector(root);
  if (thisRoot) {
    thisRoot.innerHTML = '';

    const statisticsTitle = '<h1 class="headline fs-lg">Статистика</h1>';
    const statisticsPage = createElement('div', ['statistics'], statisticsTitle);
    const wordsCards = [
      statisticsCard(wordsLines, 'statistics-card--lg'),
      statisticsCard([wordsDonut], 'statistics-card--sm'),
    ];
    const words = statisticsBlock(wordsCards, 'слова');
    const games = statisticsTabs(gamesTabs, 'игры');
    const allTime = statisticsBlock([chartCount, chartDay], 'за все время');
    statisticsPage.append(words, games, allTime);
    thisRoot.append(statisticsPage);
  }
}
