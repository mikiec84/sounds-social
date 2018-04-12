import { findSoundKeyById } from '../StoreSoundPlayerModule'
import { RANDOM_MODE } from '../../constants/PlayerConstants'

export const moveSoundAction = (
  { commit, state },
  { soundId, relativePosition }
) => {
  const currentPositionIndex = parseInt(
    findSoundKeyById(soundId)(state.sounds),
    10
  )
  const newPositionIndex = currentPositionIndex + relativePosition

  if (state.mode === RANDOM_MODE) {
    throw new Error('Cannot move sounds in random mode')
  }

  if (!isNaN(currentPositionIndex) && state.sounds[newPositionIndex]) {
    commit('MOVE_SOUND_PLAYER_POSITION', {
      newPositionIndex,
      currentPositionIndex
    })
  }
}
