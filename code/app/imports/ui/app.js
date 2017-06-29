import Vue from 'vue'
import App from './components/App.vue'

import store from './store'
import router from './routes'
import VueApollo from 'vue-apollo'
import { sync } from 'vuex-router-sync'
import { apolloClient } from './api/graphql/client'
import AuthMixin from './mixins/AuthMixin'

sync(store, router)

Vue.mixin(AuthMixin)
Vue.use(VueApollo, { apolloClient })

export {
  router,
  store,
  App,
}
