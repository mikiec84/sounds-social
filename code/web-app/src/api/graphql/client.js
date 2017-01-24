import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: `http://localhost:3000/graphql`,
})

const apolloClient = new ApolloClient({
  networkInterface,
  dataIdFromObject: (result) => {
    if (result._id && result.__typename) {
      return result.__typename + result._id
    }

    return null
  },
})

export { apolloClient }
