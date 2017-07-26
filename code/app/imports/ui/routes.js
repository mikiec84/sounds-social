import Vue from 'vue'
import Router from 'vue-router'

import { isAuthenticated } from './api/AuthApi'
import HomePage from './components/pages/HomePage.vue'
import DiscoverPage  from './components/pages/sounds/DiscoverPage.vue'
import UploadPage from './components/pages/UploadPage.vue'
import ProfilePage from './components/pages/ProfilePage.vue'

import TrackDetailPage from './components/pages/track/TrackDetailPage.vue'
import TrackEditPage from './components/pages/track/TrackEditPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: HomePage },
    { name: 'discover', path: '/discover', component: DiscoverPage },
    { path: '/upload', component: UploadPage },
    { path: '/profile/:id', component: ProfilePage },
    { path: '/tracks/:id', component: TrackDetailPage },
    { path: '/tracks/:id/edit', component: TrackEditPage },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (process && process.env && process.env.VUE_ENV === 'server') {
    return next()
  }

  const authenticated = await isAuthenticated()


  if (to.path !== '/' && !authenticated) {
    router.push('/')
  } else {
    next()
  }
})

export default router
