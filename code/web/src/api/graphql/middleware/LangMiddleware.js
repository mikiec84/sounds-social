import { ApolloLink } from 'apollo-client-preset'
import { getLanguage } from '../../../startup/StartupUserLanguage'

export const langMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'accept-language': getLanguage(),
    }
  }))

  return forward(operation)
})
