import gql from 'graphql-tag'
import { apolloClient } from '../graphql/client'

export const uploadCover = (trackId, fileData) => apolloClient.mutate({
  mutation: gql`
    mutation UploadCover($trackId: String!, $fileData: FileData!) {
      addCoverFile(trackId: $trackId, fileData: $fileData) {
        _id
      }
    }
  `,
  variables: {
    trackId,
    fileData,
  },
  fetchPolicy: 'network-only',
})
