import { check } from 'meteor/check'
import { updateSoundCover } from '../../../data/collection/methods/Sound/updateSoundCover'

export const addSoundCoverFileResolver = (root, args, context) => {
  const { soundId, fileData } = args
  check(soundId, String)
  check(fileData, {
    _id: String,
    secret: String,
    url: String,
  })

  return updateSoundCover(context.userId)(soundId)(fileData)
}
