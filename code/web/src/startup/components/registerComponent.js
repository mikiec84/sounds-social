import Vue from 'vue'

export const registerComponent = (id, component) =>
  Vue.component(id, Vue.extend(component))
