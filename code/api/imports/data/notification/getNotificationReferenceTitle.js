import { soundCollection } from '../collection/SoundCollection'
import { SOUND } from '../type/NotificationReferenceTypes'

export const getNotificationReferenceTitle = ({ referenceType, referenceId }) => {
  if (referenceType === SOUND) {
    return soundCollection.findOneById(referenceId).name
  }

  throw new Error(`Reference type invalid: ${referenceType}`)
}
