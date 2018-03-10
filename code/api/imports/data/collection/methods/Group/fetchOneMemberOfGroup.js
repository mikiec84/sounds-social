import { groupCollection } from '../../GroupCollection'

export const fetchOneMemberOfGroup = memberId => groupId => groupCollection.findOne(
  { _id: groupId, memberIds: memberId },
)
