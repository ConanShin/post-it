import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Main'
import Post from '../views/Post/Main.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/post',
        name: 'Post',
        component: Post
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
