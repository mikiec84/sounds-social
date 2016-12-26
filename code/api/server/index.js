import { sampleSize } from 'lodash'
import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import { typeDefs, resolvers } from '../imports/api/schema'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

addMockFunctionsToSchema({
  schema,
  mocks: {
    Track: () => ({
      name: () => sampleSize(['Track name', 'Darkness in Light', 'Other track'])[0],
    }),
    User: () => ({
      username: () => sampleSize(['franz', 'matteodem', 'hans'])[0],
    }),
    Tag: () => ({
      label: () => sampleSize(['Trap', 'Electro House', 'Awesome sound', 'Free release'])[0]
    })
  },
})

createApolloServer({
  schema,
})
