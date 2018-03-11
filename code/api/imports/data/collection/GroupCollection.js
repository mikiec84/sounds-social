import { Mongo } from 'meteor/mongo'
import { groupSchema } from '../schema/GroupSchema'

export const groupCollection = new Mongo.Collection('group')

export const groupCollectionName = groupCollection.rawCollection()
  .collectionName

groupCollection.attachSchema(groupSchema)
