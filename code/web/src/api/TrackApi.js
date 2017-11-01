import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'

export const detailTrackQuery = gql`
  query DetailTrack($id: String!) {
    getTrack(_id: $id) {
      _id
      name
      description
      createdAt
      fileId
      file {
        url
      }
      isRemovable
      coverFile {
        url
      }
      creator {
        _id
        username
      }
    }
  }
`

export const editTrackFormQuery = gql`
  query EditTrackForm($id: String!) {
    trackToEdit: getTrack(_id: $id) {
      name
      description
      fileId
      creator {
        _id
        username
      }
    }
  }
`

export const updateTrack = (id, data) => apolloClient.mutate({
  mutation: gql`
    mutation EditTrack($id: String! $data: TrackInput!) {
      updateTrack(_id: $id data: $data) {
        _id
      }
    }
  `,
  variables: {
    id,
    data,
  },
  fetchPolicy: 'network-only',
})

export const removeTrack = id => apolloClient.mutate({
  mutation: gql`
    mutation RemoveTrack($id: String!) {
      deleteTrack(_id: $id) {
        _id
      }
    }
  `,
  variables: { id },
  refetchQueries: ['DetailTrack'],
})
