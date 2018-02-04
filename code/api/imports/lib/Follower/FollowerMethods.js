import { uniq } from 'lodash'
import { updateFollowerIds } from './updateFollowerIds'

export const findFollowerIds = entityId => collection => {
  return ((collection.findOneById(entityId) || {}).followerIds || [])
}

export const follow = toFollowId => followerId => collection => {
  const followerIds = findFollowerIds(followerId)(collection)

  updateFollowerIds(collection, followerId, uniq([...followerIds, toFollowId]))
}

export const unfollow = toUnfollowId => followerId => collection => {
  const followerIds = findFollowerIds(followerId)(collection)

  updateFollowerIds(collection, followerId, followerIds.filter(id => id !== toUnfollowId))
}

export const isFollowedBy = toFollowId => potentialFollowerId => collection => {
  return findFollowerIds(potentialFollowerId)(collection).includes(toFollowId)
}
