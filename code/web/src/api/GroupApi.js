import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'

export const GroupDetailedFieldsFragment = gql`
  fragment GroupDetailedFields on Group {
    _id
    name
    type
    description
    isFollowedByCurrentUser
    canFollow
    isEditable
    avatarFile {
      url
    }
    members {
      _id
      username
      profile {
        avatarFile {
          url
        }
      }
    }
  }
`

export const createGroup = (name, type, description = '') => apolloClient.mutate({
  mutation: gql`
    mutation CreateGroup($name: String! $type: String! $description: String) {
      group: createGroup(data: { name: $name type: $type description: $description }) {
        _id
      }
    }
  `,
  variables: { name, type, description },
})

export const follow = () => {}
export const unfollow = () => {}

export const groupPageQuery = gql`
  query GroupPage($id: String!) {
    singleGroup: getGroup(_id: $id) {
      ...GroupDetailedFields
    }
  }
  ${GroupDetailedFieldsFragment}
`
