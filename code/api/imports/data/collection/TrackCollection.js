import { omit } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { userCollection } from './UserCollection'
import { fileCollection } from './FileCollection'

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
  addTrack(doc, userId) {
    doc.creatorId = userId
    if (!doc.file) throw new Error('Need file to add track')
    doc.fileId = fileCollection.insert({ ...doc.file })

    doc.createdAt = new Date()

    const omitFile = omit(['file'])

    const _id = this.insert(omitFile(doc))

    return this.findOne({ _id })
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
  updateCover(trackId, coverFileData) {
    const coverFileId = fileCollection.insert({ ...coverFileData })

    this.update({ _id: trackId }, { $set: { coverFileId } })
  }
  findOneById(_id) {
    return this.findOne({ _id })
  }
}

export const trackCollection = new TrackCollection('tracks')

trackCollection.attachSchema(trackSchema)
