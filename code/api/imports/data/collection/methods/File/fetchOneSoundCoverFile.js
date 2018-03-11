import { fetchOneFileById } from './fetchOneFileById'
import { fetchOneSoundById } from '../Sound/fetchOneSoundById'

export const fetchOneSoundCoverFile = soundId => {
  const sound = fetchOneSoundById(soundId)

  if (sound) return fetchOneFileById(sound.coverFileId)
}
