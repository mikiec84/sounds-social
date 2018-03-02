const typeDef = `
input FileData {
  _id: String!
  secret: String!
  url: String!
}

type File {
  _id: String!
  secret: String!
  url: String!
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {},
}
