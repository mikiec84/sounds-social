import i18next from 'i18next'
import { DEFAULT_IMAGE_URL } from '../getImage'

const messageMap = {
  comment_added: 'New comment on your {{type}} "{{title}}"',
}

export const mapNotification = notification => ({
  id: notification.referenceId,
  imageUrl: notification.imageUrl || DEFAULT_IMAGE_URL,
  createdAtFormatted: notification.createdAtFormatted,
  authorId: notification.author._id,
  authorName: notification.author.username,
  content: i18next.t(
    messageMap[notification.notificationType],
    {
      type: notification.referenceType,
      title: notification.referenceTitle,
    },
  ),
  originalNotification: notification,
})
