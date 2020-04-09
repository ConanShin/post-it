import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ClickOutside from 'vue-click-outside'
import Calendar from 'vue-mobile-calendar'

Vue.config.productionTip = false

Vue.directive('click-outside', ClickOutside)
Vue.use(Calendar)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
