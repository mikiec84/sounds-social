import SimpleSchema from 'simpl-schema'
import { omitBy, isNil, get } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { createdAtAutoValue } from './autoValue/createdAtAutoValue'
import { fileCollection } from './FileCollection'
import {
  follow,
  unfollow,
  isFollowedBy,
} from '../../lib/Follower/FollowerMethods'

const groupSchema = new SimpleSchema({
  name: {
    type: String,
    min: 3,
    max: 20,
  },
  // label, collective, duo etc.
  type: {
    type: String,
    min: 3,
    max: 20,
  },
  description: {
    type: String,
    optional: true,
    max: 280,
  },
  avatarFileId: {
    type: String,
    optional: true,
  },
  websiteUrl: {
    type: String,
    optional: true,
    max: 50,
  },
  createdAt: {
    type: Date,
    autoValue: createdAtAutoValue,
  },
  creatorId: {
    type: String,
  },
  memberIds: {
    type: Array,
    optional: true,
  },
  'memberIds.$': {
    type: String,
  },
  followerIds: {
    type: Array,
    optional: true,
  },
  'followerIds.$': {
    type: String,
  },
})

class GroupCollection extends Mongo.Collection {
  isFollowedBy (toFollowId, potentialFollowerId) {
    return isFollowedBy(toFollowId)(potentialFollowerId)(this)
  }

  follow (toFollowId, potentialFollowerId) {
    return follow(toFollowId)(potentialFollowerId)(this)
  }

  unfollow (toUnfollowId, followerId) {
    return unfollow(toUnfollowId)(followerId)(this)
  }

  isMemberOfGroup (memberToCheckId, _id) {
    return !!this.findOne({ _id, memberIds: memberToCheckId })
  }

  findOneById (_id) {
    return this.findOne({ _id })
  }

  findForUser (userId) {
    return this.find({ memberIds: userId })
  }

  removeGroup (userId, _id) {
    return this.remove({ _id, creatorId: userId })
  }

  findFollowerIdsForUser (userId) {
    return this.find({
      followerIds: userId
    }, { fields: { _id: 1 } }).map(get('_id'))
  }

  createGroup (userId, { name, type, description, websiteUrl, avatarFile }) {
    const groupData = {
      creatorId: userId,
      memberIds: [userId],
      name,
      type,
      description,
      websiteUrl,
    }

    if (avatarFile) {
      groupData.avatarFileId = fileCollection.insert({ ...avatarFile })
    }

    return this.insert(groupData)
  }

  updateGroup (userId, _id, { name, type, description, websiteUrl, avatarFile }) {
    const groupData = {
      name,
      type,
      description,
      websiteUrl,
    }

    if (avatarFile) {
      groupData.avatarFileId = fileCollection.insert({ ...avatarFile })
    }

    return this.update({ _id, memberIds: userId }, { $set: omitBy(isNil)(groupData) })
  }
}

export const groupCollection = new GroupCollection('group')

groupCollection.attachSchema(groupSchema)
