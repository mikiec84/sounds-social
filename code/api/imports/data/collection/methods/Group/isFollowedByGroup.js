import { isFollowedBy } from '../../../../lib/Follower/FollowerMethods'
import { groupCollection } from '../../GroupCollection'

export const isFollowedByGroup = isFollowedBy(groupCollection)
