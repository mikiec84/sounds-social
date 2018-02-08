import gql from 'graphql-tag'

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
