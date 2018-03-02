import cors from 'cors'
import { defaultTo } from 'lodash/fp'
import { makeExecutableSchema } from 'graphql-tools'
import { loadSchema, getSchema } from 'graphql-loader'
import { createApolloServer } from 'meteor/apollo'
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts'
import { renderIntoElementById } from 'meteor/server-render'
import { wrapTypeDefsAndResolvers } from 'meteor/komentify:comments-graphql'
import mongoFieldsMiddleware from '../imports/middleware/MongoFieldsContextMiddleware'

import '../imports/config'
import '../imports/listener'
import { typeDefs, resolvers } from '../imports/api/schema'

initAccounts()

loadSchema(wrapTypeDefsAndResolvers({ typeDefs, resolvers }))

const schema = makeExecutableSchema(getSchema())

mongoFieldsMiddleware(schema)

createApolloServer(req => {
  return {
    graphiql: true,
    pretty: true,
    schema,
    context: userContext => {
      return {
        ...userContext,
        userLanguage: defaultTo('en')(req.header('accept-language')),
      }
    },
  }
}, {
  configServer: graphQLServer => {
    graphQLServer.use(cors())
  },
})
