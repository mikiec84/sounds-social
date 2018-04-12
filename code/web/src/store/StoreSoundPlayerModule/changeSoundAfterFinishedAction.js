import {
  LOOP_MODE,
  LOOP_SINGLE_MODE,
  RANDOM_MODE
} from '../../constants/PlayerConstants'
import { isLastSound } from './isAtNthSound'

export const changeSoundAfterFinishedAction = ({
  dispatch,
  getters,
  state
}) => {
  const { soundPlayerSounds: sounds } = getters
  const { mode, currentId } = state

  if (mode === LOOP_SINGLE_MODE) {
    dispatch('play')
  } else if (
    [LOOP_MODE, RANDOM_MODE].includes(mode) &&
    isLastSound(currentId)(sounds)
  ) {
    dispatch('changeSoundToPlay', { soundId: sounds[0].id })
  } else {
    dispatch('playerPlayNext')
  }
}
