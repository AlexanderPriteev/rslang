interface DataSetting{
    wordsPerDay: number;
    optional: {
        statistic: Statistic;
    }
}

export interface WordStatistic{
    date: string;
    studied: number;
    errors: number;
    correct: number;
    longSeries?: number
    added?: number;
}


export interface Statistic {
    today: WordStatistic;
    wordsHistory?: WordStatistic[];
    sprint?: WordStatistic;
    sprintHistory?: WordStatistic[];
    audioCall?: WordStatistic;
    audioCallHistory?: WordStatistic[];
}

export interface DataForStatistic{
    wordsPerDay: number;
    optional: {
        statistics: Statistic;
    }
}
