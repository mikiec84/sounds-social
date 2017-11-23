import { omit } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { userCollection } from './UserCollection'
import { fileCollection } from './FileCollection'
import { playlistCollection } from './PlaylistCollection'

export const soundSchema = new SimpleSchema({
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
  playsCount: {
    type: Number,
    optional: true,
    autoValue () {
      if (this.isInsert) {
        return 0
      } else if (this.isUpsert) {
        return { $setOnInsert: 0 }
      }
    }
  },
})

class SoundCollection extends Mongo.Collection
{
  addSound(doc, userId) {
    doc.creatorId = userId
    if (!doc.file) throw new Error('Need file to add sound')
    doc.fileId = fileCollection.insert({ ...doc.file })

    doc.createdAt = new Date()

    const omitFile = omit(['file'])

    const _id = this.insert(omitFile(doc))

    return this.findOne({ _id })
  }
  publishSound(_id, creatorId) {
    const doc = this.findOne({ _id, creatorId })

    if (!doc) throw new Error('Not permitted')

    this.update({ _id }, { $set: { isPublic: true } })

    return this.findOneById(_id)
  }
  find(selector) {
    if (this.graphqlFilters && this.graphqlFilters.length > 0) {
      const userFilter = this.graphqlFilters.filter(({ key }) => key === 'user')[0]
      const loggedInFeedFilter = this.graphqlFilters.filter(({ key }) => key === 'loggedInFeed')[0]
      const { userId } = this.graphqlContext

      if (userFilter && userFilter.value) {
        selector.creatorId = userFilter.value
        if (userFilter.value !== userId) selector.isPublic = true
      } else if (loggedInFeedFilter && loggedInFeedFilter.value === 'true') {
        selector.$or = [
          {
            isPublic: true,
            creatorId: { $in: userCollection.findFollowerIdsForUser(userId) },
          },
        ]

        selector.$or.push({
          creatorId: userId,
        })
      } else {
        // discover
        selector.$or = [
          { isPublic: true },
        ]

        selector.$or.push({
          creatorId: userId,
        })
      }
    }

    return super.find(selector, {
      sort: {
        createdAt: -1,
      },
    })
  }
  findOne(selector, ...more) {
    if (this.graphqlContext && selector._id) {
      selector.isPublic = true

      return super.findOne({
        $or: [selector, { _id: selector._id, creatorId: this.graphqlContext.userId }],
      }, ...more)
    }

    return super.findOne(selector, ...more)
  }
  findByIds (ids) {
    return this.find({ _id: { $in: ids } })
  }
  findForPlaylist(playlistId, userId) {
    const playlist = playlistCollection.findOnePublic(playlistId, userId)

    if (playlist) return this.findByIds(playlist.soundIds)
  }
  findCoverFile(soundId) {
    const sound = this.findOne(soundId)

    if (sound) return fileCollection.findOneById(sound.coverFileId)
  }
  updateCover(soundId, coverFileData) {
    const coverFileId = fileCollection.insert({ ...coverFileData })

    this.update({ _id: soundId }, { $set: { coverFileId } })
  }
  countPlay(_id) {
    this.update({ _id }, { $inc: { playsCount: 1 } })
  }
  findOneById(_id) {
    return this.findOne({ _id })
  }
  check(_id) {
    if (!this.findOneById(_id)) throw new Meteor.Error('Sound not found')
  }
}

export const soundCollection = new SoundCollection('sounds')

soundCollection.attachSchema(soundSchema)
