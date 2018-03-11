import { isPermittedToChangeSound } from './isPermittedToChangeSound'
import { fileCollection } from '../../FileCollection'
import { soundCollection } from '../../SoundCollection'
import { fetchOneSoundById } from './fetchOneSoundById'

export const updateSoundCover = userId => soundId => coverFileData => {
  if (isPermittedToChangeSound(userId)(soundId)) {
    const coverFileId = fileCollection.insert({ ...coverFileData })

    soundCollection.update({ _id: soundId }, { $set: { coverFileId } })

    return fetchOneSoundById(soundId)
  }
}
