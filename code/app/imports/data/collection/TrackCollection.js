import { Mongo } from 'meteor/mongo'
import { userCollection } from './UserCollection'

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
  coverFileId: {
    type: String,
    optional: true,
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
    if (this.graphqlFilters && this.graphqlFilters.length > 0) {
      const userFilter = this.graphqlFilters.filter(({ key }) => key === 'user')[0]
      const loggedInFeedFilter = this.graphqlFilters.filter(({ key }) => key === 'loggedInFeed')[0]

      if (userFilter && userFilter.value) {
        selector.creatorId = userFilter.value
      }

      if (loggedInFeedFilter && loggedInFeedFilter.value === 'true') {
        const { userId } = this.graphqlContext

        selector.creatorId = { $in: [
          ...userCollection.findFollowerIdsForUser(userId),
          userId,
        ] }
      }
    }

    return super.find(selector, {
      sort: {
        createdAt: -1,
      },
    })
  }
  updateCover(trackId, coverFileId) {
    this.update({ _id: trackId }, { $set: { coverFileId } })
  }
}

export const trackCollection = new TrackCollection('tracks')

trackCollection.attachSchema(trackSchema)
