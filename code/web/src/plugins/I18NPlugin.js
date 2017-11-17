import i18next from 'i18next'
import { getLanguage } from '../startup/StartupUserLanguage'
import { messages } from '../translations/messages'

export const initI18N = () => i18next.init({
  lng: getLanguage(),
  resources: messages,
})

initI18N()

export const I18NPlugin = {
  install (Vue) {
    Vue.prototype.$t = (...args) => i18next.t(...args)
  },
}
