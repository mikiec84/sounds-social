import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from './components/stateful/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomeComponent },
  ],
})
