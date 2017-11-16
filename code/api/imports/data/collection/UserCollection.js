import { Meteor } from 'meteor/meteor'
import { uniq } from 'lodash'

const updateFollowerIds = (collection, userId, followerIds) => collection.update(
  { _id: userId },
  { $set: { followerIds: followerIds } },
)

export const userCollection = Meteor.users

userCollection.findOneById = function (userId) {
  return this.findOne({ _id: userId })
}

userCollection.findFollowerIdsForUser = function (userId) {
  return ((this.findOneById(userId) || {}).followerIds || [])
}

userCollection.isFollowedByUser = function (toFollowId, potentialFollowerId) {
  return this.findFollowerIdsForUser(potentialFollowerId).includes(toFollowId)
}

userCollection.getUserNameById = function (userId) {
  const user = this.findOneById(userId)

  return user.username
}

userCollection.follow = function (toFollowId, followerId) {
  const followerIds = this.findFollowerIdsForUser(followerId)

  updateFollowerIds(this, followerId, uniq([...followerIds, toFollowId]))
}

userCollection.unfollow = function (toUnfollowId, followerId) {
  const followerIds = this.findFollowerIdsForUser(followerId)

  updateFollowerIds(this, followerId, followerIds.filter(id => id !== toUnfollowId))
}
