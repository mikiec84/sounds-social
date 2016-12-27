export const typeDefs = [
  `
  type Comment {
    id: String
    user: User
    track: Track
    content: String
    createdAt: String
  }
  `
]

export const resolvers = {
  Comment: {},
}
