import { omit } from 'lodash/fp'
import { check, Match } from 'meteor/check'
import { soundCollection } from '../../SoundCollection'
import { fileCollection } from '../../FileCollection'
import { isMemberOfGroup } from '../Group/isMemberOfGroup'
import { fetchOneSoundById } from './fetchOneSoundById'

export const createSound = currentUserId => data => optionalGroupId => {
  const omitFile = omit(['file'])
  data.createdAt = new Date()

  check(data, {
    name: String,
    description: Match.Maybe(String),
    createdAt: Date,
    creatorId: String,
    isPublic: Boolean,
    file: {
      _id: String,
      secret: String,
      url: String,
    },
  })

  data.creatorId = currentUserId
  data.ownerType = 'user'

  if (optionalGroupId && isMemberOfGroup(currentUserId)(optionalGroupId)) {
    data.creatorId = optionalGroupId
    data.ownerType = 'group'
  }

  if (!data.file) throw new Error('Need file to add sound')
  data.fileId = fileCollection.insert({ ...data.file })

  return fetchOneSoundById(
    soundCollection.insert(omitFile(data)),
  )
}
