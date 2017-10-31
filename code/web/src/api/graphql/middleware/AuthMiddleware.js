import { ApolloLink } from 'apollo-client-preset'

export const authMiddleware = new ApolloLink((operation, forward) => {
  // TODO: doesn't work!
  // TODO: import { getLoginToken } from 'meteor-apollo-accounts'
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('Meteor.loginToken') || null,
    }
  }))

  return forward(operation)
})
