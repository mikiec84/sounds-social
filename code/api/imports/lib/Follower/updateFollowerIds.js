export const updateFollowerIds = (collection, groupId, followerIds) => collection.update(
  { _id: groupId },
  { $set: { followerIds: followerIds } },
)
