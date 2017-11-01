import gql from 'graphql-tag'
import { apolloClient } from '../api/graphql/client'

const { localStorage } = window
const LANGUAGE_KEY = 'user_lang_sounds_social'

export const getLanguage = () => localStorage.getItem(LANGUAGE_KEY)
export const changeLanguage = (lang) => localStorage.setItem(LANGUAGE_KEY, lang)

if (!getLanguage()) {
  apolloClient.query({
    query: gql`
      query UserProfileLanguageInit {
        currentUser {
          profile {
            language
          }
        }
      }
    `
  }).then(({ data }) => {
    changeLanguage(data.currentUser.profile.language)
    window.location.reload()
  })
}
