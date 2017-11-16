import {
  generateTypeDefsAndResolvers,
} from 'meteor/easy:graphqlizer'

import fileSchema from './FileGraphqlSchema'
import trackSchema from './TrackGraphqlSchema'
import userSchema from './UserGraphqlSchema'
import profileSchema from './ProfileGraphqlSchema'
import notificationSchema from './NotificationSchema'

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [
    fileSchema,
    trackSchema,
    userSchema,
    profileSchema,
    notificationSchema,
  ],
})

export {
  typeDefs,
  resolvers,
}
