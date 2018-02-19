import { startCase } from 'lodash/fp'
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
    websiteUrl
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

export const saveGroup = (id, name, type, websiteUrl, avatarFile, description = '') => {
  const action = id ? 'update' : 'create'

  return apolloClient.mutate({
    mutation: gql`
      mutation ${startCase(action)}Group(
          ${id ? '$id: String!' : ''}
          $name: String! 
          $type: String! 
          $websiteUrl: String 
          $avatarFile: FileData 
          $description: String
      ) {
        group: ${action}Group(${id ? '_id: $id' : ''} data: { name: $name type: $type websiteUrl: $websiteUrl avatarFile: $avatarFile description: $description }) {
          _id
        }
      }
    `,
    variables: { id, name, type, websiteUrl, avatarFile, description },
  })
}

export const removeGroup = id => apolloClient.mutate({
  mutation: gql`
    mutation RemoveGroup($id: String!) {
      group: removeGroup(_id: $id) {
        _id
      }
    }
  `,
  variables: { id },
})

export const follow = id => apolloClient.mutate({
  mutation: gql`
    mutation FollowGroupMutation($id: String!) {
      followGroup(toFollowId: $id) {
        _id
      }
    }
  `,
  variables: { id },
  refetchQueries: ['GroupPage'],
})

export const unfollow = id => apolloClient.mutate({
  mutation: gql`
    mutation UnfollowGroupMutation($id: String!) {
      unfollowGroup(toUnfollowId: $id) {
        _id
      }
    }
  `,
  variables: { id },
  refetchQueries: ['GroupPage'],
})

export const groupPageQuery = gql`
  query GroupPage($id: String!) {
    singleGroup: getGroup(_id: $id) {
      ...GroupDetailedFields
    }
  }
  ${GroupDetailedFieldsFragment}
`

export const groupFormDataQuery = gql`
  query GroupFormData($id: String!) {
    groupFormData: getGroup(_id: $id) {
      name
      type
      description
      websiteUrl
    }
  }
`

export const groupOptionDataQuery = gql`
  query GroupOptionData {
    groupOptionData: listGroupForUser {
      _id
      name
    }
  }
`
