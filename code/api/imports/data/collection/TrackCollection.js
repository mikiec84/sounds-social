import { Mongo } from 'meteor/mongo'

export const trackSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
  },
  waveformSrc: {
    type: String,
  },
  fileId: {
    type: String,
  },
  fileSecret: {
    type: String,
  },
  creatorId: {
    type: String,
  },
  isPublic: {
    type: Boolean,
  },
})

class TrackCollection extends Mongo.Collection
{
  insert(doc) {
    // TODO: add userId to graphql context manually..
    /*if (!this.graphqlContext || !this.graphqlContext.userId) {
      return null
    }*/

    doc.waveformSrc = 'http://i.imgur.com/oNy41Cr.png'
    doc.createdAt = new Date()

    return super.insert(doc)
  }
  find(selector) {
    console.log(this.graphqlFilters) // TODO: filter tracks for user in feed

    return super.find(selector, {
      sort: {
        createdAt: -1,
      },
    })
  }
}

export const trackCollection = new TrackCollection('tracks')

trackCollection.attachSchema(trackSchema)
