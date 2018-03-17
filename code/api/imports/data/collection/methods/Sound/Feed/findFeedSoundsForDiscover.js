import { selectUserIsCreator } from '../selectUserIsCreator'
import { selectIsPublic } from '../../general/selectIsPublic'
import { findFeedSounds } from './findFeedSounds'

export const findFeedSoundsForDiscover = currentUserId => {
  const selector = {
    $or: [selectIsPublic(), selectUserIsCreator(currentUserId)],
  }

  return findFeedSounds(selector)
}
