import { HttpLink } from 'apollo-client-preset'

export const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
})
