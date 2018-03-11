import { fetchUserFollowerIdsForUser } from '../User/fetchUserFollowerIdsForUser'
import { fetchGroupFollowerIdsForUser } from '../Group/fetchGroupFollowerIdsForUser'
import { selectIsPublic } from '../general/selectIsPublic'

export const selectFollowedByUser = userId => {
  return {
    ...selectIsPublic(),
    creatorId: {
      $in: [
        ...fetchUserFollowerIdsForUser(userId),
        ...fetchGroupFollowerIdsForUser(userId),
      ]
    },
  }
}
