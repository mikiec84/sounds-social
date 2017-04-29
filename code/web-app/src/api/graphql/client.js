import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: `http://localhost:3000/graphql`,
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // TODO: security
    req.options.headers.soundSocialUserId = localStorage.getItem('sound_social_user_id')
    next()
  }
}])

const apolloClient = new ApolloClient({
  networkInterface,
})

export { apolloClient }
