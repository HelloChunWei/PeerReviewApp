import dayjs from 'dayjs'

const quarterMap:Record<string, {
    start: string,
    end: string
}> = {
    'Q1': {
        start: '01-01',
        end: '03-31'
    },
    'Q2': {
        start: '04-01',
        end: '06-30'
    },
    'Q3': {
        start: '07-01',
        end: '09-30'
    },
    'Q4': {
        start: '10-01',
        end: '12-31'
    },
}

export const formatDate =(value: Date | string | number) => {
    return dayjs(value).format('MMM DD, YYYY')
}
export const getThreeDays = (startDate?: string | number | Date): number[] => {
    const start = startDate ? dayjs(startDate).subtract(1, 'day') : dayjs()
    return [
        start.valueOf(),
        start.subtract(1, 'day').valueOf(),
        start.subtract(2, 'day').valueOf()
    ]
}

/**
 * Check if a date is within a specific quarter
 * @param {string} quarter - The quarter in format 'YYYY-QX' (e.g. '2025-Q1', '2024-Q2')
 * @param {string} workLogDate - The date to check in format 'YYYY-MM-DD'
 * @returns {boolean} True if date is within the quarter, false otherwise
 */

export const checkDateIsInTheQuarter = (quarter: string, workLogDate: string) => {
    const splitQuarter = quarter.split('-')
    const targetYear =splitQuarter[0]
    const targetQuarter = splitQuarter[1]
    const getQuarterMap = quarterMap[targetQuarter]
    const quarterStart = dayjs(`${targetYear}-${getQuarterMap.start}`)
    const quarterEnd =  dayjs(`${targetYear}-${getQuarterMap.end}`)
    const workLogTime = dayjs(workLogDate)
    if (workLogTime.valueOf() >= quarterStart.valueOf() && workLogTime.valueOf() <= quarterEnd.valueOf()) return true;
    return false;

}