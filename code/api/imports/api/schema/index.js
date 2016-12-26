import { Random } from 'meteor/random'

import {
  typeDefs as trackTypeDefs,
  resolvers as trackResolvers,
} from './TrackGraphqlSchema'

import {
  typeDefs as userTypeDefs,
  resolvers as userResolvers,
} from './UserGraphqlSchema'

import {
  typeDefs as tagTypeDefs,
  resolvers as tagResolvers,
} from './TagGraphqlSchema'

export const typeDefs = [
  ...trackTypeDefs,
  ...userTypeDefs,
  ...tagTypeDefs,
  `
  type Query {
    # current user
    user(id: String!): User,
    # tracks of the logged in user
    feedTracks: [Track]
    # track search
    searchTracks(q: String!): [Track]
  }

  schema {
    query: Query
  }
  `
]

export const resolvers = {
  ...trackResolvers,
  ...userResolvers,
  ...tagResolvers,

  Query: {
    user(root, args, context) {
      // Only return the current user, for security
      if (context.userId === args.id) {
        return context.user;
      }
    },
  },
}
