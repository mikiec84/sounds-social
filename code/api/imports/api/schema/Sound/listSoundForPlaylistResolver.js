import { check } from 'meteor/check'
import { SOUND_DEFAULT_LIMIT } from '../SoundGraphqlSchema'
import {
  makePaginatableResolver,
  resolveFindQuery,
} from '../../helpers/PaginationMethods'
import { findSoundsForPlaylist } from '../../../data/collection/methods/Sound/findSoundsForPlaylist'

export const listSoundForPlaylistResolver = makePaginatableResolver({
  defaultLimit: SOUND_DEFAULT_LIMIT,
  resolver: (root, args, context) => {
    const { playlistId } = args
    check(playlistId, String)

    const { userId } = context

    return resolveFindQuery(args)(findSoundsForPlaylist(userId)(playlistId))
  },
})
