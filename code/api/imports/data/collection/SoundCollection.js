import { Mongo } from 'meteor/mongo'
import { soundSchema } from '../schema/SoundSchema'

export const soundCollection = new Mongo.Collection('sounds')

soundCollection.attachSchema(soundSchema)
