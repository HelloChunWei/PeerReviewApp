import dayjs from 'dayjs'

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