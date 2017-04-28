import {
  generateTypeDefsAndResolvers,
} from 'meteor/easy:graphqlizer'

import trackSchema from './TrackGraphqlSchema'
import userSchema from './UserGraphqlSchema'

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [
    trackSchema,
    userSchema,
  ],
})

export {
  typeDefs,
  resolvers,
}
