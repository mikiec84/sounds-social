import { groupCollection } from '../../GroupCollection'

export const fetchGroupsForUser = userId => fields => groupCollection.find({
  memberIds: userId,
}, { fields }).fetch()
