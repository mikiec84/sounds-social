import { omit } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { profileSchema } from '../schema/ProfileSchema'

export const profileCollection = new Mongo.Collection('profile')

profileCollection.attachSchema(profileSchema)
