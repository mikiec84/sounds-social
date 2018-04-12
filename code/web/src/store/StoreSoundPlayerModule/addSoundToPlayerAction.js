import { collectionHasPlaylistFields } from '../../func/collectionHasFields'
import {
  findSoundById,
  findSoundKeyById,
  hasSounds
} from '../StoreSoundPlayerModule'

export const addSoundToPlayerAction = (
  { commit, state, getters, dispatch },
  { sound, relativePosition }
) => {
  if (
    sound &&
    collectionHasPlaylistFields([sound]) &&
    !findSoundById(sound.id)(state.sounds)
  ) {
    const hasSoundsInState = hasSounds(state)

    commit('ADD_SOUND_TO_PLAYER_PLAYLIST', {
      positionIndex:
        parseInt(
          findSoundKeyById(state.currentId)(getters.soundPlayerSounds),
          10
        ) + relativePosition,
      sounds: [sound]
    })

    if (!hasSoundsInState) dispatch('playNew')
    else dispatch('openPlayerPlayingNowList')
  }
}
