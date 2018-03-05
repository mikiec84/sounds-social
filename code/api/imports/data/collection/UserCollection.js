import { Meteor } from 'meteor/meteor'
import {
  follow,
  unfollow,
  isFollowedBy,
  findFollowerIdsForUser,
} from '../../lib/Follower/FollowerMethods'
import { fetchOneUserById } from './methods/User/fetchOneUserById'

export const userCollection = Meteor.users

userCollection.findOneById = fetchOneUserById

userCollection.findFollowerIdsForUser = userId => findFollowerIdsForUser(userId)(userCollection)

userCollection.isFollowedByUser = function (toFollowId, potentialFollowerId) {
  return isFollowedBy(toFollowId)(potentialFollowerId)(userCollection)
}

userCollection.unfollow = function (toUnfollowId, followerId) {
  return unfollow(toUnfollowId)(followerId)(userCollection)
}
