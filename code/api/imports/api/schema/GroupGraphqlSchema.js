import { get, map, flow } from 'lodash/fp'
import { check } from 'meteor/check'
import { groupCollection } from '../../data/collection/GroupCollection'
import { fetchOneFileById } from '../../data/collection/methods/File/fetchOneFileById'
import { fetchOneUser } from '../../data/collection/methods/User/fetchOneUser'

const typeDef = `
type Group {
  _id: String!
  name: String
  # For example collective, label, duo etc.
  type: String
  description: String
  websiteUrl: String
  avatarFile: File
  members: [User]
  createdAt: Date
  isFollowedByCurrentUser: Boolean
  canFollow: Boolean
  isEditable: Boolean
}

input GroupData {
  name: String!
  type: String!
  description: String
  websiteUrl: String
  avatarFile: FileData
}

extend type Query {
  listGroupForUser(userId: String): [Group]
  getGroup(_id: String!): Group
}

extend type Mutation {
  createGroup(data: GroupData!): Group
  updateGroup(_id: String! data: GroupData!): Group
  removeGroup(_id: String!): Group
  followGroup(toFollowId: String!): Group
  unfollowGroup(toUnfollowId: String!): Group
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {
    Group: {
      avatarFile: flow(get('avatarFileId'), fetchOneFileById),
      members: flow(get('memberIds'), map(fetchOneUser)),
      canFollow: (root, args, context) => context.userId && !root.memberIds.includes(context.userId),
      isEditable: (root, args, context) => {
        return root.creatorId === context.userId
      },
      isFollowedByCurrentUser: (root, args, context) => {
        return groupCollection.isFollowedBy(root._id, context.userId)
      },
    },
    Query: {
      listGroupForUser (root, args, context) {
        const userId = args.userId || context.userId
        return groupCollection.findForUser(userId).fetch()
      },
      getGroup (root, args, context) {
        check(args._id, String)
        return groupCollection.findOneById(args._id)
      },
    },
    Mutation: {
      createGroup (root, args, context) {
        if (!context.userId) return null

        const id = groupCollection.createGroup(context.userId, args.data)

        return groupCollection.findOneById(id)
      },
      updateGroup (root, args, context) {
        if (!context.userId) return null
        check(args._id, String)

        groupCollection.updateGroup(context.userId, args._id, args.data)

        return groupCollection.findOneById(args._id)
      },
      removeGroup (root, args, context) {
        if (!context.userId) return null
        check(args._id, String)

        const group = groupCollection.findOneById(args._id)

        groupCollection.removeGroup(context.userId, args._id)

        return group
      },
      followGroup (root, args, context) {
        if (!context.userId) return null

        const { toFollowId } = args
        check(toFollowId, String)

        groupCollection.follow(toFollowId, context.userId)
        return groupCollection.findOneById(toFollowId)
      },
      unfollowGroup (root, args, context) {
        if (!context.userId) return null

        const { toUnfollowId } = args
        check(toUnfollowId, String)

        groupCollection.unfollow(toUnfollowId, context.userId)
        return groupCollection.findOneById(toUnfollowId)
      },
    },
  },
}
