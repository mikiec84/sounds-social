import { Mongo } from 'meteor/mongo'
import { fileCollection } from './FileCollection'
import { omit } from 'lodash/fp'

export const profileSchema = new SimpleSchema({
  type: {
    type: String,
  },
  referenceId: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    optional: true,
    max: 200,
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
  language: {
    type: String,
    optional: true,
  }
})

class ProfileCollection extends Mongo.Collection
{
  updateProfile(referenceId, type, profileData) {
    const selector = { referenceId, type }
    const existingProfile = this.findOne(selector)

    const { avatarFile } = profileData

    const omitAvatarFile = omit(['avatarFile'])

    if (avatarFile) {
      profileData.avatarFileId = fileCollection.insert({ ...avatarFile })
    }

    if (!existingProfile) {
      return this.insert({
        ...omitAvatarFile(profileData),
        referenceId,
        type,
      })
    }

    return this.update(selector, { $set: omitAvatarFile(profileData) })
  }
  findOneUserProfile(referenceId) {
    return fields => this.createQuery({
      ...fields,
      $filters: {
        referenceId,
        type: 'user',
      },
    }).fetchOne()
  }
}

export const profileCollection = new ProfileCollection('profile')

profileCollection.addLinks({
  avatarFile: {
    type: 'one',
    collection: fileCollection,
    field: 'avatarFileId',
  }
})

profileCollection.attachSchema(profileSchema)
