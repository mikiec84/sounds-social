import gql from 'graphql-tag'

export const listRecentNotificationsQuery = gql`
  query ListNotifications($limit: Int) {
    listNotifications(limit: $limit) {
      notificationType
      referenceType
      referenceId
      referenceTitle
      imageUrl
      createdAt {
        fromNow
        formatted(format: "DD.MM.YYYY hh:mm:ss")
      }
      author {
        _id
        username
      }
    }
  }
`
