import moment from 'moment'
import { check, Match } from 'meteor/check'
import { Random } from 'meteor/random'
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { soundCollection, soundSchema } from '../../data/collection/SoundCollection'
import { fileCollection } from '../../data/collection/FileCollection'
import { soundSearchIndex } from '../../data/search/SoundSearchIndex'

let soundsBeingPlayed = []

const soundGraphqlSchema = createCollectionSchema({
  type: 'Sound',
  collection: soundCollection,
  crud: {
    insert: false,
  },
  schema: {
    type: soundSchema,
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
        optional: true,
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
        type: 'Date',
      },
      creator: {
        type: 'User',
        resolve: root => Meteor.users.findOne({ _id: root.creatorId }),
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

soundGraphqlSchema.typeDefs.push(`
# Represents a sound being played
type SoundPlay {
  # Random id when sound is started playing
  soundPlayingId: String
  soundId: String
}

extend type Mutation {
  createSound(data: SoundInput! groupId: String): Sound
  publishSound(soundId: String!): Sound
  addCoverFile(soundId: String! fileData: FileData!): Sound
  startPlayingSound(soundId: String!): SoundPlay
  countPlayingSound(soundPlayingId: String! soundId: String!): SoundPlay
}

extend type Query {
  searchSound(query: String!): [Sound]
  listSoundForPlaylist(playlistId: String!): [Sound]
}
`)

soundGraphqlSchema.resolvers.Mutation.createSound = (root, args, context) => {
  const { userId } = context
  const { groupId } = args
  check(userId, String)
  check(groupId, Match.Maybe(String))

  return soundCollection.addSound(args.data, userId, groupId)
}

soundGraphqlSchema.resolvers.Mutation.publishSound = (root, args, context) => {
  const { userId } = context
  const { soundId } = args

  check(userId, String)
  check(soundId, String)

  return soundCollection.publishSound(soundId, userId)
}

soundGraphqlSchema.resolvers.Mutation.startPlayingSound = (root, args, context) => {
  const { userId } = context
  const { soundId } = args

  check(userId, Match.Optional(String))
  check(soundId, String)

  const soundPlayingId = Random.id()

  soundsBeingPlayed.push({
    soundPlayingId,
    soundId,
    userId,
    startedAt: new Date(),
  })

  return { soundPlayingId, soundId }
}

soundGraphqlSchema.resolvers.Mutation.countPlayingSound = (root, args, context) => {
  const { userId } = context
  check(userId, Match.Optional(String))

  const { soundPlayingId, soundId } = args
  check(soundPlayingId, String)
  check(soundId, String)

  const shouldCountPlay = soundsBeingPlayed
    .filter(play => play.userId === userId)
    .every(play => {
      const sameIds = play.soundPlayingId === soundPlayingId && play.soundId === soundId
      const startedFiveSecondsAgo = moment
        .duration(moment(new Date()).diff(play.startedAt)).seconds() > 5

      return sameIds && startedFiveSecondsAgo
    })

  if (shouldCountPlay) soundCollection.countPlay(soundId)

  soundsBeingPlayed = soundsBeingPlayed.filter(play => play.userId !== userId)

  return { soundPlayingId, soundId }
}

soundGraphqlSchema.resolvers.Mutation.addCoverFile = (root, args, context) => {
  const { soundId, fileData } = args
  check(soundId, String)
  check(fileData, {
    _id: String,
    secret: String,
    url: String,
  })

  const sound = soundCollection.findOne({ _id: soundId, creatorId: context.userId })

  if (sound) soundCollection.updateCover(soundId, fileData)

  return sound
}

soundGraphqlSchema.resolvers.Query.searchSound = (root, args, context) => {
  const { query } = args
  check(query, String)

  let { userId } = context
  check(userId, Match.Optional(String))

  if (!userId) userId = null

  return soundSearchIndex.search(query, { limit: 100, userId }).fetch()
}

soundGraphqlSchema.resolvers.Query.listSoundForPlaylist = (root, args, context) => {
  const { playlistId } = args
  check(playlistId, String)

  const { userId } = context
  check(userId, Match.Optional(String))

  return soundCollection.fetchForPlaylist(playlistId, userId)
}

export default soundGraphqlSchema
