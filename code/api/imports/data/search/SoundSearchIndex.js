import { get, constant } from 'lodash/fp'
import { Index, MongoDBEngine } from 'meteor/easysearch:core'
import { findRelatedFieldDocuments } from './findRelatedFieldDocuments'
import { isCreatorSoundsSelector, soundCollection } from '../collection/SoundCollection'
import { groupCollectionName } from '../collection/GroupCollection'
import { userCollectionName } from '../collection/UserCollection'

const searchByUsername = (config, query, cb) => findRelatedFieldDocuments({
  collection: soundCollection,
  selector: config.selectorPerField('aggregatedAuthor.username', query),
  from: userCollectionName,
  localField: 'creatorId',
  foreignField: '_id',
  as: 'aggregatedAuthor',
})

const searchByGroupName = (config, query, cb) => findRelatedFieldDocuments({
  collection: soundCollection,
  selector: config.selectorPerField('aggregatedGroupAuthor.name', query),
  from: groupCollectionName,
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
