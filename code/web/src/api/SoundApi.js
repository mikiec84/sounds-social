import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'

export const detailSoundQuery = gql`
  query DetailSound($id: String!) {
    getSound(_id: $id) {
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
  query EditSoundForm($id: String!) {
    soundToEdit: getSound(_id: $id) {
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
    mutation EditSound($id: String! $data: SoundInput!) {
      updateSound(_id: $id data: $data) {
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
    mutation RemoveSound($id: String!) {
      deleteSound(_id: $id) {
        _id
      }
    }
  `,
  variables: { id },
  refetchQueries: ['DetailSound'],
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
  refetchQueries: ['DetailSound'],
})

export const searchSoundQuery = gql`
  query SearchSoundsQuery($query: String!) {
    listSound: searchSound(query: $query) {
      _id
      name
      coverFile {
        url
      }
      description
      createdAt
      file {
        url
      }
      creator {
        _id
        username
      }
    }
  }
`
