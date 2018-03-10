import { soundCollection } from '../../../SoundCollection'
import { flowMerge } from '../../../../../lib/flowMerge'
import { sortByNewest } from '../../general/sortByNewest'
import { selectUserIsCreator } from '../selectUserIsCreator'
import { selectPublic } from '../../general/selectPublic'

export const fetchFeedSoundsForDiscover = currentUserId => {
  const selector = {
    $or: [
      selectPublic(),
      selectUserIsCreator(currentUserId),
    ],
  }

  return soundCollection.find(selector, flowMerge(sortByNewest)).fetch()
}
