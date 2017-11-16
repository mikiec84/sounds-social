import gql from 'graphql-tag'

export const listRecentNotificationsQuery = gql`
  query ListNotifications {
    listNotifications(limit: 3) {
      notificationType
      referenceType
      referenceId
      referenceTitle
      imageUrl
      author {
        _id
        username
      }
    }
  }
`
