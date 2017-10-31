import ApolloClient, { from } from 'apollo-client-preset'
import { httpLink } from './httpLink'
import { authMiddleware } from './middleware/AuthMiddleware'

const apolloClient = new ApolloClient({
  link: from([
    authMiddleware,
    httpLink,
  ]),
})

export { apolloClient }
