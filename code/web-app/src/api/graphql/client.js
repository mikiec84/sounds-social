import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: `http://localhost:3000/graphql`,
})

const apolloClient = new ApolloClient({
  networkInterface,
})

export { apolloClient }
