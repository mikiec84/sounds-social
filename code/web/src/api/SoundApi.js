import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'

export const detailSoundQuery = gql`
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
      playsCount
    }
  }
`

export const editSoundFormQuery = gql`
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

export const updateSound = (id, data) => apolloClient.mutate({
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

export const removeSound = id => apolloClient.mutate({
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

export const startPlayingSound = id => apolloClient.mutate({
  mutation: gql`
    mutation StartPlayingSound($id: String!) {
      startPlayingSound(soundId: $id) {
        soundPlayingId
      }
    }
  `,
  variables: { id },
})

export const countPlayingSound = (id, soundPlayingId) => apolloClient.mutate({
  mutation: gql`
    mutation StartPlayingSound($id: String! $soundPlayingId: String!) {
      countPlayingSound(soundPlayingId: $soundPlayingId soundId: $id) {
        soundPlayingId
      }
    }
  `,
  variables: { id, soundPlayingId },
  refetchQueries: ['DetailTrack'],
})
