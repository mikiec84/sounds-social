import { soundCollection } from '../../../SoundCollection'
import { flowMerge } from '../../../../../lib/flowMerge'
import { sortByNewest } from '../../general/sortByNewest'

export const fetchFeedSoundsForUser = currentUserId => userId => {
  const selector = {
    creatorId: userId,
    $or: [{ ownerType: { $exists: false } }, { ownerType: 'user' }],
  }

  if (currentUserId !== userId) selector.isPublic = true

  return soundCollection.find(selector, flowMerge(sortByNewest)).fetch()
}
