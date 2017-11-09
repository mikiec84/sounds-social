import Vue from 'vue'
import Router from 'vue-router'

import { isAuthenticated } from './api/AuthApi'
import store from './store'

import HomePage from './components/pages/TheHomePage.vue'
import DiscoverPage from './components/pages/sounds/TheDiscoverPage.vue'
import UploadPage from './components/pages/TheUploadPage.vue'
import ProfilePage from './components/pages/TheProfilePage.vue'
import ProfileEditPage from './components/pages/profile/TheProfileEditPage.vue'
import SoundDetailPage from './components/pages/track/TheSoundDetailPage.vue'
import SoundEditPage from './components/pages/track/TheSoundEditPage.vue'

Vue.use(Router)

const closePlayerListIfVisible = () => {
  if (store.state.soundPlayer.playerPlayingNowVisible) {
    store.dispatch('closePlayerPlayingNowList')
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: HomePage },
    { name: 'discover', path: '/discover', component: DiscoverPage },
    { name: 'upload', path: '/upload', component: UploadPage },
    { name: 'profile-detail', path: '/profile/:id', component: ProfilePage },
    { name: 'profile-edit', path: '/profile/:id/edit', component: ProfileEditPage },
    { name: 'sound-detail', path: '/sounds/:id', component: SoundDetailPage },
    { name: 'sound-edit', path: '/sounds/:id/edit', component: SoundEditPage },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (process && process.env && process.env.VUE_ENV === 'server') {
    return next()
  }

  const authenticated = await isAuthenticated()

  if (to.path !== '/' && !authenticated) {
    router.push({ name: 'home' })
  } else {
    closePlayerListIfVisible()
    next()
  }
})

export default router
