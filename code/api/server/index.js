import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import { renderIntoElementById } from 'meteor/server-render'
import { wrapTypeDefsAndResolvers } from 'meteor/komentify:comments-graphql'

import { typeDefs, resolvers } from '../imports/api/schema'
import '../imports/methods/MeteorMethods'
import '../imports/data/file/CoverStorage'

const schema = makeExecutableSchema(
  wrapTypeDefsAndResolvers({ typeDefs, resolvers }),
)

createApolloServer({
  graphiql: true,
  pretty: true,
  schema,
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
