import ApolloClient, { from } from 'apollo-client-preset'
import { authMiddleware } from './middleware/AuthMiddleware'
import { langMiddleware } from './middleware/LangMiddleware'
import { httpLink } from './httpLink'

const apolloClient = new ApolloClient({
  link: from([
    authMiddleware,
    langMiddleware,
    httpLink,
  ]),
})

export { apolloClient }
