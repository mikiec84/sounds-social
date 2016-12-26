import { Random } from 'meteor/random'

export const typeDefs = [
  `
  type Track {
    name: String,
    username: String,
    uploadedAt: String
  }
  `
]

export const resolvers = {
  Track: {},
}
