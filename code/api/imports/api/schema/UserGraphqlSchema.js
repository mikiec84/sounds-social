export const typeDefs = [
  `
type User {
  id: String
  username: String
  tracks: [Track]
}
  `
]

export const resolvers = {
  User: {},
}
