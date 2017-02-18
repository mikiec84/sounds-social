import Vue from 'vue'
import Router from 'vue-router'

import { isAuthenticated } from './api/AuthApi'
import HomeComponent from './components/pages/HomePage.vue'
import UploadComponent from './components/pages/UploadPage.vue'
import ProfileComponent from './components/pages/ProfilePage.vue'

import TrackDetailComponent from './components/pages/track/TrackDetailPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/upload', component: UploadComponent },
    { path: '/profile/:id', component: ProfileComponent },
    { path: '/tracks/:id', component: TrackDetailComponent },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && !isAuthenticated()) {
    router.push('/')
  } else {
    next()
  }
})

export default router
