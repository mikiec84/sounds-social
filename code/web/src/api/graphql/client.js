import ApolloClient, { HttpLink } from 'apollo-client-preset'

const apolloClient = new ApolloClient({
  networkInterface: new HttpLink({
    uri: 'http://localhost:3000/graphql',
  }),
  connectToDevTools: true,
})

export { apolloClient }
