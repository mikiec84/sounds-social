import { findFeedSounds } from './findFeedSounds'

export const findFeedSoundsForUser = currentUserId => userId => {
  const selector = {
    creatorId: userId,
    $or: [{ ownerType: { $exists: false } }, { ownerType: 'user' }],
  }

  if (currentUserId !== userId) selector.isPublic = true

  return findFeedSounds(selector)
}
