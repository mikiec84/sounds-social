import { Mongo } from 'meteor/mongo'

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
  },
  avatarFileId: {
    type: String,
    optional: true,
  },
  websiteUrl: {
    type: String,
    optional: true,
  },
})

class ProfileCollection extends Mongo.Collection
{
  updateProfile(referenceId, type, profileData) {
    const selector = { referenceId, type }
    const existingProfile = this.findOne(selector)

    if (!existingProfile) {
      return this.insert({
        ...profileData,
        referenceId,
        type,
      })
    }

    return this.update(selector, { $set: profileData })
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
