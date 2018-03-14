import { flow, get } from 'lodash/fp'
import { checkUserIdRequired } from '../../lib/check/checkUserData'
import { fetchOneFileById } from '../../data/collection/methods/File/fetchOneFileById'
import { updateProfile } from '../../data/collection/methods/Profile/updateProfile'
import { fetchOneProfile } from '../../data/collection/methods/Profile/fetchOneProfile'
import { fetchUserFollowerCount } from '../../data/collection/methods/User/fetchUserFollowerCount'

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
  avatarFile: File
  language: String
  followerCount: Int
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
      followerCount: flow(get('referenceId'), fetchUserFollowerCount),
      language(root) {
        return root.language || 'en'
      },
    },
    Mutation: {
      updateUserProfile(root, args, context) {
        checkUserIdRequired(context.userId)

        updateProfile(context.userId)(args.profileData)

        return fetchOneProfile(context.userId)
      },
    },
  },
}
