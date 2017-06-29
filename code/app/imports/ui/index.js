import { Meteor } from 'meteor/meteor'
import 'tachyons/css/tachyons.css'

import './styles/index.scss'
import { app } from './app'

Meteor.startup(() => {
  app.$mount('#app')
})
