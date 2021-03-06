import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueRouter from '../router'
import KakaoConnector from '@/utils/Kakao'
import SessionStorage from '@/utils/SessionStorage'
Vue.use(Vuex)

axios.defaults.baseURL = 'https://postit.conanshin.tech:5002/'
// axios.defaults.baseURL = 'http://localhost:5002/'
axios.interceptors.request.use(config => {
    config.headers['user-id'] = SessionStorage.user().id
    return config
}, error => {
    console.log('Request Error', error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    console.log('Response Error', error)
    location.href = '/'
})

export default new Vuex.Store({
    state: {
        disabledSearch: false,
        searchKeyword: '',
        userName: SessionStorage.user().name || '',
        postColor: SessionStorage.load('myColor') || '#FFFFFF',
        myPosts: [],
        teamPosts: [],
        finishedPosts: [],
        workItems: []
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
                post.isMyPost = true
                post.newNote = post.text
                post.newDate = post.date
                post.editable = false
                return post
            })
            state.teamPosts = payload.teamPosts
            state.finishedPosts = payload.donePosts
        },
        setItems: (state, items) => {
            state.workItems = items
        },
        updatePost: (state, post) => {
            post.text = post.newNote
            post.date = post.newDate
        },
        publishPost: (state, postId) => {
            state.myPosts.find(post => post.uid === postId).private_yn = 'n'
        },
        unpublishPost: (state, postId) => {
            state.myPosts.find(post => post.uid === postId).private_yn = 'y'
        },
        addPost: (state, post) => {
            post.isMyPost = true
            post.newNote = post.text
            post.newDate = post.date
            post.editable = false
            post.name = state.userName
            post.color = state.postColor
            state.myPosts.push(post)
        },
        removePost: (state, postId) => {
            const removePostId = state.myPosts.findIndex(post => post.uid === postId)
            if (removePostId >= 0) state.myPosts.splice(removePostId, 1)
        },
        addItem: (state, item) => {
            state.workItems.push(item)
        }
    },
    actions: {
        login: async (store) => {
            await KakaoConnector.login()
            const kakaoUser = await KakaoConnector.fetchUserInfo()
            const kakaoName = kakaoUser.properties.nickname
            const user = SessionStorage.save('user', kakaoUser)
            const response = await axios.post('/user', {name: kakaoName})
            if (!response) {
                return alert('해당 사용자는 접근 권한이 없습니다.')
            }
            const {data: {name, color}} = response
            user.saveName(name)
            store.state.userName = name

            SessionStorage.save('myColor', color)
            store.state.postColor = color

            VueRouter.push({name: 'Post'})
        },
        logout: async store => {
            await KakaoConnector.logout()
            VueRouter.push({name: 'Login'})
            SessionStorage.flush()
            // location.reload() // reload 없으면 카카오 로그인이 Promise return을 하지 않는다..?
        },
        updateColor: async (store, color) => {
            store.state.postColor = color
            await axios.put('/user/color', {color})
            SessionStorage.save('myColor', color)
        },
        changeUserName: async (store, newName) => {
            store.state.userName = newName
            await axios.put('/user', {name: newName})
            SessionStorage.user().saveName(newName)
        },
        newPost: async (store, newPost) => {
            const {data} = await axios.post('/post', {date: newPost.date, text: newPost.text})
            store.commit('addPost', data)
        },
        unpublishPost: async (store, postId) => {
            await axios.put(`/post/unpublish/${postId}`)
            store.commit('unpublishPost', postId)
        },
        publishPost: async (store, postId) => {
            await axios.put(`/post/publish/${postId}`)
            store.commit('publishPost', postId)
        },
        updatePost: async (store, post) => {
            await axios.put(`/post/${post.uid}`, {date: post.newDate, text: post.newNote})
            store.commit('updatePost', post)
        },
        deletePost: async (store, postId) => {
            await axios.delete(`/post/${postId}`)
            store.commit('removePost', postId)
        },
        finishPost : async (store, post) => {
            const {uid, item_id} = post
            await axios.put(`/post/finish/${uid}` , {item_id: parseInt(item_id)})
        },
        fetchPosts: async store => {
            const {data: myPosts} = await axios.get('/post/me')
            const {data: teamPosts} = await axios.get('/post/team')
            const {data: donePosts} = await axios.get('/post/done')
            store.commit('setPosts', {myPosts, teamPosts, donePosts})
        },
        fetchItems: async store => {
            const {data: items} = await axios.get('/item')
            store.commit('setItems', items)
        },
        newItem: async (store, text) => {
            const {data} = await axios.post('/item', {"name" : text})
            store.commit('addItem', data)
        },
    },
    modules: {},
    getters: {
        disabledSearch: state => state.disabledSearch,
        searchKeyword: state => state.searchKeyword,
        userName: state => state.userName,
        items: state => state.workItems,
        postColor: state => state.postColor,
        filteredMyPosts: state => {
            const myProgressPosts = state.myPosts.filter(post => post.done_yn === 'n')
            return myProgressPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).filter(post => post.text.includes(state.searchKeyword))
        },
        filteredTeamPosts: state => {
            const myProgressPublicPosts = state.myPosts.filter(post => post.private_yn === 'n').filter(post => post.done_yn === 'n')
            const sortByDate = [...myProgressPublicPosts, ...state.teamPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
            return sortByDate.filter(post => post.text.includes(state.searchKeyword) || post.name.includes(state.searchKeyword))
        },
        filteredFinishedPosts: state => {
            const myDonePosts = state.myPosts.filter(post => post.done_yn === 'y')
            const sortByDate = [...myDonePosts, ...state.finishedPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
            sortByDate.forEach(post => {
                post.item_name = state.workItems.find(item => item.id === Number(post.item_id)).name
            })
            return sortByDate.filter(post => post.text.includes(state.searchKeyword) || post.name.includes(state.searchKeyword))
        },
        finishedMyPosts: state => state.myPosts.filter(post => post.done_yn === 'y')
    }
})
