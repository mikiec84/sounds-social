import { omit } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { fileCollection } from './FileCollection'
import { profileSchema } from '../schema/ProfileSchema'

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
    return this.findOne({
      referenceId,
      type: 'user',
    })
  }
}

export const profileCollection = new ProfileCollection('profile')

profileCollection.attachSchema(profileSchema)
