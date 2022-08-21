import { chartCount, chartDay } from './chartsAllTime';
import createElement from '../helpers/createElement';
import { statisticsBlock, statisticsCard } from './customChart';
import { gamesDonut, gamesLines, wordsDonut, wordsLines } from './customChartData';

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
    const gamesCards = [
      statisticsCard([gamesDonut], 'statistics-card--sm'),
      statisticsCard(gamesLines, 'statistics-card--lg'),
    ];
    const words = statisticsBlock('слова', wordsCards);
    const games = statisticsBlock('игры', gamesCards);
    const allTime = statisticsBlock('за все время', [chartCount, chartDay]);
    statisticsPage.append(words, games, allTime);
    thisRoot.append(statisticsPage);
  }
}
