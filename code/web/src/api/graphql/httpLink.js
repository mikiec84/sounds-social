import { BatchHttpLink } from 'apollo-link-batch-http'

export const httpLink = new BatchHttpLink({
  uri: window.location.href.includes('localhost')
    ? 'http://localhost:3000/graphql'
    : 'https://sounds-social-dev.eu.meteorapp.com/graphql'
})
