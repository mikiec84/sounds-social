import { uniq, get } from 'lodash/fp'
import { updateFollowerIds } from './updateFollowerIds'

const findFollowerIds = entityId => collection => {
  return ((collection.findOneById(entityId) || {}).followerIds || [])
}

// TODO: use these methods directly
export const findFollowerIdsForUser = userId => collection => {
  return collection.find({
    followerIds: userId
  }, { fields: { _id: 1 } }).map(get('_id'))
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
