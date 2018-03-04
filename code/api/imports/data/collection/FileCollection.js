import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const fileSchema = new SimpleSchema({
  secret: {
    type: String,
  },
  url: {
    type: String,
  },
})

class FileCollection extends Mongo.Collection
{
  findOneById(_id) {
    return this.findOne({ _id })
  }
}

export const fileCollection = new FileCollection('files')

fileCollection.attachSchema(fileSchema)
