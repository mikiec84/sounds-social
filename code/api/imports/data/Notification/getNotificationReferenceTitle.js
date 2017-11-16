import { trackCollection } from '../collection/TrackCollection'
import { SOUND } from '../Type/NotificationReferenceTypes'

export const getNotificationReferenceTitle = ({ referenceType, referenceId }) => {
  if (referenceType === SOUND) {
    return trackCollection.findOneById(referenceId).name
  }

  throw new Error(`Reference type invalid: ${referenceType}`)
}
