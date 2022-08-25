import {Statistic} from "../types/Statistic";

export const defaultStatistics = (date: Date = new Date()): Statistic => {
    const dateString = date.toLocaleDateString().split('.').reverse().join('-')
    return {
        today: {
            date: dateString,
            studied: 0,
            errors: 0,
            correct: 0,
            added: 0
        },
        sprint:{
            date: dateString,
            studied: 0,
            errors: 0,
            correct: 0,
            longSeries: 0
        },
        audioCall: {
            date: dateString,
            studied: 0,
            errors: 0,
            correct: 0,
            longSeries: 0
        },
    }
}