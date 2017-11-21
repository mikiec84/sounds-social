import moment from 'moment'
import { get, flow } from 'lodash/fp'
import { check, Match } from 'meteor/check'
import { notificationCollection } from '../../data/collection/NotificationCollection'
import { userCollection } from '../../data/collection/UserCollection'
import { getNotificationReferenceTitle } from '../../data/Notification/getNotificationReferenceTitle'
import { getNotificationImageUrl } from '../../data/Notification/getNotificationImageUrl'

const typeDef = `
type Notification {
  # General type, for example "added", "removed"
  notificationType: String
  # Type of notification, for example "sound"
  referenceType: String
  # ID that is referenced
  referenceId: String
  # Title of referenced entity
  referenceTitle: String
  # Image URL for the notification
  imageUrl: String
  # User that is the cause of the notification
  author: User
  createdAtFormatted: String
}

extend type Query {
  listNotifications(limit: Int): [Notification]
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {
    Notification: {
      author: flow(get('authorId'), id => userCollection.findOneById(id)),
      imageUrl: root => getNotificationImageUrl(root),
      referenceTitle: root => getNotificationReferenceTitle(root),
      createdAtFormatted: (root, args, context) => {
        check(context.userLanguage, String)
        moment.locale(context.userLanguage)
        return moment(root.createdAt).fromNow()
      },
    },
    Query: {
      listNotifications(root, args, context) {
        if (!context.userId) return []
        check(context.userId, String)
        check(args.limit, Match.Maybe(Number))

        return notificationCollection.findForUser(context.userId, args.limit).fetch()
      },
    },
  },
}
