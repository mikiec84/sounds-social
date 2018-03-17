import { check, Match } from 'meteor/check'
import { fetchOneSoundForUser } from '../../../data/collection/methods/Sound/fetchOneSoundForUser'

export const getSoundResolver = (root, args, context) => {
  const { _id } = args

  check(_id, Match.Maybe(String))

  return fetchOneSoundForUser(context.userId)(_id)
}
