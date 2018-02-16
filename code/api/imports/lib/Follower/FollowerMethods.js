import { uniq } from 'lodash'
import { updateFollowerIds } from './updateFollowerIds'

export const findFollowerIds = entityId => collection => {
  return ((collection.findOneById(entityId) || {}).followerIds || [])
}

export const follow = toFollowId => followerId => collection => {
  const followerIds = findFollowerIds(toFollowId)(collection)

  updateFollowerIds(collection, toFollowId, uniq([...followerIds, followerId]))
}

export const unfollow = toUnfollowId => followerId => collection => {
  const followerIds = findFollowerIds(toUnfollowId)(collection)

  updateFollowerIds(collection, toUnfollowId, followerIds.filter(id => id !== followerId))
}

export const isFollowedBy = toFollowId => potentialFollowerId => collection => {
  return findFollowerIds(toFollowId)(collection).includes(potentialFollowerId)
}
