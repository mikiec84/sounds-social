import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import { renderIntoElementById } from 'meteor/server-render'

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

createApolloServer({
  graphiql: true,
  pretty: true,
  schema,
}, {
  //configServer: graphQLServer => graphQLServer.use(cors(corsOptions)),
})

// server side rendering
/*renderIntoElementById('app', async request => {
  import fetch from 'node-fetch'
  const renderer = require('vue-server-renderer').createRenderer()

  global.fetch = fetch

  import { app, router } from '../imports/ui/app'
  import { resolvePromiseForCallback } from '../imports/lib/resolvePromiseForCallback'

  await new Promise((resolve, reject) => {
    router.push(request.url)

    router.onError(err => {
      console.log(err)
      reject(err)
    })

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      resolve(app)
    }, reject)
  })

  return new Promise((resolve, reject) => {
    renderer.renderToString(app, resolvePromiseForCallback(resolve, reject))
  })
})*/
