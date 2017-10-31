import { check } from 'meteor/check'
import { profileCollection } from '../../data/collection/ProfileCollection'
import { fileCollection } from '../../data/collection/FileCollection'

const typeDef = `
input ProfileData {
  websiteUrl: String
  description: String
  avatarFile: FileData
}

type Profile {
  type: String
  description: String
  websiteUrl: String
  description: String
  avatarFile: File
}

extend type Mutation {
  updateUserProfile(profileData: ProfileData!): Profile
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {
    Profile: {
      avatarFile(root) {
        return fileCollection.findOneById(root.avatarFileId)
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
