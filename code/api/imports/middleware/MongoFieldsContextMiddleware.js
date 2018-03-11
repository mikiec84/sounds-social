import { addMiddleware } from 'graphql-add-middleware'
import transformAstToFieldSpecifiers from 'join-mongo'

export default function(schema) {
  addMiddleware(schema, async function(root, args, context, info, next) {
    try {
      context.mongoFields = transformAstToFieldSpecifiers(info)
    } catch (e) {}

    return await next()
  })
}
