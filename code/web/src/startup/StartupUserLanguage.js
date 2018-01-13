import gql from 'graphql-tag'
import moment from 'moment'
import { get } from 'lodash/fp'
import { apolloClient } from '../api/graphql/client'
import { getLanguage, changeLanguage } from '../api/localStorage/LanguageStorage'

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
    const lang = get('currentUser.profile.language')(data)

    if (lang) {
      changeLanguage(data.currentUser.profile.language)
      window.location.reload()
    }
  })
} else {
  moment.locale(getLanguage())
}
