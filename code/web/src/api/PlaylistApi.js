import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'

export const playlistToAddListQuery = gql`
  query PlaylistToAddList {
    playlistToAddList: listPlaylist {
      _id
      name
      description
      isPublic
    }
  }
`

export const playlistListQuery = gql`
  query PlaylistList {
    playlistList: listPlaylist {
      _id
      name
      image {
        url
      }
      isPublic
    }
  }
`

export const createPlaylist = name => apolloClient.mutate({
  mutation: gql`
    mutation AddPlaylist($name: String!) {
      newPlaylist: createPlaylist(name: $name) {
        _id
      }
    }
  `,
  variables: {
    name
  },
  refetchQueries: ['PlaylistToAddList'],
})

export const addSoundToPlaylist = (playlistId, soundId) => apolloClient.mutate({
  mutation: gql`
    mutation AddSoundToPlaylist($playlistId: String! $soundId: String!) {
      playlist: addSoundToPlaylist(playlistId: $playlistId, soundId: $soundId) {
        _id
      }
    }
  `,
  variables: { playlistId, soundId },
})
