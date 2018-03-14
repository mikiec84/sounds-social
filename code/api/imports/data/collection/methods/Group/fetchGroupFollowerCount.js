import { fetchFollowerCount } from '../../../../lib/Follower/FollowerMethods'
import { groupCollection } from '../../GroupCollection'

export const fetchGroupFollowerCount = fetchFollowerCount(groupCollection)
