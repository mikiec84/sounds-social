import { check } from 'meteor/check'
import { makePaginatableResolver } from '../../helpers/PaginationMethods'
import { SOUND_DEFAULT_LIMIT } from '../SoundGraphqlSchema'
import { soundSearchIndex } from '../../../data/search/SoundSearchIndex'

export const searchSoundResolver = makePaginatableResolver({
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
})
