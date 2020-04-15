import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ClickOutside from 'vue-click-outside'
import Calendar from 'vue-mobile-calendar'
import DateUtil from '@/utils/Date'

Vue.config.productionTip = false

Vue.directive('click-outside', ClickOutside)
Vue.use(Calendar)
Vue.prototype.DateUtil = DateUtil

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
