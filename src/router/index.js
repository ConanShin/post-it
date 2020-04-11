import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Main'
import Post from '../views/Post/Main.vue'
import SessionStorage from '@/utils/SessionStorage'

Vue.use(VueRouter)

const authCheck = (from, to, next) => {
    if (!SessionStorage.user().id) next('/')
    else next()
}

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/post',
        name: 'Post',
        component: Post,
        beforeEnter: authCheck
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
