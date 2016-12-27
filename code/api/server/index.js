import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import { mockSchema } from '../imports/api/mock-schema'

import { typeDefs, resolvers } from '../imports/api/schema'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

mockSchema(schema)

createApolloServer({
  schema,
})
