import Vue from 'vue'
import App from './App.vue'
import "./assets/scss/style.scss"
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import Card from "./components/Card.vue"
import ListCard from "./components/ListCard.vue"
Vue.use(VueAwesomeSwiper)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  // baseURL: 'http://localhost:3000/web/api/'
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})

Vue.component("m-card", Card)
Vue.component("m-list-card", ListCard)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
