import { find, findKey } from 'lodash/fp'
import { isValidMode } from '../constants/PlayerConstants'
import { collectionHasPlaylistFields } from '../lib/collectionHasFields'

const findSoundById = soundId => find(sound => sound.id === soundId)
const findSoundKeyById = soundId => findKey(sound => sound.id === soundId)

const changeSoundByKeyIfExists = ({ sounds, dispatch, keyToPlay }) => {
  console.log(keyToPlay, sounds[keyToPlay])
  if (sounds[keyToPlay]) dispatch('changeSoundToPlay', { soundId: sounds[keyToPlay].id })
}

export const soundPlayerModule = {
  state: {
    sounds: [],
    currentId: null,
    mode: null,
    isPlaying: false,
    isMuted: false,
  },

  actions: {
    addSoundToPlayer: ({ commit, state, dispatch }, { sound }) => {
      // TODO: wave surfer, load track async?
      if (collectionHasPlaylistFields([sound]) && sound) {
        const hasSounds = state.sounds.length > 0
        commit('ADD_SOUND_TO_PLAYER_PLAYLIST', [sound])
        if (!hasSounds) dispatch('play')
      }
    },
    changeSoundToPlay: ({ commit, state, dispatch }, { soundId }) => {
      // TODO: wave surfer
      const sound = findSoundById(soundId)(state.sounds)

      if (sound) {
        commit('CHANGE_CURRENT_SOUND_ID', soundId)
        dispatch('play')
      }
    },
    play: ({ commit }) => {
      // TODO: wave surfer
      commit('PLAY_PLAYER', true)
    },
    pause: ({ commit }) => {
      // TODO: wave surfer
      commit('PLAY_PLAYER', false)
    },
    playerStepForward: ({ state, dispatch }) => {
      const { sounds } = state
      const key = parseInt(findSoundKeyById(state.currentId)(sounds), 10)

      changeSoundByKeyIfExists({ sounds, dispatch, keyToPlay: (key + 1) })
    },
    playerStepBackward: ({ state, dispatch }) => {
      const { sounds } = state
      const key = parseInt(findSoundKeyById(state.currentId)(sounds), 10)

      changeSoundByKeyIfExists({ sounds, dispatch, keyToPlay: (key - 1) })
    },
    mutePlayer: ({ commit }) => {
      // TODO: wave surfer
      commit('MUTE_PLAYER', true)
    },
    unmutePlayer: ({ commit }) => {
      // TODO: wave surfer
      commit('MUTE_PLAYER', false)
    },
    changePlayerMode: ({ commit }, { mode }) => {
      if (isValidMode(mode)) commit('CHANGE_PLAYER_MODE', mode)
    },
  },

  mutations: {
    CHANGE_PLAYER_MODE (state, mode) { state.mode = mode },
    PLAY_PLAYER (state, isPlaying) { state.isPlaying = isPlaying },
    MUTE_PLAYER (state, isMuted) { state.isMuted = isMuted },
    ADD_SOUND_TO_PLAYER_PLAYLIST (state, sounds) {
      if (!state.currentId) state.currentId = sounds[0].id
      state.sounds = state.sounds.concat(sounds)
    },
    CHANGE_CURRENT_SOUND_ID (state, soundId) { state.currentId = soundId },
  },
}
