interface GameStatistic{
    date: Date;
    studied: number;
    errors: number;
    correct: number;
    longSeries: number
}

interface WordStatistic{
    date: Date;
    studied: number;
    errors: number;
    correct: number;
    longSeries: number
}

export interface Statistic {
    today: WordStatistic;
    wordSHistory?: WordStatistic[];
    sprint?: GameStatistic;
    sprintHistory?: GameStatistic[];
    audioCall?: GameStatistic;
    audioCallHistory?: GameStatistic[];
}