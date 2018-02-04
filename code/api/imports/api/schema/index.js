import {
  generateTypeDefsAndResolvers,
} from 'meteor/easy:graphqlizer'

import dateSchema from './DateGraphqlSchema'
import fileSchema from './FileGraphqlSchema'
import soundSchema from './SoundGraphqlSchema'
import userSchema from './UserGraphqlSchema'
import profileSchema from './ProfileGraphqlSchema'
import notificationSchema from './NotificationGraphqlSchema'
import playlistSchema from './PlaylistGraphqlSchema'
import groupSchema from './GroupGraphqlSchema'

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [
    dateSchema,
    fileSchema,
    soundSchema,
    userSchema,
    profileSchema,
    notificationSchema,
    playlistSchema,
    groupSchema,
  ],
})

export {
  typeDefs,
  resolvers,
}
