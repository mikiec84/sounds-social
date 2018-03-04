import { get, constant } from 'lodash/fp'
import { Meteor } from 'meteor/meteor'
import { Index, MongoDBEngine } from 'meteor/easysearch:core'
import { isCreatorSoundsSelector, soundCollection } from '../collection/SoundCollection'
import { groupCollection } from '../collection/GroupCollection'
import { findRelatedFieldDocuments } from './findRelatedFieldDocuments'

const searchByUsername = (config, query, cb) => findRelatedFieldDocuments({
  collection: soundCollection,
  selector: config.selectorPerField('aggregatedAuthor.username', query),
  from: Meteor.users.rawCollection().collectionName,
  localField: 'creatorId',
  foreignField: '_id',
  as: 'aggregatedAuthor',
})

const searchByGroupName = (config, query, cb) => findRelatedFieldDocuments({
  collection: soundCollection,
  selector: config.selectorPerField('aggregatedGroupAuthor.name', query),
  from: groupCollection.rawCollection().collectionName,
  localField: 'creatorId',
  foreignField: '_id',
  as: 'aggregatedGroupAuthor',
})

export const soundSearchIndex = new Index({
  collection: soundCollection,
  fields: ['name', 'description'],
  permission: constant(true),
  engine: new MongoDBEngine({
    selector: function (...args) {
      const defaultConfig = this.defaultConfiguration()
      const selector = defaultConfig.selector(...args)

      const [queryObject, { search: { userId } }] = args

      return {
        $and: [
          { $or: [isCreatorSoundsSelector(userId), { isPublic: true }] },
          { $or: [
            ...selector.$or,
            {
              _id: {
                $in: [
                  ...searchByUsername(defaultConfig, queryObject.name).map(get('_id')),
                  ...searchByGroupName(defaultConfig, queryObject.name).map(get('_id')),
                ],
              },
            },
          ] },
        ],
      }
    }
  }),
})
