import cors from 'cors'
import { defaultTo } from 'lodash/fp'
import { makeExecutableSchema } from 'graphql-tools'
import { loadSchema, getSchema } from 'graphql-loader'
import { createApolloServer } from 'meteor/apollo'
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts'
import { renderIntoElementById } from 'meteor/server-render'
import { wrapTypeDefsAndResolvers } from 'meteor/komentify:comments-graphql'

import '../imports/config'
import '../imports/listener'
import { typeDefs, resolvers } from '../imports/api/schema'

initAccounts()

loadSchema(wrapTypeDefsAndResolvers({ typeDefs, resolvers }))

const schema = makeExecutableSchema(getSchema())

createApolloServer(req => ({
  graphiql: true,
  pretty: true,
  schema,
  context: userContext => ({
    ...userContext,
    userLanguage: defaultTo('en')(req.header('accept-language')),
  }),
}), {
  configServer: graphQLServer => {
    graphQLServer.use(cors())
  },
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
