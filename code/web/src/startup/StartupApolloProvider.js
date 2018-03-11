import Vue from 'vue'
import VueApollo from 'vue-apollo'

import { apolloClient } from '../api/graphql/client'

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)
