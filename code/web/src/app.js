import Vue from 'vue'

import App from './App.vue'
import store from './store'
import router from './routes'
import { sync } from 'vuex-router-sync'
import './startup/StartupRegisterPureComponents'
import './startup/StartupUserLanguage'
import './startup/StartupI18N'
import './startup/StartupVueSelect'
import './startup/StartupAuthMixin'
import './startup/StartupLodashPlugin'
import { apolloProvider } from './startup/StartupApolloProvider'

sync(store, router)

const app = new Vue({
  router,
  store,
  apolloProvider,
  ...App,
})

export {
  router,
  store,
  app,
}
