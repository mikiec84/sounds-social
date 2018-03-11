export const fetchOneForCreator = collection => creatorId => _id =>
  collection.findOne({ _id, creatorId })
