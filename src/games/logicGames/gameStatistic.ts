import { SprintResult } from '../../types';
import { getStore } from '../../storage';
import requestMethods from '../../services/requestMethods';
import { DataForStatistic, WordStatistic } from '../../types/Statistic';

function updateStatisticGame(stat: WordStatistic, correct: number, error: number, series?: number[]) {
  if (stat.longSeries && series) {
    stat.longSeries = Math.max(stat.longSeries || 0, ...series);
  }
  stat.added = (stat.added || 0) + error;
  stat.studied = (stat.studied || 0) + correct;
  stat.correct = (stat.correct || 0) + correct;
  stat.errors = (stat.errors || 0) + error;
}

export async function addStatisticGame(resultsSprint: SprintResult[], gameName: string) {
  const user = getStore();
  if (user) {
    let thisSeries = 0;
    const allSeries: number[] = [];
    const correctCount = resultsSprint.reduce((s, c) => s + Number(c.result), 0);
    const errorCount = resultsSprint.reduce((s, c) => s + Number(!c.result), 0);
    for (const i of resultsSprint) {
      if (i.result) {
        thisSeries += 1;
        await requestMethods()
          .getUserWordById(user.id, i.wordID, user.token)
          .then(async () => requestMethods().updateUserWord(user.id, i.wordID, 'learned', user.token))
          .catch(async () => requestMethods().createUserWord(user.id, i.wordID, 'learned', user.token));
      } else {
        allSeries.push(thisSeries);
        thisSeries = 0;
        await requestMethods()
          .getUserWordById(user.id, i.wordID, user.token)
          .catch(async () => requestMethods().createUserWord(user.id, i.wordID, 'complicated', user.token));
      }
    }
    const userStatisticResponse = (await requestMethods().getUserStatistic(user.id, user.token)) as DataForStatistic;
    const userStatistic = userStatisticResponse.optional.statistics;
    updateStatisticGame(userStatistic.today, correctCount, errorCount);
    if (gameName === 'sprint') {
      updateStatisticGame(userStatistic.sprint, correctCount, errorCount, allSeries);
    } else {
      updateStatisticGame(userStatistic.audioCall, correctCount, errorCount, allSeries);
    }
    await requestMethods().updateUserStatistic(user.id, '1', user.token, { statistics: userStatistic });
  }
}
