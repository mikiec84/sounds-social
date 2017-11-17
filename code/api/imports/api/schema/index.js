import {
  generateTypeDefsAndResolvers,
} from 'meteor/easy:graphqlizer'

import fileSchema from './FileGraphqlSchema'
import soundSchema from './SoundGraphqlSchema'
import userSchema from './UserGraphqlSchema'
import profileSchema from './ProfileGraphqlSchema'
import notificationSchema from './NotificationSchema'

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [
    fileSchema,
    soundSchema,
    userSchema,
    profileSchema,
    notificationSchema,
  ],
})

export {
  typeDefs,
  resolvers,
}
