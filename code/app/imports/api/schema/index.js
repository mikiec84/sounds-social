import {
  generateTypeDefsAndResolvers,
} from 'meteor/easy:graphqlizer'

import trackSchema from './TrackGraphqlSchema'
import userSchema from './UserGraphqlSchema'
import profileSchema from './ProfileGraphqlSchema'

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [
    trackSchema,
    userSchema,
    profileSchema,
  ],
})

export {
  typeDefs,
  resolvers,
}
