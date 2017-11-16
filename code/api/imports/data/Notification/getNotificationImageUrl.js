import { trackCollection } from '../collection/TrackCollection'
import { fileCollection } from '../collection/FileCollection'
import { SOUND } from '../Type/NotificationReferenceTypes'

export const getNotificationImageUrl = ({ referenceType, referenceId }) => {
  if (referenceType === SOUND) {
    const { coverFileId } = trackCollection.findOneById(referenceId)

    return coverFileId ? fileCollection.findOneById(coverFileId).url : null
  }

  throw new Error(`Reference type invalid: ${referenceType}`)
}
