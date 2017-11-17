import { Comments } from 'meteor/arkham:comments-ui'
import { notificationCollection } from '../data/collection/NotificationCollection'
import { soundCollection } from '../data/collection/SoundCollection'
import { COMMENT_ADDED } from '../data/Type/NotificationTypes'
import { SOUND } from '../data/Type/NotificationReferenceTypes'
import { USER } from '../data/Type/UserReferenceTypes'

Comments.config({
  onEvent: (name, action, payload) => {
    if (name === 'comment' && action === 'add') {
      const { referenceId, userId } = payload
      const sound = soundCollection.findOneById(referenceId)

      if (!sound) throw new Error('Sound not found')

      if (sound.creatorId === userId) return null

      notificationCollection.addNotification(
        COMMENT_ADDED,
        SOUND,
        referenceId,
        USER,
        userId,
        sound.creatorId,
      )
    }
  }
})
