import { check, Match } from 'meteor/check'
import { playlistCollection } from '../../data/collection/PlaylistCollection'

const typeDef = `
type Playlist {
  name: String!
  description: String
  isPublic: Boolean
  sounds: [Sound]
  createdAt: Date
}

extend type Query {
  listPlaylist: [Playlist]
  getPlaylist(playlistId: String!): Playlist
}

extend type Mutation {
  createPlaylist(name: String! description: String isPublic: Boolean): Playlist
  addSoundToPlaylist(playlistId: String! soundId: String!): Playlist
  removeSoundFromPlaylist(playlistId: String! soundId: String!): Playlist
  moveSoundsInPlaylist(playlistId: String! soundToMoveId: String! soundToBeMovedId: String!): Playlist
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {
    Query: {
      listPlaylist(root, args, context) {
        check(context.userId, String)

        return playlistCollection.findForUser(context.userId)
      },
      getPlaylist(root, args, context) {
        check(args.playlistId, String)
        check(context.userId, String)

        return playlistCollection.findOneForUser(args.playlistId, context.userId)
      },
    },
    Mutation: {
      createPlaylist(root, args, context) {
        const { name, description, isPublic } = args
        check(name, String)
        check(description, Match.Optional(String))
        check(isPublic, Match.Optional(Boolean))

        const { userId } = context
        check(userId, String)

        return playlistCollection.create(name, userId, isPublic, description)
      },
      addSoundToPlaylist(root, args, context) {
        const { playlistId, soundId } = args
        check(playlistId, String)
        check(soundId, String)

        const { userId } = context
        check(userId, String)

        return playlistCollection.addSound(playlistId, userId, soundId)
      },
      removeSoundFromPlaylist(root, args, context) {
        const { playlistId, soundId } = args
        check(playlistId, String)
        check(soundId, String)

        const { userId } = context
        check(userId, String)

        return playlistCollection.addSound(playlistId, userId, soundId)
      },
      moveSoundsInPlaylist(root, args, context) {
        const { playlistId, soundToBeMovedId, soundToMoveId } = args
        check(playlistId, String)
        check(soundToBeMovedId, String)
        check(soundToMoveId, String)

        const { userId } = context
        check(userId, String)

        return playlistCollection.moveSounds(
          playlistId,
          userId,
          soundToMoveId,
          soundToBeMovedId,
        )
      },
    },
  },
}
