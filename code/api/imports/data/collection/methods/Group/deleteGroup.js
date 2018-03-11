import { groupCollection } from '../../GroupCollection'

export const deleteGroup = creatorId => _id =>
  groupCollection.remove({ _id, creatorId })
