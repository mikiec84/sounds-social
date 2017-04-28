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
  fileId: {
    type: String,
  },
  fileSecret: {
    type: String,
  },
  fileUrl: {
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
    if (!this.graphqlContext || !this.graphqlContext.userId) {
      return null
    }

    doc.createdAt = new Date()

    return super.insert(doc)
  }
  find(selector) {
    // TODO: add filter with key "loggedInFeed" and value true => then display tracks for logged in user
    if (this.graphqlFilters && this.graphqlFilters.length > 0) {
      const userFilter = this.graphqlFilters.filter(({ key }) => key === 'user')[0]

      if (userFilter && userFilter.value) {
        selector.creatorId = userFilter.value
      }
    }

    return super.find(selector, {
      sort: {
        createdAt: -1,
      },
    })
  }
}

export const trackCollection = new TrackCollection('tracks')

trackCollection.attachSchema(trackSchema)
