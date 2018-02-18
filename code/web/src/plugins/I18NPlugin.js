import i18next from 'i18next'
import { messages } from '../translations/messages'
import { getLanguage } from '../api/localStorage/LanguageStorage'

const language = getLanguage()

export const initI18N = () => {
  i18next.init({
    lng: getLanguage(),
    resources: messages,
  })
}

initI18N()

export const I18NPlugin = {
  install (Vue) {
    Vue.prototype.$i18nUserLanguage = language
    Vue.prototype.$t = (...args) => i18next.t(...args)
  },
}
