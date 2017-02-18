import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: `https://api.graph.cool/simple/v1/ciza7bn1537xm016692k04bgn`,
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
