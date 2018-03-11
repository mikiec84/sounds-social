import { isFollowedBy } from '../../../../lib/Follower/FollowerMethods'
import { userCollection } from '../../UserCollection'

export const isFollowedByUser = isFollowedBy(userCollection)
