import { Meteor } from 'meteor/meteor'

export const findRelatedFieldDocuments = Meteor.wrapAsync((data, cb) => {
  const {
    collection,
    from,
    localField,
    foreignField,
    as,
    selector,
  } = data

  collection.rawCollection().aggregate([
    {
      $lookup: {
        from,
        localField,
        foreignField,
        as,
      },
    },
    { $match: selector },
  ]).toArray().then(res => cb(null, res)).catch(err => cb(err))
})
