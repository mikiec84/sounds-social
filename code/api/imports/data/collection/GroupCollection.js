import { omitBy, isNil, get } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { groupSchema } from '../schema/GroupSchema'
import { fileCollection } from './FileCollection'

class GroupCollection extends Mongo.Collection {
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
