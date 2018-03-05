import { uniq, get } from 'lodash/fp'
import { updateFollowerIds } from './updateFollowerIds'

const findFollowerIds = collection => entityId => {
  return ((collection.findOneById(entityId) || {}).followerIds || [])
}

// TODO: put collection as first argument
export const findFollowerIdsForUser = userId => collection => {
  return collection.find({
    followerIds: userId
  }, { fields: { _id: 1 } }).map(get('_id'))
}

export const follow = collection => toFollowId => followerId => {
  const followerIds = findFollowerIds(collection)(toFollowId)

  updateFollowerIds(collection, toFollowId, uniq([...followerIds, followerId]))
}

export const unfollow = toUnfollowId => followerId => collection => {
  const followerIds = findFollowerIds(collection)(toUnfollowId)

  updateFollowerIds(collection, toUnfollowId, followerIds.filter(id => id !== followerId))
}

export const isFollowedBy = toFollowId => potentialFollowerId => collection => {
  return findFollowerIds(collection)(toFollowId).includes(potentialFollowerId)
}
