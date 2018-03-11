import { fetchOneMemberOfGroup } from './fetchOneMemberOfGroup'

// FIXME pretty sure there's a more elegant way
export const isMemberOfGroup = memberId => groupId =>
  !!fetchOneMemberOfGroup(memberId)(groupId)
