import { get, flow } from 'lodash/fp'
import { check, Match } from 'meteor/check'
import { groupCollection } from '../../data/collection/GroupCollection'

const typeDef = `
type Group {
  _id: String!
  name: String
  # For example collective, label, duo etc.
  type: String
  description: String
  avatarFile: File
  members: User
  createdAt: Date
  isFollowedByCurrentUser: Boolean
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
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {
    Group: {
      avatarFile: root => root,
      members: root => root,
    },
    Query: {
      listGroupForUser (root, args, context) {
        const userId = args.userId || context.userId
        check(userId, String)

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
        check(context.userId, String)

        const id = groupCollection.createGroup(context.userId, args.data)
        console.log(id, args.data)

        return groupCollection.findOneById(id)
      },
      updateGroup (root, args, context) {
        if (!context.userId) return null
        check(context.userId, String)
        check(args._id, String)

        groupCollection.updateGroup(context.userId, args._id, args.data)

        return groupCollection.findOneById(args._id)
      },
      removeGroup (root, args, context) {
        if (!context.userId) return null
        check(context.userId, String)
        check(args._id, String)

        const group = groupCollection.findOneById(args._id)

        groupCollection.removeGroup(context.userId, args._id)

        return group
      },
    },
  },
}
