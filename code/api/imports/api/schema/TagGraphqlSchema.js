import { Random } from 'meteor/random'

export const typeDefs = [
  `
  type Tag {
    label: String,
  }
  `
]

export const resolvers = {
  Tag: {},
}
