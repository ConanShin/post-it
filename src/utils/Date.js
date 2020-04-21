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

const monthMapper = date => {
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    return monthName[date.getMonth()]
}
const momentYYYYMMDDWithDash = date => {
    return moment(date).format('YYYY-MM-DD')
}

const getAllDatesInMonth = (date) => {
    const firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
    var dateArray = new Array();
    var currentDate = firstDayOfThisMonth;
    while (currentDate <= lastDayOfThisMonth) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate()+1)
    }
    // console.log(dateArray)
    return dateArray;
}

// startingDay  0: sunday, 1: monday
const startingDays = (date, startingDay) => {
    const allDatesInMonth = getAllDatesInMonth(date);
    const startingDaysInThisMonth = allDatesInMonth.filter(value => value.getDay() === startingDay);

    const firstStartingDay = new Date(startingDaysInThisMonth[0]);
    const previousStartingDay = new Date(firstStartingDay.getFullYear(), firstStartingDay.getMonth(), firstStartingDay.getDate()-7);
    const lastStartingDay = new Date(startingDaysInThisMonth[startingDaysInThisMonth.length-1]);
    const nextStartingDay = new Date(lastStartingDay.getFullYear(), lastStartingDay.getMonth(), lastStartingDay.getDate()+7);
    const firstDayOfMonth = new Date(firstStartingDay.getFullYear(), firstStartingDay.getMonth(), 1);
    const lastDayOfMonth = new Date(firstStartingDay.getFullYear(), firstStartingDay.getMonth()+1, 0);

    // console.log("SEE HERE!!!", previousStartingDay, firstStartingDay, lastStartingDay, nextStartingDay)

    var startingDaysIncludingPrevAndNextWeek = [...startingDaysInThisMonth]
    // console.log("StartingDaysIncludingPrevAndNextWeek", StartingDaysIncludingPrevAndNextWeek)
    if(firstDayOfMonth.getDay() !== startingDay) { // 첫날이 일요일이 아닌 경우 이전 주에도 이번달의 일부가 있음
        startingDaysIncludingPrevAndNextWeek.unshift(previousStartingDay)
    }
    if(lastDayOfMonth.getDay() !== startingDay-1) { // 마지막날이 일요일이 아닌 경우 다음주에도 이번달의 일부가 있음
        startingDaysIncludingPrevAndNextWeek.push(nextStartingDay)
    }
    // console.log("StartingDaysIncludingPrevAndNextWeek", startingDaysIncludingPrevAndNextWeek)

    return startingDaysIncludingPrevAndNextWeek;
}

const nthWeek = (startingDays, date) => {
    const idx = startingDays.findIndex(value => {
        // console.log("comapring with...", value)
        const comp = date < value
        // console.log("comp", date , "<", value, "is" , comp)
        return comp
    })
    // console.log("idx", idx)
    return idx
}


export default {dateToString, isToday, isWeekend, startingDays, getAllDatesInMonth, nthWeek, monthMapper, momentYYYYMMDDWithDash}
