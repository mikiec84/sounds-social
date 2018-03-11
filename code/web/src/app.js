import Vue from 'vue'

import App from './App.vue'
import store from './store'
import router from './routes'
import { sync } from 'vuex-router-sync'
import './startup/StartupRegisterPureComponents'
import './startup/StartupUserLanguage'
import './startup/StartupPlugins'
import './startup/StartupVueSelect'
import './startup/StartupAuthMixin'
import './startup/StartupFormValidate'
import './startup/StartupPopover'
import { apolloProvider } from './startup/StartupApolloProvider'

sync(store, router)

const app = new Vue({
  router,
  store,
  apolloProvider,
  ...App
})

export { router, store, app }
