import moment from 'moment'
import { check } from 'meteor/check'
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { trackSchema, trackCollection } from '../../data/collection/TrackCollection'
import { getFileUrl } from '../../data/file/CoverStorage'
import { getFileUrl as getMusicFileUrl } from '../../data/file/MusicStorage'

const trackGraphqlSchema =  createCollectionSchema({
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
      creatorId: {
        type: String,
      },
    }),
  },
  fields: {
    type: {
      creatorId: false,
      coverFileId: false,
      fileUrl: {
        type: 'String',
        resolve: root => getMusicFileUrl(root.fileId),
      },
      createdAt: {
        type: 'String',
        resolve: root => moment(root.createdAt).fromNow(),
      },
      creator: {
        type: 'User',
        resolve: root => Meteor.users.findOne({_id: root.creatorId }),
      },
      coverFile: {
        type: 'String',
        resolve: root => getFileUrl(root.coverFileId),
      },
      isRemovable: {
        type: 'Boolean',
        resolve: (root, args, context) => root.creatorId === context.userId,
      },
    },
  },
})

trackGraphqlSchema.typeDefs.push(`
extend type Mutation {
  addCoverFileId(trackId: String! fileId: String!): Track
}
`)

trackGraphqlSchema.resolvers.Mutation.addCoverFileId = (root, args, context) => {
  const { trackId, fileId } = args
  check(trackId, String)
  check(fileId, String)

  const track = trackCollection.findOne({ _id: trackId, creatorId: context.userId })

  if (track) trackCollection.updateCover(trackId, fileId)

  return track
}

export default trackGraphqlSchema
