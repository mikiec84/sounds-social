import { check } from 'meteor/check'
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { userCollection } from '../../data/collection/UserCollection'
import { profileCollection } from '../../data/collection/ProfileCollection'

const collectionSchema = createCollectionSchema({
  type: 'User',
  collection: userCollection,
  schema: new SimpleSchema({
    username: {
      type: String,
    },
  }),
  fields: {
    type: {
      canFollow: {
        type: 'Boolean',
        resolve: (root, args, context) => context.userId && root._id !== context.userId,
      },
      isFollowedByCurrentUser: {
        type: 'Boolean',
        resolve: (root, args, context) => userCollection
          .isFollowedByUser(root._id, context.userId),
      },
      profile: {
        type: 'Profile',
        resolve: (root, args, context) => (profileCollection.findOneUserProfile(root._id) || {}),
      },
    },
  },
  crud: {
    create: false,
    update: false,
    delete: false,
  },
})

collectionSchema.typeDefs.push(`
extend type Query {
  currentUser: User
}
extend type Mutation {
  followUser(toFollowId: String!): User
  unfollowUser(toUnfollowId: String!): User
}
`)

collectionSchema.resolvers.Query.currentUser = (root, args, context) => {
  const { userId } = context

  if (!userId) return null

  return userCollection.findOne({ _id: userId })
}

collectionSchema.resolvers.Mutation.followUser = (root, args, context) => {
  const { toFollowId } = args
  check(toFollowId, String)

  userCollection.follow(toFollowId, context.userId)
  return userCollection.findOne({ _id: context.userId })
}

collectionSchema.resolvers.Mutation.unfollowUser = (root, args, context) => {
  const { toUnfollowId } = args
  check(toUnfollowId, String)

  userCollection.unfollow(toUnfollowId, context.userId)
  return userCollection.findOne({ _id: context.userId })
}

export default collectionSchema


