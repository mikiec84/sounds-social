import { findIndex, isEqual } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { createdAtAutoValue } from './autoValue/createdAtAutoValue'
import { soundCollection } from './SoundCollection'

const playlistSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: createdAtAutoValue,
  },
  creatorId: {
    type: String,
  },
  isPublic: {
    type: Boolean,
  },
  soundIds: {
    type: [String],
    optional: true,
  },
})

const updateSoundIdsIfPermission = (collection, playlistId, userId, updateOperator) => {
  const sound = collection.findOneForUser(playlistId, userId)

  if (sound) collection.update({ _id: playlistId }, updateOperator)

  return collection.findOneForUser(playlistId, userId)
}

class PlaylistCollection extends Mongo.Collection {
  create (name, creatorId, isPublic = false, description = '') {
    this.insert({ name, creatorId, isPublic, description })
  }

  removeForUser (playlistId, userId) {
    this.remove({ _id: playlistId, creatorId: userId })
  }

  updateInfos ({ playlistId, name, userId, isPublic, description, soundIds }) {
    const fieldsToUpdate = { $set: {} }

    fieldsToUpdate.$set.name = name
    fieldsToUpdate.$set.description = description
    fieldsToUpdate.$set.isPublic = isPublic
    fieldsToUpdate.$set.soundIds = soundIds

    this.update({ _id: playlistId, creatorId: userId }, fieldsToUpdate)
  }

  addSound (playlistId, userId, soundId) {
    soundCollection.check(soundId)

    this.removeSound(playlistId, userId, soundId)

    return updateSoundIdsIfPermission(this, playlistId, userId, {
      $push: {
        soundIds: {
          $each: [soundId],
          $position: 0,
        },
      },
    })
  }

  removeSound (playlistId, userId, soundId) {
    soundCollection.check(soundId)

    return updateSoundIdsIfPermission(this, playlistId, userId, {
      $pull: { soundIds: soundId },
    })
  }

  moveSounds (playlistId, userId, soundToMoveId, soundToBeMovedId) {
    soundCollection.check(soundToMoveId)
    soundCollection.check(soundToBeMovedId)

    const sound = this.findOneForUser(playlistId, userId)

    if (sound) {
      const soundToMoveIndex = findIndex(isEqual(soundToMoveId))(sound.soundIds)
      const soundToBeMovedIndex = findIndex(isEqual(soundToBeMovedId))(sound.soundIds)
      const isInvalid = isEqual(-1)

      if (!isInvalid(soundToMoveIndex) && !isInvalid(soundToBeMovedIndex)) {
        this.$update({
          _id: playlistId
        }, {
          $set: {
            [`soundIds.${soundToBeMovedIndex}`]: soundToMoveId,
            [`soundIds.${soundToMoveIndex}`]: soundToBeMovedId,
          }
        })
      }
    }
  }

  findOneForUser (playlistId, userId) {
    return this.findOne({ _id: playlistId, creatorId: userId })
  }

  findForUser (userId, limit) {
    return this.find({ creatorId: userId }, {
      sort: { createdAt: -1 },
      limit,
    })
  }

  findPublic (userId, currentUserId) {
    const findPublicSelector = { creatorId: userId }

    if (userId !== currentUserId) findPublicSelector.isPublic = true

    return this.find(findPublicSelector, { sort: { createdAt: -1 } })
  }

  findOnePublic (playlistId, currentUserId) {
    return this.findOne({
      $or: [
        { _id: playlistId, isPublic: true },
        { _id: playlistId, creatorId: currentUserId },
      ]
    })
  }
}

export const playlistCollection = new PlaylistCollection('playlists')

playlistCollection.attachSchema(playlistSchema)
