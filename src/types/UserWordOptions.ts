export interface UserWordOptions {
    count: number;
    longSeries: number;
    audioCorrect: number;
    audioError: number;
    sprintCorrect: number;
    sprintError: number;
}

export interface DataForUserWord {
    difficulty: string;
    id: string;
    wordId: string;
    optional: UserWordOptions;
}