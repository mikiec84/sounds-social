import { soundCollection } from '../../../SoundCollection'
import { flowMerge } from '../../../../../lib/flowMerge'
import { sortByNewest } from '../../general/sortByNewest'
import { selectUserIsCreator } from '../selectUserIsCreator'
import { selectIsPublic } from '../../general/selectIsPublic'

export const fetchFeedSoundsForDiscover = currentUserId => {
  const selector = {
    $or: [
      selectIsPublic(),
      selectUserIsCreator(currentUserId),
    ],
  }

  return soundCollection.find(selector, flowMerge(sortByNewest)).fetch()
}
