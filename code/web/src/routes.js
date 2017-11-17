import Vue from 'vue'
import Router from 'vue-router'
import { constant } from 'lodash'

import { isAuthenticated } from './api/AuthApi'
import store from './store'

import HomePage from './components/pages/TheHomePage.vue'
import DiscoverPage from './components/pages/sounds/TheDiscoverPage.vue'
import UploadPage from './components/pages/TheUploadPage.vue'
import ProfilePage from './components/pages/TheProfilePage.vue'
import ProfileEditPage from './components/pages/profile/TheProfileEditPage.vue'
import SoundDetailPage from './components/pages/track/TheSoundDetailPage.vue'
import SoundEditPage from './components/pages/track/TheSoundEditPage.vue'
import SoundsPage from './components/pages/sounds/TheSoundsPage'
import SearchPage from './components/pages/TheSearchPage.vue'

Vue.use(Router)

const closePlayerListIfVisible = () => {
  if (store.state.soundPlayer.playerPlayingNowVisible) {
    store.dispatch('closePlayerPlayingNowList')
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage,
      meta: { needsAuth: constant(false) },
    },
    {
      name: 'discover',
      path: '/discover',
      component: DiscoverPage,
      meta: { needsAuth: constant(false) },
    },
    {
      name: 'sounds',
      path: '/sounds',
      component: SoundsPage,
      meta: { needsAuth: constant(false) },
    },
    {
      name: 'upload',
      path: '/upload',
      component: UploadPage,
      meta: { needsAuth: constant(true) },
    },
    {
      name: 'search',
      path: '/search',
      component: SearchPage,
      meta: { needsAuth: constant(false) },
    },
    {
      name: 'profile-detail',
      path: '/profile/:id',
      component: ProfilePage,
      meta: { needsAuth: ({ params }) => params.id === 'me' },
    },
    {
      name: 'profile-edit',
      path: '/profile/:id/edit',
      component: ProfileEditPage,
      meta: { needsAuth: constant(true) },
    },
    {
      name: 'sound-detail',
      path: '/sounds/:id',
      component: SoundDetailPage,
      meta: { needsAuth: constant(false) },
    },
    {
      name: 'sound-edit',
      path: '/sounds/:id/edit',
      component: SoundEditPage,
      meta: { needsAuth: constant(false) },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (process && process.env && process.env.VUE_ENV === 'server') {
    return next()
  }

  const authenticated = await isAuthenticated()
  Vue.prototype.userIsAuthenticated = authenticated

  if (!authenticated && to.meta.needsAuth(to)) {
    router.push({ name: 'home' })
  } else {
    closePlayerListIfVisible()
    next()
  }
})

export default router
