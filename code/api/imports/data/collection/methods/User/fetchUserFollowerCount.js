import { fetchFollowerCount } from '../../../../lib/Follower/FollowerMethods'
import { userCollection } from '../../UserCollection'

export const fetchUserFollowerCount = fetchFollowerCount(userCollection)
