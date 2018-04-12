import { omit } from 'lodash/fp'
import { soundCollection } from '../../SoundCollection'
import { fileCollection } from '../../FileCollection'
import { isMemberOfAlias } from '../Alias/isMemberOfAlias'
import { fetchOneSoundById } from './fetchOneSoundById'
import { checkSoundData } from '../../../../lib/check/checkSound'

const omitFile = omit(['file'])

export const createSound = currentUserId => data => optionalAliasId => {
  data.createdAt = new Date()

  checkSoundData(data)

  data.creatorId = currentUserId
  data.ownerType = 'user'

  if (optionalAliasId && isMemberOfAlias(currentUserId)(optionalAliasId)) {
    data.creatorId = optionalAliasId
    data.ownerType = 'alias'
  }

  if (!data.file) {
    throw new Error('Need file to add sound')
  }

  data.fileId = fileCollection.insert({ ...data.file })

  const dataWithoutFile = omitFile(data)
  const soundId = soundCollection.insert(dataWithoutFile)

  return fetchOneSoundById(soundId)
}
