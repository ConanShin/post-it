const today = new Date()
const stringToday = today.getFullYear() + "/" + today.getMonth()+1 + "/" + today.getDay()
const stringYesterday = today.getFullYear() + "/" + today.getMonth()+1 + "/" + today.getDay()-1

export default {stringToday, stringYesterday}
