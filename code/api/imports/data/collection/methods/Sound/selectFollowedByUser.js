import { fetchUserFollowerIdsForUser } from '../User/fetchUserFollowerIdsForUser'
import { fetchGroupFollowerIdsForUser } from '../Group/fetchGroupFollowerIdsForUser'
import { selectPublic } from '../general/selectPublic'

export const selectFollowedByUser = userId => {
  return {
    ...selectPublic(),
    creatorId: {
      $in: [
        ...fetchUserFollowerIdsForUser(userId),
        ...fetchGroupFollowerIdsForUser(userId),
      ]
    },
  }
}
