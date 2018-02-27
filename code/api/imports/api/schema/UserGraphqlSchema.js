import transformAstIntoFieldSpecifiers from 'join-mongo'
import { check } from 'meteor/check'
import { resolver, typeDef } from 'meteor/easy:graphqlizer'
import { userCollection } from '../../data/collection/UserCollection'
import { profileCollection } from '../../data/collection/ProfileCollection'
import { groupCollection } from '../../data/collection/GroupCollection'

export default {
  resolvers: {
    Query: {
      getUser: resolver.get(userCollection),
      listUser: resolver.list(userCollection),
      currentUser: (root, args, context) => {
        const { userId } = context

        if (!userId) return null

        return userCollection.findOne({ _id: userId })
      },
    },
    Mutation: {
      followUser: (root, args, context) => {
        const { toFollowId } = args
        check(toFollowId, String)

        userCollection.follow(toFollowId, context.userId)
        return userCollection.findOne({ _id: context.userId })
      },
      unfollowUser: (root, args, context) => {
        const { toUnfollowId } = args
        check(toUnfollowId, String)

        userCollection.unfollow(toUnfollowId, context.userId)
        return userCollection.findOne({ _id: context.userId })
      },
    },
    User: {
      canFollow: (root, args, context) => context.userId && root._id !== context.userId,
      isFollowedByCurrentUser: (root, args, context) => userCollection
        .isFollowedByUser(root._id, context.userId),
      profile: (root, args, context, ast) => {
        return profileCollection
          .findOneUserProfile(root._id)(transformAstIntoFieldSpecifiers(ast))
      },
      groups: (root) => groupCollection.findForUser(root._id).fetch(),
    },
  },
  typeDefs: [
    typeDef.get('User'),
    typeDef.list('User'),
    `
    type User {
      _id: String!
      username: String!
      canFollow: Boolean
      isFollowedByCurrentUser: Boolean
      profile: Profile
      groups: [Group]
    }
    
    input UserInput {
      username: String!
    }
    
    extend type Query {
      currentUser: User
    }
    extend type Mutation {
      followUser(toFollowId: String!): User
      unfollowUser(toUnfollowId: String!): User
    }
    `,
  ],
}
