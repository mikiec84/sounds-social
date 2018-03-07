import { omit, get } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { soundSchema } from '../schema/SoundSchema'
import { fileCollection } from './FileCollection'
import { playlistCollection } from './PlaylistCollection'
import { groupCollection } from './GroupCollection'
import { fetchOneFileById } from './methods/File/fetchOneFileById'
import { fetchUserFollowerIdsForUser } from './methods/User/fetchUserFollowerIdsForUser'
import { fetchGroupFollowerIdsForUser } from './methods/Group/fetchGroupFollowerIdsForUser'

export const isCreatorSoundsSelector = userId => ({
  creatorId: {
    $in: [
      userId,
      ...groupCollection.findForUser(userId).map(get('_id'))
    ]
  },
})

class SoundCollection extends Mongo.Collection {
  addSound (doc, userId, groupId) {
    const omitFile = omit(['file'])
    doc.createdAt = new Date()
    doc.fileId = 'fake'

    check(omitFile(doc), soundSchema)

    doc.creatorId = userId
    doc.ownerType = 'user'

    if (groupId && groupCollection.isMemberOfGroup(userId, groupId)) {
      doc.creatorId = groupId
      doc.ownerType = 'group'
    }

    if (!doc.file) throw new Error('Need file to add sound')
    doc.fileId = fileCollection.insert({ ...doc.file })

    const _id = this.insert(omitFile(doc))

    return this.findOne({ _id })
  }

  publishSound (_id, userId) {
    if (!this.isPermittedToChange(userId, _id)) throw new Error('Not permitted')

    this.update({ _id }, { $set: { isPublic: true } })

    return this.findOneById(_id)
  }

  isPermittedToChange (userId, docId) {
    const doc = this.findOneById(docId)

    if (doc.ownerType === 'group') {
      return groupCollection.isMemberOfGroup(userId, doc.creatorId)
    }

    return doc.creatorId === userId
  }

  findForUser (userId, currentUserId) {
    const selector = {
      creatorId: userId,
      $or: [ { ownerType: { $exists: false } }, { ownerType: 'user' } ],
    }

    if (currentUserId !== userId) selector.isPublic = true

    return this.findByNewest(selector)
  }

  findForGroup (groupId, currentUserId) {
    const selector = {
      creatorId: groupId,
      ownerType: 'group',
    }

    if (!groupCollection.isMemberOfGroup(currentUserId, groupId)) {
      selector.isPublic = true
    }

    return this.findByNewest(selector)
  }

  findForFeed (currentUserId) {
    const selector = {
      $or: [
        {
          isPublic: true,
          creatorId: { $in: [
            ...fetchUserFollowerIdsForUser(currentUserId),
            ...fetchGroupFollowerIdsForUser(currentUserId),
          ] },
        },
      ],
    }

    selector.$or.push(isCreatorSoundsSelector(currentUserId))

    return this.findByNewest(selector)
  }

  findForDiscover (currentUserId) {
    const selector = {
      $or: [
        { isPublic: true },
      ],
    }

    selector.$or.push(isCreatorSoundsSelector(currentUserId))

    return this.findByNewest(selector)
  }

  findByNewest (selector, opts) {
    return this.find(selector, {
      ...opts,
      sort: { createdAt: -1 },
    })
  }

  findOneForUser (selector, userId) {
    selector.isPublic = true

    return super.findOne({
      $or: [
        selector,
        {
          _id: selector._id,
          creatorId: { $in: [
            userId,
            ...groupCollection.findForUser(userId).map(get('_id'))
          ] },
        },
      ],
    })
  }

  findByIds (ids) {
    return this.find({ _id: { $in: ids } })
  }

  fetchForPlaylist (playlistId, userId) {
    const playlist = playlistCollection.findOnePublic(playlistId, userId)

    if (playlist) {
      const { soundIds } = playlist

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
