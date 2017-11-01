import Vue from 'vue'
import vSelect from 'vue-select'

import App from './App.vue'
import store from './store'
import router from './routes'
import VueApollo from 'vue-apollo'
import { sync } from 'vuex-router-sync'
import { apolloClient } from './api/graphql/client'
import AuthMixin from './mixins/AuthMixin'
import { LodashPlugin } from './plugins/LodashPlugin'
import { I18NPlugin } from './plugins/I18NPlugin'
import './startup/RegisterPureComponents'
import './startup/UserLanguage'

sync(store, router)

Vue.component('v-select', vSelect)
Vue.mixin(AuthMixin)
Vue.use(VueApollo)
Vue.use(LodashPlugin)
Vue.use(I18NPlugin)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

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
