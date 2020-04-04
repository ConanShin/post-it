import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import DateUtil from '../utils/Date'
import VueRouter from '../router'
import KakaoConnector from '@/utils/Kakao'
import SessionStorage from '@/utils/SessionStorage'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://postit.conanshin.tech:5002/'
// axios.defaults.baseURL = 'http://localhost:5002/'
axios.interceptors.request.use(config => {
    config.headers['user-id'] = SessionStorage.user().id
    return config
}, error => {
    console.log(error)
})

export default new Vuex.Store({
    state: {
        searchKeyword: '',
        myPosts: [],
        publicPosts: []
    },
    mutations: {
        setSearchKeyword: (state, payload) => {
            state.searchKeyword = payload
        },
        setPosts: (state, payload) => {
            state.myPosts = payload.myPosts
            state.publicPosts = payload.publicPosts
        },
        addPost: (state, payload) => {
            state.posts.push(payload)
        }
    },
    actions: {
        login: async (store) => {
            await KakaoConnector.login()
            const user = await KakaoConnector.fetchUserInfo()
            SessionStorage.save('user', user)
            store.dispatch('updateUser')
            VueRouter.push({name: 'Post'})
        },
        logout: async store => {
            await KakaoConnector.logout()
            SessionStorage.flush()
            VueRouter.push({name: 'Login'})
        },
        updateUser: async store => {
            const {name} = SessionStorage.user()
            await axios.post('/user', {name})
        },
        newPost: async (store, text) => {
            await axios.post('/post', {text})
            store.dispatch('fetchPosts')
        },
        updatePost: async (store, post) => {
            await axios.put(`/post/${post.postId}`, {text: post.text})
            store.dispatch('fetchPosts')
        },
        deletePost: async (store, postId) => {
            await axios.delete(`/post/${postId}`)
            store.dispatch('fetchPosts')
        },
        fetchPosts: async store => {
            const {data} = await axios.get('/posts')
            store.commit('setPosts', data)
        }
    },
    modules: {},
    getters: {
        filteredPrivatePost: state => state.myPosts.filter(post => post.text.includes(state.searchKeyword)),
        filteredTodayPost: state => state.publicPosts.filter(post => DateUtil.isToday(post.date)).filter(post => post.text.includes(state.searchKeyword)),
        filteredAllPost: state => state.publicPosts.filter(post => post.text.includes(state.searchKeyword)),
    }
})
