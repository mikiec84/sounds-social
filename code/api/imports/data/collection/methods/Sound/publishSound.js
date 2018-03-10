import { fetchOneSoundById } from './fetchOneSoundById'
import { soundCollection } from '../../SoundCollection'
import { isPermittedToChangeSound } from './isPermittedToChangeSound'

export const publishSound = userId => _id => {
  if (!isPermittedToChangeSound(userId)(_id)) throw new Error('Not permitted')

  soundCollection.update({ _id }, { $set: { isPublic: true } })

  return fetchOneSoundById(_id)
}
