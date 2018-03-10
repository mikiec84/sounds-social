import { omit } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { soundSchema } from '../schema/SoundSchema'
import { fileCollection } from './FileCollection'
import { fetchOneFileById } from './methods/File/fetchOneFileById'
import { fetchUserFollowerIdsForUser } from './methods/User/fetchUserFollowerIdsForUser'
import { fetchGroupFollowerIdsForUser } from './methods/Group/fetchGroupFollowerIdsForUser'
import { isMemberOfGroup } from './methods/Group/isMemberOfGroup'
import { fetchGroupIdsForUser } from './methods/Group/fetchGroupIdsForUser'
import { fetchOnePublicPlaylist } from './methods/Playlist/fetchOnePublicPlaylist'

export const isCreatorSoundsSelector = userId => ({
  creatorId: {
    $in: [
      userId,
      ...fetchGroupIdsForUser(userId)
    ]
  },
})

class SoundCollection extends Mongo.Collection {
  publishSound (_id, userId) {
    if (!this.isPermittedToChange(userId, _id)) throw new Error('Not permitted')

    this.update({ _id }, { $set: { isPublic: true } })

    return this.findOneById(_id)
  }

  isPermittedToChange (userId, docId) {
    const doc = this.findOneById(docId)

    if (doc.ownerType === 'group') {
      return isMemberOfGroup(userId)(doc.creatorId)
    }

    return doc.creatorId === userId
  }

  fetchForPlaylist (playlistId, userId) {
    const playlist = fetchOnePublicPlaylist(userId)(playlistId)

    if (playlist) {
      const { soundIds } = playlist

      // FIXME check if public sound!
      return soundIds.map(soundId => this.findOneById(soundId))
    }
  }

  findCoverFile (soundId) {
    const sound = this.findOne(soundId)

    if (sound) return fetchOneFileById(sound.coverFileId)
  }

  updateCover (soundId, userId, coverFileData) {
    const sound = soundCollection.findOne({ _id: soundId, ...isCreatorSoundsSelector(userId) })

    if (sound) {
      const coverFileId = fileCollection.insert({ ...coverFileData })

      this.update({ _id: soundId }, { $set: { coverFileId } })

      return sound
    }
  }

  countPlay (_id) {
    this.update({ _id }, { $inc: { playsCount: 1 } })
  }

  findOneById (_id) {
    return this.findOne({ _id })
  }

  check (_id) {
    if (!this.findOneById(_id)) throw new Error('Sound not found')
  }
}

export const soundCollection = new SoundCollection('sounds')

soundCollection.attachSchema(soundSchema)
