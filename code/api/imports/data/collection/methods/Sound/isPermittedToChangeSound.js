import { isMemberOfGroup } from '../Group/isMemberOfGroup'
import { fetchOneSoundById } from './fetchOneSoundById'

export const isPermittedToChangeSound = userId => _id => {
  const doc = fetchOneSoundById(_id)

  if (doc.ownerType === 'group') {
    return isMemberOfGroup(userId)(doc.creatorId)
  }

  return doc.creatorId === userId
}
