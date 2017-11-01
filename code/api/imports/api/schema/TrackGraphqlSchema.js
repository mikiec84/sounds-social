import moment from 'moment'
import { check } from 'meteor/check'
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { trackSchema, trackCollection } from '../../data/collection/TrackCollection'
import { fileCollection } from '../../data/collection/FileCollection'

const trackGraphqlSchema =  createCollectionSchema({
  type: 'Track',
  collection: trackCollection,
  crud: {
    insert: false,
  },
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
      creatorId: {
        type: String,
      },
      file: {
        type: Object,
        optional: true,
      }
    }),
  },
  fields: {
    input: {
      file: {
        type: 'FileData',
      },
    },
    type: {
      creatorId: false,
      coverFileId: false,
      file: {
        type: 'File',
        resolve: root => fileCollection.findOneById(root.fileId),
      },
      createdAt: {
        type: 'String',
        resolve: (root, args, context) => {
          moment.locale(context.userLanguage)
          return moment(root.createdAt).fromNow()
        },
      },
      creator: {
        type: 'User',
        resolve: root => Meteor.users.findOne({_id: root.creatorId }),
      },
      coverFile: {
        type: 'File',
        resolve: root => fileCollection.findOneById(root.coverFileId),
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
  createTrack(data: TrackInput!): Track
  addCoverFile(trackId: String! fileData: FileData!): Track
}
`)

trackGraphqlSchema.resolvers.Mutation.createTrack = (root, args, context) => {
  const { userId } = context
  check(userId, String)

  return trackCollection.addTrack(args.data, userId)
}

trackGraphqlSchema.resolvers.Mutation.addCoverFile = (root, args, context) => {
  const { trackId, fileData } = args
  check(trackId, String)
  check(fileData, {
    _id: String,
    secret: String,
    url: String,
  })

  const track = trackCollection.findOne({ _id: trackId, creatorId: context.userId })

  if (track) trackCollection.updateCover(trackId, fileData)

  return track
}

export default trackGraphqlSchema
