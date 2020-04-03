import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import DateUtil from '../utils/Date'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://postit.conanshin.tech:5002/'
// axios.defaults.baseURL = 'http://localhost:5002/'

export default new Vuex.Store({
    state: {
        searchKeyword: '',
        posts: []
    },
    mutations: {
        setSearchKeyword: (state, payload) => {
            state.searchKeyword = payload
        },
        setPosts: (state, payload) => {
            state.posts = payload
        },
        addPost: (state, payload) => {
            state.posts.push(payload)
        }
    },
    actions: {
        newPost: async (store, payload) => {
            try {
                const response = await axios.post('posts', {text: payload})
                store.dispatch('fetchPosts')
            } catch (error) {
                console.log(error)
            }
        },
        fetchPosts: async store => {
            try {
                const {data} = await axios.get('/posts')
                store.commit('setPosts', data)
            } catch (error) {
                console.log(error)
            }
        }
    },
    modules: {
    },
    getters: {
        filteredTodayPost: state => state.posts.filter(post => DateUtil.isToday(post.date)).filter(post => post.text.includes(state.searchKeyword)),
        filteredAllPost: state => state.posts.filter(post => post.text.includes(state.searchKeyword)),
    }
})
