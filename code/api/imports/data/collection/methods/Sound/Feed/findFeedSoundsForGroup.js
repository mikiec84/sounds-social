import { isMemberOfGroup } from '../../Group/isMemberOfGroup'
import { findFeedSounds } from './findFeedSounds'

export const findFeedSoundsForGroup = currentUserId => groupId => {
  const selector = {
    creatorId: groupId,
    ownerType: 'group',
  }

  if (!isMemberOfGroup(currentUserId)(groupId)) {
    selector.isPublic = true
  }

  return findFeedSounds(selector)
}
