import { ApolloLink } from 'apollo-client-preset'

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'meteor-login-token': localStorage.getItem('Meteor.loginToken') || null
    }
  }))

  return forward(operation)
})
