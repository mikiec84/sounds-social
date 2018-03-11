import SimpleSchema from 'simpl-schema'

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
  },
})
