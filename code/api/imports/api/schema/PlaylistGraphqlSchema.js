import { Meteor } from 'meteor/meteor'
import { defaultTo, reduce, flow, get } from 'lodash/fp'
import { check, Match } from 'meteor/check'
import { checkUserIdRequired } from '../../lib/check/checkUserData'
import { createPlaylist } from '../../data/collection/methods/Playlist/createPlaylist'
import { updatePlaylist } from '../../data/collection/methods/Playlist/updatePlaylist'
import { deletePlaylist } from '../../data/collection/methods/Playlist/deletePlaylist'
import { fetchOnePlaylistForUser } from '../../data/collection/methods/Playlist/fetchOnePlaylistForUser'
import { fetchPlaylistsForUser } from '../../data/collection/methods/Playlist/fetchPlaylistsForUser'
import { addSoundToPlaylist } from '../../data/collection/methods/Playlist/addSoundToPlaylist'
import { fetchSoundsForPlaylist } from '../../data/collection/methods/Sound/fetchSoundsForPlaylist'
import { fetchOneSoundCoverFile } from '../../data/collection/methods/File/fetchOneSoundCoverFile'
import { checkSound } from '../../lib/check/checkSound'

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
}
`

const isCreatorResolver = (root, args, context) =>
  root.creatorId === context.userId

export default {
  typeDefs: [typeDef],
  resolvers: {
    Playlist: {
      image: flow(
        get('soundIds'),
        defaultTo([]),
        reduce((acc, soundId) => {
          if (acc) return acc

          return fetchOneSoundCoverFile(soundId)
        }, null)
      ),
      creator: root => {
        return Meteor.users.findOne({ _id: root.creatorId })
      },
      sounds: (root, args, context) => {
        return fetchSoundsForPlaylist(context.userId)(root._id)
      },
      isEditable: isCreatorResolver,
      isRemovable: isCreatorResolver,
    },
    Query: {
      listPlaylist(root, args, context) {
        const userId = defaultTo(context.userId)(args.userId)

        return fetchPlaylistsForUser(context.userId)(userId)
      },
      getPlaylist(root, args, context) {
        check(args.playlistId, String)

        return fetchOnePlaylistForUser(context.userId)(args.playlistId)
      },
    },
    Mutation: {
      createPlaylist(root, args, context) {
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
      updatePlaylist(root, args, context) {
        const { playlistId, name, description, soundIds, isPublic } = args
        check(playlistId, String)
        check(name, Match.Maybe(String))
        check(description, Match.Maybe(String))
        check(isPublic, Match.Maybe(Boolean))
        soundIds.forEach(soundId => checkSound(soundId, String))

        const { userId } = context
        checkUserIdRequired(userId)

        updatePlaylist({
          playlistId,
          name,
          userId,
          isPublic,
          description,
          soundIds,
        })

        return fetchOnePlaylistForUser(userId)(playlistId)
      },
      removePlaylist(root, args, context) {
        const { playlistId } = args
        check(playlistId, String)

        const { userId } = context
        checkUserIdRequired(userId)

        const playlist = fetchOnePlaylistForUser(userId)(playlistId)

        deletePlaylist(userId)(playlistId)

        return playlist
      },
      addSoundToPlaylist(root, args, context) {
        const { playlistId, soundId } = args
        check(playlistId, String)
        check(soundId, String)

        const { userId } = context
        checkUserIdRequired(userId)

        return addSoundToPlaylist(soundId)(userId)(playlistId)
      },
    },
  },
}
