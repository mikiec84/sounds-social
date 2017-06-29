import moment from 'moment'
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { trackSchema, trackCollection } from '../../data/collection/TrackCollection'

export default createCollectionSchema({
  type: 'Track',
  collection: trackCollection,
  schema: {
    type: trackSchema,
    input: new SimpleSchema({
      name: {
        type: String,
      },
      description: {
        type: String,
        optional: true,
      },
      isPublic: {
        type: Boolean,
      },
      fileId: {
        type: String,
      },
      fileSecret: {
        type: String,
      },
      fileUrl: {
        type: String,
      },
      creatorId: {
        type: String,
      },
    }),
  },
  fields: {
    type: {
      fileId: false,
      creatorId: false,
      fileSecret: false,
      createdAt: {
        type: 'String',
        resolve: root => moment(root.createdAt).fromNow(),
      },
      creator: {
        type: 'User',
        resolve: root => Meteor.users.findOne({_id: root.creatorId }),
      },
    },
  },
})
