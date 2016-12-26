import { Random } from 'meteor/random'

export const typeDefs = [
  `
  type Track {
    name: String
    user: User
    tags: [Tag]
    description: String
    uploadedAt: String
  }
  `
]

export const resolvers = {
  Track: {},
}
