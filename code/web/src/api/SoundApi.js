import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'

const listSoundFragment = gql`
  fragment ListSoundFields on Sound {
    _id
    name
    isPublic
    coverFile {
      url
    }
    description
    createdAt {
      fromNow
    }
    file {
      url
    }
    creator {
      _id
      username
    }
  }
`

export const detailSoundQuery = gql`
  query DetailSound($id: String!) {
    getSound(_id: $id) {
      _id
      name
      description
      createdAt {
        fromNow
      }
      fileId
      isPublic
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
      isPublic
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

export const publishSound = id => apolloClient.mutate({
  mutation: gql`
    mutation PublishSound($id: String!) {
      publishSound(soundId: $id) {
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

export const listSoundDefaultQuery = gql`
  query SoundListQuery($userId: String!, $loggedInFeed: String!) {
    listSound(filters: [{ key: "user", value: $userId }, { key: "loggedInFeed", value: $loggedInFeed }]) {
      ...ListSoundFields
    }
  }
  ${listSoundFragment}
`

export const exploreCoversQuery = gql`
  query SoundListQuery {
    exploreCovers: listSound(limit: 8, filters: [{ key: "user", value: "" }, { key: "loggedInFeed", value: "false" }]) {
      _id
      coverFile {
        url
      }
    }
  }
`

export const searchSoundQuery = gql`  
  query SearchSoundsQuery($query: String!) {
    listSound: searchSound(query: $query) {
      ...ListSoundFields
    }
  }
  ${listSoundFragment}
`

export const playlistSoundsQuery = gql`  
  query PlaylistSoundsQuery($playlistId: String!) {
    listSound: listSoundForPlaylist(playlistId: $playlistId) {
      ...ListSoundFields
    }
  }
  ${listSoundFragment}
`

export const groupSoundsQuery = gql`  
  query GroupSoundsQuery($groupId: String!) {
    listSound(filters: [{ key: "group", value: $groupId }]) {
      ...ListSoundFields
    }
  }
  ${listSoundFragment}
`
