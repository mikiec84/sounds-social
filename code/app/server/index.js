import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors';

import { typeDefs, resolvers } from '../imports/api/schema'
import '../imports/methods/MeteorMethods'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const whitelist = [
    'http://localhost:4000', // allow vue app to connect to the server
]

const corsOptions = {
    origin(origin, callback) {
        const originIsWhitelisted = whitelist.includes(origin);
        callback(null, originIsWhitelisted);
    },
    credentials: true
}

createApolloServer(request => {

  return {
    graphiql: true,
    pretty: true,
    schema,
    context: {
      userId: request.headers.soundsocialuserid,
    },
  }
}, {
  configServer: graphQLServer => graphQLServer.use(cors(corsOptions)),
})
