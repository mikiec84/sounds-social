export const updateFollowerIds = (collection, _id, followerIds) =>
  collection.update({ _id }, { $set: { followerIds } })
