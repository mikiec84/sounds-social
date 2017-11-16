import moment from 'moment'
import { check } from 'meteor/check'
import { Random } from 'meteor/random'
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { trackSchema, trackCollection } from '../../data/collection/TrackCollection'
import { fileCollection } from '../../data/collection/FileCollection'

let tracksBeingPlayed = []

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
      playsCount: {
        type: 'Int',
        resolve: root => root.playsCount || 0,
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
# Represents a sound being played
type SoundPlay {
  # Random id when sound is started playing
  soundPlayingId: String
  soundId: String
}

extend type Mutation {
  createTrack(data: TrackInput!): Track
  addCoverFile(trackId: String! fileData: FileData!): Track
  startPlayingSound(soundId: String!): SoundPlay
  countPlayingSound(soundPlayingId: String! soundId: String!): SoundPlay
}
`)

trackGraphqlSchema.resolvers.Mutation.createTrack = (root, args, context) => {
  const { userId } = context
  check(userId, String)

  return trackCollection.addTrack(args.data, userId)
}

trackGraphqlSchema.resolvers.Mutation.startPlayingSound = (root, args, context) => {
  const { userId } = context
  const { soundId } = args

  check(userId, String)
  check(soundId, String)

  const soundPlayingId = Random.id()

  tracksBeingPlayed.push({
    soundPlayingId,
    soundId,
    userId,
    startedAt: new Date(),
  })

  return { soundPlayingId, soundId }
}

trackGraphqlSchema.resolvers.Mutation.countPlayingSound = (root, args, context) => {
  const { userId } = context
  check(userId, String)

  const { soundPlayingId, soundId } = args
  check(soundPlayingId, String)
  check(soundId, String)

  const shouldCountPlay = tracksBeingPlayed
    .filter(play => play.userId === userId)
    .every(play => {
      const sameIds = play.soundPlayingId === soundPlayingId && play.soundId === soundId
      const startedFiveSecondsAgo = moment
        .duration(moment(new Date()).diff(play.startedAt)).seconds() > 5

      return sameIds && startedFiveSecondsAgo
    })

  if (shouldCountPlay) trackCollection.countPlay(soundId)

  tracksBeingPlayed = tracksBeingPlayed.filter(play => play.userId !== userId)

  return { soundPlayingId, soundId }
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
