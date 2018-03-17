export const GroupTypeDef = `
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
  followerCount: Int
  playCount: Int
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
