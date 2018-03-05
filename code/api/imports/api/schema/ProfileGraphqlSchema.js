import { get, flow } from 'lodash/fp'
import { profileCollection } from '../../data/collection/ProfileCollection'
import { checkUserIdRequired } from '../../lib/check/checkUserData'
import { fetchOneFileById } from '../../data/fetch/File/fetchOneFileById'

const typeDef = `
input ProfileData {
  websiteUrl: String
  description: String
  avatarFile: FileData
  language: String
}

type Profile {
  type: String
  description: String
  websiteUrl: String
  description: String
  avatarFile: File
  language: String
}

extend type Mutation {
  updateUserProfile(profileData: ProfileData!): Profile
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {
    Profile: {
      avatarFile: flow(get('avatarFileId'), fetchOneFileById),
      language(root) {
        return root.language || 'en'
      },
    },
    Mutation: {
      updateUserProfile(root, args, context) {
        checkUserIdRequired(context.userId)

        profileCollection.updateProfile(
          context.userId,
          'user',
          args.profileData,
        )

        return profileCollection.findOneUserProfile(context.userId)
      },
    },
  },
}
