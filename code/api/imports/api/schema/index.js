import {
  typeDefs as commentTypeDefs,
  resolvers as commentResolvers,
} from './CommentGraphqlSchema'

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
  ...commentTypeDefs,
  ...trackTypeDefs,
  ...userTypeDefs,
  ...tagTypeDefs,
  `
  type Query {
    # current user
    user(id: String!): User
    # track by id
    track(id: String!): Track
    # tracks of the logged in user
    feedTracks(skip: Int = 0, limit: Int = 10): [Track]
    # track search
    searchTracks(q: String!, skip: Int = 0, limit: Int = 10): [Track]
  }

  schema {
    query: Query
  }
  `
]

export const resolvers = {
  ...commentResolvers,
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
