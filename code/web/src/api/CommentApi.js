import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'

export const addComment = (id, content) => apolloClient.mutate({
  mutation: gql`
    mutation AddComment($id: String!, $content: String!) {
      addComment(referenceId: $id, content: $content) {
        id
      }
    }
  `,
  variables: {
    id,
    content,
  },
  refetchQueries: ['ListComments'],
})

export const removeComment = id => apolloClient.mutate({
  mutation: gql`
    mutation RemoveComment($id: String!) {
      removeComment(id: $id) {
        id
      }
    }
  `,
  variables: { id },
  refetchQueries: ['ListComments'],
})
