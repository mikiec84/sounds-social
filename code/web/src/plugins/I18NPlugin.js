import i18next from 'i18next'
import { getLanguage } from '../startup/StartupUserLanguage'
import { messages } from '../translations/messages'

const language = getLanguage()

export const initI18N = () => i18next.init({
  lng: language,
  resources: messages,
})

initI18N()

export const I18NPlugin = {
  install (Vue) {
    Vue.prototype.$i18nUserLanguage = language
    Vue.prototype.$t = (...args) => i18next.t(...args)
  },
}
