import { soundCollection } from '../../../SoundCollection'
import { flowMerge } from '../../../../../lib/flowMerge'
import { sortByNewest } from '../../general/sortByNewest'
import { selectUserIsCreator } from '../selectUserIsCreator'
import { selectFollowedByUser } from '../selectFollowedByUser'

export const fetchFeedSoundsForPublic = currentUserId => {
  const selector = {
    $or: [
      selectFollowedByUser(currentUserId),
      selectUserIsCreator(currentUserId),
    ],
  }

  return soundCollection.find(selector, flowMerge(sortByNewest)).fetch()
}
