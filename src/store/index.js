import Vue from 'vue'
import Vuex from 'vuex'
import DateUtil from '../utils/Date'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        todayPost: state => {
            return [
                {uid: 1, date: DateUtil.stringToday, text: '안녕하세요1'},
                {uid: 2, date: DateUtil.stringToday, text: '안녕하세요2'},
                {uid: 3, date: DateUtil.stringToday, text: '안녕하세요3'}
            ]
        },
        allPost: state => {
            return [
                {uid: 1, date: DateUtil.stringToday, text: '안녕하세요1'},
                {uid: 2, date: DateUtil.stringToday, text: '안녕하세요2'},
                {uid: 3, date: DateUtil.stringToday, text: '안녕하세요3'},
                {uid: 4, date: DateUtil.stringYesterday, text: '안녕하세요4'},
                {uid: 5, date: DateUtil.stringYesterday, text: '안녕하세요5'},
                {uid: 6, date: DateUtil.stringYesterday, text: '안녕하세요6'}
            ]
        }
    }
})
