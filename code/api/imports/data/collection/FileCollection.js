import { Mongo } from 'meteor/mongo'
import { fileSchema } from '../schema/FileSchema'

export const fileCollection = new Mongo.Collection('files')

fileCollection.attachSchema(fileSchema)
