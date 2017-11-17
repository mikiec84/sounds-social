import gql from 'graphql-tag'

export const listRecentNotificationsQuery = gql`
  query ListNotifications($limit: Int) {
    listNotifications(limit: $limit) {
      notificationType
      referenceType
      referenceId
      referenceTitle
      imageUrl
      createdAtFormatted
      author {
        _id
        username
      }
    }
  }
`
