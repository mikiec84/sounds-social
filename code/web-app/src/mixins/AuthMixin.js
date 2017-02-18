import gql from 'graphql-tag'

import {
  isAuthenticated,
  logOut,
  showLoginModal,
  lock,
  TOKEN_KEY,
} from '../api/AuthApi'
import { apolloClient } from '../api/graphql/client'

const createUserMutation = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String){
    createUser(authProvider: {auth0: {idToken: $idToken}}, username: $name, emailAddress: $emailAddress) {
      id
    }
  }
`

// TODO: put this logic into auth api
lock.on('authenticated', authResult => {
  localStorage.setItem(
    TOKEN_KEY,
    authResult.accessToken
  )

  window.location.reload() // todo: fix this

  lock.getUserInfo(authResult.accessToken, (err, data) => {
    try {
      apolloClient.mutate({
        mutation: createUserMutation,
        variables: {
          name: data.screen_name || data.nickname,
          idToken: authResult.idToken,
          emailAddress: authResult.email,
        },
      })
    } catch (e) {
      console.log(e)
    }
  })
})

export default {
  data() {
    return {
      isAuthenticated: isAuthenticated(),
    }
  },
  methods: {
    authLogIn() {
      showLoginModal()
    },
    authLogOut() {
      logOut()
      window.location.reload()
    },
  },
}
