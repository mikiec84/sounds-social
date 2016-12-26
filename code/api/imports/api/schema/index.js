import { Random } from 'meteor/random'

import {
  typeDefs as trackTypeDefs,
  resolvers as trackResolvers,
} from './TrackGraphqlSchema'

import {
  typeDefs as userTypeDefs,
  resolvers as userResolvers,
} from './UserGraphqlSchema'

export const typeDefs = [
  ...trackTypeDefs,
  ...userTypeDefs,
  `
  type Query {
    # current user
    currentUser(id: String!): User,
    tracks: [Track]
  }

  schema {
    query: Query
  }
  `
]

export const resolvers = {
  ...trackResolvers,
  ...userResolvers,

  Query: {
    currentUser(root, args, context) {
      // Only return the current user, for security
      if (context.userId === args.id) {
        return context.user;
      }
    },
  },
}
