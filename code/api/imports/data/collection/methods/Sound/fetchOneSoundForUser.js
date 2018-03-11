import { soundCollection } from '../../SoundCollection'
import { fetchGroupIdsForUser } from '../Group/fetchGroupIdsForUser'

export const fetchOneSoundForUser = userId => _id => {
  const selector = { _id }
  selector.isPublic = true

  return soundCollection.findOne({
    $or: [
      selector,
      {
        _id,
        creatorId: {
          $in: [userId, ...fetchGroupIdsForUser(userId)],
        },
      },
    ],
  })
}
