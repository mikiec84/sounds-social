import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'

const networkInterface = createBatchingNetworkInterface({
  uri: `http://localhost:3000/graphql`,
})

const apolloClient = new ApolloClient({
  networkInterface,
})

export { apolloClient }
