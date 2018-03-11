import gql from 'graphql-tag'
import { apolloClient } from '../graphql/client'

export const uploadCover = (soundId, fileData) =>
  apolloClient.mutate({
    mutation: gql`
      mutation UploadCover($soundId: String!, $fileData: FileData!) {
        addCoverFile(soundId: $soundId, fileData: $fileData) {
          _id
        }
      }
    `,
    variables: {
      soundId,
      fileData
    },
    fetchPolicy: 'network-only',
    refetchQueries: ['DetailSound']
  })
