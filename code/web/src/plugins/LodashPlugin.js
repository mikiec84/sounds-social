import _ from 'lodash'

export const LodashPlugin = {
  install (Vue) {
    Vue.prototype.$_ = _
  },
}
