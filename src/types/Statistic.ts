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
    sprint: WordStatistic;
    sprintHistory?: WordStatistic[];
    audioCall: WordStatistic;
    audioCallHistory?: WordStatistic[];
}

export interface DataForStatistic{
    learnedWords: number;
    optional: {
        statistics: Statistic
    };
}
