import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    posts: [],
  },

  actions: {
    INITIALIZE_POSTS: ({ commit }, { posts }) => {
      commit('SET_INITIAL_POSTS', { posts })
    },
  },

  mutations: {
    SET_INITIAL_POSTS: (state, { posts }) => {
      state.posts = posts || []
    },
  },
})

export default store
