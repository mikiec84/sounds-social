import gql from 'graphql-tag'
import { get } from 'lodash/fp'
import { logout, loginWithPassword, createUser as apolloCreateUser, userId } from 'meteor-apollo-accounts'
import { apolloClient } from './graphql/client'

export const getUsername = async () => {
  const userData = await apolloClient.query({
    query: gql`
      query CurrentUser($id: String!) {
        getUser(_id: $id) {
          username
        }
      }
    `,
    variables: {
      id: await getUserId(),
    },
  })

  return get('data.getUser.username')(userData)
}

export const getUserId = () => userId()

export const isAuthenticated = async () => !!(await userId())

export const doLogin = (username, password) => loginWithPassword(
  { username, password },
  apolloClient,
)

export const createUser = (username, password) => apolloCreateUser(
  { username, password },
  apolloClient,
)

export const logOut = () => logout(apolloClient)
