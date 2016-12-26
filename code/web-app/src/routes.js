import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from './components/pages/Home.vue'
import UploadComponent from './components/pages/Upload.vue'
import ProfileComponent from './components/pages/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/upload', component: UploadComponent },
    { path: '/profile/:id', component: ProfileComponent },
  ],
})
