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
    alert(error)
})

export default new Vuex.Store({
    state: {
        disabledSearch: false,
        searchKeyword: '',
        myPosts: [],
        othersPosts: [],
    },
    mutations: {
        disableSearch: state => {
            state.disabledSearch = true
        },
        enableSearch: state => {
            state.disabledSearch = false
        },
        setSearchKeyword: (state, payload) => {
            state.searchKeyword = payload
        },
        setPosts: (state, payload) => {
            state.myPosts = payload.myPosts.map(post => {
                post.name = '나'
                post.newNote = post.text
                post.editable = false
                return post
            })
            state.othersPosts = payload.othersPosts
        },
        updatePost: (state, postId) => {
            const updatePost = state.myPosts.find(post => post.uid === postId)
            updatePost.text = updatePost.newNote
        },
        publishPost: (state, postId) => {
            state.myPosts.find(post => post.uid === postId).private_yn = 'n'
        },
        addPost: (state, post) => {
            post.name = '나'
            post.newNote = post.text
            post.editable = false
            state.myPosts.push(post)
        },
        removePost: (state, postId) => {
            const removePostId = state.myPosts.findIndex(post => post.uid === postId)
            state.myPosts.splice(removePostId, 1)
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
            location.reload() // reload 없으면 카카오 로그인이 Promise return을 하지 않는다..?
        },
        updateUser: async store => {
            const {name} = SessionStorage.user()
            await axios.post('/user', {name})
        },
        newPost: async (store, text) => {
            const {data} = await axios.post('/post', {text})
            store.commit('addPost', data)
        },
        publishPost: async (store, postId) => {
            await axios.put(`/post/publish/${postId}`)
            store.commit('publishPost', postId)
        },
        updatePost: async (store, post) => {
            await axios.put(`/post/${post.uid}`, {text: post.newNote})
            store.commit('updatePost', post.uid)
        },
        deletePost: async (store, postId) => {
            await axios.delete(`/post/${postId}`)
            store.commit('removePost', postId)
        },
        fetchPosts: async store => {
            const {data} = await axios.get('/post/list')
            store.commit('setPosts', data)
        }
    },
    modules: {},
    getters: {
        disabledSearch: state => state.disabledSearch,
        searchKeyword: state => state.searchKeyword,
        filteredPrivatePost: state => {
            return state.myPosts
                .filter(post => post.private_yn === 'y')
                .filter(post => post.text.includes(state.searchKeyword))
        },
        filteredTodayPost: state => {
            const myPublicPosts = state.myPosts.filter(post => post.private_yn === 'n')
            return [...myPublicPosts, ...state.othersPosts]
                .filter(post => DateUtil.isToday(post.date))
                .filter(post => post.text.includes(state.searchKeyword))
        },
        filteredAllPost: state => {
            const myPublicPosts = state.myPosts.filter(post => post.private_yn === 'n')
            return [...myPublicPosts, ...state.othersPosts]
                .filter(post => post.text.includes(state.searchKeyword))
        }
    }
})
