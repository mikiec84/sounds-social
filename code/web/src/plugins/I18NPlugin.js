import i18next from 'i18next'
import { getLanguage } from '../startup/StartupUserLanguage'
import { messages } from '../translations/messages'

i18next.init({
  lng: getLanguage(),
  resources: messages,
})

export const I18NPlugin = {
  install (Vue) {
    Vue.prototype.$t = msg => i18next.t(msg)
  },
}
