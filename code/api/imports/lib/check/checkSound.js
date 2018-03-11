import { fetchOneSoundById } from '../../data/collection/methods/Sound/fetchOneSoundById'

export const checkSound = _id => {
  if (!fetchOneSoundById(_id)) throw new Error('Sound not found')
}
