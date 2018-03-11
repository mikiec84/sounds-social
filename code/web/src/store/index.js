import Vue from 'vue'
import Vuex from 'vuex'

import { soundPlayerModule } from './StoreSoundPlayerModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    soundPlayer: soundPlayerModule
  }
})

export default store
