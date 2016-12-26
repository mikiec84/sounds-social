import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `http://localhost:5500/graphql`,
    transportBatching: true,
  }),
  queryTransformer: addTypename,
  dataIdFromObject: r => r.id,
})

export { apolloClient }
