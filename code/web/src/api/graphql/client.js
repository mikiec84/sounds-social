import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient, { from } from 'apollo-client-preset'
import { authMiddleware } from './middleware/AuthMiddleware'
import { langMiddleware } from './middleware/LangMiddleware'
import { httpLink } from './httpLink'

export const apolloClient = new ApolloClient({
  link: from([
    authMiddleware,
    langMiddleware,
    httpLink,
  ]),
  cache: new InMemoryCache({
    dataIdFromObject: o => o.uuid
  })
})
