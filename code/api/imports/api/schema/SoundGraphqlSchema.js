import moment from 'moment'
import { get, flow } from 'lodash/fp'
import { check, Match } from 'meteor/check'
import { Random } from 'meteor/random'
import { resolver, typeDef } from 'meteor/easy:graphqlizer'
import {
  addPaginationTypeDef,
  makePaginatableResolver,
  resolveFindQuery,
} from '../helpers/PaginationMethods'
import { soundCollection } from '../../data/collection/SoundCollection'
import { soundSearchIndex } from '../../data/search/SoundSearchIndex'
import { checkUserIdRequired } from '../../lib/check/checkUserData'
import { fetchOneFileById } from '../../data/collection/methods/File/fetchOneFileById'
import { isMemberOfGroup } from '../../data/collection/methods/Group/isMemberOfGroup'
import { fetchOneGroupById } from '../../data/collection/methods/Group/fetchOneGroupById'
import { fetchOneSoundForUser } from '../../data/collection/methods/Sound/fetchOneSoundForUser'
import { fetchOneUserById } from '../../data/collection/methods/User/fetchOneUserById'
import { createSound } from '../../data/collection/methods/Sound/createSound'
import { findFeedSoundsForUser } from '../../data/collection/methods/Sound/Feed/findFeedSoundsForUser'
import { findFeedSoundsForGroup } from '../../data/collection/methods/Sound/Feed/findFeedSoundsForGroup'
import { findFeedSoundsForFeed } from '../../data/collection/methods/Sound/Feed/findFeedSoundsForFeed'
import { findFeedSoundsForDiscover } from '../../data/collection/methods/Sound/Feed/findFeedSoundsForDiscover'
import { findSoundsForPlaylist } from '../../data/collection/methods/Sound/findSoundsForPlaylist'
import { publishSound } from '../../data/collection/methods/Sound/publishSound'
import { countSoundPlay } from '../../data/collection/methods/Sound/countSoundPlay'
import { updateSoundCover } from '../../data/collection/methods/Sound/updateSoundCover'
import { updateSound } from '../../data/collection/methods/Sound/updateSound'

const SOUND_DEFAULT_LIMIT = 10

let soundsBeingPlayed = []

export default {
  resolvers: {
    Query: {
      getSound(root, args, context) {
        const { _id } = args

        check(_id, Match.Maybe(String))

        return fetchOneSoundForUser(context.userId)(_id)
      },
      listSound: makePaginatableResolver({
        defaultLimit: SOUND_DEFAULT_LIMIT,
        resolver: (root, args, context) => {
          const { filters } = args
          const { userId } = context

          check(filters, Match.Maybe(Array))

          const getValue = get('value')
          const compareKey = keyToCompare => ({ key }) => key === keyToCompare
          const userFilterId = getValue(filters.filter(compareKey('user'))[0])
          const groupFilterId = getValue(filters.filter(compareKey('group'))[0])
          const isFeed =
            getValue(filters.filter(compareKey('loggedInFeed'))[0]) === 'true'

          let findSoundsQuery

          if (userFilterId) { findSoundsQuery = findFeedSoundsForUser(userId)(userFilterId) }

          if (groupFilterId) { findSoundsQuery = findFeedSoundsForGroup(userId)(groupFilterId) }

          if (isFeed) findSoundsQuery = findFeedSoundsForFeed(userId)

          if (!findSoundsQuery) { findSoundsQuery = findFeedSoundsForDiscover(userId) }

          return resolveFindQuery(args)(findSoundsQuery)
        },
      }),
      searchSound: makePaginatableResolver({
        defaultLimit: SOUND_DEFAULT_LIMIT,
        resolver: (root, args, context) => {
          const { query } = args
          check(query, String)

          let { userId } = context

          if (!userId) userId = null

          const searchQuery = soundSearchIndex.search(query, {
            limit: args.limit,
            skip: args.skip,
            userId,
          })

          return {
            items: searchQuery.fetch(),
            totalCount: searchQuery.count(),
          }
        },
      }),
      listSoundForPlaylist: makePaginatableResolver({
        defaultLimit: SOUND_DEFAULT_LIMIT,
        resolver: (root, args, context) => {
          const { playlistId, limit, skip } = args
          check(playlistId, String)

          const { userId } = context

          return resolveFindQuery(args)(
            findSoundsForPlaylist(userId)(playlistId)
          )
        },
      }),
    },
    Mutation: {
      updateSound: (root, args, context) => {
        const { _id } = args
        const data = { ...args.data }
        const { userId } = context

        checkUserIdRequired(userId)
        check(_id, String)

        return updateSound(userId)(_id)(data)
      },
      deleteSound: resolver.delete(soundCollection),
      createSound: (root, args, context) => {
        const { userId } = context
        const { groupId } = args
        checkUserIdRequired(userId)
        check(groupId, Match.Maybe(String))

        return createSound(userId)(args.data)(groupId)
      },
      publishSound: (root, args, context) => {
        const { userId } = context
        const { soundId } = args

        checkUserIdRequired(userId)
        check(soundId, String)

        return publishSound(userId)(soundId)
      },
      startPlayingSound: (root, args, context) => {
        const { userId } = context
        const { soundId } = args

        check(soundId, String)

        const soundPlayingId = Random.id()

        soundsBeingPlayed.push({
          soundPlayingId,
          soundId,
          userId,
          startedAt: new Date(),
        })

        return { soundPlayingId, soundId }
      },
      countPlayingSound: (root, args, context) => {
        const { userId } = context

        const { soundPlayingId, soundId } = args
        check(soundPlayingId, String)
        check(soundId, String)

        const shouldCountPlay = soundsBeingPlayed
          .filter(play => play.userId === userId)
          .every(play => {
            const sameIds =
              play.soundPlayingId === soundPlayingId && play.soundId === soundId
            const startedFiveSecondsAgo =
              moment
                .duration(moment(new Date()).diff(play.startedAt))
                .seconds() > 5

            return sameIds && startedFiveSecondsAgo
          })

        if (shouldCountPlay) countSoundPlay(soundId)

        soundsBeingPlayed = soundsBeingPlayed.filter(
          play => play.userId !== userId
        )

        return { soundPlayingId, soundId }
      },
      addCoverFile: (root, args, context) => {
        const { soundId, fileData } = args
        check(soundId, String)
        check(fileData, {
          _id: String,
          secret: String,
          url: String,
        })

        return updateSoundCover(context.userId)(soundId)(fileData)
      },
    },
    Sound: {
      file: flow(get('fileId'), fetchOneFileById),
      playsCount: root => root.playsCount || 0,
      coverFile: flow(get('coverFileId'), fetchOneFileById),
      creator: root => {
        if (!root.ownerType || root.ownerType === 'user') {
          return {
            ...fetchOneUserById(root.creatorId),
            type: 'user',
          }
        }

        const group = fetchOneGroupById(root.creatorId)

        if (group) return { ...group, username: group.name, type: 'group' }
      },
      isRemovable: (root, args, context) => {
        if (!root.ownerType || root.ownerType === 'user') {
          return root.creatorId === context.userId
        }

        return isMemberOfGroup(context.userId, root.creatorId)
      },
    },
  },
  typeDefs: [
    typeDef.get('Sound'),
    typeDef.update('Sound'),
    typeDef.delete('Sound'),
    addPaginationTypeDef('Sound'),
    `
    type Sound {
      _id: String!
      name: String!
      description: String
      createdAt: Date
      fileId: String!
      ownerType: String
      isPublic: Boolean!
      playsCount: Int
      file: File
      creator: Creator
      coverFile: File
      isRemovable: Boolean
    }
    
    input SoundInput {
      name: String!
      description: String
      isPublic: Boolean
      creatorId: String!
      file: FileData
    }
    
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
      searchSound(
        query: String!
        pagination: PaginationInput
      ): PaginatableSoundResult
      listSoundForPlaylist(
        playlistId: String!
        pagination: PaginationInput
      ): PaginatableSoundResult
      listSound(
        limit: Int
        offset: Int 
        filters: [FilterInput] 
        pagination: PaginationInput
      ): PaginatableSoundResult
    }
    `,
  ],
}
