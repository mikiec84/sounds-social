import { soundCollection } from '../../../SoundCollection'
import { flowMerge } from '../../../../../lib/flowMerge'
import { sortByNewest } from '../../general/sortByNewest'
import { isMemberOfGroup } from '../../Group/isMemberOfGroup'

export const fetchFeedSoundsForGroup = currentUserId => groupId => {
  const selector = {
    creatorId: groupId,
    ownerType: 'group',
  }

  if (!isMemberOfGroup(currentUserId)(groupId)) {
    selector.isPublic = true
  }

  return soundCollection.find(selector, flowMerge(sortByNewest)).fetch()
}
