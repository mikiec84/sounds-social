import { fetchGroupIdsForUser } from '../Group/fetchGroupIdsForUser'

export const selectUserIsCreator = userId => {
  return {
    creatorId: {
      $in: [userId, ...fetchGroupIdsForUser(userId)],
    },
  }
}
