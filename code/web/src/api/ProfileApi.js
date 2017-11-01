import gql from 'graphql-tag'
import { apolloClient } from './graphql/client'

export const updateProfile = profileData => apolloClient.mutate({
  mutation: gql`
    mutation ProfileUpdateMutation($profileData: ProfileData!) {
      updateUserProfile(profileData: $profileData) {
        description
        language
      }
    }
  `,
  variables: { profileData },
  fetchPolicy: 'network-only',
})

export const follow = id => apolloClient.mutate({
  mutation: gql`
    mutation FollowMutation($id: String!) {
      followUser(toFollowId: $id) {
        _id
      }
    }
  `,
  variables: { id },
  refetchQueries: ['ProfilePage', 'TrackListQuery'],
})

export const unfollow = id => apolloClient.mutate({
  mutation: gql`
    mutation UnfollowMutation($id: String!) {
      unfollowUser(toUnfollowId: $id) {
        _id
      }
    }
  `,
  variables: { id },
  refetchQueries: ['ProfilePage', 'TrackListQuery'],
})
