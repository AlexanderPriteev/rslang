import {chartCount, chartDay} from './chartsAllTime';
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
import {CustomChart, StatisticsTab} from '../types/customChartInterface';
import { statisticsTabs } from './customChart';
import {DataForStatistic, Statistic, WordStatistic} from "../types/Statistic";
import requestMethods from "../services/requestMethods";
import {getStore} from "../storage";
import {optionsCount, optionsDay} from "./chartsAllTimeData";


function updateData(lines: CustomChart[], donut: CustomChart, values: WordStatistic) {
  let count = 0;
  if(values.longSeries) count = values.longSeries
  if(values.added) count = values.added

  const studied = values.studied
  const addedMax = count > studied
  const wordsError = values.errors
  const wordsCorrect = values.correct
  const correctCount = wordsCorrect / (wordsCorrect + wordsError) * 100
  lines[0].width = addedMax ? studied / count * 100 : 100;
  lines[0].value = studied
  lines[1].width = !addedMax ? count / studied * 100 : 100;
  lines[1].value = count
  donut.width = correctCount
  donut.value = Math.round(correctCount)
}


const gamesTabs = ():StatisticsTab[] => [
  {
    tabTitle: '<i class="statistics__headline-tab-icon icon-run-fast"></i>Аудиовызов',
    tabContent: statisticsBlock([
      statisticsCard([gamesAudioDonut], 'statistics-card--sm'),
      statisticsCard(gamesAudioLines, 'statistics-card--lg'),
    ]),
  },
  {
    tabTitle: '<i class="statistics__headline-tab-icon icon-music-box"></i>Спринт',
    tabContent: statisticsBlock([
      statisticsCard([gamesSprintDonut], 'statistics-card--sm'),
      statisticsCard(gamesSprintLines, 'statistics-card--lg'),
    ]),
  },
];

const getChartData = async () => {
  const user = getStore()
  if(user){
    const dataGraph = await requestMethods().getUserStatistic(user.id, user.token ) as DataForStatistic;
    const dataStat:Statistic = dataGraph.optional.statistics
    updateData(wordsLines, wordsDonut, dataStat.today)
    if(dataStat.sprint)
      updateData(gamesSprintLines, gamesSprintDonut, dataStat.sprint)
    if(dataStat.audioCall)
      updateData(gamesAudioLines, gamesAudioDonut, dataStat.audioCall)

    if(dataStat.wordsHistory){
      let count = 0
      const values = dataStat.wordsHistory.map((e) => e.studied)
      const valuesUp = values.map((e) => count += e)
      const dates = dataStat.wordsHistory.map((e) => e.date)
      optionsCount.series[0].data = valuesUp
      optionsCount.xaxis.categories = dates
      optionsDay.series[0].data = values
      optionsDay.xaxis.categories = dates
    }
  }
}

export async function statisticsRender(root = '.content-wrapper') {
  await getChartData()
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
    const games = statisticsTabs(gamesTabs(), 'игры');
    const allTime = statisticsBlock([chartCount, chartDay], 'за все время');
    statisticsPage.append(words, games, allTime);
    thisRoot.append(statisticsPage);
  }
}
