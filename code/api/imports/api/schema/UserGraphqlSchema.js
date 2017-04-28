import { createCollectionSchema } from 'meteor/easy:graphqlizer'

export default createCollectionSchema({
  type: 'User',
  collection: Meteor.users,
  schema: new SimpleSchema({
    username: {
      type: String,
    },
  }),
  crud: {
    create: false,
    update: false,
    delete: false,
  },
})
