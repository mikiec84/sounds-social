import Auth0Lock from 'auth0-lock'
import gql from 'graphql-tag'

import { apolloClient } from '../api/graphql/client'

// TODO: move key into separate file and re-setup git (force push)
// TODO: same with graph.cool endpoints
const lock = new Auth0Lock('SGs5RNYMDYxBjJnG5QXr9EvsyxUEIB9T', 'soundssocial.eu.auth0.com')

const ID_TOKEN_KEY = 'soundsocial_0auth_token'
const USER_ID_TOKEN_KEY = 'soundsocial_0auth_token_profile'

const createUserMutation = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String){
    createUser(authProvider: {auth0: {idToken: $idToken}}, username: $name, emailAddress: $emailAddress) {
      id
    }
  }
`

lock.on('authenticated', authResult => {
  localStorage.setItem(
    ID_TOKEN_KEY,
    authResult.accessToken
  )

  lock.getUserInfo(authResult.accessToken, (err, data) => {
    localStorage.setItem(USER_ID_TOKEN_KEY, data.sub)

    try {
      apolloClient.mutate({
        mutation: createUserMutation,
        variables: {
          name: data.screen_name || data.nickname,
          idToken: authResult.idToken,
          emailAddress: authResult.email,
        },
      })

      window.location.reload() // todo: fix this
    } catch (e) {
      console.log(e)
    }
  })
})

export const getUsername = async () => {
  const response = await apolloClient.query({
    query: gql`
      query ($id: String!) {
        User(auth0UserId: $id) {
          username
        }
      }
    `,
    variables: {
      id: getUserId(),
    },
  })

  return response.data.User.username
}

export const getUserId = () => localStorage.getItem(USER_ID_TOKEN_KEY)
export const isAuthenticated = () => !!localStorage.getItem(ID_TOKEN_KEY)
export const showLoginModal = () => lock.show()
export const logOut = () => localStorage.removeItem(ID_TOKEN_KEY)

