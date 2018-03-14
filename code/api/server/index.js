import cors from 'cors'
import { defaultTo } from 'lodash/fp'
import { makeExecutableSchema } from 'graphql-tools'
import { getSchema, loadSchema } from 'graphql-loader'
import { createApolloServer } from 'meteor/apollo'
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts'
import { checkUserIdMaybe } from '../imports/lib/check/checkUserData'
import mongoFieldsMiddleware from '../imports/middleware/MongoFieldsContextMiddleware'

import '../imports/config'
import '../imports/listener'
import { resolvers, typeDefs } from '../imports/api/schema'

initAccounts()

loadSchema({ typeDefs, resolvers })

const schema = makeExecutableSchema(getSchema())

mongoFieldsMiddleware(schema)

createApolloServer(
  req => {
    return {
      graphiql: true,
      pretty: true,
      schema,
      context: userContext => {
        checkUserIdMaybe(userContext.userId)

        return {
          ...userContext,
          userLanguage: defaultTo('en')(req.header('accept-language')),
        }
      },
    }
  },
  {
    configServer: graphQLServer => {
      graphQLServer.use(cors())
    },
  }
)
