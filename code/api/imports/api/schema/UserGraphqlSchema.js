import { Random } from 'meteor/random'

export const typeDefs = [
  `
type Email {
  address: String
  verified: Boolean
}
type User {
  emails: [Email]
  username: String
  randomString: String
  _id: String
}
  `
]

export const resolvers = {
  User: {
    emails: ({emails}) => emails,
    randomString: () => Random.id(),
  },
}
