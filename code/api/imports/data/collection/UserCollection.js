import SimpleSchema from 'simpl-schema'
import { Meteor } from 'meteor/meteor'
import {
  follow,
  unfollow,
  isFollowedBy,
  findFollowerIdsForUser,
} from '../../lib/Follower/FollowerMethods'

export const userCollection = Meteor.users

userCollection.findOneById = function (userId) {
  return this.findOne({ _id: userId })
}

userCollection.findFollowerIdsForUser = userId => findFollowerIdsForUser(userId)(userCollection)

userCollection.isFollowedByUser = function (toFollowId, potentialFollowerId) {
  return isFollowedBy(toFollowId)(potentialFollowerId)(userCollection)
}

userCollection.follow = function (toFollowId, followerId) {
  return follow(toFollowId)(followerId)(userCollection)
}

userCollection.unfollow = function (toUnfollowId, followerId) {
  return unfollow(toUnfollowId)(followerId)(userCollection)
}
