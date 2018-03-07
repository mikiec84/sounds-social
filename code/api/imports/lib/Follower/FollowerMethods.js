import { uniq, get } from 'lodash/fp'
import { updateFollowerIds } from './updateFollowerIds'

const findFollowerIds = collection => entityId => {
  return ((collection.findOneById(entityId) || {}).followerIds || [])
}

export const findFollowerIdsForUser = collection => userId => {
  return collection.find({
    followerIds: userId
  }, { fields: { _id: 1 } }).map(get('_id'))
}

export const follow = collection => toFollowId => followerId => {
  const followerIds = findFollowerIds(collection)(toFollowId)

  updateFollowerIds(collection, toFollowId, uniq([...followerIds, followerId]))
}

export const unfollow = collection => toUnfollowId => followerId => {
  const followerIds = findFollowerIds(collection)(toUnfollowId)

  updateFollowerIds(collection, toUnfollowId, followerIds.filter(id => id !== followerId))
}

export const isFollowedBy = collection => toFollowId => potentialFollowerId => {
  return findFollowerIds(collection)(toFollowId).includes(potentialFollowerId)
}
