import moment from 'moment'
import { registerType } from 'meteor/easy:graphqlizer'
import { check, Match } from 'meteor/check'

registerType(Date, 'Date')

export default {
  typeDefs: [
    `
type Date {
  fromNow: String
  formatted(format: String): String
}
  `,
  ],
  resolvers: {
    Date: {
      fromNow: (root, args, context) => {
        moment.locale(context.userLanguage)
        return moment(root).fromNow()
      },
      formatted: (root, args, context) => {
        const { format } = args
        check(format, Match.OneOf(String, undefined))

        return moment(root).format(format)
      },
    },
  },
}
