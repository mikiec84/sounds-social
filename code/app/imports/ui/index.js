import { Meteor } from 'meteor/meteor'
import Vue from 'vue'
import 'tachyons/css/tachyons.css'

import './styles/index.scss'
import { router, store, App } from './app'

Meteor.startup(() => {
  (new Vue({
    router,
    store,
    ...App,
  })).$mount('app')
})
