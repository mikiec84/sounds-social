import { HttpLink } from 'apollo-client-preset'

export const httpLink = new HttpLink({
  uri: (window.location.href.includes('localhost')
    ? 'http://localhost:3000/graphql'
    : 'https://sounds-social-dev.eu.meteorapp.com/graphql'),
})
