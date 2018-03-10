import { Meteor } from 'meteor/meteor'
import { defaultTo, some } from 'lodash/fp'
import { check, Match } from 'meteor/check'
import { soundCollection } from '../../data/collection/SoundCollection'
import { checkUserIdRequired } from '../../lib/check/checkUserData'
import { createPlaylist } from '../../data/collection/methods/Playlist/createPlaylist'
import { updatePlaylist } from '../../data/collection/methods/Playlist/updatePlaylist'
import { fetchOnePlaylistForUser } from '../../data/collection/methods/Playlist/fetchOnePlaylistForUser'
import { deletePlaylist } from '../../data/collection/methods/Playlist/deletePlaylist'
import { removeSoundFromPlaylist } from '../../data/collection/methods/Playlist/removeSoundFromPlaylist'
import { moveSoundsInPlaylist } from '../../data/collection/methods/Playlist/moveSoundsInPlaylist'
import { fetchOnePublicPlaylist } from '../../data/collection/methods/Playlist/fetchOnePublicPlaylist'
import { fetchPublicPlaylistsForUser } from '../../data/collection/methods/Playlist/fetchPublicPlaylists'
import { addSoundToPlaylist } from '../../data/collection/methods/Playlist/addSoundToPlaylist'

const typeDef = `
type Playlist {
  _id: String!
  name: String!
  description: String
  isPublic: Boolean
  sounds: [Sound]
  createdAt: Date
  image: File
  creator: User
  isEditable: Boolean
  isRemovable: Boolean
}

extend type Query {
  listPlaylist(userId: String): [Playlist]
  getPlaylist(playlistId: String!): Playlist
}

extend type Mutation {
  createPlaylist(name: String! description: String isPublic: Boolean): Playlist
  updatePlaylist(playlistId: String! name: String! description: String isPublic: Boolean soundIds: [String]): Playlist
  removePlaylist(playlistId: String!): Playlist
  addSoundToPlaylist(playlistId: String! soundId: String!): Playlist
  removeSoundFromPlaylist(playlistId: String! soundId: String!): Playlist
  moveSoundsInPlaylist(playlistId: String! soundToMoveId: String! soundToBeMovedId: String!): Playlist
}
`

const isCreatorResolver = (root, args, context) => root.creatorId === context.userId

export default {
  typeDefs: [typeDef],
  resolvers: {
    Playlist: {
      image: (root) => {
        return defaultTo([])(root.soundIds).reduce((acc, soundId) => {
          if (acc) return acc

          return soundCollection.findCoverFile(soundId)
        }, null)
      },
      creator: (root) => {
        return Meteor.users.findOne({ _id: root.creatorId })
      },
      sounds: (root, args, context) => {
        return soundCollection.fetchForPlaylist(root._id, context.userId)
      },
      isEditable: isCreatorResolver,
      isRemovable: isCreatorResolver,
    },
    Query: {
      listPlaylist (root, args, context) {
        const userId = defaultTo(context.userId)(args.userId)

        return fetchPublicPlaylistsForUser(context.userId)(userId).fetch()
      },
      getPlaylist (root, args, context) {
        check(args.playlistId, String)

        return fetchOnePublicPlaylist(context.userId)(args.playlistId)
      },
    },
    Mutation: {
      createPlaylist (root, args, context) {
        const { name, description, isPublic } = args
        check(name, String)
        check(description, Match.Optional(String))
        check(isPublic, Match.Optional(Boolean))

        const { userId } = context
        checkUserIdRequired(userId)

        return {
          _id: createPlaylist({
            name,
            creatorId: userId,
            isPublic,
            description,
          }),
        }
      },
      updatePlaylist (root, args, context) {
        const { playlistId, name, description, soundIds, isPublic } = args
        check(playlistId, String)
        check(name, Match.Maybe(String))
        check(description, Match.Maybe(String))
        check(isPublic, Match.Maybe(Boolean))
        soundIds.forEach(soundId => soundCollection.check(soundId, String))

        const { userId } = context
        checkUserIdRequired(userId)

        updatePlaylist(
          { playlistId, name, userId, isPublic, description, soundIds },
        )

        return fetchOnePlaylistForUser(userId)(playlistId)
      },
      removePlaylist (root, args, context) {
        const { playlistId } = args
        check(playlistId, String)

        const { userId } = context
        checkUserIdRequired(userId)

        const playlist = fetchOnePlaylistForUser(userId)(playlistId)

        deletePlaylist(userId)(playlistId)

        return playlist
      },
      addSoundToPlaylist (root, args, context) {
        const { playlistId, soundId } = args
        check(playlistId, String)
        check(soundId, String)

        const { userId } = context
        checkUserIdRequired(userId)

        return addSoundToPlaylist(soundId)(userId)(playlistId)
      },
      removeSoundFromPlaylist (root, args, context) {
        const { playlistId, soundId } = args
        check(playlistId, String)
        check(soundId, String)

        const { userId } = context
        checkUserIdRequired(userId)

        return removeSoundFromPlaylist(soundId)(userId)(playlistId)
      },
      moveSoundsInPlaylist (root, args, context) {
        const { playlistId, soundToBeMovedId, soundToMoveId } = args
        check(playlistId, String)
        check(soundToBeMovedId, String)
        check(soundToMoveId, String)

        const { userId } = context
        checkUserIdRequired(userId)

        return moveSoundsInPlaylist(soundToMoveId)(soundToBeMovedId)(userId)(playlistId)
      },
    },
  },
}
