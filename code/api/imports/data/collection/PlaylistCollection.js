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
  },
  creatorId: {
    type: String,
    autoValue: createdAtAutoValue,
  },
  isPublic: {
    type: Boolean,
  },
  soundIds: {
    type: [String],
  }
})

const updateSoundIdsIfPermission = (operation, collection, playlistId, userId, soundId) => {
  const sound = collection.findOneForUser(playlistId, userId)

  if (sound) collection.update({ _id: playlistId }, { [operation]: { soundIds: soundId } })
}

class PlaylistCollection extends Mongo.Collection
{
  create (name, creatorId, isPublic = false, description = '') {
    this.insert({ name, creatorId, isPublic, description })
  }

  addSound (playlistId, userId, soundId) {
    soundCollection.check(soundId)
    updateSoundIdsIfPermission('$addToSet', this, playlistId, userId, soundId)
  }

  removeSound (playlistId, userId, soundId) {
    soundCollection.check(soundId)
    updateSoundIdsIfPermission('$pull', this, playlistId, userId, soundId)
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
        }, { $set: {
          [`soundIds.${soundToBeMovedIndex}`]: soundToMoveId,
          [`soundIds.${soundToMoveIndex}`]: soundToBeMovedId,
        } })
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
}

export const playlistCollection = new PlaylistCollection('playlists')

playlistCollection.attachSchema(playlistSchema)
