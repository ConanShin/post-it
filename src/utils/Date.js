import moment from 'moment';
const KOREAN_DAY = ["일", "월", "화", "수", "목", "금", "토"]
const dateToString = date => date.getFullYear() + "년 " + (date.getMonth()+1) + "월 " + date.getDate() + "일" + "(" + KOREAN_DAY[date.getDay()] + ")"
const isToday = date => {
    const targetDate = new Date(date)
    const today = new Date()
    return dateToString(targetDate) === dateToString(today)
}
const isWeekend = date => {
    return date.getDay() === 0 || date.getDay() === 6
}
const nthWeek = date => {
    let day
    if (date.getDay() === 0) day = 7
    else day = date.getDay()

    const fullWeeksBetween = parseInt(date.getDate() / 7)
    const leftDays = date.getDate % 7

    let result = fullWeeksBetween + 1
    if (day - leftDays > 0) result += 1
    return result
}

const belongsToThisMonth = (targetDate, nowDate) => {
    return targetDate.getMonth() === nowDate.getMonth() && targetDate.getFullYear() === nowDate.getFullYear()
}

const monthMapper = date => {
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    return monthName[date.getMonth()]
}
const momentYYYYMMDDWithDash = date => {
    return moment(date).format('YYYY-MM-DD')
}

export default {dateToString, isToday, isWeekend, nthWeek, belongsToThisMonth, monthMapper, momentYYYYMMDDWithDash}
