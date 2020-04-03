
const dateToString = date => date.getFullYear() + "/" + date.getMonth()+1 + "/" + date.getDay()
const isToday = date => {
    const targetDate = new Date(date)
    const today = new Date()
    return dateToString(targetDate) === dateToString(today)
}

export default {dateToString, isToday}
