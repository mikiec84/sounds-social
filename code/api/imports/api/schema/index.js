import { generateTypeDefsAndResolvers } from 'meteor/easy:graphqlizer'

import dateSchema from './DateGraphqlSchema'
import fileSchema from './FileGraphqlSchema'
import soundSchema from './SoundGraphqlSchema'
import userSchema from './UserGraphqlSchema'
import profileSchema from './ProfileGraphqlSchema'
import playlistSchema from './PlaylistGraphqlSchema'
import groupSchema from './GroupGraphqlSchema'
import creatorSchema from './CreatorGraphqlSchema'

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [
    dateSchema,
    fileSchema,
    soundSchema,
    userSchema,
    profileSchema,
    playlistSchema,
    groupSchema,
    creatorSchema,
  ],
})

export {
  typeDefs,
  resolvers,
}
