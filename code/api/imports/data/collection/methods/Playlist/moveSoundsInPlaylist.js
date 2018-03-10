import { findIndex, isEqual, every } from 'lodash/fp'
import { soundCollection } from '../../SoundCollection'
import { playlistCollection } from '../../PlaylistCollection'
import { fetchOnePlaylistForUser } from './fetchOnePlaylistForUser'

export const moveSoundsInPlaylist = soundToMoveId => soundToBeMovedId => userId => playlistId => {
  soundCollection.check(soundToMoveId)
  soundCollection.check(soundToBeMovedId)

  const sound = fetchOnePlaylistForUser(userId)(playlistId)

  if (!sound) return null

  const soundToMoveIndex = findIndex(isEqual(soundToMoveId))(sound.soundIds)
  const soundToBeMovedIndex = findIndex(isEqual(soundToBeMovedId))(sound.soundIds)
  const hasNoInvalidSoundIndexes = every(isEqual(-1))

  if (!hasNoInvalidSoundIndexes([soundToMoveIndex, soundToBeMovedIndex])) {
    playlistCollection.update({ _id: playlistId }, {
      $set: {
        [`soundIds.${soundToBeMovedIndex}`]: soundToMoveId,
        [`soundIds.${soundToMoveIndex}`]: soundToBeMovedId,
      }
    })
  }
}
