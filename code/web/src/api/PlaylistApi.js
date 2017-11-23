import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'
import { ProfileBoxFieldsFragment } from './ProfileApi'

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
  query PlaylistList($userId: String!) {
    playlistList: listPlaylist(userId: $userId) {
      _id
      name
      image {
        url
      }
      isPublic
    }
  }
`

export const playlistDetailQuery = gql`
  query PlaylistDetail($id: String!) {
    playlistDetail: getPlaylist(playlistId: $id) {
      _id
      name
      description
      image {
        url
      }
      creator {
        ...ProfileBoxFields
      }
      isPublic
      isEditable
      isRemovable
    }
  }
  ${ProfileBoxFieldsFragment}
`

export const playlistEditQuery = gql`
  query PlaylistToEdit($id: String!) {
    playlistEdit: getPlaylist(playlistId: $id) {
      playlistId: _id
      name
      description
      isPublic
      sounds {
        _id
        name
      }
    }
  }
`

export const createPlaylist = name => apolloClient.mutate({
  mutation: gql`
    mutation CreatePlaylist($name: String!) {
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

export const updatePlaylist = ({ playlistId, soundIds, name, description = '', isPublic }) => apolloClient.mutate({
  mutation: gql`
    mutation UpdatePlaylist(
    $playlistId: String!
    $soundIds: [String]
    $name: String! 
    $description: String 
    $isPublic: Boolean
    ) {
      playlist: updatePlaylist(
        playlistId: $playlistId
        soundIds: $soundIds
        name: $name
        description: $description
        isPublic: $isPublic
      ) {
        _id
      }
    }
  `,
  variables: { playlistId, soundIds, name, description, isPublic },
  refetchQueries: ['PlaylistDetail'],
})

export const removePlaylist = (playlistId) => apolloClient.mutate({
  mutation: gql`
    mutation RemovePlaylist($playlistId: String!) {
      playlist: removePlaylist(playlistId: $playlistId) {
        _id
      }
    }
  `,
  variables: { playlistId },
})
