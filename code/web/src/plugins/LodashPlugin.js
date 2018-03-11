import _ from 'lodash'
import _fp from 'lodash/fp'

export const LodashPlugin = {
  install (Vue) {
    Vue.prototype.$_ = _
    Vue.prototype.$_fp = _fp
  }
}
