const { localStorage } = window
const LANGUAGE_KEY = 'user_lang_sounds_social'

export const getLanguage = () => localStorage.getItem(LANGUAGE_KEY)
export const changeLanguage = lang => localStorage.setItem(LANGUAGE_KEY, lang)
