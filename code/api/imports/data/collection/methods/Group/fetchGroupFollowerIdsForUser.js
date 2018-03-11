import { findFollowerIdsForUser } from '../../../../lib/Follower/FollowerMethods'
import { groupCollection } from '../../GroupCollection'

export const fetchGroupFollowerIdsForUser = findFollowerIdsForUser(
  groupCollection
)
