import { check } from 'meteor/check'
import { profileCollection } from '../../data/collection/ProfileCollection'
import { getFileUrl } from '../../data/file/ProfileAvatarStorage'

const typeDef = `
input ProfileData {
  websiteUrl: String
  description: String
  avatarFileId: String
}

type Profile {
  type: String
  description: String
  websiteUrl: String
  description: String
  avatarFileUrl: String
}

extend type Mutation {
  updateUserProfile(profileData: ProfileData!): Profile
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {
    Profile: {
      avatarFileUrl(root) {
        return getFileUrl(root.avatarFileId)
      },
    },
    Mutation: {
      updateUserProfile(root, args, context) {
        check(context.userId, String)

        profileCollection.updateProfile(
          context.userId,
          'user',
          args.profileData,
        )
      },
    },
  },
}
