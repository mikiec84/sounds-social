import { Meteor } from 'meteor/meteor'

export const userCollection = Meteor.users

export const userCollectionName = userCollection.rawCollection().collectionName
