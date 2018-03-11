import { soundCollection } from '../../SoundCollection'
import { fetchOneSoundById } from './fetchOneSoundById'
import { isPermittedToChangeSound } from './isPermittedToChangeSound'

export const updateSound = userId => _id => data => {
  if (!isPermittedToChangeSound(userId)(_id)) throw new Error('Not permitted')

  soundCollection.update({ _id }, { $set: data })

  return fetchOneSoundById(_id)
}
