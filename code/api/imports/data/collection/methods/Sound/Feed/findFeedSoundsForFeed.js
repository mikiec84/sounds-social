import { selectUserIsCreator } from '../selectUserIsCreator'
import { selectFollowedByUser } from '../selectFollowedByUser'
import { findFeedSounds } from './findFeedSounds'

export const findFeedSoundsForFeed = currentUserId => {
  return findFeedSounds({
    $or: [
      selectFollowedByUser(currentUserId),
      selectUserIsCreator(currentUserId),
    ],
  })
}
