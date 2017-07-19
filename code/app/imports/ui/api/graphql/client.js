import ApolloClient from 'apollo-client'
import { meteorClientConfig } from 'meteor/apollo'

const apolloClient = new ApolloClient(meteorClientConfig())

export { apolloClient }
