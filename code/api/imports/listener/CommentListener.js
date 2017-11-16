import { Comments } from 'meteor/arkham:comments-ui'
import { notificationCollection } from '../data/collection/NotificationCollection'
import { trackCollection } from '../data/collection/TrackCollection'
import { COMMENT_ADDED } from '../data/Type/NotificationTypes'
import { SOUND } from '../data/Type/NotificationReferenceTypes'
import { USEtesttestR } from '../data/Type/UserReferenceTypes'

Comments.config({
  onEvent: (name, action, payload) => {
    if (name === 'comment' && action === 'add') {
      const { referenceId, userId } = payload
      const track = trackCollection.findOneById(referenceId)

      if (!track) throw new Error('Track not found')

      if (track.creatorId === userId) return null

      notificationCollection.addNotification(
        COMMENT_ADDED,
        SOUND,
        referenceId,
        USER,
        userId,
        track.creatorId,
      )
    }
  }
})
