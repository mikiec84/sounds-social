export const typeDefs = [
  `
  type Track {
    id: String
    name: String
    user: User
    tags: [Tag]
    description: String
    comments: [Comment]
    uploadedAt: String
  }
  `
]

export const resolvers = {
  Track: {},
}
